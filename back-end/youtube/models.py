import uuid
from django.db import models
from django.conf import settings

class Channel(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=60)
    profile_pic = models.ImageField(upload_to='profile-pic/', null=True)
    banner = models.ImageField(upload_to='channel-banner/', null=True)
    subscriptions = models.ManyToManyField('self', symmetrical=False, blank=True)
    sub_count = models.IntegerField(default=0)
    tag = models.CharField(unique=True, null=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='channel')
    active_channel = models.BooleanField(default=False)
    # Add a channel verified field

    def __str__(self):
          return self.name
    
    def save(self, *args, **kwargs):
        if not self.tag:
            uid = uuid.uuid4()
            self.uid = uid
            self.tag = '@' + str(uid)
        super(Channel, self).save(*args, **kwargs)




# Channel
    # profile_pic = models.ImageField(upload_to="avatars/")
    # subscriptions = models.ManyToManyField('Channel', null=True)
    # personal_channel = models.ForeignKey('Channel', on_delete=models.CASCADE)]

# Create your models here.
