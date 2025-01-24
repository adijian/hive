<template>
    <div class="hive-container">
        <h1>Create an Account</h1>
        <p><input type="email" placeholder="Email" v-model="email" class="hive-input"></p>
        <p><input type="password" placeholder="Password" v-model="password" class="hive-input"></p>
        <p><button @click="register" class="hive-button ">Submit</button></p>
        <p><button @click="signInWithGoogle" class="hive-button spacing-top">Sign In With Google</button></p>
        <p><button @click="handleSignOut" class="hive-button spacing-top">Sign Out</button></p>
        <p><button @click="removeUser" class="hive-button spacing-top">Debug delete</button></p>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, signOut, deleteUser, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default {
    data() {
        return {
            email: undefined,
            password: undefined,
            isLoggedIn: false
        };
    },
    computed: {
        isAdmin() {
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
                    console.log(result.user)
                    // router.push()
                })
                .catch((error) => {
                    console.error(error)
                    alert(error.message)
                })
        },
        signOut() {
            auth = getAuth()
                signOut(auth).then((data) => {
                    console.log("Successfully signed out", data)
                })
                .catch((error) => {
                    console.error(error)
                    alert(error.message)
                })
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
    }
}
</script>

<style scoped>
    .spacing-top {
        margin-top: 15px;
    }
</style>