<template>
  <div class="toolbar-tag">
    <div class="group">
      <el-button plain @click="onChange(null)">
        <icon type="num0" />
      </el-button>
      <el-button plain @click="onChange(1)">
        <icon type="num1" />
      </el-button>
      <el-button plain @click="onChange(2)">
        <icon type="num2" />
      </el-button>
      <el-button plain @click="onChange(3)">
        <icon type="num3" />
      </el-button>
      <el-button plain @click="onChange(4)">
        <icon type="num4" />
      </el-button>
      <el-button plain @click="onChange(5)">
        <icon type="num5" />
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
    onChange(val) {
      this.$emit('changeTag', val ? `node-tag-${val}` : null);
    },
  },
};
</script>
