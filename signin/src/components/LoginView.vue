<template>
  <section class="login-page">
    <div class="login-container">
      <h2>Chào mừng trở lại!</h2>
      <p>Hãy nhập email và mật khẩu.</p>
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
        <button type="submit" class="submit-button">Đăng nhập</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post(
          "http://localhost:5001/api/v1/auths/login",
          {
            email: this.username,
            password: this.password
          }
        );

        localStorage.setItem("user", JSON.stringify(response.data.data));

        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Login failed:", error);
        // Handle login failure, e.g., show an error message
      }
    }
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
</style>
