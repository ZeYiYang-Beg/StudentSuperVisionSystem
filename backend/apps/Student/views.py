from django.shortcuts import render
from django.http import JsonResponse
# 引入Student类
from Student.models import Student
# Create your views here.

# 获取所有学生的信息
def get_students(request):
    try:
        students_obj = Student.objects.all().values()
        student = list(students_obj)
        return JsonResponse({"code": 1, "data": student})
    except Exception as e:
        return JsonResponse({"code": 0, "msg": "返回Student对象出现错误:"+str(e)})

# 分页学生信息