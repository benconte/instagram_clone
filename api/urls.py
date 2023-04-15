from django.urls import path, include
from .views import (
    Post_Serializers, PostCreateSerializer, auth_status, UserSerializer, posts, getprofile, postLike, 
    postFavorite, getprofileSaved, getPost, createPostComment, postCommentLike, getSuggestionUsers,
    userFollowing, updateAccount, search
)
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'model', PostCreateSerializer)

urlpatterns = [
    path("posts_Serializers", Post_Serializers.as_view()),
    path("posts", posts),
    path("updateAccount", updateAccount),
    path("user/<int:id>", UserSerializer.as_view()),
    path("createPostComment/<int:pk>", createPostComment),
    path("", include(router.urls)),
    path("user/auth", auth_status),
    path("user/getprofile/<str:username>", getprofile),
    path("users/search/<str:username>", search),
    path("user/getprofileSaved", getprofileSaved),
    path("post/like/<int:id>", postLike),
    path("post/favorite/<int:id>", postFavorite),
    path("getPost/<int:id>", getPost),
    path("post/comment/like/<int:id>", postCommentLike),
    path("getSuggestionUsers", getSuggestionUsers),
    path("userFollowing/<int:id>", userFollowing),
]

