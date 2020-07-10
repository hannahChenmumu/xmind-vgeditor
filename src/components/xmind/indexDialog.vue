<template>
  <section class="xmind-wrap">
    <el-button
      @click="onFullmode"
      type="success" icon="el-icon-full-screen"
      class="xmind-fullscreenbtn"
      :loading="!visibleMain"
      :disabled="!visibleMain"
    >全屏模式</el-button>
    
    <fullscreen
      @change="fullscreenChange"
      background="#fff"
      ref="fullscreen"
    >
      <xmind
        v-model="data"
        :base-height="elementHeight"
        :mode-fullscreen="modeFullscreen"
        :export-file-name="fileNameExport"
        v-if="visibleMain"
      ></xmind>
    </fullscreen>

  </section>
</template>
<script>
import xmind from './index';
import fullscreen from 'vue-fullscreen/src/component.vue';

export default {
  name: 'XmindIndexDialog',
  components: {
    xmind,
    fullscreen,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    baseHeight: {
      type: Number,
      default: 500,
    },
    fileNameExport: {
      type: String,
      default: '测试用例Xmind',
    },
  },
  data() {
    return {
      data: {},
      modeFullscreen: false,
      elementHeight: 500,
      elementWidth: 600,
      visibleMain: true,
    };
  },
  watch: {
    data: {
      handler(val) {
        this.$emit('input', val);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // ----------------- 全屏 -------------------
    fullscreenChange(isFull) {
      if (isFull) {
        this.onFullmode();
      } else {
        this.onInnermode();
      }
    },
    setFullArea() {
      this.elementHeight = document.body.clientHeight - 139;
      this.forceUpdate();
    },
    onFullmode() {
      this.modeFullscreen = true;
      this.setFullArea();
    },
    setInnerArea() {
      this.elementHeight = 500;
      this.forceUpdate();
    },
    onInnermode() {
      this.modeFullscreen = false;
      this.setInnerArea();
      this.$emit('input', this.data);
    },
    /**
     * 为解决firefox或windows下update失效的问题
     * 编辑器区域默认设置全屏的宽高，若update有效则会被重置为内嵌页面的高度
     */
    forceUpdate() {
      this.visibleMain = false;
      this.$nextTick(() => {
        this.visibleMain = true;
      });
    },
  },
  created() {
    this.data = this.value;
    this.onInnermode();
  },
};
</script>

<style lang="scss">
.xmind-wrap {
  position: relative;
  .xmind-fullscreenbtn {
    position: absolute;
    right: 4px;
    top: -48px;
    z-index: 5;
  }
  .xmind-ide {
    position: fixed!important;
    border: 1px solid #e6e9ed;
    .el-alert__description {
      font-size: 14px;
      font-weight: 600;
      i {
        color: #999;
        font-size: 14px;
        font-style: normal;
      }
    }
    .el-dialog.is-fullscreen {
      .el-dialog__header {
        padding: 10px 20px 0;
      }
    }
    &.dialog-pretend-to-content.el-dialog__wrapper {
      position: static!important;
      // overflow: hidden;
      .el-dialog {
        position: static;
        overflow: hidden;
        width: 100%;
        margin: 0!important;
        .el-dialog__header {
          padding: 0;
        }
        .el-dialog__body {
          padding: 0;
        }
      }
    }
  }
}
</style>
