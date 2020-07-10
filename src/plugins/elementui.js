import Vue from 'vue';
import {
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Divider,
  Button,
  Icon,
  Tabs,
  TabPane,
  Popover,
  Loading,
  Message,
} from 'element-ui';

Message.install = () => {
  Vue.prototype.$message = Message;
};

Vue.prototype.$ELEMENT = {
  size: 'mini',
};
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Popover);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
