from django.shortcuts import render, redirect
from .models import Profile
from django.contrib import messages

# Create your views here.
def register(request):




    return render(request, 'authenticate/register.html')