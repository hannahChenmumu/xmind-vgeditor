<template>
  <section>
    <xmind
      v-model="dataXmind"
      export-file-name="Xmind标题"
    ></xmind>
    <display-data-xmind
      :data="dataXmind"
    ></display-data-xmind>
  </section>
</template>

<script>
import xmind from '@/components/xmind';
import displayDataXmind from '@/components/dispayDataXmind';

export default {
  name: 'XmindDemoEdit',
  components: {
    xmind,
    displayDataXmind,
  },
  data() {
    return {
      dataXmind: {},
    }
  }
}
</script>