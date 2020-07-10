<template>
  <command :name="command">
    <div class="item">
      <icon :type="iconType"/>
      <span>{{ label }}</span>
    </div>
  </command>
</template>

<script>
import { Command } from 'vg-editor';
import Icon from './Icon';

export default {
  name: 'MenuItem',

  props: ['command', 'icon', 'text'],

  computed: {
    iconType() {
      return `icon-${this.icon || this.command}`;
    },

    label() {
      return this.text;
    },
  },

  components: {
    Command,
    Icon,
  },
};
</script>
