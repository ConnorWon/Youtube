from django.contrib.auth import login, logout, get_user_model
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserSerializer
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication
from django.shortcuts import get_object_or_404

UserModel = get_user_model()

class UserRegister(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(request.data)
            if user:
                return Response(status=status.HTTP_201_CREATED)
        return Response("There was an issue with creating user", status=status.HTTP_400_BAD_REQUEST)
    
class UserLogin(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [SessionAuthentication]

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid():
            user = serializer.check_user(data)
            login(request, user)
            return Response({'id': user.uid}, status=status.HTTP_200_OK)
        return Response("email or password was incorrect", status=status.HTTP_400_BAD_REQUEST)
        
class UserLogout(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        logout(request)
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie('channel')
        return response
    
class UserInfo(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request, **kwargs):
        serializer = UserSerializer(request.user)
        uid = kwargs.get('uid', None)
        if get_object_or_404(UserModel, uid=uid):
            if serializer.check_user(uid):
                return Response({'email': serializer.data['email']}, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogged(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'id': serializer.data['uid']}, status=status.HTTP_200_OK)
    
    

    
    # def post(self, request, uid):
    #     serializer = UserSerializer(request.user)
    #     if serializer.check_user():
    #         return Response({'email': serializer.data['email']}, status=status.HTTP_200_OK)
    #     return Response(status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# def register(request):
#     try:
#         YTUser.objects.create_user(request.data["email"], request.data["password"])
#         return Response({'signup': 'success'}, status=status.HTTP_201_CREATED)
#     except IntegrityError as e:
#         return Response("Email already taken")
#     except Exception as e:
#         return Response(e)
    
# @api_view(['POST'])
# @authentication_classes([SessionAuthentication])
# @permission_classes([permissions.AllowAny])
# def login(request):
#     email = request.data['email']
#     password = request.data['password']
#     user = authenticate(email=email, password=password)
#     if user is not None:
#         login(request, user)
#         return Response({'login': 'success', 'id': user.uid})
#     else:
#         return Response("Email or Password was incorrect")

#     # try:
#     #     account = YTUser.objects.get(email=email)
#     #     response = Response({'login': 'success', 'tag': account.tag})
#     #     response.set_cookie('login', str(account.uid), samesite='None', secure=True)
#     # except YTUser.DoesNotExist:
#     #     response = Response({'login': 'fail', 'msg': 'Email does not exist'})
#     # finally:
#     #     response['Access-Control-Allow-Credentials'] = 'true'
#     #     return response
    
# @api_view(['GET'])
# def logout(request):
#     response = Response('success')
#     response.delete_cookie('login')
#     response['Access-Control-Allow-Credentials'] = 'true'
#     return response

# @api_view(['GET'])
# def userInfo(request, uid):
#     user = YTUser.objects.get(uid=uid)
#     if request.user == user:
#         return Response({'status': 'success', 'email': user.email,})
#     else:
#         return Response({'status': 'fail', 'msg': 'An error occured while loading info'})


    # uid = request.COOKIES.get('login')
    # try:
    #     account = YTUser.objects.get(uid=uid)
    #     response = Response({
    #         'status': 'success', 
    #         'username': account.username, 
    #         'email': account.email, 
    #         'tag': account.tag
    #     })
    # except:
    #     response = Response({'status': 'fail', 'msg': 'An error occured while loading info'})
    # finally:
    #     response['Access-Control-Allow-Credentials'] = 'true'
    #     return response

