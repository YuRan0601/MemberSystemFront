<script setup>
import Captcha from "@/components/Captcha.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import ForgotPassword from "@/components/ForgotPassword.vue"

const router = useRouter();

const userStore = useUserStore();

onMounted(() => {
  if (userStore.token) {
    router.push({ name: "default" });
  }
});

const rules = {
  required: (v) => !!v || "此欄位為必填",
};

const captchaValue = ref("");
const inputCaptcha = ref("");
const loginUser = ref({
  username: "",
  password: "",
});

const loginForm = ref(null);
const loginFormValid = ref(false);

const loginHandler = async () => {
  const { valid } = await loginForm.value.validate();

  if (!valid) {
    alert("請確認每個欄位都有填!");
    return;
  }

  if (captchaValue.value !== inputCaptcha.value) {
    alert("驗證碼錯誤");
    window.location.reload();
    return;
  }

  const data = await userStore.login(loginUser.value);

  console.log(data);

  if (data.code === 200) {
    router.push({ name: "default" });
  } else if (data.code === 501) {
    alert("帳號或密碼錯誤");
    window.location.reload();
  }
};

const toRegistPage = () => {
  router.push({ name: "regist" });
};
</script>

<template>
  <div class="container">
    <div class="loginForm">
      <v-form
        style="width: 400px; text-align: center"
        ref="loginForm"
        v-model="loginFormValid"
        @submit.prevent
      >
        <h1 style="margin-bottom: 50px">登入會員</h1>
        <v-col>
          <v-text-field
            label="帳號"
            v-model="loginUser.username"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="密碼"
            v-model="loginUser.password"
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col>
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <div style="flex: 1">
              <v-text-field
                label="驗證碼"
                v-model="inputCaptcha"
                :rules="[rules.required]"
              ></v-text-field>
            </div>
            <div style="flex: 1; margin-left: 20px">
              <Captcha v-model="captchaValue"></Captcha>
            </div>
          </div>
        </v-col>

        <v-col>
          <v-btn type="submit" @click="loginHandler">登入</v-btn>
          <v-btn type="submit" @click="toRegistPage">註冊會員</v-btn>
          <ForgotPassword></ForgotPassword>
        </v-col>
      </v-form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #22cac2;
}

.loginForm {
  padding: 50px;
  background-color: #fff;
  width: 600px;
  height: 600px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
