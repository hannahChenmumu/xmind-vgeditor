<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="编辑模式" name="modeEdit"></el-tab-pane>
      <el-tab-pane label="可全屏编辑" name="modeFullscreen"></el-tab-pane>
      <el-tab-pane label="只读模式" name="modeReadonly"></el-tab-pane>
    </el-tabs>
    <section style="border:1px solid #eee;">
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeName: 'modeEdit',
    }
  },
  methods: {
    handleClick({ name }) {
      this.$router.push({ name })
    }
  }
}
</script>
