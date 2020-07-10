<script>
import { RegisterNode } from 'vg-editor';
import NUM0 from './Icon/tags/numdel.svg';
import NUM1 from './Icon/tags/num1.svg';
import NUM2 from './Icon/tags/num2.svg';
import NUM3 from './Icon/tags/num3.svg';
import NUM4 from './Icon/tags/num4.svg';
import NUM5 from './Icon/tags/num5.svg';
import QUARTER0 from './Icon/tags/quarter0.svg';
import QUARTER1 from './Icon/tags/quarter1.svg';
import QUARTER2 from './Icon/tags/quarter2.svg';
import QUARTER3 from './Icon/tags/quarter3.svg';
import QUARTER4 from './Icon/tags/quarter4.svg';
import PLUS from './Icon/plus.svg';
import { getRectPath } from './util.js';

const ICON_SIZE = 20;
const ICON_SPAN = 5;
const NUMS = [NUM0, NUM1, NUM2, NUM3, NUM4, NUM5];
const QUARTERS = [QUARTER0, QUARTER1, QUARTER2, QUARTER3, QUARTER4];

export default {
  name: 'EditorCustomNode',
  components: {
    RegisterNode,
  },
  render() {
    const config = {
      // 绘制图标
      afterDraw(item) {
        const model = item.getModel();
        const group = item.getGraphicGroup();
        const label = group.findByClass('label')[0];
        const labelBox = label.getBBox();
        // 标记图标
        const { shape, collapsed, children } = model;
        let imgIndex = 0;
        let type = [];
        if (shape.indexOf('node-tag-') > -1) {
          imgIndex = shape.replace('node-tag-', '');
          type = NUMS;
        } else if (shape.indexOf('node-quarter-') > -1) {
          imgIndex = shape.replace('node-quarter-', '');
          type = QUARTERS;
        }
        group.addShape('image', {
          attrs: {
            x: labelBox.width / 2 + ICON_SPAN,
            y: -labelBox.height / 2 - 3,
            width: ICON_SIZE,
            height: ICON_SIZE,
            img: type[imgIndex],
          },
        });
        // 折叠收起图标
        if (collapsed && children && children.length) {
          group.addShape('image', {
            attrs: {
              img: PLUS,
              x: -labelBox.width / 2 - ICON_SIZE - 2,
              y: -labelBox.height / 2,
              width: ICON_SIZE - 6,
              height: ICON_SIZE - 6,
              opacity: 0.3,
            },
          });
        }
      },
      // 对齐标签
      adjustLabelPosition(item, labelShape) {
        const size = this.getSize(item);
        const padding = this.getPadding();
        const width = size[0];
        const labelBox = labelShape.getBBox();
        labelShape.attr({
          x: -width / 2 + padding[3],
          y: -labelBox.height / 2,
        });
      },
      // 内置边距 [上, 右, 下, 左]
      getPadding() {
        return [4, 8, 4, 8];
      },
      // 标签尺寸 [宽, 高]
      getSize(item) {
        const group = item.getGraphicGroup();
        const label = group.findByClass('label')[0];
        const labelBox = label.getBBox();
        const padding = this.getPadding(item);
        return [
          labelBox.width + padding[1] + padding[3],
          labelBox.height + padding[0] + padding[2],
        ];
      },
      // 节点路径 x, y, w, h, r
      getPath(item) {
        const size = this.getSize(item);
        const style = this.getStyle(item);
        return getRectPath(
          -size[0] / 2,
          -size[1] / 2,
          size[0] + ICON_SIZE + ICON_SPAN,
          size[1],
          style.radius,
        );
      },
      // 节点样式
      getStyle() {
        return {
          fill: '#cccccc',
          fillOpacity: 0,
          radius: 4,
          lineWidth: 2,
        };
      },
      // 标签样式
      getLabelStyle() {
        return {
          fill: '#333333',
          lineHeight: 18,
          fontSize: 16,
        };
      },
      // 激活样式
      getActivedStyle() {
        return {
          stroke: '#44C0FF',
          lineWidth: 2,
        };
      },

      // 选中样式
      getSelectedStyle() {
        return {
          stroke: '#1AA7EE',
          lineWidth: 2,
        };
      },
    };
    return (
      <div>
        <register-node name="node-tag-1" config={config} extend="rect" />
        <register-node name="node-tag-2" config={config} extend="rect" />
        <register-node name="node-tag-3" config={config} extend="rect" />
        <register-node name="node-tag-4" config={config} extend="rect" />
        <register-node name="node-tag-5" config={config} extend="rect" />
        <register-node name="node-quarter-0" config={config} extend="rect" />
        <register-node name="node-quarter-1" config={config} extend="rect" />
        <register-node name="node-quarter-2" config={config} extend="rect" />
        <register-node name="node-quarter-3" config={config} extend="rect" />
        <register-node name="node-quarter-4" config={config} extend="rect" />
        <register-node name="node" config={config} extend="rect" />
        <register-node name="node-normal" config={config} extend="rect" />
        <register-node name="mind-second-sub" config={config} extend="rect" />
      </div>
    );
  },
};
</script>
