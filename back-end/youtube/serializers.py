from rest_framework import serializers
from .models import Channel


class ChannelCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        exclude = ['owner', 'subscriptions', 'sub_count']
    
    def create(self, clean_data):
        clean_data['owner'] = self.context['request'].user
        channel = Channel.objects.create(**clean_data)
        return channel


class ChannelInfoCondensedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['name', 'profile_pic', 'sub_count', 'tag', 'active_channel']


class ChannelInfoSerializer(serializers.ModelSerializer):
    subscriptions = ChannelInfoCondensedSerializer(many=True, read_only=True)

    class Meta:
        model = Channel
        fields = ['name', 'profile_pic', 'banner', 'subscriptions', 'sub_count', 'tag', 'active_channel']


class SubscriptionsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['sub_count']

    def new_sub(self, instance, inc_val):
        self.update(instance, {'sub_count': instance.sub_count + inc_val})


class ChannelImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ['profile_pic', 'banner']
