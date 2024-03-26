from django.db import models

# Create your models here.
# Student 表
# 学号 姓名 性别 班级 出生日期 家长手机号码 家庭住址 照片
class Student(models.Model):
    gender_choices = (("男", "男"), ("女", "女"))
    sno = models.IntegerField(db_column="SNo", primary_key=True, null=False)
    spassword = models.CharField(db_column="SPassword", max_length=100, null=False, default="123456")
    name = models.CharField(db_column="SName", max_length=100, null=False)
    gender = models.CharField(db_column="Gender", max_length=100, null=False)
    sclass = models.CharField(db_column="Sclass", max_length=100, null=False)
    birthday = models.DateField(db_column="Birthday", null=False)
    address = models.CharField(db_column="Address", max_length=100)
    mobile = models.CharField(db_column="Mobile", max_length=100)
    image = models.CharField(db_column="Image", max_length=200, null=True)

    # 默认表名，是否直接同步
    class Meta:
        managed = True
        db_table = "Student"

    def __str__(self):
        return "学号:%s\t姓名:%s\t性别:%s" %(self.sno, self.name, self.gender)
