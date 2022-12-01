from django.shortcuts import render, redirect
from .models import Profile
from django.contrib import messages
from .forms import RegisterForm
from django.contrib.auth.models import User
from .models import Profile

# Create your views here.
def register(request):
    if request.user.is_authenticated:
        return redirect("/")

    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been created! You are now able to log in')
            return redirect('login')
    else:
        form = RegisterForm()
    return render(request, 'authentication/register.html', {'form': form})