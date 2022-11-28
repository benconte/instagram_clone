from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Post)
admin.site.register(Comments)
admin.site.register(Story)
admin.site.register(Media)