<template>
  <div style="margin-top:30px;padding:30px;background:#f5f5f5;font-size:12px;">
    实时输出数据：
    <p>{{ data }}</p>
  </div>
</template>

<script>
export default {
  name: 'XmindDataDisplayInDemo',
  props: ['data'],
}
</script>