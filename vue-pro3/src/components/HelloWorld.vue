<template>
  <div class="hello">


        <h1>{{ msg }}</h1>
    <form>
      用户名：<input type="text" id="reg_username" v-model="reg_username" required> <br>
      邮箱：<input type="text" id="reg_email" v-model="reg_email" required> <br>
      密码：<input type="password" id="reg_password" v-model="reg_password" required> <br>
      确认密码：<input type="password" id="reg_repassword" v-model="reg_repassword" required> <br>
      请选择注册的身份：<input type="radio" name="role" value="student"  v-model="reg_role" checked>学生
      <input type="radio" name="role" value="teacher" v-model="reg_role">老师
      <input type="radio" name="role" value="admin" v-model="reg_role">管理员
      <a href="javascript:;" @click="register">注册 </a>
      <hr>
      <div>
      用户名：<input type="text" id="username" v-model="username"> <br>
      密码：<input type="password" id="password" v-model="password"> <br>
      请选择注册的身份：<input type="radio" name="role" value="student"  v-model="log_role" checked>学生
      <input type="radio" name="role" value="teacher" v-model="log_role">老师
      <input type="radio" name="role" value="admin" v-model="log_role">管理员
      <a href="javascript:;" @click="login">登录 </a>
      <label class="checkbox">
        <input name="chbRem" id="chbRem" type="checkbox" v-model="chbRem"> 下次自动登录
      </label>
      </div>
    </form>

  </div>
</template>


<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      reg_username: '',
      reg_email: '',
      reg_password: '',
      reg_repassword: '',
      reg_role: 'student',
      username: '',
      password: '',
      log_role: 'student',
      chbRem: 'true'
    }
  },
  methods: {
    register () {
      var name = this.reg_username
      var email = this.reg_email
      var pwd = this.reg_password
      var repwd = this.reg_repassword
      var role = this.reg_role
      if (name === '') {
        alert('用户名不能为空！')
      }
      if (email === '') {
        alert('邮箱不能为空！')
      }
      if (pwd === '') {
        alert('密码不能为空！')
      }
      if (pwd !== repwd) {
        alert('两次密码不一致！')
      }
      if (name !== '' && email !== '' && pwd !== '' && pwd === repwd) {
        this.$ajax.post('/users/register', {
          username: name,
          email: email,
          password: pwd,
          role: role
        }, {emulateJSON: true})
        .then((response) => {
          if (response.data.status === '1000') {
            alert(JSON.stringify(response.data.success))
          }
          if (response.data.status === '1001') {
            alert(JSON.stringify(response.data.err))
          } else if (response.data.status === '1002') {
            alert(JSON.stringify(response.data.err))
          }
        })
        .catch((err) => {
          console.error(err)
        })
      }
    },
    login () {
      var name = this.username
      var pwd = this.password
      var role = this.log_role
      var chbRem = this.chbRem
      this.$ajax.post('/users/login', {
        username: name,
        password: pwd,
        role: role,
        chbRem: chbRem
      }, {emulateJSON: true}).then((response) => {
        if (response.data.status === '2000') {
          alert(response.data.msg)
          alert(response.data.user.username)
          alert(response.data.user.email)
          alert(response.data.user.password)
        }
        if (response.data.status === '2001') {
          alert(JSON.stringify(response.data.msg))
        }
        if (response.data.status === '2002') {
          alert(JSON.stringify(response.data.msg))
        }
        if (response.data.status === '2003') {
          alert(JSON.stringify(response.data.msg))
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
