<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" name="phone"
          v-validate="{ required: true, regex: /^1[3456789]\d{9}$/ }"
          :class="{ invalid: errors.has('phone') }" />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }"
          :class="{ invalid: errors.has('code') }" />
        <button style="height: 38px" @click="sendCode">
          发送验证码
        </button>
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password" name="password"
          v-validate="{
                        required: true,
                        regex: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,15}$/,
                    }" :class="{ invalid: errors.has('password') }" />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="confirm" name="confirm"
          v-validate="{ required: true, is: password }"
          :class="{ invalid: errors.has('confirm') }" />
        <span class="error-msg">{{ errors.first("confirm") }}</span>
      </div>
      <div class="controls">
        <input name="agree" type="checkbox" v-model="agree"
          v-validate="{ required: true, tongyi: true }" :class="{ invalid: errors.has('agree') }" />
        <span>同意协议并注册《优汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="completeRegistration">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机优汇</li>
        <li>销售联盟</li>
        <li>优汇社区</li>
      </ul>
      <div class="address">
        地址：湖北省武汉东湖新技术开发区锦程街68号
      </div>
      <div class="beian">中国地质大学（武汉）</div>
    </div>
  </div>
</template>

<script>
import { reqRegister } from '@/api';
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      confirm: '',
      agree: true,
    };
  },
  methods: {
    async sendCode() {
      try {
        await this.$store.dispatch('getVerificationCode', this.phone);
        this.code = this.$store.state.user.code;
      } catch (error) {
        alert(error);
      }
    },
    async completeRegistration() {
      let success = await this.$validator.validateAll();
      let { phone, code, password } = this;
      if (success) {
        try {
          let result = await reqRegister({ phone, code, password });
          if (result.code == 200) {
            alert('注册成功！');
            this.$router.push({
              path: '/home',
            });
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          alert(error);
        }
      } else {
        alert();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>