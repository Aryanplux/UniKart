from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from .models import Wallet

def home(request):
    return render(request, "pages/home.html")

def onboarding(request):
    return render(request, "pages/onboarding.html")

def signup_view(request):
    # Handles POST (signup) and GET (/signup/ -> show signup form)
    if request.method == "POST":
        username = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")
        confirm  = request.POST.get("confirm_password", "")

        if not username or not password:
            return render(request, "pages/login.html", {"error": "All fields are required.", "signup_mode": True})

        if password != confirm:
            return render(request, "pages/login.html", {"error": "Passwords do not match.", "signup_mode": True})

        try:
            user = User.objects.create_user(username=username, password=password)
            Wallet.objects.create(user=user)
            messages.success(request, "Account created successfully. Please log in.")
            return redirect("login")  # go to login form (login page)
        except IntegrityError:
            return render(request, "pages/login.html", {"error": "Username already taken.", "signup_mode": True})

    # GET request -> show the login page but with signup form visible
    return render(request, "pages/login.html", {"signup_mode": True})

def login_view(request):
    if request.method == "POST":
        if 'signup' in request.POST:  # If user clicked signup form
            username = request.POST.get("username")
            email = request.POST.get("email")
            password = request.POST.get("password")

            if User.objects.filter(username=username).exists():
                messages.error(request, "Username already taken")
            else:
                user = User.objects.create_user(username=username, email=email, password=password)
                user.save()
                messages.success(request, "Account created successfully! Please login.")
                return redirect("login")

        elif 'login' in request.POST:  # If user clicked login form
            username = request.POST.get("username")
            password = request.POST.get("password")
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect("home")  # redirect after login
            else:
                messages.error(request, "Invalid username or password")

    return render(request, "pages/login.html")  # your HTML



@login_required
def wallet_view(request):
    wallet, _ = Wallet.objects.get_or_create(user=request.user)
    return render(request, "pages/wallet.html", {"wallet": wallet})

def logout_view(request):
    logout(request)
    return redirect("login")
