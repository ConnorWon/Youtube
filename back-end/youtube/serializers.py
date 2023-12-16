from rest_framework import serializers
from .models import Channel

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        exclude = ['owner', 'subscriptions', 'sub_count', 'banner']
    
    def create(self, clean_data):
        clean_data['owner'] = self.context['request'].user
        channel = Channel.objects.create(**clean_data)
        return channel
    
    # def update(self, instance, clean_data):
    #     instance.name = clean_data.get('name', instance.name)
    #     instance.profile_pic = clean_data.get('profile_pic', instance.profile_pic)
    #     instance.banner = clean_data.get('banner', instance.banner)
    #     instance.tag = clean_data.get('tag', instance.tag)
    #     instance.active_channel = clean_data.get('active_channel', instance.active_channel)
    #     instance.save()
    #     return instance


class ChannelInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        exclude = ['uid', 'owner', 'active_channel']

    def newSub(self, instance, inc_val):
        self.update(instance, {'sub_count': instance.sub_count + inc_val})