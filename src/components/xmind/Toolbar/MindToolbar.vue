<template>
  <toolbar class='toolbar'>
    <toolbar-button command="undo" :showtag="showtag" direction="vertical" v-if="!readonly">撤销</toolbar-button>
    <toolbar-button command="redo" :showtag="showtag" direction="vertical" v-if="!readonly">重做</toolbar-button>
    <el-divider direction="vertical" v-if="!readonly"></el-divider>
    <toolbar-button command="zoomIn" icon="zoom-in" text="Zoom In" :showtag="showtag" direction="vertical">放大</toolbar-button>
    <toolbar-button command="zoomOut" icon="zoom-out" text="Zoom Out" :showtag="showtag" direction="vertical">缩小</toolbar-button>
    <el-divider direction="vertical"></el-divider>
    <div :class="showtag ? 'group' : 'groupinline'">
      <toolbar-button command="autoZoom" icon="fit-map" text="Fit Map" :showtag="showtag" ref="refAutoZoom">自适应比例</toolbar-button>
      <toolbar-button command="resetZoom" icon="actual-size" text="Actual Size" :showtag="showtag" ref="refResetZoom">原始比例</toolbar-button>
    </div>
    <el-divider direction="vertical" v-if="!readonly"></el-divider>
    <div :class="showtag ? 'group' : 'groupinline'" v-if="!readonly">
      <toolbar-button command="append" text="Topic" :showtag="showtag">添加同级</toolbar-button>
      <toolbar-button command="appendChild" icon="append-child" text="Subtopic" :showtag="showtag">添加下级</toolbar-button>
    </div>
    <el-divider direction="vertical" v-if="!readonly"></el-divider>
    <div :class="showtag ? 'group' : 'groupinline'" v-if="!readonly">
      <toolbar-button command="collapse" text="Fold" :showtag="showtag">折叠</toolbar-button>
      <toolbar-button command="expand" text="Unfold" :showtag="showtag">展开</toolbar-button>
    </div>
    <el-divider direction="vertical" v-if="!readonly"></el-divider>
    <toolbar-tag @changeTag="(name) => $emit('changeTag', name)" v-if="!readonly"></toolbar-tag>
    <el-divider direction="vertical" v-if="!readonly"></el-divider>
    <toolbar-quarter @changeTag="(name) => $emit('changeTag', name)" v-if="!readonly"></toolbar-quarter>
  </toolbar>
</template>

<script>
import { Toolbar } from 'vg-editor';
import ToolbarButton from './ToolbarButton';
import ToolbarTag from './ToolbarTag';
import ToolbarQuarter from './ToolbarQuarter';

export default {
  name: 'MindToolbar',
  components: {
    Toolbar,
    ToolbarButton,
    ToolbarTag,
    ToolbarQuarter,
  },
  props: {
    showtag: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  padding: 4px 10px 6px;
  .command {
    text-align: center;
    color: #555;
    cursor: pointer;
    i {
      display: inline-block;
      width: 26px;
      height: 26px;
      margin: 0 6px;
      line-height: 30px;
    }
    &:hover {
      background-color: #ecf5ff;
    }
  }
  .disable {
    color: rgba(0, 0, 0, 0.25);
    background-color: #fff;
    cursor: auto;
    &:hover {
      background-color: #fff;
    }
  }
  .group {
    .command {
      white-space: nowrap;
      padding-right: 10px;
      text-align: left;
      i {
        text-align: center;
      }
    }
  }
  .groupinline {
    display: inline-block;
    .command {
      display: inline-block;
    }
  }
}
</style>
