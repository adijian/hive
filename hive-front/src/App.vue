<template>
  <div class="login-container">
    <div v-if="isLoggedIn" class="welcome">
      <h2>Welcome, {{ username }}!</h2>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>

    <div v-else class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="username" id="username" v-model="username" required>
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>

        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>

    <p v-if="firstUsername && !isLoggedIn" class="info-text">First Username: {{ firstUsername }}</p>
    <p v-else-if="!isLoggedIn" class="info-text">No users found.</p>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  data() {
    return {
      username: '',
      password: '',
      isLoggedIn: false,
      firstUsername: null,
    };
  },
  async mounted() {
    // Fetch first username (optional)
    const querySnapshot = await getDocs(collection(db, 'users'));
    if (!querySnapshot.empty) {
      this.firstUsername = querySnapshot.docs[0].data(); // Assuming 'username' field exists
    }
  },
  methods: {
    async handleLogin() {
      try {
        this.isLoggedIn = true;
        this.username = user.email; // Assuming email is used as username

        this.email = '';
        this.password = '';
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    logout() {
        this.isLoggedIn = false;
        this.username = null;
    },
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #181818; /* Dark background */
  color: #fff; /* White text */
}

.welcome,
.login-form {
  background-color: #282828; /* Darker background for boxes */
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.login-btn,
.logout-btn {
  background-color: #007bff; /* Keep button color for contrast */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
}

.info-text {
  margin-top: 20px;
  color: #999; /* Lighter gray text */
}
</style>