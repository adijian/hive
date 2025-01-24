<template>
    <div class="feed-container">
      <div class="feed-header">
        <h2>{{ title }}</h2>
        <button @click="showPostForm = true" class="create-post-btn">
          Create Post
        </button>
      </div>
  
      <!-- Post Creation Form -->
      <div v-if="showPostForm" class="post-form">
        <form @submit.prevent="submitPost">
          <input 
            v-model="newPost.title" 
            placeholder="Post Title" 
            required 
            maxlength="100"
          >
          <textarea 
            v-model="newPost.text" 
            placeholder="What's on your mind?" 
            :maxlength="250"
            required
          ></textarea>
          <div class="form-footer">
            <span>{{ 250 - newPost.text.length }} characters left</span>
            <div>
              <button type="button" @click="cancelPost">Cancel</button>
              <button type="submit" :disabled="newPost.text.length > 250">Post</button>
            </div>
          </div>
        </form>
      </div>
  
      <div v-if="loading" class="loading">
        Loading posts...
      </div>
  
      <div v-else-if="posts.length === 0" class="no-posts">
        No posts available
      </div>
  
      <div v-else class="posts-list">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <div class="post-header">
            <div class="post-author-info">
              <h3>{{ post.author.name }}</h3>
              <span class="post-timestamp">
                {{ formatTimeAgo(post.timestamp) }}
              </span>
            </div>
          </div>
  
          <div class="post-content">
            <h4>{{ post.title }}</h4>
            <p>{{ post.text }}</p>
          </div>
  
          <div class="post-interactions">
            <button @click="likePost(post)" class="interaction-btn">
              <span :class="{ 'liked': post.liked }">
                👍 {{ post.likes }}
              </span>
            </button>
            <button @click="commentOnPost(post)" class="interaction-btn">
              💬 {{ post.comments?.length || 0 }}
            </button>

          </div>
        </div>
      </div>
      <ShareNetwork :sharingInfo="sharingInfo" />
    </div>
  </template>
  
  <script>
  import ShareNetwork from './ShareNetwork.vue';
  import Cookies from 'js-cookie'
  
  export default {
    components: {
      ShareNetwork
    },
    props: {
      title: {
        type: String,
        default: 'Social Feed'
      }
    },
    async mounted() {
      const cookie = Cookies.get('username')
      if (cookie == null) {
        this.$router.push('/')
      }
    },
    data() {
      return {
        posts: [],
        loading: false,
        showPostForm: false,
        newPost: {
          title: '',
          text: ''
        },
        sharingInfo: {
          title: "Bzzzz... Someone shared this with you!",
          url: window.location.href,
          description: 'Check this out!',
          quote: '',
          hashtags: '',
          twitterUser: '',
          media: '/hive.png'
        }
      }
    },
    methods: {
      submitPost() {
        if (this.newPost.text.length > 250) return
  
        const post = {
          id: Date.now(),
          title: this.newPost.title,
          text: this.newPost.text,
          author: {
            name: 'Current User',
            avatar: ''
          },
          timestamp: new Date(),
          likes: 0,
          comments: []
        }
  
        this.posts.unshift(post)
  
        this.newPost = { title: '', text: '' }
        this.showPostForm = false
      },
      cancelPost() {
        this.showPostForm = false
        this.newPost = { title: '', text: '' }
      },
      likePost(post) {
        post.likes++
      },
      commentOnPost(post) {
        // Placeholder for comment functionality
      },
      formatTimeAgo(timestamp) {
        const now = new Date()
        const postDate = new Date(timestamp)
        const diffSeconds = Math.floor((now - postDate) / 1000)
  
        if (diffSeconds < 60) return `${diffSeconds} seconds ago`
        if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} minutes ago`
        if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hours ago`
        return `${Math.floor(diffSeconds / 86400)} days ago`
      }
    }
  }
  </script>
  
  <style scoped>
  .post-form {
    background: #f4f4f4;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  
  .post-form input, 
  .post-form textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
  }
  
  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  </style>