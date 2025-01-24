<template>
    <ShareNetwork :sharingInfo="sharingInfo" />
  </template>
  
  <script>
  import ShareNetwork from './ShareNetwork.vue';
  
  export default {
    components: {
        ShareNetwork
    },
    data() {
      return {
        sharingInfo: {
          title: "Bzzzz... Someone shared this with you!",
          url: window.location.href,
          description: 'Check this out!',
          quote: '',
          hashtags: '',
          twitterUser: '',
          media: '/hive.png'
        }
      };
    }
  }
  </script>
  