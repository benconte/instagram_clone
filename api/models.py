from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Media(models.Model):
    image = models.ImageField(upload_to="postImages", null=True)
    video = models.FileField(upload_to="postVideos", null=True)

class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=True)
    comment = models.CharField(max_length=2000)
    date_posted = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(User, blank=True, related_name="commentLikes")

    def __str__(self):
        return f"Comment -> User({self.user.username}, {self.date_posted})"

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    post = models.CharField(max_length=1000)
    postMedia = models.ManyToManyField(Media, blank=False)
    date_posted = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(User, blank=True, related_name="postLikes")
    favorite = models.ManyToManyField(User, blank=True, related_name="postFavorite")
    comments = models.ManyToManyField(Comments, blank=True)

    def __str__(self):
        return f"Post -> user({self.user.username}, {self.date_posted})"


class Story(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    storyMedia = models.ManyToManyField(Media, blank=False)

    def __str__(self):
        return f"Story -> User({self.user.username})"
