<template>  
  <xmind
    v-model="dataXmind"
    :export-file-name="fileNameExport"
    :base-height="500"
  ></xmind>
</template>

<script>
import xmind from '@/components/xmind/indexDialog';

export default {
  name: 'XmindDemoEditFullscreen',
  components: {
    xmind,
  },
  data() {
    return {
      dataXmind: {},
      fileNameExport: 'Xmind导出标题',
    }
  }
}
</script>