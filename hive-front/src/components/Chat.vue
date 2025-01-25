<template>
    <div class="chat-app">
      <div class="message-list" ref="messageList">
        <div 
          v-for="message in messages" 
          :key="message.id" 
          :class="['message', message.sender]"
        >
          {{ message.text }}
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="message-input">
        <input 
          v-model="messageText" 
          placeholder="Type a message..." 
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  </template>
  
  <script>
  import { auth } from '@/firebase'
  
  export default {
    mounted() {
      auth.onAuthStateChanged((user) => {
          if (user) {
            console.log(user.displayName)
          }
      })
    },
    data() {
      return {
        messages: [
          { id: 1, text: 'Welcome to the chat!', sender: 'system' }
        ],
        messageText: ''
      }
    },
    methods: {
      sendMessage() {
        if (this.messageText.trim()) {
          this.messages.push({
            id: this.messages.length + 1,
            text: this.messageText,
            sender: 'user'
          })
  
          setTimeout(() => {
            this.messages.push({
              id: this.messages.length + 1,
              text: `Hi`,
              sender: 'bot'
            })
          }, 1000)
  
          this.messageText = ''
        }
      },
      scrollToBottom() {
        const messageList = this.$refs.messageList
        if (messageList) {
          messageList.scrollTop = messageList.scrollHeight
        }
      }
    },
    updated() {
      this.scrollToBottom()
    }
  }
  </script>
  
  <style scoped>
  .chat-app {
    max-width: 400px;
    margin: 0 auto;
    height: 80vh;
    display: flex;
    flex-direction: column;
  }
  
  .message-list {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
  }
  
  .message {
    color: black;
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 12px;
    max-width: 80%;
  }
  
  .user {
    align-self: flex-end;
    background-color: #e6f2ff;
    margin-left: auto;
  }
  
  .bot {
    align-self: flex-start;
    background-color: #f0f0f0;
  }
  
  .system {
    text-align: center;
    color: #888;
    font-style: italic;
  }
  
  .message-input {
    display: flex;
    padding: 10px;
    background-color: #f5f5f5;
  }
  
  input {
    flex-grow: 1;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>