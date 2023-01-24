from django.db import models

#video class
# - video field (lookup how)
# - title, views, like/dislike, date posted
# - channel (foreign key)
# - comments forum (many to many, USER, through='comment')
# - thumbnail (img)

#comment class
# - owner (foreign key)
# - forum (foreign key)
# - date created/edited (DateTimeField)
# - edited (boolean)

#channel
# - owner (foreign key)
# - subs (many to many, user)
# - banner (img)

#user extend AbstractUser (the default user model for Django)
# - subs list (many to many, channel)
# - profile pic (img)
# - tag