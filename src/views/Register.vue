<script setup>
import { ref } from "vue";
import axiosInstance from "@/plugins/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref({
  username: "",
  password: "",
  gender: "male",
  email: "",
});

const usernameRules = [
  (value) => {
    if (value) return true;
    return "必須輸入帳號!";
  },
  (v) => {
    return new Promise(async (resolve) => {
      try {
        await axiosInstance.get(`/auth/name/${v}`);
        resolve(true);
      } catch (e) {
        resolve("帳號已被使用");
      }
    });
  },
];

const passwordRules = [
  (value) => {
    if (value) return true;
    return "必須輸入密碼!";
  },
  (v) => v.length >= 8 || "密碼至少要8個字元",
  (v) => v.length <= 20 || "密碼不能超過20個字元",
  (v) => /[A-Za-z]/.test(v) || "密碼至少要包含一個英文",
  (v) => /\d/.test(v) || "密碼至少要包含一個數字",
  (v) => !/\s/.test(v) || "密碼不能包含空白字元",
];

const repasswordRules = [
  (value) => {
    if (value) return true;
    return "必須輸入密碼!";
  },
  (v) => v.length >= 8 || "密碼至少要8個字元",
  (v) => v.length <= 20 || "密碼不能超過20個字元",
  (v) => /[A-Za-z]/.test(v) || "密碼至少要包含一個英文",
  (v) => /\d/.test(v) || "密碼至少要包含一個數字",
  (v) => !/\s/.test(v) || "密碼不能包含空白字元",
  (v) => v == user.value.password || "必須與密碼相同",
];

const emailRules = [
  (v) => {
    if (!v) return "必須輸入信箱";
    if (v) {
      if (!/.+@.+\..+/.test(v)) {
        return "Email 格式不正確";
      }
      return true;
    }
  },
];

const repassword = ref("");

const registForm = ref(null);

const registFormValid = ref(false);

const registHandler = async () => {
  const { valid } = await registForm.value.validate();

  if (!valid) {
    alert("輸入的資料有誤，請重新確認!");
    return;
  }

  try {
    axiosInstance.post("/auth/regist", user.value);
    alert("註冊成功");
    router.push({name : 'login'});
  } catch {
    alert("註冊失敗");
  }
};
</script>

<template>
  <div class="container">
    <div
      style="
        width: 400px;
        background-color: #fff;
        border-radius: 10px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
      "
    >
      <v-sheet class="mx-auto" width="300">
        <h1 style="margin-bottom: 20px">註冊會員</h1>
        <v-form
          ref="registForm"
          v-model="registFormValid"
          lazy-validation
          @submit.prevent="registHandler"
        >
          <v-text-field
            class="input"
            v-model="user.username"
            label="帳號(必填)"
            :rules="usernameRules"
          ></v-text-field>
          <v-text-field
            class="input"
            v-model="user.password"
            label="密碼(必填)"
            :rules="passwordRules"
            type="password"
          ></v-text-field>
          <v-text-field
            class="input"
            v-model="repassword"
            label="再次輸入密碼(必填)"
            :rules="repasswordRules"
            type="password"
          ></v-text-field>
          <v-text-field
            class="input"
            v-model="user.email"
            label="Email"
            :rules="emailRules"
          ></v-text-field>
          <v-radio-group v-model="user.gender" style="text-align: left" inline>
            <span style="font-weight: bold">性別</span>
            <v-radio label="男" value="male"></v-radio>
            <v-radio label="女" value="female"></v-radio>
          </v-radio-group>
          <v-btn
            class="mt-2"
            style="background-color: #2962ff; color: #fff"
            type="submit"
            >提交</v-btn
          >
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<style lang="css" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #22cac2;
  height: 100vh;
}

.input {
  margin-bottom: 20px;
}
</style>
