const App = Vue.createApp({
    data() {
        return {
            msg: "hello vue",
            students: [],
            total : 100,
            currentPage4 : 5,
            page_size: 10,
            baseURL : "http://127.0.0.1:8000/"
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
                    that.$message({
                        message : "数据加载成功!",
                        type : "success"
                    });
                } else {
                    that.$message.error(res.data.msg);
                }
            })
            .catch(function(err) {
                // 请求失败后执行的函数
                console.log(err);
            });
        }
    }
})
App.use(ElementPlus)
App.mount("#App")