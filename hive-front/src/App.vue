<template>
  <div class="hive-container">
    <div v-if="isLoggedIn" class="hive-form">
      <h2>Welcome, {{ username }}!</h2>
      <button @click="logout" class="hive-button">Logout</button>
    </div>

    <div v-else class="hive-form">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email" class="hive-label">Email:</label>
          <input type="email" id="email" v-model="email" class="hive-input" required>
        </div>

        <div class="form-group">
          <label for="password" class="hive-label">Password:</label>
          <input type="password" id="password" v-model="password" class="hive-input" required>
        </div>

        <button type="submit" class="hive-button">Login</button>
      </form>
    </div>

    <button @click="moveToSignUp" class="hive-button spacing-top"> Sign up</button>

    <p v-if="fetchedDbUserData && !isLoggedIn" class="hive-info-text spacing-top">Username from Database: {{ fetchedDbUserData }}</p>
    <p v-else-if="!isLoggedIn" class="hive-info-text spacing-top">No users found.</p>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { getDocs, collection } from 'firebase/firestore'
import SignUp from './components/SignUp.vue';

export default {
  components: {
    SignUp,
  },
  data() {
    return {
      email: undefined,
      password: undefined,
      isLoggedIn: false,
      fetchedDbUserData: null,
    };
  },
  async mounted() {
    const querySnapshot = await getDocs(collection(db, 'users'));
    if (!querySnapshot.empty) {
      this.fetchedDbUserData = querySnapshot.docs[0].data();
    }
  },
  methods: {
    moveToSignUp() {
      this.$router.push({ name: 'signup' });
    },
    async handleLogin() {
      try {
        this.isLoggedIn = true;
        this.email = user.email;

        this.email = undefined;
        this.password = undefined;
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    logout() {
        this.isLoggedIn = false;
        this.email = null;
    },
  },
};
</script>

<style scoped>
  .spacing-top {
    margin-top: 15px;
  }
</style>