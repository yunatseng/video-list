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
        <tr v-for="(video, index) in videos" :key="index">
          <td><img :src="`${video.snippet.thumbnails.default.url}`" /></td>
          <td>
            {{ video.snippet.title }}
            <div>
              影片長度：{{ convertTime(video.contentDetails.duration) }}
            </div>
          </td>
          <td>
            <div :title="video.snippet.description" class="more">
              {{ video.snippet.description }}
            </div>
            <button v-if="isInCollection(video.id)" @click="cancelCollect(video)">取消收藏</button>
            <button v-else @click="collect(video)">我要收藏</button>

          </td>
        </tr>
        <tr class="app__table-control">
          <td colspan="3">
            <div class="app__table-select">Rows per page: 12</div>
            {{ helpers.start_from }} - {{ helpers.end_to }} of
            {{ database.length }}
            <span @click="decrement" class="ion-ios-arrow-left"></span>
            <span @click="increment" class="ion-ios-arrow-right"></span>
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
  computed: mapState(["database", "headers", "headers_on"]),
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
    collect(video) {
      if (this.favVideos.some((v) => v.id === video.id)) return;

      this.favVideos = [...this.favVideos, video];
      localStorage.setItem(`favorite-videos`, JSON.stringify(this.favVideos));
    },

    cancelCollect(video) {
      const targetIndex = this.favVideos.findIndex(v => v.id === video.id);

      this.favVideos.splice(targetIndex, 1);
      localStorage.setItem(`favorite-videos`, JSON.stringify(this.favVideos));

      this.$emit('cancel')
    },

    isInCollection(id) {
      return this.favVideos.some(v => v.id === id);
    },

    convertTime(duration) {
      return convertTime(duration);
    },

    increment() {
      let pageNum = this.pagination_nr,
        ends = this.helpers.end_to,
        starts = this.helpers.start_from,
        count = this.helpers.counter;

      this.videos = this.database.slice(pageNum * (count - 1), pageNum * count);

      if (ends + pageNum < this.database.length) {
        this.helpers.counter += 1;
        this.helpers.end_to = ends + pageNum;
        this.helpers.start_from = starts + pageNum;
      } else {
        this.helpers.end_to = this.database.length;
        if (
          ends + pageNum > this.database.length &&
          ends + pageNum < this.database.length + pageNum
        ) {
          this.helpers.start_from = starts + pageNum;
        }
      }
      console.log(count);
    },
    decrement() {
      let pageNum = this.pagination_nr,
        ends = this.helpers.end_to,
        starts = this.helpers.start_from,
        count = this.helpers.counter - 1,
        first = this.database.length % this.pagination_nr;

      if (count >= 1) {
        this.helpers.counter -= 1;
        this.videos = this.database.slice(
          pageNum * (count - 1),
          pageNum * count
        );
      }

      if (this.helpers.counter === 1) {
        this.helpers.counter = 2;
      }

      console.log(count);

      if (ends > pageNum) {
        if (this.helpers.end_to % this.pagination_nr != 0) {
          this.helpers.end_to -= first;
          this.helpers.start_from = starts - pageNum;
          return;
        }
        this.helpers.end_to = ends - pageNum;
        this.helpers.start_from = starts - pageNum;
      } else {
        this.helpers.end_to = this.pagination_nr;
        this.helpers.start_from = 1;
      }
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
  height: 47px;
  padding-left: 15px;
}

.more {
  width: 650px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  @media screen and (min-width: 420px) {
    display: inline-block;
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
  padding-left: 5px;
}

.ion-ios-arrow-right {
  padding-right: 10px;
  padding-left: 5px;
}

.ion-ios-arrow-left,
.ion-ios-arrow-right {
  cursor: pointer;
} // 5. Modifier
// 6. State
// 7. Animations
</style>
