<template>
  <div class="hive-container">
    <div v-if="isLoggedIn" class="hive-form">
      <h2>Welcome, {{ username }}!</h2>
      <div class="buttons-container">
        <button class="hive-button spacing-top" @click="signOut">Logout</button>
        <button class="hive-button spacing-top feed-button-size" @click="moveToFeed">Move to Feed</button>
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
import { db, auth } from '@/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signOut, deleteUser, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from 'js-cookie'

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
    auth.onAuthStateChanged((user) => {
        if (user) {
          this.loginCookie()
        }
    })

    const querySnapshot = await getDocs(collection(db, 'users'));
    if (!querySnapshot.empty) {
      this.fetchedDbUserData = querySnapshot.docs[0].data();
    }
  },
  computed: {
      isAdmin() {
          if (this.email == "shoogeh.jian@gmail.com" || this.email == "adijian123@gmail.com") {
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
                this.loginCookie()
            })
            .catch((error) => {
                console.error(error)
                alert(error.message)
            })
    },
    async signInWithGoogle() {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(getAuth(), provider)
            .then((result) => {
                this.loginCookie()
            })
            .catch((error) => {
                console.error(error)
                alert(error.message)
            })
    },
    login() {
      if (this.email == undefined && this.username == undefined){
          return
        }
        signInWithEmailAndPassword(getAuth(), this.email, this.password)
            .then((data) => {
                console.log("Success log in", data);
                this.loginCookie()
            })
            .catch((error) => {
                console.error(error)
                alert(error.message)
            })
    },
    loginCookie() {
      if (auth.currentUser){
        console.log(auth.currentUser.displayName, auth.currentUser.email)
        this.isLoggedIn = true
        this.username = auth.currentUser.displayName
        this.email = auth.currentUser.email
      }
    },
    removeUser() {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          deleteUser(user)
              .then(() => {
                  console.log("User deleted successfully");
              })
              .catch((error) => {
                  console.error("Error deleting user:", error);
          });
          this.signOut()
        }
    },
    signOut() {
        const auth = getAuth()
        if (auth) {
          signOut(auth).then((data) => {
              console.log("Successfully signed out", data)
          })
          .catch((error) => {
              console.error(error)
              alert(error.message)
          })
        }

        this.logout()
    },
    logout() {
      this.username = undefined
      this.password = undefined
      this.email = undefined
      this.isLoggedIn = false
      Cookies.remove("username")
    },
    moveToFeed() {
      this.$router.push('/feed')
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
  .feed-button-size {
    padding-top: 30px;
    padding-bottom: 30px;
  }
</style>