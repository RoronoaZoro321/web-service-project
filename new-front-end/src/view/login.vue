<template>
    <div style="background-color: aqua;">
      <h1>Login Check</h1>
      <form @submit.prevent="checkLogin">
        <label for="citizenId">Citizen ID:</label><br />
        <input type="text" id="citizenId" v-model="citizenId" /><br /><br />
        <label for="pin">PIN:</label><br />
        <input type="text" id="pin" v-model="pin" /><br /><br />
        <input type="submit" value="Login" />
      </form>
      <p>{{ result }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const citizenId = ref('');
  const pin = ref('');
  const result = ref('');
  
  async function checkLogin() {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/v1/esb/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ citizenId: citizenId.value, pin: pin.value }),
          credentials: "include", // Include cookies in the request
        }
      );
  
      // Check if a cookie was received
      const cookies = document.cookie;
      if (cookies) {
        result.value = "Cookie received: " + cookies;
      } else {
        result.value = "No cookie received.";
      }
    } catch (error) {
      result.value = "Error: " + error.message;
    }
  }
  </script>
  
