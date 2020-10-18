<template>
  <div class="home">
    <img width="150" src="../assets/logo.png" />
    <AppTable :videos="videos" />
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
    },
  },
};
</script>
