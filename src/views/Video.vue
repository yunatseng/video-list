<template>
  <div>
    <h2>預設為影片自動播放且靜音，欲開啟聲音可按下方按鈕 或 影片功能列</h2>
      <button id="unmuteButton" @click="muteControl">靜音切換</button>
      <div v-if="showAD" class="ad">I am AD</div>
   
    <div>
      <video ref="video" controls muted autoplay @play="play" @pause="pause"></video>
    </div>
     <div>
      <h2>Choose columns to display:</h2>
      <div class="wrap">add new task</div>
    </div>
  </div>
</template>

<script>
import Hls from "hls.js";

const VIDEO_URL = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'

export default {
  name: "videoPage",
  data() {
    return {
      mute:true,
      showAD:false
    };
  },

  methods: {
      pause() {
      this.showAD = true
    },
    play(){
      this.showAD = false
    },
    muteControl(){
    var video = this.$refs.video;
    this.mute = !this.mute
video.muted = this.mute;

}

  },
  mounted() {
    var video = this.$refs.video;

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(VIDEO_URL);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_URL;
      video.addEventListener("loadedmetadata", function () {
        video.play();
      });
    }
  },

};
</script>


<style lang="scss">
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
// 2. Base
h2 {
  text-align: center;
}
video {
  width: 100% !important;
  height: auto !important;
}
.form {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  -moz-box-direction: normal;
  -webkit-box-direction: normal;
  max-width: 99%;
  @media screen and (min-width: 700px) {
    max-width: 60%;
  }
  margin: 0 auto;
  text-align: left;
}
input[type="checkbox"] {
  display: flex;
  margin-left: 0;
}
input,
select {
  height: 36px;
  border: 1px solid #efefef;
  border-radius: 3px;
  background-color: #fafafa;
  width: 100%;
  font-size: 12px;
  padding: 9px 0 7px 8px;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  margin: 10px 0 10px 0;
}
input#name:focus,
input#password:focus {
  border-color: #bbb;
}
label {
  font-size: 0.9rem;
  color: #9b9b9b;
}
// 3. Layout
// 4. Block + element
.wrap {
  @media screen and (min-width: 420px) {
    margin: 10px 40px;
  }
}
.input__checkbox {
  display: flex;
  align-items: center;
  @media screen and (min-width: 420px) {
    margin: 10px 40px;
  }
}
.button-wrap {
  display: block;
  position: relative;
  margin: 8px 40px;
}
.btn {
  cursor: pointer;
  width: 100%;
  padding: 0 8px;
  background: #3897f0;
  border: 1px solid #3897f0;
  color: #fff;
  border-radius: 3px;
  font-weight: 600;
  font-size: 14px;
  height: 35px;
  line-height: 26px;
  outline: none;
  white-space: nowrap;
}

// 5. Modifier
.is--incorrect {
  color: #f44242;
}
.is--correct {
  color: #41f48c;
}
</style>