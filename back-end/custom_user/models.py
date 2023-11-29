import uuid
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(email, password)
        user.is_admin = True
        user.is_superuser = True
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    uid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"

    def __str__(self):
        return self.email
       
    @property
    def is_staff(self):
        return self.is_admin
    
    # def save(self, *args, **kwargs):
    #     try:
    #         super(Account, self).save(*args, **kwargs)
    #     except IntegrityError as e:
    #         msg = str(e).split('DETAIL:  ')[1]
    #         if "email" in msg:
    #             raise Exception('Email already exists')
    #         else:
    #             raise Exception('Tag already exists')
            
# Channel
    # profile_pic = models.ImageField(upload_to="avatars/")
    # subscriptions = models.ManyToManyField('Channel', null=True)
    # personal_channel = models.ForeignKey('Channel', on_delete=models.CASCADE)]