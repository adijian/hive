<template>
  <div class="hive-container">
    <div v-if="isLoggedIn" class="hive-form">
      <h2>Welcome, {{ username }}!</h2>
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
          <button type="submit" class="hive-button" @click="register">Login</button>
          <button type="submit" class="hive-button spacing-top" @click="signInWithGoogle">Sign In With Google</button>
        </div>
      </form>
    </div>

    <p v-if="isAdmin" class="hive-info-text spacing-top">Username from Database: {{ fetchedDbUserData }}</p>
    <p v-else-if="isAdmin" class="hive-info-text spacing-top">No users found.</p>
  </div>
</template>

<script>
import { db } from '@/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signOut, deleteUser, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
    const querySnapshot = await getDocs(collection(db, 'users'));
    if (!querySnapshot.empty) {
      this.fetchedDbUserData = querySnapshot.docs[0].data();
    }
  },
  computed: {
      isAdmin() {
          console.log(this.username)
          if (this.username == "Adi Jian") {
              return true
          }
          return false
      }
  },
  methods: {
    register() {
          console.log(this.email, this.password)
          createUserWithEmailAndPassword(getAuth(), this.email, this.password)
              .then((data) => {
                  console.log("Success", data);
                  // router.push("")
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
                this.isLoggedIn = true
                this.username = getAuth().currentUser.displayName
                // router.push()
            })
            .catch((error) => {
                console.error(error)
                alert(error.message)
            })
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

        this.isLoggedIn = false;
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