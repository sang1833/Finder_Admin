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
          name="email"
          placeholder="Email"
          required
          class="input-field"
        />
        <div class="password-input">
          <input
            v-if="showPassword"
            v-model="password"
            type="text"
            name="password"
            placeholder="Mật khẩu"
            required
            class="input-field"
          />
          <input
            v-else
            v-model="password"
            type="password"
            name="password"
            placeholder="Mật khẩu"
            required
            class="input-field"
          />
          <button
            @click.prevent="showPassword = !showPassword"
            class="show-password"
          >
            <svg
              v-if="showPassword"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
              class="eyeIcon"
              fill="#0f032e"
            >
              <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              class="eyeIcon"
              fill="#0f032e"
            >
              <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
              />
            </svg>
          </button>
        </div>
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
      showPassword: false,
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
        localStorage.setItem(
          "accessTokenExpired",
          data.data.accessTokenExpired
        );
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem(
          "refreshTokenExpired",
          data.data.refreshTokenExpired
        );
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

.password-input {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
}

.show-password {
  position: absolute;
  width: 35px;
  height: 35px;
  right: 0;
  top: 5px;
  color: #0f032e;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.eyeIcon {
  font-size: 20px;
  color: #0f032e;
  fill: #0f032e;
  background-color: transparent;
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
