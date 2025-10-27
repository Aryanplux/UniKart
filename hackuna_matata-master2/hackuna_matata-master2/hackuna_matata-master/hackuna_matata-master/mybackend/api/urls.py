from django.urls import path
from . import views

urlpatterns = [
    path("", views.login_view, name="login"),   # root = login page
    path("signup/", views.signup_view, name="signup"),  # <-- ADD THIS
    path("home/", views.home, name="home"),
    path("onboarding/", views.onboarding, name="onboarding"),
    path("wallet/", views.wallet_view, name="wallet"),
    path("logout/", views.logout_view, name="logout"),
]
