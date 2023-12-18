from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.ChannelCreate.as_view(), name='create'),
    path('update/', views.ChannelCreate.as_view(), name='update'),
    path('info/<str:tag>', views.ChannelInfo.as_view(), name='info'),
    path('index/', views.ChannelIndex.as_view(), name='index'),
    path('userindex/', views.AssociatedChannels.as_view(), name='userindex'),
    path('logged/', views.LoggedChannel.as_view(), name='logged'),
    path('logged/<str:tag>', views.LoggedChannel.as_view(), name='logged_tag'),
    path('subscribe/<str:tag>', views.SubscriptionView.as_view(), name='sub_to'),
    path('is_subbed/<str:tag>', views.SubscriptionView.as_view(), name='is_subbed'),
    path('image_upload/', views.ChannelImagesManager.as_view(), name='img_upload'),
    path('update_sub_list/', views.UpdateSubscriptionDataView.as_view(), name='update_sub_list'),
]