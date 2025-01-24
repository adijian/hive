import { defineStore } from 'pinia';
import { getAuth } from "firebase/auth";

export const useAuthStore = defineStore('auth', {
    state: () => ({
      auth: null
    }),
  
    actions: {
      initializeAuth() {
        if (!this.auth) {
          this.auth = getAuth();
        }
      }
    }
  });
  