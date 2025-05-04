<script setup>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const userStore = useUserStore();

const router = useRouter();

</script>

<template>
  <div>前台首頁</div>
</template>

<style lang="css" scoped></style>
