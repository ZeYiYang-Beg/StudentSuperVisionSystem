"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from apps.Student import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # 获取所有学生的JSON信息
    path('students/', views.get_students), 
    # 查询学生信息
    path('students/query/', views.query_students),
    # 校验学号是否存在
    path("students/sno/check/", views.is_exists_sno),
]
