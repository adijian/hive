<template>
    <div>
      <div class="social-list">
        <share-network
          v-for="network in networks"
          :key="network.network"
          v-slot="{ share }"
          :network="network.network"
          :title="sharingInfo.title"
          :url="sharingInfo.url"
          :description="sharingInfo.description"
          :quote="sharingInfo.quote"
          :hashtags="sharingInfo.hashtags"
          :twitterUser="sharingInfo.twitterUser"
          :media="sharingInfo.media"
        >
          <div
            class="social-network"
            @click="share"
            :style="{ backgroundColor: network.color }"
          >
            <i :class="network.icon"></i>
          </div>
        </share-network>
      </div>
    </div>
  </template>
  
<script setup>
    const networks = [
        {
            network: 'facebook',
            name: 'Facebook',
            icon: 'fab fah fa-lg fa-facebook-f',
            color: '#1877f2',
        },
        {
            network: 'reddit',
            name: 'Reddit',
            icon: 'fab fah fa-lg fa-reddit-alien',
            color: '#ff4500',
        },
        {
            network: 'x',
            name: 'X',
            icon: 'fab fah fa-lg fa-x-twitter',
            color: '#1da1f2',
        },
        {
            network: 'whatsapp',
            name: 'Whatsapp',
            icon: 'fab fah fa-lg fa-whatsapp',
            color: '#25d366',
        },
    ];
</script>

<script>
export default {
  props: {
    sharingInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleShare(shareInfo) {
      console.log('Shared info:', shareInfo);
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.social-list {
  max-width: 900px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.social-network {
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
  i {
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.3);
  }
  span {
    font-weight: 700;
    padding: 0.7rem;
    text-shadow: 2px 1px 2px rgb(0 0 0 / 80%);
  }
}
</style>