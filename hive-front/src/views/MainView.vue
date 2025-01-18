<template>
  <div>
    <h1 class="top-left">
      <span class="yellow">H</span>ive
    </h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MainView',
};
</script>

<style scoped>
.top-left {
  position: fixed;
  top: 10px;
  left: 10px;
}

.yellow {
  color: yellow; /* Make only the 'H' yellow */
}
</style>
