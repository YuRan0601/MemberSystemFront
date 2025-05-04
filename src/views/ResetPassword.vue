<script setup>
import axiosInstance from "@/plugins/axios";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

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
  (v) => v == resetPasswordReq.value.password || "必須與密碼相同",
];

const resetPasswordReq = ref({
  password: null,
  token: null,
});

const repassword = ref(null);

const form = ref(null);
const valid = ref(false);

const resetPasswordHandler = async () => {
  const { valid } = await form.value.validate();

  if (!valid) {
    alert("密碼格式有誤!");
    return;
  }

  if (!confirm("確定重設密碼?")) {
    return;
  }

  const { data } = await axiosInstance.post(
    "/auth/reset-password",
    resetPasswordReq.value
  );

  if (data.code === 510) {
    alert("密碼重設信已過期!");
    router.push({ name: "login" });
  } else {
    alert("密碼重設成功!");
    router.push({ name: "login" });
  }
};

onMounted(() => {
  resetPasswordReq.value.token = route.params.token;
});
</script>

<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    "
  >
    <div
      style="
        padding: 50px;
        width: 500px;
        background-color: #fff;
        border-radius: 20px;
      "
    >
      <v-form ref="form" v-model="valid" @submit.prevent>
        <h1 style="margin-bottom: 20px">重設密碼</h1>
        <v-text-field
          class="input"
          label="請輸入密碼"
          type="password"
          :rules="passwordRules"
          v-model="resetPasswordReq.password"
        ></v-text-field>
        <v-text-field
          class="input"
          label="再次輸入密碼"
          type="password"
          :rules="repasswordRules"
          v-model="repassword"
        ></v-text-field>
        <v-btn @click="resetPasswordHandler" type="submit">確認送出</v-btn>
      </v-form>
    </div>
  </div>
</template>

<style lang="css" scoped>
.input {
  padding: 10px;
}
</style>
