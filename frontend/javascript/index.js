const App = Vue.createApp({
    data() {
        // 校验学号是否存在
        const rulesSNO = (rule, value, callback) => {
            // 使用Axios访问
            axios.post(
                url = this.baseURL + "students/sno/check/",
                {
                    sno : value,
                }
            )
            .then((res)=>{
                if (res.data.code === 1) {
                    if (res.data.exists) {
                        callback(new Error("学号已存在!"));
                    } else {
                        callback();
                    }
                }
                else {
                    callback();
                }
            })
            .catch((err)=>{
                // 如果请求失败那么在控制台打印
                console.log(err);
            })
        }
        return {
            msg: "hello vue",
            students: [],
            total : 0,
            // 当前页码
            currentPage4 : 1,
            // 每页显示多少行
            page_size: 10,
            baseURL : "http://127.0.0.1:8000/",
            // 分页后当前页的学生信息
            pageStudents : [],
            inputStr: "",
            // dialog展示状态
            dialogVisible: false,
            studentForm : {
                sno : '',
                name: '',
                gender: undefined,
                birthday: '',
                spassword: '',
                mobile: '',
                address: '',
                image: '',
            },
            dialogTitle: "",
            isView : false,
            isEdit : false,
            rules : {
                sno : 
                [
                    {   
                        required: true,
                        message : "学号不能为空",
                        trigger : "blur",
                    },
                    {
                        pattern: /^\d{8}$/,
                        message : "学号必须是8位数",
                        trigger : "blur",
                    },
                    {
                        validator: rulesSNO,
                        trigger : "blur",
                    }
                ],
                name : 
                [
                    {
                        required : true,
                        message : "姓名不能为空",
                        trigger : "blur",
                    },
                    {
                        pattern: /^[\u4e00-\u9fa5]$/, 
                        message : "学生姓名应为2-5位汉字",
                        trigger : "blur",
                    },
                ],
                gender : 
                [
                    {
                        required : true,
                        message : "性别不能为空",
                        trigger : "change",
                    },
                ],
                birthday :
                [
                    {
                        required : true,
                        message : "出生日期不能为空",
                        trigger : "change",
                    }
                ],
                mobile : 
                [
                    {
                        required : true,
                        message : "手机号码不能为空",
                        trigger : "blur"
                    },
                    {
                        pattern : /^[1][35789]\d{9}$/,
                        message : "手机号码必须为1开头的9位数字",
                        trigger : "blur",
                    }
                ],
                address : 
                [
                    {
                        required : true,
                        message : "家庭住址不允许为空",
                        trigger : "blur",
                    },
                ],
                spassword : 
                [
                    {
                        required : true,
                        message : "学生密码不能为空",
                        trigger : "blur",
                    },
                    {
                        pattern : /^\d{6}$/,
                        message : "学生密码应为6位数字",
                        trigger : "blur",
                    }
                ]
            }
        }
    },
    mounted() {
        this.getStudents();
    },
    methods: {
        // 获取所有学生信息
        getStudents: function() {
            // 记录this的地址
            let that = this;
            // 使用Axios实现Ajax请求
            axios
            .get(that.baseURL + "students/")
            .then(function(res) {
                // 请求成功后执行的函数
                if (res.data.code == 1) {
                // 把数据给students对象
                    that.students = res.data.data;
                // 获取返回记录的总行数
                    that.total = res.data.data.length;
                // 获取当前页的数据
                    that.getPageStudents();
                // 传递一个信息框
                    that.$message({
                        message : "数据加载成功!",
                        type : "success"
                    });
                } else {
                // 否则，传递一个错误内容的信息框
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function(err) {
                // 请求失败后执行的函数
                console.log(err);
            });
        },
        // 获取每页学生信息
        getPageStudents() {
            // 清空pageStudents的数据
            this.pageStudents = [];
            // 获得当前页的数据
            for (let i = (this.currentPage4 - 1) * this.page_size; i < this.total; i++) {
                // 遍历数据添加到pageStudents中
                this.pageStudents.push(this.students[i]);
                // 判断是否达到一页的要求
                if (this.pageStudents.length === this.page_size) {
                    break;
                }
            } 
        },
        // 分页时修改每页行数
        handleSizeChange(size) {
            // 修改当前每页数据行数
            this.pagesize = size;
            // 重新加载分页
            this.getPageStudents();
        },
        handleCurrentChange(pageNumber) {
            // 修改当前的页码
            this.currentPage4 = pageNumber;
            // 重新加载分页
            this.getPageStudents();
        },
        // 实现学生信息的查询功能 @click="queryStudents"
        queryStudents() {
            // 使用Ajax -- POST -- 传递inputStr
            let that = this;
            // 开始Ajax请求
            axios
            .post(
                // 拼接传入后端的url
                that.baseURL + "students/query/",
                {
                    // 传入后端的inputstr就是前端的inputStr
                    inputstr : that.inputStr
                })
            .then(function(res){
                if (res.data.code === 1) {
                    that.students = res.data.data;
                    that.total = res.data.data.length;
                    that.getPageStudents();
                    that.$message({
                        message: "查询数据加载成功",
                        type: "success",
                    });
                } else {
                    that.$message.error(res.data.msg);
                }
            })
            // 前端调后端接口时出现的问题
            .catch(function(err){
                console.log(err);
                that.$message.error("获取后端查询结果出现异常！")
            })
        },
        // 添加按钮事件
        addStudent() {
            this.dialogTitle = "添加学生信息";
            this.dialogVisible = true;
        },
        // 查看学生信息详情
        viewStudent(row) {
            this.dialogTitle = "查看学生信息";
            this.dialogVisible = true;
            this.isView = true;
            // 深拷贝方法1
            // this.studentForm.sno = row.sno;
            // this.studentForm.name = row.name;
            // this.studentForm.gender = row.gender;
            // this.studentForm.birthday = row.birthday;
            // this.studentForm.mobile = row.mobile;
            // this.studentForm.address = row.address;
            // this.studentForm.spassword = row.spassword;
            // 深拷贝方法2
            this.studentForm = JSON.parse(JSON.stringify(row));

        },
        // 关闭弹出框
        closeDialogForm() {
            // 清空
            this.studentForm.sno = "";
            this.studentForm.name = "";
            this.studentForm.gender = "";
            this.studentForm.spassword = "";
            this.studentForm.mobile = "";
            this.studentForm.address = "";
            this.studentForm.birthday = "";
            this.dialogVisible = false;
            this.isView = false;
            this.isEdit = false;
        },
        // 修改学生信息
        updateStudent(row) {
            this.dialogTitle = "修改学生信息";
            this.dialogVisible = true;
            this.isEdit = true;
            this.studentForm = JSON.parse(JSON.stringify(row));
        }
    },
})
App.use(ElementPlus)
App.mount("#App")