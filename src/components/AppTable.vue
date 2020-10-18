<template>
  <div class="app">
    <table class="app__table">
      <thead>
        <tr v-for="(header, index) in headers" :key="index">
          <td @click="sort_tasks('task')">
            {{ header.first }}
            <span v-if="helpers.sort_task">↓</span>
          </td>
          <td @click="sort_priority('priority')">
            {{ header.second }}
            <span v-if="helpers.sort_priority">↓</span>
          </td>
          <td @click="sort_done('done')">
            {{ header.third }}
            <span v-if="helpers.sort_done">↓</span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(video, index) in chunkVidoes[currentPage - 1]" :key="index">
          <td>
            <router-link
              :to="{
                name: 'videoPage',
                params: {
                  title: video.snippet.title,
                  description: video.snippet.description,
                },
              }"
            >
              <img :src="`${video.snippet.thumbnails.default.url}`" />
            </router-link>
          </td>
          <td>
            {{ video.snippet.title }}
            <div>
              影片長度：{{ convertTime(video.contentDetails.duration) }}
            </div>
          </td>
          <td class="more">
            <div :title="video.snippet.description">
              {{ extrat(video.snippet.description) }}
            </div>
            <div class="btn-container">
              <button
                class="btn-disfav"
                v-if="isInCollection(video.id)"
                @click="cancelCollect(video)"
              >
                取消收藏
              </button>
              <button class="btn-fav" v-else @click="collect(video)">
                我要收藏
              </button>
            </div>
          </td>
        </tr>
        <tr class="app__table-control">
          <td colspan="3">
            <div class="pagination-wrapper">
              <div class="app__table-select">Rows per page: 12</div>

              <div class="page-navi">
                <span @click="first">first</span>
                <span @click="decrement" class="ion-ios-arrow-left"></span>
                <ul class="pagination">
                  <li
                    v-for="page in totalPages"
                    :key="page"
                    :class="{ currentPage: currentPage === page }"
                    @click="navPage(page)"
                  >
                    {{ page }}
                  </li>
                </ul>
                <span @click="increment" class="ion-ios-arrow-right"></span>
                <span @click="least">least</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

import convertTime from "../components/utility/convertTime.js";

export default {
  props: {
    videos: {
      type: Array,
    },
  },
  name: "AppTable",
  data() {
    return {
      favVideos: JSON.parse(localStorage.getItem(`favorite-videos`)) || [],

      currentPage: 1,

      pagination_nr: 5,
      helpers: {
        start_from: 1,
        end_to: 5,
        counter: 2,
        sort_task: false,
        sort_priority: false,
        sort_done: false,
      },
    };
  },
  computed: {
    ...mapState(["database", "headers", "headers_on"]),

    totalPages() {
      return Math.ceil(this.videos.length / 12);
    },
    chunkVidoes() {
      const { videos, totalPages } = this;

      // [a, b, c, d] => 3 => [[a, b, c], [d]]
      const chunks = [];

      // totalVideos.slice(0, 12); push chunks
      // -> totalVideos.slice(12, 24); push chunks
      // -> ...
      for (let i = 0; i < totalPages; i++) {
        const chunk = videos.slice(12 * i, 12 * (i + 1));
        chunks.push(chunk);
        console.log(chunks);
      }

      return chunks;
    },
  },
  watch: {
    pagination_nr() {
      this.videos = this.database.slice(0, this.pagination_nr);
      this.helpers.start_from = 1;
      this.helpers.end_to = this.pagination_nr;
      this.helpers.counter = 2;
    },
    database() {
      this.videos = this.database.slice(0, this.pagination_nr);
    },
  },
  async created() {
    // this.videos = this.database.slice(0, this.pagination_nr);
    // if (localStorage.getItem("newTask")) {
    //   let localState = localStorage.getItem("newTask");
    //   this.$store.commit("build_DataBase", localState);
    // }
    // this.getVideos();
  },
  methods: {
    extrat(str) {
      if (str.length <= 100) return str;
      return str.slice(0, 100) + "...";
    },

    collect(video) {
      if (this.favVideos.some((v) => v.id === video.id)) return;

      this.favVideos = [...this.favVideos, video];
      localStorage.setItem(`favorite-videos`, JSON.stringify(this.favVideos));
    },

    cancelCollect(video) {
      const targetIndex = this.favVideos.findIndex((v) => v.id === video.id);

      this.favVideos.splice(targetIndex, 1);
      localStorage.setItem(`favorite-videos`, JSON.stringify(this.favVideos));

      this.$emit("cancel");
    },

    isInCollection(id) {
      return this.favVideos.some((v) => v.id === id);
    },

    convertTime(duration) {
      return convertTime(duration);
    },

    navPage(page) {
      this.currentPage = page;
    },
    first() {
      this.currentPage = 1;
    },
    least() {
      this.currentPage = this.totalPages;
    },
    increment() {
      if (this.currentPage === this.totalPages) return;
      this.currentPage++;
    },
    decrement() {
      if (this.currentPage === 1) return;
      this.currentPage--;
    },
    sort_tasks() {
      function compare(a, b) {
        const item1 = a.task.toUpperCase();
        const item2 = b.task.toUpperCase();

        let comparison = 0;
        if (item1 > item2) {
          comparison = 1;
        } else if (item1 < item2) {
          comparison = -1;
        }
        return comparison;
      }

      this.helpers.sort_task = true;
      this.helpers.sort_priority = false;
      this.helpers.sort_done = false;

      this.database.sort(compare);
    },
    sort_priority() {
      function compare(a, b) {
        const item1 = a.priority.toUpperCase();
        const item2 = b.priority.toUpperCase();

        let comparison = 0;
        if (item1 > item2) {
          comparison = 1;
        } else if (item1 < item2) {
          comparison = -1;
        }
        return comparison;
      }

      this.helpers.sort_task = false;
      this.helpers.sort_priority = true;
      this.helpers.sort_done = false;

      this.database.sort(compare);
    },
    sort_done() {
      function compare(a, b) {
        const item1 = a.done;
        const item2 = b.done;

        let comparison = 0;
        if (item1 > item2) {
          comparison = 1;
        } else if (item1 < item2) {
          comparison = -1;
        }
        return comparison;
      }

      this.helpers.sort_task = false;
      this.helpers.sort_priority = false;
      this.helpers.sort_done = true;

      this.database.sort(compare);
    },
  },
};
</script>

<style scoped lang="scss">
/* Table of contents
=====================
// 1. Variables
// 2. Base
// 3. Layout
// 4. Block + element
// 5. Modifier
// 6. State
// 7. Animations
=====================
*/

// 1. Variables
$pure-white: #ffffff;
$wood-brown: #494430;
$sweet-orange: #f79933;
$hole-dark: #525252;
$light-gray: #eeeef0;
$middle-gray: #d6d6d6;
$hell-dark: #1d1d1d; // 1. Font Faces
// 2. Base
.app {
  min-width: 100%;
  background: $pure-white;
  font-size: 62.5%;
  color: $hole-dark;
  user-select: none;
} // 3. Layout
// 4. Block + element
.app__table {
  width: 100%;
  // max-width: 670px;
  min-width: 290px;
  margin: 0 auto 100px auto;
  font-size: 1rem;
  text-align: left;
  border: 1px solid $middle-gray;
  box-shadow: 0 0 0 7px $light-gray;
  border-collapse: collapse;
}

thead {
  background: $wood-brown;
  color: $pure-white;
  td {
    border: none;
    cursor: pointer;
  }
}

td {
  padding-left: 1px;
  height: 47px;
  @media screen and (min-width: 641px) {
    padding-left: 15px;
  }
}

.more {
  max-width: 150px;
  @media screen and (min-width: 641px) {
  max-width: 900px;
  }
}

tbody {
  td {
    border-bottom: 1px solid $middle-gray;
  }
}

.app__table-control {
  text-align: right;
  td {
    padding-right: 30px;
  }
}

.app__table-select {
  display: none;
  @media screen and (min-width: 641px) {
    display: flex;
    margin-right: 20px;
  }
}

select {
  border: none;
  color: $hole-dark;
  font-size: 1rem;
  width: 75px;
  margin-right: 32px;
  padding-left: 5px;
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 2px solid $middle-gray;
  cursor: pointer;
  transition: background 0.3s;
}

input[type="checkbox"]:checked + label {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background: $sweet-orange;
  cursor: pointer;
  position: relative;
  border: 1px solid $sweet-orange;
  transition: background 0.3s;
}

input[type="checkbox"]:checked + label:after {
  content: "✓";
  position: absolute;
  color: $pure-white;
  top: -3px;
  left: 2px;
}

.ion-ios-arrow-left {
  padding-right: 10px;
  padding-left: 10px;
}

.ion-ios-arrow-right {
  padding-right: 10px;
  padding-left: 10px;
}

.page-navi {
  display: flex;
  cursor: pointer;
}
// .pagination li,
// .ion-ios-arrow-left,
// .ion-ios-arrow-right {
//   cursor: pointer;
// } 

.pagination-wrapper {
  display: flex;
  justify-content: center;
}

.pagination {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.pagination li {
  margin: 0 2px;
  width: 20px;
  height: 20px;
  text-align: center;
  &:hover{
    font-weight: bold;
  }
}

.btn-container {
  padding: 16px;
  text-align: right;
}

.btn-disfav {
  background-color: lemonchiffon;
  &:hover {
    background-color:rgb(239, 239, 239);
    font-weight: bold;
  }
}

.btn-fav {
  &:hover {
    background-color: lemonchiffon;
    font-weight: bold;
  }
}

.currentPage {
  background-color: #01b7e5;
  color: white;
  border-radius: 50%;
}
span {
  &:hover{
    font-weight: bold;
  }
}
</style>
