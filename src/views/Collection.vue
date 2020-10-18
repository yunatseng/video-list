<template>
  <div class="collection">
    <a href="/collection"><img width="120" src="../assets/favorite.png"></a>
    <AppTable :videos="videos" @cancel='cancel'/>
  </div>
</template>

<script>
// @ is an alias to /src
import AppTable from '@/components/AppTable.vue'

export default {
  name: 'collection',
  data() {
    return {
      videos: JSON.parse(localStorage.getItem(`favorite-videos`)) || [],
    };
  },
  methods:{
      cancel(){
          this.videos = JSON.parse(localStorage.getItem(`favorite-videos`)) || []
      }
  },
  components: {
    AppTable
  },
}
</script>