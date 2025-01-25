<template>
  <div class="friends-list p-4 h-screen flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold mb-4">Friends List</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search friends..."
      class="p-2 border rounded w-full max-w-md mb-4"
    />
    <ul class="w-full max-w-md">
      <li
        v-for="friend in filteredFriends"
        :key="friend.id"
        class="p-2 border-b flex justify-between items-center"
      >
        <span>{{ friend.name }}</span>
        <button @click="removeFriend(friend.id)" class="text-red-500">Remove</button>
      </li>
    </ul>
    <div v-if="!filteredFriends.length" class="text-gray-500 mt-4">No friends found.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      friends: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ]
    };
  },
  computed: {
    filteredFriends() {
      return this.friends.filter(friend =>
        friend.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    removeFriend(id) {
      this.friends = this.friends.filter(friend => friend.id !== id);
    }
  }
};
</script>

<style scoped>
.friends-list {
  width: 100vh;
  height: 100vh;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
