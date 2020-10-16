<template>
  <div class="collection">
    <a href="/collection"><img width="120" src="../assets/favorite.png"></a>
    <AppTable :videos="videos"/>
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
  created(){
    // const items = { ...localStorage };
    // console.log(items);
  },
  components: {
    AppTable
  },
  // watch:{
  //     videos: function() {
  //       this.videos = JSON.parse(localStorage.getItem(`favorite-videos`))
  //     }

  // }
}
</script>