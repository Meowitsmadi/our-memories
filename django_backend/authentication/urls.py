from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
     path('login/', views.LoginView.as_view(), name ='login'),
     path('api/token/', TokenObtainPairView.as_view(), name ='token_obtain_pair'),
     path('api/token/refresh/', TokenRefreshView.as_view(), name ='token_refresh'),
     path('logout/', views.LogoutView.as_view(), name='logout'),
     path('signup/', views.SignupView.as_view(), name='signup'),
]