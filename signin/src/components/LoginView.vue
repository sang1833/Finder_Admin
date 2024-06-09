<template>
  <section class="login-page">
    <div class="login-container">
      <h2>Chào mừng trở lại!</h2>
      <p v-if="!loginFailed">Hãy nhập email và mật khẩu.</p>
      <p v-else class="wrong-password">Kiểm tra email hoặc mật khẩu!</p>

      <form @submit.prevent="handleLogin">
        <input
          v-model="username"
          type="text"
          placeholder="Email"
          required
          class="input-field"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Mật khẩu"
          required
          class="input-field"
        />
        <button type="submit" class="submit-button" :disabled="isLoading">
          <span v-if="isLoading" class="waiting">
            <Loading class="load" />
            Hãy đợi chút nhé...</span
          >
          <span v-else>Đăng nhập</span>
        </button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Loading from "./Loading.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      loginFailed: false,
      isLoading: false
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;

      try {
        const response = await axios.post(
          "http://localhost:5001/api/v1/auths/login",
          {
            email: this.username,
            password: this.password
          }
        );
        this.loginFailed = false;

        const data = response.data;
        console.log("data", data);

        localStorage.setItem("user", JSON.stringify(response.data.data));

        localStorage.setItem("userId", data.data.id);
        localStorage.setItem("accessToken", data.data.accessToken);
      } catch (error) {
        console.log("error", error);
        this.loginFailed = true;
        this.isLoading = false;
      } finally {
        this.isLoading = false;
        window.location.href = "/dashboard";
        // const loginSuccessEvent = new CustomEvent("LOGIN_SUCCESS", {
        //   detail: { loginState: true }
        // });

        // window.dispatchEvent(loginSuccessEvent);
      }
    }
  },
  components: {
    Loading
  }
};
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  font-family: Arial, sans-serif;
}
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%;
  background-color: #f6f9fc;
}

.login-container {
  width: 300px;
  padding: 40px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.login-container h2 {
  text-align: center;
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 12px 20px;
  margin-bottom: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  padding: 12px 20px;
  background-color: #0f032e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}
.waiting {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.wrong-password {
  color: red;
}
</style>
