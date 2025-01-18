<template>
    <div class="signup-container">
      <h2>Create Account</h2>
      <form @submit.prevent="handleSubmit" class="signup-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
          />
        </div>
  
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            required 
          />
        </div>
  
        <div class="form-group">
          <button type="submit" :disabled="isSubmitting" class="hive-button">Sign Up</button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
    <button class="hive-button spacing-top" @click="moveToLogin">Login</button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errorMessage: '',
        isSubmitting: false,
      };
    },
    methods: {
      moveToLogin() {
        this.$router.push('/')
      },
      validateForm() {
        if (!this.username || !this.email || !this.password || !this.confirmPassword) {
          this.errorMessage = 'All fields are required';
          return false;
        }
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Passwords do not match';
          return false;
        }
        this.errorMessage = '';
        return true;
      },
      async handleSubmit() {
        if (!this.validateForm()) return;
  
        this.isSubmitting = true;
        try {
          // Replace with your backend API for sign-up
          const response = await fetch('https://your-api-endpoint/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Sign-up failed. Please try again later.');
          }
  
          // Handle success (e.g., navigate to another page or show a success message)
          alert('Account created successfully');
          this.username = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        } catch (error) {
          this.errorMessage = error.message || 'Something went wrong. Please try again.';
        } finally {
          this.isSubmitting = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .signup-container {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    background-color: #282828;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
    color: #fff;
    height: 45vh;
  }
  
  .signup-container h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .signup-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #f1c40f;
  }
  
  input {
    margin-top: 5px;
  }
  
  input:focus {
    outline: none;
  }
  
  button {
    padding: 10px;
    background-color: #f1c40f; /* Yellow background */
    color: #282828; /* Dark text for button */
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #d4ac0d; /* Lighter yellow on hover */
  }
  
  button:disabled {
    background-color: #666; /* Disabled button color */
    cursor: not-allowed;
  }
  
  .error-message {
    color: #ff5c5c; /* Red error message */
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
  }

  .spacing-top {
    margin-top: 15px;
  }
  </style>
  