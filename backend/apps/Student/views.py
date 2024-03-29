from django.shortcuts import render
from django.http import JsonResponse
# 引入Student类
from Student.models import Student
# 导入JSON模块
import json
# 导入Q查询
from django.db.models import Q
# 导入
from django.core import serializers

# Create your views here.

# 获取所有学生的信息
def get_students(request):
    try:
        students_obj = Student.objects.all().values()
        student = list(students_obj)
        return JsonResponse({"code": 1, "data": student})
    except Exception as e:
        return JsonResponse({"code": 0, "msg": "返回Student对象出现错误:"+str(e)})

# 查询学生信息
def query_students(request):
    # 接收传递过来的查询条件-- axios默认传递json格式-- 转换为字典类型-- data["inputstr"]
    data = json.loads(request.body.decode("utf-8"))
    try:
        # 使用ORM获取所有传递的学生信息
        students_obj = Student.objects.filter(Q(sno__icontains=data["inputstr"]) | Q(spassword__icontains=data["inputstr"]) | Q(name__icontains=data["inputstr"]) | Q(gender__icontains=data["inputstr"]) | Q(sclass__icontains=data["inputstr"]) | Q(birthday__icontains=data["inputstr"]) | Q(address__icontains=data["inputstr"]) | Q(mobile__icontains=data["inputstr"])).values()
        student = list(students_obj)
        return JsonResponse({"code": 1, "data": student})
    except Exception as e:
        return JsonResponse({"code": 0, "msg": "查询学生信息出现:"+str(e)})

# 判断学号是否存在
def is_exists_sno(request):
    # 接收前端传递的学号
    data = json.loads(request.body.decode("utf-8"))
    # 校验
    try:    
        obj_students = Student.objects.filter(Q(sno=data["sno"])).values()
        if (obj_students.count() != 0):
            return JsonResponse({"code":1, "exists": True})
        else:
            return JsonResponse({"code":0, "exists": False})
    except Exception as e:
        return JsonResponse({"code":0, "msg": "校验学号失败, 具体原因" + str(e)})
