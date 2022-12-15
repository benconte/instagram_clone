from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework import generics, status, permissions, viewsets
from .models import (
    Media, Post, Comments, Story
)
from .serializers import PostSerializers, StorySerializers, PostCreateSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
import json
from django.contrib.auth.models import User


# Create your views here.
class Post_Serializers(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers


@login_required
def posts(request):
    posts = Post.objects.all().order_by('-date_posted')
    postsData = []
    for post in posts:
        post_img = json.dumps(str(post.imageUrl))
        imageUrl = post_img.replace('"', "")
        post_user_profile = json.dumps(str(post.user.profile.image))
        userProfile = post_user_profile.replace('"', "")

        is_liked = False
        is_favorite = False

        if post.likes.filter(id=request.user.id):
            is_liked = True
        else:
            is_liked = False

        if post.favorite.filter(id=request.user.id):
            is_favorite = True
        else:
            is_favorite = False

        postsData.append({
            'post_id': post.id,
            'post': post.post,
            'imageUrl': "/media/"+imageUrl,
            "videoUrl": None,
            "is_liked": is_liked,
            "is_favorite": is_favorite,
            "total_likes": post.total_likes(),
            "date_posted": post.date_posted.strftime("%b %d %Y"),
            "is_comments_allowed": post.is_comments_allowed,
            "user": {
                "id": post.user.id,
                "username": post.user.username,
                "profile": "/media/"+userProfile
            },
        })
    return JsonResponse(postsData, status=status.HTTP_200_OK, safe=False)

# get info about a specific user
class UserSerializer(generics.ListAPIView):
    def get(self, request, id):
        queryset = get_object_or_404(User, id=id)

        if queryset:
            user_image = json.dumps(str(queryset.profile.image))
            profile = user_image.replace('"', "")
            return Response({
                "id": queryset.id, 
                "username": queryset.username, 
                "profile": "/media/"+profile, 
                "fullname": queryset.get_full_name()})
        return Response({"User": "Not FOund"}, status=status.HTTP_401_UNAUTHORIZED)


class PostCreateSerializer(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostCreateSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


# get authenticated user
@login_required
def auth_status(request):
    if(request.user.is_authenticated):
        usr_img = json.dumps(str(request.user.profile.image))
        profile = usr_img.replace('"', "")
        return JsonResponse({
            "id": request.user.id,
            "username": request.user.username,
            "profile": "/media/"+profile, 
            "fullname": request.user.get_full_name()
        }, status=status.HTTP_200_OK, safe=False)
    return JsonResponse({'error': "Please Authenticate before continuing"}, status=status.HTTP_401_UNAUTHORIZED, safe=False)


@login_required
def getPostUser(request, id):
    user = get_object_or_404(User, pk=id)

    userData = {
        "id": user.id,
        "username": user.username
    }
