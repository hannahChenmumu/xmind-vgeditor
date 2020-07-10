import NUM0 from './numdel.svg';
import NUM1 from './num1.svg';
import NUM2 from './num2.svg';
import NUM3 from './num3.svg';
import NUM4 from './num4.svg';
import NUM5 from './num5.svg';
import QUARTER0 from './quarter0.svg';
import QUARTER1 from './quarter1.svg';
import QUARTER2 from './quarter2.svg';
import QUARTER3 from './quarter3.svg';
import QUARTER4 from './quarter4.svg';

const TAGS = {
  num0: NUM0,
  num1: NUM1,
  num2: NUM2,
  num3: NUM3,
  num4: NUM4,
  num5: NUM5,
};
const QUARTERS = {
  quarter0: QUARTER0,
  quarter1: QUARTER1,
  quarter2: QUARTER2,
  quarter3: QUARTER3,
  quarter4: QUARTER4,
};

export default {
  name: 'Icon',

  props: ['type'],

  render() {
    const { type } = this;
    if (type.indexOf('num') > -1) {
      return (<i class="tagicon"><img src={TAGS[type]} /></i>);
    }
    if (type.indexOf('quarter') > -1) {
      return (<i class="tagicon"><img src={QUARTERS[type]} /></i>);
    }
  },
};
