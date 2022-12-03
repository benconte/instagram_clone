from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status, permissions, viewsets
from .models import (
    Media, Post, Comments, Story
)
from .serializers import PostSerializers, StorySerializers, PostCreateSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
import json

# Create your views here.
class Post_Serializers(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers


class PostCreateSerializer(viewsets.ModelViewSet):
    queryset =  Post.objects.all()
    serializer_class =  PostCreateSerializer
    parser_classes = ( MultiPartParser, FormParser )
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
    ]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@login_required
def auth_status(request):
    if(request.user.is_authenticated):
        usr_img = json.dumps(str(request.user.profile.image))
        profile = usr_img.replace('"', "")
        return JsonResponse({
            "id": request.user.id,
            "username": request.user.username,
            "profile": profile
        }, status=status.HTTP_200_OK, safe=False)
    return JsonResponse({'error': "Please Authenticate before continuing"}, status=status.HTTP_401_UNAUTHORIZED, safe=False)
    