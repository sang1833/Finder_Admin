import React, { useEffect } from "react";

const CheckResetToken = () => {
  let user = JSON.parse(localStorage.getItem("user") || "{}");

  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");

  const apiUrl = "http://localhost:5001/api/v1";

  async function checkToken() {
    try {
      const response = await fetch(`${apiUrl}/users/1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      console.log("data", data);

      if (response.ok) {
        console.log("ok");
      } else {
        console.log(data.message || "Đăng nhập sai");
      }
    } catch (error) {
      // console.log("error in notify reset token");
      checkAndRefreshToken();
    }
  }

  function checkAndRefreshToken() {
    if (!refreshToken && !accessToken) {
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      window.location.href = "http://localhost:4200/login";
    }

    // Check if the refreshToken has expired
    // console.log("Check if the refreshToken has expired");

    fetch(`${apiUrl}/auths/refreshToken/${refreshToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({})
    })
      .then((response) => response.json())
      .then((newData) => {
        user.accessToken = newData.data.accessToken;
        // console.log("newData: ", newData);
        localStorage.setItem("user", JSON.stringify(user));

        localStorage.setItem("accessToken", newData.data.accessToken);
        localStorage.setItem("refreshToken", newData.data.accesToken);
        localStorage.setItem(
          "refreshTokenExpired",
          newData.data.refreshTokenExpired
        );
      })
      .catch((error) => {
        console.error("Error in refresh token api:");
        // window.location.href = "http://localhost:4200/login";
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  return <div></div>;
};

export default CheckResetToken;
