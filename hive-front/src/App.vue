<template>
  <div class="hive-container">
    <div v-if="isLoggedIn" class="hive-form">
      <h2>Welcome, {{ getCookieUsername() }}!</h2>
      <div class="buttons-container">
        <button class="hive-button spacing-top" @click="signOut">Logout</button>
        <button v-if="isAdmin" type="submit" class="hive-button spacing-top" @click="removeUser">Debug: Remove User</button>
      </div>
    </div>

    <div v-else class="hive-form">
      <h1>Bzzz!</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group spacing-top">
          <label for="email" class="hive-label">Email:</label>
          <input type="email" id="email" v-model="email" class="hive-input">
        </div>

        <div class="form-group">
          <label for="password" class="hive-label">Password:</label>
          <input type="password" id="password" v-model="password" class="hive-input">
        </div>

        <div class="buttons-container">
          <button type="submit" class="hive-button" @click="login">Login</button>
          <button type="submit" class="hive-button spacing-top" @click="register">Register</button>
          <button type="submit" class="hive-button spacing-top" @click="signInWithGoogle">Sign In With Google</button>
        </div>
      </form>
    </div>

    <p v-if="isAdmin" class="hive-info-text spacing-top">Username from Database: {{ fetchedDbUserData }}</p>
    <p v-else-if="isAdmin" class="hive-info-text spacing-top">No users found.</p>
  </div>
</template>

<script>
import { db, google } from '@/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signOut, deleteUser, signInWithRedirect, signInWithEmailAndPassword, getRedirectResult, signInWithPopup } from "firebase/auth";
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      email: undefined,
      password: undefined,
      isLoggedIn: false,
      fetchedDbUserData: null,
      username: undefined
    };
  },
  async mounted() {
    const userm = this.getCookieUsername();
    if (userm != null) {
      this.loginCookie(userm)
    }

    const querySnapshot = await getDocs(collection(db, 'users'));
    if (!querySnapshot.empty) {
      this.fetchedDbUserData = querySnapshot.docs[0].data();
    }
  },
  computed: {
      isAdmin() {
          if (this.username == "Adi Jian" || this.username == "adijian123@gmail.com") {
              return true
          }
          return false
      }
  },
  methods: {
    register() {
        if (this.email == undefined && this.username == undefined){
          return
        }
        createUserWithEmailAndPassword(getAuth(), this.email, this.password)
            .then((data) => {
                console.log("Success", data);
                this.username = this.email
                this.isLoggedIn = true
            })
            .catch((error) => {
                console.error(error)
                alert(error.message)
            })
    },
    async signInWithGoogle() {
      const auth = getAuth();
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

      try {
          // if (isLocalhost) {
          //     const result = await signInWithPopup(auth, google);
          //     this.username = result.currentUser.displayName;
          // } 
          if (isMobile) {
              const result = await signInWithRedirect(auth, google);
              this.username = result.currentUser.displayName;
          } 
          else {
              const result = await signInWithPopup(auth, google);
              this.username = result.currentUser.displayName;
            }

            this.loginCookie(this.username);
            console.log(Cookies.get("username"));
          } catch (error) {
              console.error(error);
              alert(error.message);
          }
    },
    signOut() {
        const auth = getAuth()
        if (auth) {
          signOut(auth).then((data) => {
              console.log("Successfully signed out")
              this.logout()
          })
          .catch((error) => {
              console.error(error)
              alert(error.message)
          })
        }
    },
    logout() {
      this.username = undefined
      this.email = undefined
      this.password = undefined
      this.isLoggedIn = false
      Cookies.remove('username')
    },
    login() {
      if (this.email == undefined && this.username == undefined){
          return
        }
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
          .then((data) => {
              console.log("Success", data);
              this.loginCookie(this.email)
          })
          .catch((error) => {
              console.error(error)
              alert(error.message)
          })
    },
    loginCookie(username) {
      this.username = username
      Cookies.set('username', username, { expires: 1})
      this.isLoggedIn = true
    },
    removeUser() {
        const auth = getAuth();
        const user = auth.currentUser;
        deleteUser(user)
            .then(() => {
                console.log("User deleted successfully");
            })
            .catch((error) => {
                console.error("Error deleting user:", error);
        });
        this.signOut()
    },
    getCookieUsername() {
      return Cookies.get("username");
    }
  },
};
</script>

<style scoped>
  .buttons-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .spacing-top {
    margin-top: 15px;
  }
</style>