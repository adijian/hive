<template>
  <div>
    <h1 class="top-left logo-container">
      <span class="yellow">H</span>ive
      <img src="../../public/hive.png" alt="Logo" height="27">
    </h1>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.top-left {
  position: fixed;
  top: 10px;
  left: 10px;
}

.yellow {
  color: yellow;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
