import axiosInstance from "@/plugins/axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {
  //記錄登入者
  const user = ref({
    username: null,
    role: null,
    email: null,
    gender: null,
  });

  //記錄token，每次使用useUserStore都要把localStorage裡的token拿出來
  const token = ref(localStorage.getItem("token") || null);

  //是否登入
  const isLoggedIn = computed(() => !!token.value);

  //setter：設定登入者
  const setUser = (username, role, email, gender) => {
    user.value.username = username;
    user.value.role = role;
    user.value.email = email;
    user.value.gender = gender;
  };

  //setter：設定token
  const setToken = (t) => {
    token.value = t;
    localStorage.setItem("token", t);
  };

  //清除登入者
  const clearUser = () => {
    user.value.username = null;
    user.value.role = null;
    token.value = null;
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  //獲取登入者，存放到userStore
  const getUser = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/me");

      console.log(data);

      if (data.code === 200) {
        const loginUser = data.data;
        setUser(
          loginUser.username,
          loginUser.role,
          loginUser.email,
          loginUser.gender
        );
      }
    } catch (e) {
      clearUser();
    }
  };

  const login = async (user) => {
    const { data } = await axiosInstance.post("/auth/login", user);

    if (data.code === 200) {
      setToken(data.data.token);

      await getUser();
    }

    return data;
  };

  const logout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      clearUser();
    } catch (e) {
      console.log(e);
    }
  };

  return {
    user,
    token,
    isLoggedIn,
    setUser,
    setToken,
    clearUser,
    login,
    logout,
    getUser,
  };
});
