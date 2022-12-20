from .models import (
    Post, Story, Comments
)
from rest_framework import serializers

class PostSerializers(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class StorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = "__all__"

class PostCreateSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username") # this is the user passed to the serializer save class in views
    user_id = serializers.ReadOnlyField(source="user.id")
    imageUrl = serializers.ImageField(required=False)

    class Meta:
        model = Post
        fields = ['id', 'user', 'user_id', 'post', 'imageUrl', "is_comments_allowed"]
    
class CommentCreateSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    user_id = serializers.ReadOnlyField(source="user.id")
    post_id = serializers.ReadOnlyField(source="post.id")

    class Meta:
        model = Comments
        fields = ['id', "user", "user_id", "post_id", "comment"]