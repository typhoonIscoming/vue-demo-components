<template>
    <div class="D common">
        <common title="d"></common>
        <div class="content">
          <div class="total">
              <!-- 扫码区域 -->
              <div id="outdiv" class="scanning_frame">
                  <video id="v" autoplay></video>
                  <canvas id="qr-canvas"></canvas>
                  <!--加载动画-->
                  <div class="spinner" id="loading">
                      <div class="double-bounce1"></div>
                      <div class="double-bounce2"></div>
                  </div>
              </div>
              <div class="infor">请扫描车上的二维码</div>
              <!-- 展示扫码结果 -->
              <div>
                  <p id="result"></p>
              </div>
          </div>
        </div>
        <div class="bottom">
            D页面
        </div>
    </div>
</template>

<script>
import common from "@/components/common";
export default {
  data() {
    return {};
  },
  components: {
    common
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
@import '@/css/common.scss';

</style>