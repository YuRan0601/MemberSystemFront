<script setup>
import axiosInstance from "@/plugins/axios";
import { ref, shallowRef } from "vue";

const dialog = shallowRef(false);

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

const email = ref(null);

const form = ref(null);
const valid = ref(false);

const forgotPasswordHandler = async () => {
  console.log(email.value);

  const { valid } = await form.value.validate();

  if (!valid) {
    alert("Email格式不符!");
    return;
  }

  if (!confirm("確定送出密碼重設信?")) {
    dialog.value = false;
    return;
  }

  const { data } = await axiosInstance.post(
    `/auth/forgot-password/${email.value}`
  );

  if(data.code === 502) {
    alert('找不到此用戶!');
  } else {
    alert('密碼重設信已送出!')
  }
};
</script>

<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          text="忘記密碼"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>

      <v-form @submit.prevent ref="form" v-model="valid">
        <v-card title="請輸入註冊時的Email">
          <v-card-text>
            <v-col>
              <v-text-field
                label="Email"
                :rules="emailRules"
                v-model="email"
              ></v-text-field>
            </v-col>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text="取消" variant="plain" @click="dialog = false"></v-btn>

            <v-btn
              color="primary"
              text="確認"
              variant="tonal"
              type="submit"
              @click="forgotPasswordHandler"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </div>
</template>

<style lang="css" scoped></style>
