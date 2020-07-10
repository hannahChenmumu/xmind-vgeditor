<template>
  <section>  
    <xmind
      v-model="dataXmind"
      readonly
      :showtag="false"
      export-file-name="Xmind导出标题"
    ></xmind>
    <display-data-xmind
      :data="dataXmind"
    ></display-data-xmind>
  </section>
</template>

<script>
import xmind from '@/components/xmind';
import mockData from '@/mock/mockData';
import displayDataXmind from '@/components/dispayDataXmind';

export default {
  name: 'XmindDemoReadonly',
  components: {
    xmind,
    displayDataXmind,
  },
  data() {
    return {
      dataXmind: mockData,
    }
  }
}
</script>