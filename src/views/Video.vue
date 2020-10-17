<template>
  <div>
    <h3>預設為影片自動播放且靜音，欲開啟聲音可按下方按鈕 或 影片功能列</h3>
    <button class="btn" id="unmuteButton" @click="muteControl">靜音切換</button>

    <div v-if="showAD" class="ad">
      <a
        href="http://ajtaiwan.com/"
        target="_blank"
        class="HPDKSWidget"
      >
        <div class="HPDKSWidget-wrap">
          <p class="HPDKSWidget-text">
            Perfect Marketing Partner
            <em class="HPDKSWidget-brand">High Performance Product</em>!
          </p>
          <button class="HPDKSWidget-cta">ALLIED JUBILEE &#8594;</button>
        </div>
      </a>
    </div>

    <div>
      <video
        ref="video"
        controls
        muted
        autoplay
        @play="play"
        @pause="pause"
      ></video>
    </div>
    <div>
      <h2>{{title}}</h2>
      <div class="wrap">{{description}}</div>
    </div>
  </div>
</template>

<script>
import Hls from "hls.js";

const VIDEO_URL =
  "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

export default {
  name: "videoPage",
  data() {
    return {
      mute: true,
      showAD: false,
      title: this.$route.params.title,
      description:this.$route.params.description
    };
  },

  methods: {
    pause() {
      this.showAD = true;
    },
    play() {
      this.showAD = false;
    },
    muteControl() {
      var video = this.$refs.video;
      this.mute = !this.mute;
      video.muted = this.mute;
    },
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
  width: 90% !important;
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
  
}
.btn {
  cursor: pointer;
  width: 50%;
  margin: 8px 40px;
  padding: 0 8px;
  background: #01b7e5;
  border: 1px solid #01b7e5;
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
@keyframes HPDKSWidget-raiseBanner {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

.HPDKSWidget {
  position: fixed;
  bottom: 0;
  display: block;
  width: 100%;
  z-index: 80;

  background-color: #01b7e5;
  background-image: linear-gradient(#01b7e5, darken(#01b7e5, 8%));
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  text-decoration: none;

  animation-name: HPDKSWidget-raiseBanner;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.17, 0.04, 0.03, 0.94);
  animation-duration: 0.8s;

  &,
  * {
    box-sizing: border-box;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  &:hover .HPDKSWidget-cta {
    background: #2bde73;
  }
}

.HPDKSWidget:before {
  position: absolute;
  top: -14px;
  display: block;
  width: 100%;
  height: 14px;
  content: "";
  background-color: #01b7e5;
  background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 35"><polygon fill="%23ffffff" points="40,0 22.8,0 0,35 17.2,35 "/></svg>');
}

.HPDKSWidget-wrap {
  display: flex;
  max-width: 49em;
  margin: 0 auto;
  padding: 0.5em 1em;

  justify-content: space-around;
  align-items: center;
}

.HPDKSWidget-text {
  margin: 0 2em 0 0;
  line-height: 1.35;
  color: #fff;
  text-shadow: 0 0 1px #999;
}

.HPDKSWidget-brand {
  text-transform: uppercase;
  font-weight: 700;
}

.HPDKSWidget-cta {
  flex: 0 0 14em;
  padding: 0.8em 1em;
  border: none;
  border-radius: 2px;
  background: #2f2f2f;
  font-size: 0.8125em;
  font-style: italic;
  font-weight: 700;
  line-height: 1.35;
  text-transform: uppercase;
  color: #fff;
  cursor: pointer;

  transition: background 0.5s ease;
}

@media (min-width: 780px) {
  .HPDKSWidget {
    font-size: 16px;
  }
}

/* BODY OVERRIDES TO FIT BANNER */
body {
  margin: 0;
  padding-bottom: 68px;
}
</style>