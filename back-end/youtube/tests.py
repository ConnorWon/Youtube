import os

from django.core.files.storage import FileSystemStorage
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import Channel
from rest_framework.test import APIClient
from pathlib import Path
from django.core.files.uploadedfile import SimpleUploadedFile
from django.conf import settings

UserModel = get_user_model()
media_root = str(settings.MEDIA_ROOT)



class ChannelModelTests(TestCase):
    
    def setUp(self):
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.imageUploaded = ""

    def tearDown(self):
        fs = FileSystemStorage()
        if self.imageUploaded:
            fs.delete(self.imageUploaded)

    def test_create_channel_with_profile_pic(self):
        channel = Channel(name='test', owner=self.user)
        channel.profile_pic = SimpleUploadedFile(name='test-image.png',
                                                 content=open(Path(__file__).resolve().parent / 'test_photos/test-image.png', 'rb').read(),
                                                 content_type='image/png')
        channel.save()
        channel = Channel.objects.get(name='test')
        self.imageUploaded = str(channel.profile_pic)
        self.assertEqual(self.imageUploaded, "profile-pic/test-image.png")


class ChannelCreateTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create')
        self.update_url = reverse('update')
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')

    def test_create_default_first_channel_for_user(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com'
        })

        self.assertEquals(response.status_code, 201)

        uid = str(Channel.objects.get(name='cow@gmail.com').uid)
        tag = Channel.objects.get(name='cow@gmail.com').tag

        # Verify cookie contains correct value
        self.assertEquals(response.client.cookies.get('channel').value, uid)

        # Verify default tag is @ + uid
        self.assertEquals(tag, '@' + uid)

        # Verify response content
        self.assertEquals(response.json()['name'], 'cow@gmail.com')
        self.assertEquals(response.json()['profile_pic'], None)
        self.assertEquals(response.json()['banner'], None)
        self.assertEquals(response.json()['subscriptions'], [])
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], tag)
        self.assertEquals(response.json()['active_channel'], False)

    def test_create_but_required_fields_not_provided(self):
        response = self.client.post(self.create_url)

        self.assertEquals(response.status_code, 400)
        self.assertIn("name", str(response.content))

    def test_create_with_duplicate_tag(self):
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

    def test_create_channel(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com',
            'tag': '@cow',
            'active_channel': True
        })

        self.assertEquals(response.status_code, 201)

        uid = str(Channel.objects.get(name='cow@gmail.com').uid)

        # Verify cookie contains correct value
        self.assertEquals(response.client.cookies.get('channel').value, uid)

        # Verify response content
        self.assertEquals(response.json()['name'], 'cow@gmail.com')
        self.assertEquals(response.json()['profile_pic'], None)
        self.assertEquals(response.json()['banner'], None)
        self.assertEquals(response.json()['subscriptions'], [])
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], '@cow')
        self.assertEquals(response.json()['active_channel'], True)

    def test_update_channel(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com',
        })

        self.assertEquals(response.status_code, 201)

        response = self.client.patch(self.update_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

        self.assertEquals(response.status_code, 200)

        # Verify response content
        self.assertEquals(response.json()['name'], 'Cow')
        self.assertEquals(response.json()['profile_pic'], None)
        self.assertEquals(response.json()['banner'], None)
        self.assertEquals(response.json()['subscriptions'], [])
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], '@cow')
        self.assertEquals(response.json()['active_channel'], True)

        # Verify channel with old name doesn't exist
        self.assertRaises(Channel.DoesNotExist, Channel.objects.get, name='cow@gmail.com')

    def test_update_no_fields_given(self):
        response = self.client.post(self.create_url, {
            'name': 'cow@gmail.com',
            'tag': '@cow'
        })

        self.assertEquals(response.status_code, 201)

        response = self.client.patch(self.update_url)

        self.assertEquals(response.status_code, 400)


class ChannelInfoTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.create_url = reverse('create')
        self.info_url = reverse('info', kwargs={'tag': '@cow'})
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')
        self.client.post(self.create_url, {
            'name': 'Cow',
            'tag': '@cow',
            'active_channel': True
        })

    def test_get_info_most_basic(self):
        response = self.client.get(self.info_url)

        self.assertEquals(response.status_code, 200)

        # Verify response content
        self.assertEquals(response.json()['name'], 'Cow')
        self.assertEquals(response.json()['profile_pic'], None)
        self.assertEquals(response.json()['banner'], None)
        self.assertEquals(response.json()['subscriptions'], [])
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], '@cow')
        self.assertEquals(response.json()['active_channel'], True)

    def test_get_info_with_bad_tag(self):
        info_url = reverse('info', kwargs={'tag': '@123'})
        response = self.client.get(info_url)
        self.assertEquals(response.status_code, 404)

    def test_get_info_for_inactive_channel(self):
        info_url = reverse('info', kwargs={'tag': '@pig'})

        response = self.client.post(self.create_url, {
            'name': 'Pig',
            'tag': '@pig'
        })

        response = self.client.get(info_url)
        self.assertEquals(response.status_code, 400)

    def test_get_info_channel_has_subscriptions(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        channel = Channel.objects.get(tag='@cow')
        channel.subscriptions.add(sub_to_channel)

        response = self.client.get(self.info_url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()['name'], 'Cow')
        self.assertEquals(response.json()['profile_pic'], None)
        self.assertEquals(response.json()['banner'], None)
        self.assertEquals(len(response.json()['subscriptions']), 1)
        self.assertEquals(response.json()['subscriptions'][0]['tag'], "@sub_to")
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], '@cow')
        self.assertEquals(response.json()['active_channel'], True)

    def test_get_info_channel_has_profile_pic_and_banner(self):
        # Setup channel with profile pic and banner
        channel = Channel.objects.get(tag='@cow')
        channel.profile_pic = SimpleUploadedFile(name='test-image.png',
                                                 content=open(Path(__file__).resolve().parent / 'test_photos/test-image.png', 'rb').read(),
                                                 content_type='image/png')
        channel.banner = SimpleUploadedFile(name='test-banner.png',
                                                 content=open(Path(__file__).resolve().parent / 'test_photos/test-banner.png', 'rb').read(),
                                                 content_type='image/png')
        channel.save()

        # Send request
        response = self.client.get(self.info_url)

        # Verify
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()['name'], 'Cow')
        self.assertEquals(response.json()['profile_pic'], '/media/profile-pic/test-image.png')
        self.assertEquals(response.json()['banner'], '/media/channel-banner/test-banner.png')
        self.assertEquals(response.json()['subscriptions'], [])
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], '@cow')
        self.assertEquals(response.json()['active_channel'], True)

        # Clean up
        fs = FileSystemStorage()
        fs.delete('profile-pic/test-image.png')
        fs.delete('channel-banner/test-banner.png')


class ChannelIndexTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')
        self.index_url = reverse('index')

    def test_get_all_channels(self):
        # Setup Channels
        channel = Channel(name='Cow', tag='@cow', active_channel=True, owner=self.user)
        channel.profile_pic = SimpleUploadedFile(name='test-image.png',
                                                 content=open(Path(__file__).resolve().parent / 'test_photos/test-image.png', 'rb').read(),
                                                 content_type='image/png')
        channel.save()

        channel = Channel(name='Pig', tag='@pig', active_channel=True, owner=self.user)
        channel.sub_count = 1
        channel.save()

        channel = Channel(name='Chicken', tag='@chicken', owner=self.user)
        channel.save()

        # Send Request
        response = self.client.get(self.index_url)

        # Verify
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()[0]['name'], 'Cow')
        self.assertEquals(response.json()[0]['profile_pic'], '/media/profile-pic/test-image.png')
        self.assertEquals(response.json()[0]['tag'], '@cow')
        self.assertEquals(response.json()[0]['sub_count'], 0)
        self.assertEquals(response.json()[1]['name'], 'Pig')
        self.assertEquals(response.json()[1]['profile_pic'], None)
        self.assertEquals(response.json()[1]['tag'], '@pig')
        self.assertEquals(response.json()[1]['sub_count'], 1)
        self.assertEquals(len(response.json()), 2)

        # Clean up
        fs = FileSystemStorage()
        fs.delete('profile-pic/test-image.png')


class AssociatedChannelsTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user_index_url = reverse('userindex')
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')

    def test_get_channels_tied_to_user(self):
        # Setup Channels
        channel = Channel(name='Cow', tag='@cow', active_channel=True, owner=self.user, sub_count=1)
        channel.profile_pic = SimpleUploadedFile(name='test-image.png',
                                                 content=open(Path(__file__).resolve().parent / 'test_photos/test-image.png', 'rb').read(),
                                                 content_type='image/png')
        channel.save()

        channel = Channel(name='Pig', tag='@pig', active_channel=False, owner=self.user)
        channel.save()

        # Send Request
        response = self.client.get(self.user_index_url)

        # Verify
        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.json()[0]['name'], 'Cow')
        self.assertEquals(response.json()[0]['profile_pic'], '/media/profile-pic/test-image.png')
        self.assertEquals(response.json()[0]['tag'], '@cow')
        self.assertEquals(response.json()[0]['sub_count'], 1)
        self.assertEquals(response.json()[0]['active_channel'], True)
        self.assertEquals(response.json()[1]['name'], 'Pig')
        self.assertEquals(response.json()[1]['profile_pic'], None)
        self.assertEquals(response.json()[1]['tag'], '@pig')
        self.assertEquals(response.json()[1]['sub_count'], 0)
        self.assertEquals(response.json()[1]['active_channel'], False)

        # Clean up
        fs = FileSystemStorage()
        fs.delete('profile-pic/test-image.png')


class LoggedChannelTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.url = reverse('logged')
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')

    def test_get_default_logged_channel_without_cookie(self):
        channel = Channel(name='Cow', tag='@cow', active_channel=True, owner=self.user)
        channel.save()

        response = self.client.get(self.url)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.client.cookies.get('channel').value,
                          str(Channel.objects.get(name='Cow').uid))
        self.assertEquals(response.json()['name'], 'Cow')
        self.assertEquals(response.json()['profile_pic'], None)
        self.assertEquals(response.json()['banner'], None)
        self.assertEquals(response.json()['subscriptions'], [])
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], '@cow')
        self.assertEquals(response.json()['active_channel'], True)

    def test_get_default_logged_channel_with_cookie(self):
        channel = Channel(name='Cow', tag='@cow', active_channel=True, owner=self.user)
        channel.save()
        uid = str(Channel.objects.get(name='Cow').uid)
        self.client.cookies['channel'] = uid

        response = self.client.get(self.url)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.client.cookies.get('channel').value, uid)
        self.assertEquals(response.json()['name'], 'Cow')
        self.assertEquals(response.json()['profile_pic'], None)
        self.assertEquals(response.json()['banner'], None)
        self.assertEquals(response.json()['subscriptions'], [])
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], '@cow')
        self.assertEquals(response.json()['active_channel'], True)

    def test_get_specified_channel(self):
        channel = Channel(name='Cow', tag='@cow', active_channel=True, owner=self.user)
        channel.save()

        response = self.client.get(reverse('logged_tag', kwargs={'tag': '@cow'}))

        self.assertEquals(response.status_code, 200)
        self.assertEquals(response.client.cookies.get('channel').value,
                          str(Channel.objects.get(name='Cow').uid))
        self.assertEquals(response.json()['name'], 'Cow')
        self.assertEquals(response.json()['profile_pic'], None)
        self.assertEquals(response.json()['banner'], None)
        self.assertEquals(response.json()['subscriptions'], [])
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], '@cow')
        self.assertEquals(response.json()['active_channel'], True)

    def test_get_specified_channel_with_bad_tag(self):
        response = self.client.get(reverse('logged_tag', kwargs={'tag': '@123'}))
        self.assertEquals(response.status_code, 400)


class ChannelSubscriptionDataTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')

        channel = Channel(name='Cow', tag='@cow', active_channel=True, owner=self.user)
        channel.save()

        uid = str(Channel.objects.get(name='Cow').uid)
        self.client.cookies['channel'] = uid

        self.channel = Channel.objects.get(tag='@cow')
        self.url = reverse('update_sub_list')

    def test_get_channel_with_no_subs(self):
        response = self.client.get(self.url)

        self.assertEquals(response.status_code, 200)
        self.assertFalse(response.json())

    def test_get_channel_with_subs(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        self.channel.subscriptions.add(sub_to_channel)

        response = self.client.get(self.url)

        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 1)
        self.assertEquals(response.json()[0]['name'], "sub_to")
        self.assertEquals(response.json()[0]['profile_pic'], None)
        self.assertEquals(response.json()[0]['tag'], "@sub_to")
        self.assertEquals(response.json()[0]['sub_count'], 0)
        self.assertEquals(response.json()[0]['active_channel'], True)


class SubscriptionViewTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')

        channel = Channel(name='Cow', tag='@cow', active_channel=True, owner=self.user)
        channel.save()

        uid = str(Channel.objects.get(name='Cow').uid)
        self.client.cookies['channel'] = uid

        self.channel = Channel.objects.get(tag='@cow')

        self.second_user = UserModel.objects.create_user(email='pig@gmail.com', password='12345')

    def test_patch_sub_success(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.second_user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(response.status_code, 204)
        self.assertTrue(self.channel.subscriptions.get(tag='@sub_to'))
        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 1)

    def test_patch_unsub_success(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.second_user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 1)

        response = self.client.patch(url)

        self.assertEquals(response.status_code, 204)
        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 0)

    def test_patch_sub_to_channel_twice(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.second_user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        self.client.patch(url, {
            'sub': True
        })

        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(response.status_code, 400)
        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 1)

    def test_patch_unsub_from_channel_not_subbed_to(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.second_user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        response = self.client.patch(url)

        self.assertEquals(response.status_code, 400)
        self.assertEquals(Channel.objects.get(tag='@sub_to').sub_count, 0)

    def test_patch_sub_to_channel_is_logged_channel(self):
        url = reverse('sub_to', kwargs={'tag': self.channel.tag})
        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(response.status_code, 400)
        self.assertRaises(Channel.DoesNotExist, self.channel.subscriptions.get, tag='@cow')
        self.assertEquals(self.channel.sub_count, 0)

    def test_patch_sub_to_channel_associated_to_user(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()
        url = reverse('sub_to', kwargs={'tag': sub_to_channel.tag})
        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(response.status_code, 400)
        self.assertRaises(Channel.DoesNotExist, self.channel.subscriptions.get, tag='@cow')
        self.assertEquals(self.channel.sub_count, 0)
    
    def test_patch_send_tag_of_non_existent_channel(self):
        url = reverse('sub_to', kwargs={'tag': '@123'})
        response = self.client.patch(url, {
            'sub': True
        })

        self.assertEquals(response.status_code, 404)
        self.assertRaises(Channel.DoesNotExist, self.channel.subscriptions.get, tag='@123')

    def test_get_channel_is_subbed(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.second_user, active_channel=True)
        sub_to_channel.save()
        self.channel.subscriptions.add(sub_to_channel)

        url = reverse('is_subbed', kwargs={'tag': '@sub_to'})
        response = self.client.get(url)
        
        self.assertEquals(response.status_code, 200)
        self.assertTrue(response.json())

    def test_get_channel_is_not_subbed(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.second_user, active_channel=True)
        sub_to_channel.save()

        url = reverse('is_subbed', kwargs={'tag': '@sub_to'})
        response = self.client.get(url)
        
        self.assertEquals(response.status_code, 200)
        self.assertFalse(response.json())

    def test_get_no_channel_exists_with_tag(self):
        url = reverse('is_subbed', kwargs={'tag': '@sub_to'})
        response = self.client.get(url)
        
        self.assertEquals(response.status_code, 404)

    def test_get_subbed_to_channel_is_logged_channel(self):
        url = reverse('is_subbed', kwargs={'tag': '@cow'})
        response = self.client.get(url)
        
        self.assertEquals(response.status_code, 400)

    def test_get_channel_is_associated_to_user(self):
        sub_to_channel = Channel(name='sub_to', tag='@sub_to', owner=self.user, active_channel=True)
        sub_to_channel.save()

        url = reverse('is_subbed', kwargs={'tag': '@cow'})
        response = self.client.get(url)

        self.assertEquals(response.status_code, 400)


class ChannelImagesTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.upload_url = reverse('img_upload')
        self.user = UserModel.objects.create_user(email='cow@gmail.com', password='12345')
        self.client.login(username='cow@gmail.com', password='12345')
        self.imageUploaded = ""
        channel = Channel(name='Cow', tag='@cow', active_channel=True, owner=self.user)
        channel.save()

        uid = str(Channel.objects.get(name='Cow').uid)
        self.client.cookies['channel'] = uid

    def tearDown(self):
        fs = FileSystemStorage()
        if self.imageUploaded:
            fs.delete(self.imageUploaded)

    def upload_and_verify_image(self, file_name: str, field: str):
        img = open(Path(__file__).resolve().parent / f'test_photos/{file_name}', 'rb')
        response = self.client.patch(self.upload_url, {field: img})
        self.assertEqual(response.status_code, 200)
        ch = Channel.objects.get(name='Cow')
        if field == 'profile_pic':
            self.imageUploaded = str(ch.profile_pic)
            self.assertEqual(self.imageUploaded, f"profile-pic/{file_name}")
        else:
            self.imageUploaded = str(ch.banner)
            self.assertEqual(self.imageUploaded, f"channel-banner/{file_name}")
        return response

    def verify_response_data(self, response, has_profile_pic: bool, has_banner: bool):
        self.assertEquals(response.json()['name'], 'Cow')
        self.assertEquals(response.json()['profile_pic'], "/media/profile-pic/test-image.png" if has_profile_pic else None)
        self.assertEquals(response.json()['banner'], "/media/channel-banner/test-banner.png" if has_banner else None)
        self.assertEquals(response.json()['subscriptions'], [])
        self.assertEquals(response.json()['sub_count'], 0)
        self.assertEquals(response.json()['tag'], '@cow')
        self.assertEquals(response.json()['active_channel'], True)

    def test_upload_profile_pic(self):
        response = self.upload_and_verify_image('test-image.png', 'profile_pic')
        self.verify_response_data(response, True, False)

    def test_upload_banner(self):
        response = self.upload_and_verify_image('test-banner.png', 'banner')
        self.verify_response_data(response, False, True)

    def test_upload_profile_pic_when_one_already_exists(self):
        img = open(Path(__file__).resolve().parent / 'test_photos/test-banner.png', 'rb')
        self.client.patch(self.upload_url, {'profile_pic': img})

        response = self.upload_and_verify_image('test-image.png', 'profile_pic')
        self.verify_response_data(response, True, False)
        self.assertFalse(os.path.exists(media_root + "test-banner.png"))

    def test_upload_banner_when_one_already_exists(self):
        img = open(Path(__file__).resolve().parent / 'test_photos/test-image.png', 'rb')
        self.client.patch(self.upload_url, {'banner': img})

        response = self.upload_and_verify_image('test-banner.png', 'banner')
        self.verify_response_data(response, False, True)
        self.assertFalse(os.path.exists(media_root + "test-image.png"))

    def test_send_invalid_data(self):
        response = self.client.patch(self.upload_url, {'profile_pic': "Apple"})
        self.assertEqual(response.status_code, 400)
