import uuid
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import Channel
from rest_framework.test import APIClient
from PIL import Image
from pathlib import Path
from django.core.files.uploadedfile import SimpleUploadedFile

UserModel = get_user_model()

class ChannelModelTests(TestCase):
    
    def setUp(self):
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')

    def test_create_channel_with_profile_pic(self):
        channel = Channel(name='test', owner=self.user)
        channel.profile_pic = SimpleUploadedFile(name='test_image.jpg', 
                                                 content=open(Path(__file__).resolve().parent / 'test_photos/youtube-thumbnail.png', 'rb').read(), 
                                                 content_type='image/jpeg')
        channel.save()
        channel = Channel.objects.get(name='test')
        print(channel.profile_pic.url)

class ChannelImagesTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create')
        self.upload_url = reverse('img_upload')
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')
        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

    def test_image_upload(self):
        img = open(Path(__file__).resolve().parent / 'test_photos/youtube-thumbnail.png', 'rb')
        response = self.client.post(self.upload_url, {'profile_pic': img})
        self.assertEqual(response.status_code, 202)
        ch = Channel.objects.get(name='Cow')
        print(ch.profile_pic.url)

class ChannelViewsTests(TestCase):
    
    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create')
        self.update_url = reverse('update')
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')


    def test_channel_create_most_basic(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com'
        })

        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.client.cookies.get('channel').value, 
                          str(Channel.objects.get(name='cow@gmail.com').uid))
        self.assertEquals(Channel.objects.get(name='cow@gmail.com').tag, 
                          '@' + str(Channel.objects.get(name='cow@gmail.com').uid))
        
    def test_channel_create_invalid_serializer_name_field(self):
        response = self.client.post(self.create_url)

        self.assertEquals(response.status_code, 400)
        self.assertIn("name", str(response.content))
    
    def test_channel_create_with_tag(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com',
            'tag': '@cow'
        })

        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.client.cookies.get('channel').value, 
                          str(Channel.objects.get(name='cow@gmail.com').uid))
        self.assertEquals(Channel.objects.get(name='cow@gmail.com').tag, 
                          '@cow')
        
    def test_channel_create_invalid_serializer_tag_field(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com',
            'tag': '@cow'
        })
        
        self.assertEquals(response.status_code, 201)

        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com',
            'tag': '@cow'
        })

        self.assertEquals(response.status_code, 400)
        self.assertIn("tag", str(response.content))

    def test_channel_create_setting_active(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com',
            'tag': '@cow',
            'active_channel': True
        })

        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.client.cookies.get('channel').value, 
                          str(Channel.objects.get(name='cow@gmail.com').uid))
        self.assertEquals(Channel.objects.get(name='cow@gmail.com').tag, 
                          '@cow')
        self.assertTrue(Channel.objects.get(name='cow@gmail.com').active_channel)

    # test create with profile_pic and banner

    def test_channel_update_202(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com',
        })

        self.assertEquals(response.status_code, 201)

        response = self.client.patch(self.update_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })
        
        self.assertEquals(response.status_code, 202)
        self.assertTrue(Channel.objects.get(name='Cow'))
        self.assertEquals(Channel.objects.get(name='Cow').tag, 
                          '@cow')
        self.assertTrue(Channel.objects.get(name='Cow').active_channel)
        self.assertRaises(Channel.DoesNotExist, Channel.objects.get, name='cow@gmail.com')

    def test_channel_update_invalid_serializer_tag_field(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com',
            'tag': '@cow'
        })

        self.assertEquals(response.status_code, 201)

        response = self.client.post(self.create_url, {
            'name': 'pig@gmail.com',
        })

        self.assertEquals(response.status_code, 201)

        response = self.client.patch(self.update_url, {
            'tag': '@cow',
            'active_channel': True
        })

        self.assertEquals(response.status_code, 400)
        self.assertIn("tag", str(response.content))

    # test update with profile_pic and banner

    def test_channel_info_get_200_basic(self):
        info_url = reverse('info', kwargs={'tag': '@cow'})

        response = self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

        response = self.client.get(info_url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()['data']['name'], 'Cow')
        self.assertEquals(response.json()['data']['profile_pic'], None)
        self.assertEquals(response.json()['data']['banner'], None)
        self.assertEquals(len(response.json()['sub_data']), 0)
        self.assertEquals(response.json()['data']['sub_count'], 0)
        self.assertEquals(response.json()['data']['tag'], '@cow')

    def test_channel_info_get_bad_tag(self):
        info_url = reverse('info', kwargs={'tag': '@123'})
        response = self.client.get(info_url)
        self.assertEquals(response.status_code, 404)

    def test_channel_info_get_inactive_channel(self):
        info_url = reverse('info', kwargs={'tag': '@cow'})

        response = self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow'
        })

        response = self.client.get(info_url)
        self.assertEquals(response.status_code, 400)

    def test_channel_info_get_not_logged_in(self):
        info_url = reverse('info', kwargs={'tag': '@cow'})

        response = self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

        self.client.logout()

        response = self.client.get(info_url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()['data']['name'], 'Cow')
        self.assertEquals(response.json()['data']['profile_pic'], None)
        self.assertEquals(response.json()['data']['banner'], None)
        self.assertEquals(len(response.json()['sub_data']), 0)
        self.assertEquals(response.json()['data']['sub_count'], 0)
        self.assertEquals(response.json()['data']['tag'], '@cow')

    def test_channel_info_has_subscriptions(self):
        info_url = reverse('info', kwargs={'tag': '@cow'})

        response = self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        self.client.patch(url)

        response = self.client.get(info_url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()['data']['name'], 'Cow')
        self.assertEquals(response.json()['data']['profile_pic'], None)
        self.assertEquals(response.json()['data']['banner'], None)
        self.assertEquals(response.json()['sub_data'][0]['tag'], "@sub_to")
        self.assertEquals(response.json()['data']['sub_count'], 0)
        self.assertEquals(response.json()['data']['tag'], '@cow')

    # test with profile_pic and banner when implemented

    def test_channel_index(self):
        index_url = reverse('index')

        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })
        self.client.post(self.create_url, {
            'name': 'Pig',
            'tag': '@pig',
            'active_channel': True
        })
        self.client.post(self.create_url, {
            'name': 'Chicken',
            'tag': '@chicken',
        })

        response = self.client.get(index_url)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()[0]['name'], 'Cow')
        self.assertEquals(response.json()[0]['tag'], '@cow')
        self.assertEquals(response.json()[1]['name'], 'Pig')
        self.assertEquals(response.json()[1]['tag'], '@pig')
        self.assertEquals(len(response.json()), 2)

    def test_associated_channel(self):
        user_index_url = reverse('userindex')

        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })
        self.client.post(self.create_url, {
            'name': 'Pig',
            'tag': '@pig',
            'active_channel': True
        })

        response = self.client.get(user_index_url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()[0]['name'], 'Cow')
        self.assertEquals(response.json()[0]['tag'], '@cow')
        self.assertEquals(response.json()[1]['name'], 'Pig')
        self.assertEquals(response.json()[1]['tag'], '@pig')

class LoggedChannelTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create')
        self.url = reverse('logged')
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')

    def test_no_uid(self):
        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

        self.client.cookies.pop('channel', None)

        response = self.client.get(self.url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.client.cookies.get('channel').value, 
                    str(Channel.objects.get(name='Cow').uid))
        self.assertEquals(response.json()['data']['name'], 'Cow')
        self.assertEquals(response.json()['data']['profile_pic'], None)
        self.assertEquals(response.json()['data']['banner'], None)
        self.assertEquals(len(response.json()['sub_data']), 0)
        self.assertEquals(response.json()['data']['sub_count'], 0)
        self.assertEquals(response.json()['data']['tag'], '@cow')

    def test_has_subscriptions_and_has_cookie(self):
        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

        self.client.post(self.create_url, {
            'name': 'Pig',
            'tag': '@pig',
            'active_channel': True
        })

        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        self.client.patch(url, {
            'sub': True
        })
        
        response = self.client.get(self.url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.client.cookies.get('channel').value, 
                    str(Channel.objects.get(name='Pig').uid))
        self.assertEquals(response.json()['data']['name'], 'Pig')
        self.assertEquals(response.json()['data']['profile_pic'], None)
        self.assertEquals(response.json()['data']['banner'], None)
        self.assertEquals(response.json()['sub_data'][0]['tag'], "@sub_to")
        self.assertEquals(response.json()['data']['sub_count'], 0)
        self.assertEquals(response.json()['data']['tag'], '@pig')
        
    def test_with_uid(self):
        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })
        self.client.post(self.create_url, {
            'name': 'Pig',
            'tag': '@pig',
            'active_channel': True
        })
        self.client.post(self.create_url, {
            'name': 'Chicken',
            'tag': '@chicken',
            'active_channel': True
        })

        response = self.client.get(reverse('logged_tag', kwargs={'tag': '@pig'}))
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.client.cookies.get('channel').value, 
                    str(Channel.objects.get(name='Pig').uid))
        self.assertEquals(response.json()['data']['name'], 'Pig')
        self.assertEquals(response.json()['data']['profile_pic'], None)
        self.assertEquals(response.json()['data']['banner'], None)
        self.assertEquals(len(response.json()['sub_data']), 0)
        self.assertEquals(response.json()['data']['sub_count'], 0)
        self.assertEquals(response.json()['data']['tag'], '@pig')

    def test_bad_uid(self):
        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })
        self.client.post(self.create_url, {
            'name': 'Pig',
            'tag': '@pig',
            'active_channel': True
        })

        response = self.client.get(reverse('logged_tag', kwargs={'tag': '@123'}))
        self.assertEquals(response.status_code, 400)

class SubscriptionViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create')
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')

        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

        self.channel = Channel.objects.get(tag='@cow')

        self.second_user = UserModel.objects.create_user(email='pig@gmail.com', password='12345')

    def test_patch_sub_success(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(response.status_code, 204)
        self.assertTrue(self.channel.subscriptions.get(tag='@sub_to'))
        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 1)

    def test_patch_unsub_success(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 1)

        response = self.client.patch(url)

        self.assertEquals(response.status_code, 204)
        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 0)

    def test_patch_unsub_fail(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        response = self.client.patch(url)

        self.assertEquals(response.status_code, 400)
        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 0)

    def test_patch_user_channel_sub_to_channel_same(self):
        url = reverse('sub_to', kwargs={'tag': self.channel.tag})
        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(response.status_code, 400)
        self.assertRaises(Channel.DoesNotExist, self.channel.subscriptions.get, tag='@cow')
        self.assertEquals(self.channel.sub_count, 0)

    def test_patch_sub_to_channel_twice(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        response = self.client.patch(url, {
            'sub': True
        })

        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(response.status_code, 400)
        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 1)
    
    def test_patch_bad_sub_to_tag(self):
        url = reverse('sub_to', kwargs={'tag': '@123'})
        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(response.status_code, 404)
        self.assertRaises(Channel.DoesNotExist, self.channel.subscriptions.get, tag='@123')

    def test_get_is_subbed(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.second_user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        response = self.client.patch(url, {
            'sub': True
        })

        url = reverse('is_subbed', kwargs={'tag': '@sub_to'})
        response = self.client.get(url)
        
        self.assertEquals(response.status_code, 200)
        self.assertTrue(response.json())

    def test_get_not_subbed(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.second_user, active_channel=True)
        sub_to_channel.save()

        url = reverse('is_subbed', kwargs={'tag': '@sub_to'})
        response = self.client.get(url)
        
        self.assertEquals(response.status_code, 200)
        self.assertFalse(response.json())

    def test_get_bad_channel(self):
        url = reverse('is_subbed', kwargs={'tag': '@sub_to'})
        response = self.client.get(url)
        
        self.assertEquals(response.status_code, 404)

    def test_get_users_channel(self):
        url = reverse('is_subbed', kwargs={'tag': '@cow'})
        response = self.client.get(url)
        
        self.assertEquals(response.status_code, 400)

class UpdateSubscriptionTests(TestCase):
        
    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create')
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')

        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

        self.channel = Channel.objects.get(tag='@cow')
        self.url = reverse('update_sub_list')

    def test_get_no_subs(self):
        response = self.client.get(self.url)

        self.assertEquals(response.status_code, 200)
        self.assertFalse(response.json())

    def test_get_has_subs(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        self.channel.subscriptions.add(sub_to_channel)

        response = self.client.get(self.url)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 1)
        self.assertEquals(response.json()[0]['name'], "sub_to")
        self.assertEquals(response.json()[0]['tag'], "@sub_to")