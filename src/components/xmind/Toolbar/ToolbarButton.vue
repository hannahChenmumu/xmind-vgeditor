<template>
  <command :name="command">
    <icon :type="iconType" />
    <div class="tag" v-if="showtag && direction === 'vertical'"><slot></slot></div>
    <span class="tag" v-else-if="showtag"><slot></slot></span>
  </command>
</template>

<script>
import { Command } from 'vg-editor';
import Icon from '../Icon';

export default {
  name: 'ToolbarButton',
  props: ['command', 'icon', 'text', 'showtag', 'direction'],
  computed: {
    iconType() {
      return `icon-${this.icon || this.command}`;
    },
  },
  components: {
    Command,
    Icon,
  },
};
</script>
