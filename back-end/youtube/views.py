from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication
from .serializers import ChannelSerializer, ChannelInfoSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Channel

class ChannelCreate(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def create(self, request):
		serializer = ChannelSerializer(data=request.data, context={'request': request})
		if serializer.is_valid(raise_exception=True):
			channel = serializer.save()
			if channel:
				response = Response(status=status.HTTP_201_CREATED)
				response.set_cookie('channel', channel.uid)
				return response
		return Response(status=status.HTTP_400_BAD_REQUEST)

	def update(self, request):
		cookie = request.COOKIES['channel']
		channel = get_object_or_404(Channel, uid=cookie)
		serializer = ChannelSerializer(channel, data=request.data)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(status=status.HTTP_202_ACCEPTED)
		return Response(status=status.HTTP_400_BAD_REQUEST)
		
	def post(self, request):
		return self.create(request)
		
	def patch(self, request):
		return self.update(request)
		

class ChannelInfo(APIView):
	permission_classes = [permissions.AllowAny]
	authentication_classes = []
	
	def get(self, request, **kwargs):
		tag = kwargs.get('tag', None)
		channel = get_object_or_404(Channel, tag=tag)
		if channel.active_channel:
			serializer = ChannelInfoSerializer(channel)
			channel_subscriptions = []
			for channel in channel.subscriptions.all():
				channel_subscriptions.append({'name': channel.name, 'tag': channel.tag})
			return Response({'data': serializer.data, 'sub_data': channel_subscriptions}, status=status.HTTP_200_OK)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class ChannelIndex(APIView):
	permission_classes = [permissions.AllowAny]

	def get(self, request):
		channels = Channel.objects.filter(active_channel=True)
		response_data = []
		for channel in channels:
			response_data.append({'name': channel.name, 'tag': channel.tag})
		return Response(response_data, status=status.HTTP_200_OK)
	

class AssociatedChannels(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def get(self, request):
		channels = request.user.channel.all()
		response_data = []
		for channel in channels:
			response_data.append({'name': channel.name, 'tag': channel.tag})
		return Response(response_data, status=status.HTTP_200_OK)
	

class LoggedChannel(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def default_channel(self, request):
		try:
			channels = request.user.channel.all()
			channel = channels[0]
			return Response(channel.uid, status=status.HTTP_200_OK)
		except:
			return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR);

	def specfied_channel(self, request, channel_tag):
		try:
			channel = request.user.channel.get(tag=channel_tag)
			return Response(channel.uid, status=status.HTTP_200_OK)
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)

	def get(self, request, **kwargs):
		channel_tag = kwargs.get('tag', None)
		if channel_tag is None:
			return self.default_channel(request)
		else:
			return self.specfied_channel(request=request, channel_tag=channel_tag)
		
class SubscriptionView(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	# sub to a channel
	def patch(self, request, **kwargs):
		tag = kwargs.get('tag', None)
		user_channel_uid = request.COOKIES['channel']
		user_channel = get_object_or_404(Channel, uid=user_channel_uid)
		subscribe_to_channel = get_object_or_404(Channel, tag=tag)
		already_subbed = user_channel.subscriptions.filter(tag=subscribe_to_channel.tag)
		if user_channel != subscribe_to_channel and not already_subbed:
			user_channel.subscriptions.add(subscribe_to_channel)
			serializer = ChannelInfoSerializer(subscribe_to_channel)
			serializer.newSub(subscribe_to_channel)
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(status=status.HTTP_400_BAD_REQUEST)
	
	# checking if user's channel is subbed to channel
	def get(self, request, **kwargs):
		tag = kwargs.get('tag', None)
		user_channel_uid = request.COOKIES['channel']
		user_channel = get_object_or_404(Channel, uid=user_channel_uid)
		get_object_or_404(Channel, tag=tag)
		print(request.user.channel.filter(tag=tag))
		if tag == user_channel.tag or request.user.channel.filter(tag=tag):
			return Response(status=status.HTTP_400_BAD_REQUEST)
		try:
			user_channel.subscriptions.get(tag=tag)
			return Response(True, status=status.HTTP_200_OK)
		except:
			return Response(False, status=status.HTTP_200_OK)
		

class ChannelImagesManager(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	# uploading images to channel either update or create
	def post(self, request):
		cookie = request.COOKIES['channel']
		channel = get_object_or_404(Channel, uid=cookie)
		serializer = ChannelSerializer(channel, data=request.data, partial=True)
		if serializer.is_valid(raise_exception=True):
			serializer.save()
			return Response(status=status.HTTP_202_ACCEPTED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


# import dropbox
# from django.conf import settings

# class TestImageUploadView(APIView):
# 	permission_classes = [permissions.IsAuthenticated]
# 	authentication_classes = [SessionAuthentication]

# 	def upload_image(self, image):
# 		dbx = dropbox.Dropbox(oauth2_refresh_token=settings.DROPBOX_OAUTH2_REFRESH_TOKEN, app_key=settings.DROPBOX_APP_KEY)


# 	def post(self, request):
# 		# call upload image to cloud function
# 		image_link = None
# 		channel = Channel(name='test', owner=request.user, profile_pic=image_link)
# 		return Response(status=status.HTTP_200_OK)