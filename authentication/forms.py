from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Profile

class RegisterForm(UserCreationForm):
    # removing labels on the form
    def __init__(self, *args, **kwargs):
        super(RegisterForm, self).__init__(*args, **kwargs)
        self.fields['email'].label = ""
        self.fields['first_name'].label = ""
        self.fields['last_name'].label = ""
        self.fields['username'].label = ""
        self.fields['username'].small = ""
        self.fields['password1'].label = ""
        self.fields['password2'].label = ""

    email = forms.CharField(widget=forms.EmailInput(attrs={'placeholder':"Email or Mobile phone"}))
    password1 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder':"Password"}))
    password2 = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder':"Confirm Password"}))
    username = forms.CharField(widget=forms.TextInput(attrs={'placeholder':"Username"}))
    first_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder':"First Name"}))
    last_name = forms.CharField(widget=forms.TextInput(attrs={'placeholder':"Last Name"}))

    class Meta:
        model = User
        fields = ["email", "first_name", "last_name", "username", "password1", "password2"]

class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name','email']


class UserUpdateFormWithPassword(forms.ModelForm):
    email = forms.EmailField()
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name','email', 'password']

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['image']