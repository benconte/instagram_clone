from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Media(models.Model):
    image = models.ImageField(upload_to="postImages", null=True)

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    post = models.CharField(max_length=1000)
    imageUrl = models.ImageField(upload_to="postImages", blank=True, null=True)
    date_posted = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(User, blank=True, related_name="postLikes")
    favorite = models.ManyToManyField(User, blank=True, related_name="postFavorite")
    is_comments_allowed = models.BooleanField(default=True, help_text="By default posts should have comments")

    def __str__(self):
        return f"Post -> user({self.id}, {self.user.username}, {self.date_posted}, 'Comments': {self.is_comments_allowed})"
    
    def total_likes(self):
        return self.likes.count()
    
    
class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    comment = models.CharField(max_length=2000)
    date_posted = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(User, blank=True, related_name="commentLikes")

    def __str__(self):
        return f"Comment -> User({self.user.username}, ,{self.date_posted} -> Post({self.post.id}))"

    def total_comments_likes(self):
        return self.likes.count()

# videoUrl = models.ManyToManyField(Media, blank=False)

class Story(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False, null=False)
    storyMedia = models.ManyToManyField(Media, blank=False)

    def __str__(self):
        return f"Story -> User({self.user.username})"
