from django.conf import settings
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication
from .serializers import ChannelSerializer, ChannelInfoSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Channel
from django.core.files.storage import FileSystemStorage


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
			updated_channel = serializer.save()
			serializer = ChannelInfoSerializer(updated_channel)
			return Response(serializer.data, status=status.HTTP_200_OK)
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
				if channel.profile_pic:
					profile_pic = settings.MEDIA_URL + str(channel.profile_pic)
					channel_subscriptions.append({'name': channel.name, 'tag': channel.tag, 'profile_pic': profile_pic})
				else:
					channel_subscriptions.append({'name': channel.name, 'tag': channel.tag, 'profile_pic': None})
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
			serializer = ChannelInfoSerializer(channel)
			response_data.append(serializer.data)
		return Response(response_data, status=status.HTTP_200_OK)
	

class LoggedChannel(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def get_channel_info(self, channel):
		serializer = ChannelInfoSerializer(channel)
		channel_subscriptions = []
		for ch in channel.subscriptions.all():
			if ch.profile_pic:
				profile_pic = settings.MEDIA_URL + str(ch.profile_pic)
				channel_subscriptions.append({'name': ch.name, 'tag': ch.tag, 'profile_pic': profile_pic})
			else:
				channel_subscriptions.append({'name': ch.name, 'tag': ch.tag, 'profile_pic': None})
		response = Response({'data': serializer.data, 'sub_data': channel_subscriptions}, status=status.HTTP_200_OK)
		response.set_cookie('channel', channel.uid)
		return response

	def default_channel(self, request):
		try:
			stored_channel_uid = request.COOKIES.get('channel', None)
			if stored_channel_uid is not None:
				channel = request.user.channel.get(uid=stored_channel_uid)
			else:
				channels = request.user.channel.all()
				channel = channels[0]
			return self.get_channel_info(channel)
		except:
			return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

	def specfied_channel(self, request, channel_tag):
		try:
			channel = request.user.channel.get(tag=channel_tag)
			return self.get_channel_info(channel)
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)

	def get(self, request, **kwargs):
		channel_tag = kwargs.get('tag', None)
		if channel_tag is None:
			return self.default_channel(request)
		else:
			return self.specfied_channel(request=request, channel_tag=channel_tag)


class UpdateSubscriptionDataView(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def get(self, request):
		stored_channel_uid = request.COOKIES.get('channel', None)
		if stored_channel_uid is not None:
			channel = request.user.channel.get(uid=stored_channel_uid)
			channel_subscriptions = []
			for ch in channel.subscriptions.all():
				channel_subscriptions.append({'name': ch.name, 'tag': ch.tag})
			return Response(channel_subscriptions, status=status.HTTP_200_OK)
		return Response(status=status.HTTP_400_BAD_REQUEST)

		
class SubscriptionView(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	def subbing(self, user_channel, sub_to_channel, is_subbed):
		if user_channel != sub_to_channel and not is_subbed:
			user_channel.subscriptions.add(sub_to_channel)
			serializer = ChannelInfoSerializer(sub_to_channel)
			serializer.newSub(sub_to_channel, 1)
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(status=status.HTTP_400_BAD_REQUEST)

	def unsub(self, user_channel, unsub_to_channel, is_subbed):
		if user_channel != unsub_to_channel and is_subbed:
			user_channel.subscriptions.remove(unsub_to_channel)
			serializer = ChannelInfoSerializer(unsub_to_channel)
			serializer.newSub(unsub_to_channel, -1)
			return Response(status=status.HTTP_204_NO_CONTENT)
		return Response(status=status.HTTP_400_BAD_REQUEST)

	# sub to a channel
	def patch(self, request, **kwargs):
		tag = kwargs.get('tag', None)
		user_channel_uid = request.COOKIES['channel']
		user_channel = get_object_or_404(Channel, uid=user_channel_uid)
		viewed_channel = get_object_or_404(Channel, tag=tag)
		is_subbed = user_channel.subscriptions.filter(tag=viewed_channel.tag)
		call_subbing = request.data.get('sub', None)
		if (call_subbing):
			return self.subbing(user_channel=user_channel, sub_to_channel=viewed_channel, is_subbed=is_subbed)
		else:
			return self.unsub(user_channel=user_channel, unsub_to_channel=viewed_channel, is_subbed=is_subbed)
	
	# checking if user's channel is subbed to channel
	def get(self, request, **kwargs):
		tag = kwargs.get('tag', None)
		user_channel_uid = request.COOKIES['channel']
		user_channel = get_object_or_404(Channel, uid=user_channel_uid)
		get_object_or_404(Channel, tag=tag)
		if tag == user_channel.tag or request.user.channel.filter(tag=tag):
			return Response(status=status.HTTP_400_BAD_REQUEST)
		try:
			user_channel.subscriptions.get(tag=tag)
			return Response(True, status=status.HTTP_200_OK)
		except Channel.DoesNotExist:
			return Response(False, status=status.HTTP_200_OK)
		

class ChannelImagesManager(APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [SessionAuthentication]

	@staticmethod
	def delete_old_media_file(instance, req_data):
		fs = FileSystemStorage()
		if req_data.get('profile_pic') and instance.profile_pic:
			fs.delete(str(instance.profile_pic))
		if req_data.get('banner') and instance.banner:
			fs.delete(str(instance.banner))

	# uploading images to channel either update or create
	def patch(self, request):
		cookie = request.COOKIES['channel']
		channel = get_object_or_404(Channel, uid=cookie)
		serializer = ChannelSerializer(channel, data=request.data, partial=True)
		if serializer.is_valid(raise_exception=True):
			self.delete_old_media_file(channel, request.data)
			updated_channel = serializer.save()
			response_data = ChannelInfoSerializer(updated_channel)
			return Response(response_data.data, status=status.HTTP_200_OK)
		return Response(status=status.HTTP_400_BAD_REQUEST)