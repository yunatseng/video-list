<template>
  <div class="home">
    <img width="150" src="../assets/logo.png" />
    <AppTable :videos="videos" />
    <div v-if="showLoading" id="html-spinner"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppTable from "@/components/AppTable.vue";
import { getVideos, getNextVideos } from "../apis/videos";
export default {
  name: "home",
  data() {
    return {
      videos: [],
      showLoading:true
    };
  },
  components: {
    AppTable,
  },
  created() {
    this.getVideos();
  },
  methods: {
    async getVideos() {
      let totalVideos = [];

      const { items, nextPageToken } = await getVideos();
      totalVideos = [...items];

      const { items: lastItems } = await getNextVideos(nextPageToken);
      totalVideos = [...totalVideos, ...lastItems];

      this.videos = totalVideos;
      this.showLoading = false
    },
  },
};
</script>

<style scoped>

#html-spinner{
  position:fixed;
  top: 50%;
  left: 50%;
  margin-left: -30px;
  width:50px;
  height:50px;
  border:6px solid #fcd779;
  border-top:4px solid white;
  border-radius:50%;
}

#html-spinner, #svg-spinner{
  -webkit-transition-property: -webkit-transform;
  -webkit-transition-duration: 1.2s;
  -webkit-animation-name: rotate;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  
  -moz-transition-property: -moz-transform;
  -moz-animation-name: rotate; 
  -moz-animation-duration: 1.2s; 
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  
  transition-property: transform;
  animation-name: rotate; 
  animation-duration: 1.2s; 
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@-webkit-keyframes rotate {
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}

@-moz-keyframes rotate {
    from {-moz-transform: rotate(0deg);}
    to {-moz-transform: rotate(360deg);}
}

@keyframes rotate {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
</style>