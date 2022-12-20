from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

# Create your views here.
@login_required
def home(request):
    return render(request, 'frontend/index.html')

@login_required
def post(request, id):
    return render(request, 'frontend/index.html')

@login_required
def profile(request, username):
    user = User.objects.filter(username=username).exists()
    if user:
        return render(request, 'frontend/index.html')
    
    return render(request, "frontend/page-not-found.html")
