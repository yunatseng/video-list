<template>
  <div class="home">
    <a href="/"><img width="150" src="../assets/logo.png" /></a>
    <AppTable :videos="videos" />
  </div>
</template>

<script>
// @ is an alias to /src
import AppTable from "@/components/AppTable.vue";
import { getVideos } from "../apis/videos";
export default {
  name: "home",
  data() {
    return {
      videos: [],
    };
  },
  components: {
    AppTable,
  },
  created(){
    this.getVideos();
  },
  methods: {
    async getVideos() {
      const { items } = await getVideos();
      this.videos = items;
      console.log(items);
    },
  },
};
</script>
