<template>
    <div class="A common">
        <common title="a"></common>
        <div class="content">
          <!-- <selectList
            v-if="showList"
            v-model="selected"
            :option-list="list"
            :is-single="false"/>
          <div class="model-content"></div> -->
          <!-- <img :src="logo" /> -->
          <!-- <rotate
            :list="list"
          /> -->
          <video id="video"></video>
        </div>
        <div
          class="bottom"
          @click="selectEvent">
            bottom
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
import select from '@/components/multiSelect';
import logo from 'pic#/logo.png'
import rotate from '@/components/rotate'
export default {
  data() {
    return {
      list: [
        { id: 1, relation: '子女', mobile: '13558513096' },
        { id: 2, relation: '子女', mobile: '13558513095' },
      ],
      showList: true,
      selected: [],
      logo,
    };
  },
  components: {
    common,
    'selectList': select,
    rotate,
  },
  created() {
    let a = 9, b = 5;
    a = a ^ b;
    b = b ^ a;
    a = a ^ b;
    console.log('a', a, 'b', b)
  },
  mounted() {
    this.initPlayer()
  },
  methods: {
    selectEvent() {
      console.log(111111)
      this.showList = true
    },
    initPlayer() {
      // const url = "rtsp://172.19.9.170:8554/stream1"
      // const hongkong = 'rtmp://live.hkstv.hk.lxdns.com/live/hks'
      // const chongqing = 'rtmp://live5.cqnews.net:1935/live/TVFLV15'
      // const zhuhai = 'rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov'
      // new ckplayer({
      //   // container: '#video',
      //   variable: 'player01',//该属性必需设置，值等于下面的new chplayer()的对象
      //   video: url,//视频地址
      // });
      var video = document.getElementById('video');
      if(Hls.isSupported()) {
          var hls = new Hls();
          hls.loadSource('https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
          // hls.loadSource('rtmp://live.hkstv.hk.lxdns.com/live/hks')
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED,function() {
              video.play();
          });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
          video.addEventListener('loadedmetadata',function() {
          video.play();
          });
      }
    },
  },
  watch: {
    selected(newvalue) {
      console.log('this datavalue', newvalue)
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/common.scss';
.A{
  #video{
    width: 100%;
    height: 200px;
  }
}
</style>