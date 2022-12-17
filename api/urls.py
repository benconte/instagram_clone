from django.urls import path, include
from .views import (
    Post_Serializers, PostCreateSerializer, auth_status, UserSerializer, posts, getprofilePost, postLike, 
    postFavorite, getprofileSaved
)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'model', PostCreateSerializer)

urlpatterns = [
    path("posts_Serializers", Post_Serializers.as_view()),
    path("posts", posts),
    path("user/<int:id>", UserSerializer.as_view()),
    path("", include(router.urls)),
    path("user/auth", auth_status),
    path("user/getprofilePost", getprofilePost),
    path("user/getprofileSaved", getprofileSaved),
    path("post/like/<int:id>", postLike),
    path("post/favorite/<int:id>", postFavorite),
]