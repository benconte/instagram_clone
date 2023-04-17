from django.shortcuts import render, get_object_or_404, HttpResponse, redirect
from rest_framework.views import APIView
from rest_framework import generics, status, permissions, viewsets
from .models import (
    Media, Post, Comments, Story
)
from .serializers import CommentCreateSerializer, PostSerializers, StorySerializers, PostCreateSerializer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser
from django.http import JsonResponse
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
import json
from django.contrib.auth.models import User
import random

# Create your views here.
class Post_Serializers(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializers

def getSuggestionUsers(request):
    # we need to exclude the current user to avoid suggesting ourselves
    current_user = request.user
    users_to_exclude = [current_user.id, User.objects.get(id=13).id] # users to exclude
    all_users = User.objects.all().exclude(id__in=users_to_exclude) # if the id is in the exclude array

    # randomly selecting users for suggestion.
    # we use random.sample because it is generally fast for small data sets
    random_users = random.sample(list(all_users), min(5, len(all_users)))
    random_user = [user for user in random_users]

    usrs = []
    for user in random_user:
        user_img = json.dumps(str(user.profile.image))
        imageUrl = user_img.replace('"', "")

        # checking if the authenticated user has followed this suggested user
        isFollowed = user.profile.followers.filter(id=request.user.id).exists()

        usrs.append({
            "user_id": user.id,
            "username": user.username,
            "profile": "/media/" + imageUrl,
            "isFollowed": isFollowed,
        })
    return JsonResponse(usrs, status=status.HTTP_200_OK, safe=False)

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

        comments_length = 0
        if post.is_comments_allowed:
            comments_length = Comments.objects.filter(post=post).all().count()

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
            "total_comments": comments_length,
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

# create comment for post
@login_required
def createPostComment(request, pk):
    if request.method == "POST":
        post = Post.objects.filter(pk=request.POST['post_id']).first()
        if post:
            comment = Comments.objects.create(user=request.user, post=post, comment=request.POST['comment'])
            comment.save()

            comUser = json.dumps(str(request.user.profile.image))
            comUserprofile = comUser.replace('"', "")
            comm = Comments.objects.filter(user=request.user).last()
            return JsonResponse({
                "userId": request.user.id,
                "com_id": comm.id,
                "username": request.user.username,
                "userProfile": "/media/"+comUserprofile,
                "comment": comm.comment,
                "is_comm_liked": False,
                "date_commented": comm.date_posted.strftime("%b %d %Y"),
                "total_comments_likes": 0,
            }, status=200)

        return HttpResponse(status=404)

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
def getPostUser(request, id):  # get user who posted the post
    user = get_object_or_404(User, pk=id)

    userData = {
        "id": user.id,
        "username": user.username
    }


@login_required
def getprofile(request, username):
    user = User.objects.filter(username=username).first()

    if user:
        profile = json.dumps(str(user.profile.image))
        userProfile = profile.replace('"', "")

        userPosts = Post.objects.filter(user=user).all()
        posts = []
        for pst in userPosts:
            postImg = json.dumps(str(pst.imageUrl))
            image = postImg.replace('"', "")

            is_liked = False
            is_favorite = False

            if pst.likes.filter(id=request.user.id):
                is_liked = True
            else:
                is_liked = False

            if pst.favorite.filter(id=request.user.id):
                is_favorite = True
            else:
                is_favorite = False

            comments_length = 0
            if pst.is_comments_allowed:
                comments_length = Comments.objects.filter(post=pst).all().count()

            posts.append({
                'post_id': pst.id,
                'post': pst.post,
                'imageUrl': "/media/"+image,
                "videoUrl": None,
                "is_liked": is_liked,
                "is_favorite": is_favorite,
                "total_likes": pst.total_likes(),
                "total_comments": comments_length,
                "date_posted": pst.date_posted.strftime("%b %d %Y"),
                "is_comments_allowed": pst.is_comments_allowed,
            })
        return JsonResponse({
            "userId": user.id,
            "username": user.username,
            "email": user.email,
            "firstName": user.first_name,
            "lastName": user.last_name,
            "profile": "/media/"+userProfile,
            "fullname": user.get_full_name(),
            "isUserPostSavedAllowed": True if request.user == user else False,
            "total_followers": user.profile.total_followers(),
            "total_following": user.profile.total_following(),
            "posts": posts
        }, status=status.HTTP_200_OK, safe=False)

    return JsonResponse({"error": "User not found"}, status=status.HTTP_401_UNAUTHORIZED, safe=False)


@login_required
def getprofileSaved(request):
    user = User.objects.filter(username=request.user.username).first()
    # only get the saved posts if the authenticated user sent the request
    if request.user == user:
        userPosts = Post.objects.filter(favorite=request.user).all()# get only post which user has favorite

        posts = []
        for pst in userPosts:
            postImg = json.dumps(str(pst.imageUrl))
            image = postImg.replace('"', "")

            is_liked = False
            is_favorite = False

            if pst.likes.filter(id=request.user.id):
                is_liked = True
            else:
                is_liked = False

            if pst.favorite.filter(id=request.user.id):
                is_favorite = True
            else:
                is_favorite = False

            comments_length = 0
            if pst.is_comments_allowed:
                comments_length = Comments.objects.filter(post=pst).all().count()

            posts.append({
                'post_id': pst.id,
                'post': pst.post,
                'imageUrl': "/media/"+image,
                "videoUrl": None,
                "is_liked": is_liked,
                "is_favorite": is_favorite,
                "total_likes": pst.total_likes(),
                "total_comments": comments_length,
                "date_posted": pst.date_posted.strftime("%b %d %Y"),
                "is_comments_allowed": pst.is_comments_allowed,
            })
        return JsonResponse(posts, status=status.HTTP_200_OK, safe=False)
    return JsonResponse({"Error": "You are not allowed to perform this request"}, status=status.HTTP_401_UNAUTHORIZED, safe=False)


# handling following and unfollowing
@login_required
def userFollowing(request, id):
    # following a user
    user = User.objects.get(id=id)

    if request.user.profile.following.filter(id=id).exists():
        # if user already follows the passed in user, then unfollow

        request.user.profile.following.remove(user)
        user.profile.followers.remove(request.user)

        return JsonResponse({
            "isFollowing": False,
            "message": "User unfollowed",
            "total_following": request.user.profile.total_following(),
        }, status=status.HTTP_200_OK, safe=False)

    else:
        # else add a follow
        
        request.user.profile.following.add(user)
        user.profile.followers.add(request.user)

        return JsonResponse({
            "isFollowing": True,
            "message": "User followed",
            "total_following": request.user.profile.total_following(),
        }, status=status.HTTP_200_OK, safe=False)


@login_required
def postLike(request, id):
    post = get_object_or_404(Post, id=id)

    if post.likes.filter(id=request.user.id).exists():
        post.likes.remove(request.user)
        return JsonResponse({
            "isLiked": False,
            "message": "Like removed",
            "total_likes": post.total_likes(),
        }, status=status.HTTP_200_OK, safe=False)
    else:
        post.likes.add(request.user)
        return JsonResponse({
            "isLiked": True,
            "message": "Like Added",
            "total_likes": post.total_likes(),
        }, status=status.HTTP_200_OK, safe=False)


@login_required
def postFavorite(request, id):
    post = get_object_or_404(Post, id=id)

    if post.favorite.filter(id=request.user.id).exists():
        post.favorite.remove(request.user)
        return JsonResponse({
            "isFavorite": False,
            "message": "Post unsaved",
        }, status=status.HTTP_200_OK, safe=False)
    else:
        post.favorite.add(request.user)
        return JsonResponse({
            "isFavorite": True,
            "message": "Post saved",
        }, status=status.HTTP_200_OK, safe=False)


# get a post
@login_required
def getPost(request, id):
    post = get_object_or_404(Post, id=id)

    if post:
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
        
        comms = []
        if post.is_comments_allowed:
            comments = Comments.objects.filter(post=post).all()

            for comm in comments:
                comUser = json.dumps(str(comm.user.profile.image))
                comUserprofile = comUser.replace('"', "")

                is_comm_liked = False

                if comm.likes.filter(id=request.user.id):
                    is_comm_liked = True
                else:
                    is_comm_liked = False

                comms.append({
                    "userId": comm.user.id,
                    "com_id": comm.id,
                    "username": comm.user.username,
                    "userProfile": "/media/"+comUserprofile,
                    "comment": comm.comment,
                    "is_comm_liked": is_comm_liked,
                    "date_commented": comm.date_posted.strftime("%b %d %Y"),
                    "total_comments_likes": comm.total_comments_likes(),
                })

        postsData = {
            'post_id': post.id,
            'post': post.post,
            'imageUrl': "/media/"+imageUrl,
            "videoUrl": None,
            "is_liked": is_liked,
            "is_favorite": is_favorite,
            "total_likes": post.total_likes(),
            "date_posted": post.date_posted.strftime("%b %d %Y"),
            "is_comments_allowed": post.is_comments_allowed,
            "comments": comms if post.is_comments_allowed else [],
            "user": {
                "id": post.user.id,
                "username": post.user.username,
                "profile": "/media/"+userProfile
            },
        }
        return JsonResponse(postsData, status=status.HTTP_200_OK, safe=False)
    
    return JsonResponse({"Error": "Post not found"}, status=status.HTTP_401_UNAUTHORIZED, safe=False)


@login_required
def postCommentLike(request, id):
    comm = get_object_or_404(Comments, id=id)

    if comm.likes.filter(id=request.user.id).exists():
        comm.likes.remove(request.user)
        return JsonResponse({
            "is_comm_liked": False,
            "message": "Like removed",
            "total_likes": comm.total_comments_likes(),
        }, status=status.HTTP_200_OK, safe=False)
    else:
        comm.likes.add(request.user)
        return JsonResponse({
            "is_comm_liked": True,
            "message": "Like Added",
            "total_likes": comm.total_comments_likes(),
        }, status=status.HTTP_200_OK, safe=False)


@login_required
def updateAccount(request):
    if request.method == "POST":
        print(request.POST)
        return redirect("/"+request.user.username)
    
    return redirect("/"+request.user.username)


# searching for a suer
def search(request, username):
    match = User.objects.filter(username__icontains=username)

    users = []
    for usr in match:
        user_profile = json.dumps(str(usr.profile.image))
        profile = user_profile.replace('"', "")

        users.append({
            "id": usr.id,
            "username": usr.username,
            "profile": "/media/" + profile
        })

    return JsonResponse(users, status=status.HTTP_200_OK, safe=False)


# deleting a post
def deletePost(request, id):
    try:
        post = Post.objects.get(id=id)
        post.delete()

        return JsonResponse({"message": "Post deleted successfully", "success": True}, status=status.HTTP_200_OK, safe=False)
    except:
        print("[EXCEPTION] : something went wrong when deleting post. (Post not found)")
        return JsonResponse({"message": "Unable to delete post. Try again later", "success": False}, status=status.HTTP_400_BAD_REQUEST, safe=False)


