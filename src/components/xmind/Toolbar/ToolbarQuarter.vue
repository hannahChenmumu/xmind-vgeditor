<template>
  <div class="toolbar-tag">
    <div class="group">
      <el-button plain @click="onChangeTag(null)">
        <icon type="num0" />
      </el-button>
      <el-button plain @click="onChangeTag(0)">
        <icon type="quarter0" />
      </el-button>
      <el-button plain @click="onChangeTag(1)">
        <icon type="quarter1" />
      </el-button>
      <el-button plain @click="onChangeTag(2)">
        <icon type="quarter2" />
      </el-button>
      <el-button plain @click="onChangeTag(3)">
        <icon type="quarter3" />
      </el-button>
      <el-button plain @click="onChangeTag(4)">
        <icon type="quarter4" />
      </el-button>
    </div>
  </div>
</template>

<script>
import Icon from '../Icon/tags/index.js';
import './style.scss';

export default {
  components: { Icon },
  methods: {
    onChangeTag(val) {
      this.$emit('changeTag', `node-quarter-${val}` || null);
    },
  },
};
</script>
