<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const router = useRouter();

onMounted(() => {
  userStore.getUser();
});

const toLoginPage = () => {
  router.push({ name: "login" });
};

const logoutHandler = () => {
  userStore.logout();
};
</script>

<template>
  <div class="app-header">
    <div style="position: absolute; right: 20px" v-if="userStore.user.username">
      <div>
        <span
          >歡迎，{{ userStore.user.username }}
          <v-btn @click="logoutHandler">登出</v-btn></span
        >
      </div>
    </div>
    <div style="position: absolute; right: 20px" v-else>
      <v-btn @click="toLoginPage">登入</v-btn>
    </div>
  </div>
</template>

<style lang="css" scoped>
.app-header {
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #28bffa;
}
</style>
