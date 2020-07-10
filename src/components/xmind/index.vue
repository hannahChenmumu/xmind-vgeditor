<template>
  <v-g-editor ref="xmindEditor" class="xmind" :style="{height:baseHeight+72+'px'}">
    <div class="xmind-chart">
      <div class="xmind-chart__header">
        <mind-toolbar
          @changeTag="onChangeTag"
          :showtag="showtag"
          :readonly="readonly"
          ref="xmindToolbar"
        />
        <div class="toolside" v-if="!readonly || showexport">
          <readme
            title="操作说明"
            style="margin-right:10px;"
          ></readme>
          <el-dropdown :type="readonly ? '' : 'primary'">
            <el-button>
              导出图片<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><el-button @click="onExport('image/png')" type="text">导出PNG</el-button></el-dropdown-item>
              <el-dropdown-item><el-button @click="onExport('image/jpg')" type="text">导出JPG</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="xmind-chart__container" ref="refContainer">
        <div class="xmind-chart__main">
          <mind
            :data="data"
            :onNodeClick="onNodeClick"
            :onAfterChange="onSave"
            :graph="graphConfig"
            :style="{width: `${baseWidth}px`, height: `${baseHeight}px`}"
            ref="xmindMain"
          ></mind>
        </div>
        <div class="xmind-chart__panel">
          <minimap :height="200" />
        </div>
      </div>
    </div>
    <mind-context-menu v-if="!readonly" />
    <editor-custom-node />
  </v-g-editor>
</template>
<script>
import VGEditor, { Mind, Minimap } from 'vg-editor';
import MindToolbar from './Toolbar/MindToolbar';
import MindContextMenu from './MindContextMenu';
import EditorCustomNode from './EditorCustomNode';
import './Icon/iconfont';
import mockData from './mockData';
import { exportCanvasToImage } from './util.js';
import readme from './readme';

const graphConfigReadony = {
  mode: 'readOnly',
  modes: {
    readOnly: ['panCanvas', 'clickEdgeSelected', 'clickNodeSelected', 'clickCanvasSelected', 'clickGroupSelected'],
  },
};

export default {
  name: 'ComponentXmind',
  components: {
    VGEditor,
    Mind,
    Minimap,
    MindToolbar,
    MindContextMenu,
    EditorCustomNode,
    readme,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    showtag: {
      type: Boolean,
      default: true,
    },
    showexport: {
      type: Boolean,
      default: true,
    },
    fileNameExport: {
      type: String,
      default: '',
    },
    baseHeight: {
      type: Number,
      default: 300,
    },
    modeFullscreen: Boolean,
  },
  data() {
    return {
      data: {},
      graphConfig: {},
      baseWidth: 0,
    };
  },
  watch: {
    baseHeight(newval, oldval) {
      if (newval !== oldval) {
        this.setWidth();
      }
    },
  },
  methods: {
    /**  初始化节点样式 */
    setWidth() {
      this.baseWidth = this.$refs.refContainer.clientWidth * 0.85 - 2;
    },
    setInit() {
      const { executeCommand } = this.$refs.xmindEditor.propsAPI;
      this.$nextTick(() => {
        executeCommand(() => {
          this.setItem(this.data.roots[0].children);
        });
      });
    },
    setItem(subs = []) {
      const { find, update } = this.$refs.xmindEditor.propsAPI;
      if (subs.length) {
        subs.forEach((one) => {
          const item = find(one.id);
          update(item, {
            shape: item.model.icon || 'node-normal',
            collapsed: false,
          });
          if (one.children && one.children.length) {
            this.setItem(one.children);
          }
        });
      }
    },
    /**  点击节点 */
    onNodeClick() { // event
      // const { item, domEvent } = event;
      // const { model: { collapsed, children }, isRoot } = item;
      // // 不允许折叠：跟节点 或 叶子节点 或 是按钮类型
      // if (isRoot || (children && children.length === 0) || domEvent.button !== 0) {
      //   return;
      // }
      // const { executeCommand, update } = this.$refs.xmindEditor.propsAPI;
      // executeCommand(() => {
      //   update(item, {
      //     collapsed: !collapsed,
      //   });
      // });
    },
    /**  设置图标符号 */
    onChangeTag(shapeName) {
      const { getSelected, executeCommand, update } = this.$refs.xmindEditor.propsAPI;
      const item = getSelected()[0];
      if (!item || item.isRoot || !item.getModel()) {
        return;
      }
      executeCommand(() => {
        update(item, { shape: shapeName || 'node-normal' });
      });
    },
    /**  输出结果 */
    getOutputData(subs = []) {
      return subs.map(({
        id, label, shape, side, children,
      }) => ({
        id,
        label,
        side,
        icon: shape,
        children: this.getOutputData(children),
      }));
    },
    onSave() {
      // const data = this.$refs.xmindEditor.propsAPI.save(); // 默认方式缺少shape属性
      const resData = { roots: [...this.getOutputData(this.data.roots)] };
      this.$emit('input', resData);
    },
    /** 导出图片 */
    onExport(pattern) {
      const canvas = document.querySelector('canvas');
      exportCanvasToImage(canvas, pattern, `${this.fileNameExport}` || 'Xmind', '#fff');
    },
  },
  created() {
    if (!Object.keys(this.value).length) {
      this.data = JSON.parse(JSON.stringify(mockData));
      this.onSave();
    } else {
      this.data = this.value;
    }
    this.$nextTick(() => {
      this.setInit();
    });
    if (this.readonly) {
      this.graphConfig = graphConfigReadony;
    }
  },
  mounted() {
    this.setWidth();
  },
};
</script>
<style lang="scss">
.xmind-chart {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 42px;
    max-height: 72px;
    display: flex;
    align-items: center;
    font-size: 12px;
    background-color: #fff;
    border-bottom: 1px solid #e6e9ed;
    .toolbar {
      flex: 1;
      padding-top: 4px;
      vertical-align: middle;
    }
    .toolside {
      text-align: right;
      margin-right: 20px;
    }
  }
  &__container {
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 73px;
    overflow: hidden;
  }
  &__main {
    flex: 1;
    height: 400px;
  }
  &__panel {
    width: 15%;
    background-color: #fafafa;
    border-left: 1px solid #e6e9ed;
  }
}
.el-table__fixed-right {
  .xmind {
    visibility: hidden;
  }
}
</style>
