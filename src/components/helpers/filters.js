import store from '@/store';
import { enterSearchQuery } from '@/helpers/routerHelper';

const changeFilter = (queryParam) => (value) => enterSearchQuery({ [queryParam]: value });

export default [
  {
    name: 'size',
    label: 'Size',
    items: [
      {
        text: '0-10mb', value: ['<=10485760'],
      },
      {
        text: '10-100mb', value: ['>10485760', '<=104857600'],
      },
      {
        text: '100mb-1gb', value: ['>104857600', '<=1073741824'],
      },
      {
        text: '1gb+', value: ['>1073741824'],
      },
      {
        text: 'any', value: [],
      },
    ],
    changeHandler: changeFilter('size'),
    value: store.state.query.filters.size,
  },
  {
    name: 'lastSeen',
    label: 'Last seen',
    items: [
      {
        text: '<24hr', value: '[ now-24h/h TO *]',
      },
      {
        text: '<7d', value: '[ now/h-7d TO *]',
      },
      {
        text: '<30d', value: '[ now/d-30d TO *]',
      },
      {
        text: 'any', value: '*',
      },
    ],
    changeHandler: changeFilter('last_seen'),
    value: store.state.query.filters.lastSeen,
  },
];
