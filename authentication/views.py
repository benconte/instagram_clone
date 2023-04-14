from django.shortcuts import render, redirect
from .models import Profile
from django.contrib import messages
from .forms import RegisterForm
from django.contrib.auth.models import User
from .models import Profile
from django.contrib.auth.decorators import login_required
from .forms import UserUpdateForm, ProfileUpdateForm, UserUpdateFormWithPassword
from django.contrib.auth.hashers import make_password, check_password

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


@login_required
def profile(request):
    if request.method == 'POST':
        # check if user wants to update password
        if request.POST.__contains__("password1"):
            if request.POST["password2"] == request.POST["password"]:
                user = request.user
                if user.check_password(request.POST["password1"]): # check if the password is correct
                    print("match")
                    username = request.POST["username"]
                    first_name = request.POST["first_name"]
                    last_name = request.POST["last_name"]
                    email = request.POST["email"]
                    encryptedPassword = make_password(request.POST['password']) # encrypt a new password
                    print(encryptedPassword)

                    user = User.objects.get(id=request.user.id)           
                    user.username = username
                    user.first_name = first_name
                    user.last_name = last_name
                    user.email = email
                    user.password = encryptedPassword
                    
                    p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
                    if p_form.is_valid():
                        user.save()
                        p_form.save()
                        messages.success(request, f'Profile updated successfully')
                    
            else:
                print("Invalid password")
                messages.error(request, "Password in valid.")

        else:
            # if no password change
            u_form = UserUpdateForm(request.POST, instance=request.user)
            p_form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)

            if u_form.is_valid() and p_form.is_valid():
                u_form.save()
                p_form.save()
                messages.success(request, f'Profile updated successfully')
            else:
                print("Form not valid")
                print(u_form)
                print(p_form)
                messages.error(request, f'Please make sure your data is valid')


        return redirect('/'+request.user.username)
    
    return redirect("/" + request.user.username)