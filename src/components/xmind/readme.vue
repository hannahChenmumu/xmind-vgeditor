<template>
  <el-popover
    placement="left-start"
    width="500"
    trigger="hover"
  >
    <section class="xmind-readme">
      <h4>Xmind操作说明</h4>
      <p>支持主要的快捷键进行节点操作，可拖动节点进行排序和布局，双击节点可进行节点的编辑。</p>
      <h5>导出图片</h5>
      <p><b>导出之前请手动点击工具栏中的“自适应比例”按钮后再进行导出</b>，目前支持png和jpg两种格式的图片导出。</p>
      <h5>快捷键</h5>
      <ul>
        <li>添加节点：回车键；</li>
        <li>添加下级节点：Tab键；</li>
        <li>删除节点：Delete键；</li>
        <li>点选画布或节点可使用右键的快捷方式。</li>
      </ul>
    </section>
    <el-button type="text" icon="el-icon-info" slot="reference">操作说明</el-button>
  </el-popover>
</template>

<script>
export default {
  name: 'XmindReadme',
};
</script>

<style lang="scss" scoped>
.xmind-readme {
  h4 {
    font-size: 14px;
    margin: 5px 0;
  }
  h5 {
    font-size: 13px;
    margin: 15px 0 5px;
  }
  p {
    font-size: 12px;
    line-height: 1.5;
    margin: 3px 0;
    b {
      color: #f56b6c;
    }
  }
  ul {
    margin: 0;
    li {
      font-size: 12px;
    }
  }
}
</style>
