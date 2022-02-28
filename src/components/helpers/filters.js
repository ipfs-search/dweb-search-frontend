// N.b. name is obsolete

export default [
  {
    label: 'Size',
    handle: 'size',
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
        text: 'any',
        value: [],
        initial: true,
      },
    ],
  },
  {
    label: 'Last seen',
    handle: 'last-seen',
    items: [
      {
        text: '<24hr', value: '[ now-24h/h TO *]',
      },
      {
        text: '<7d', value: '[ now/h-7d TO *]',
      },
      {
        text: '<30d',
        value: '[ now/d-30d TO *]',
        initial: true,
      },
      {
        text: 'any', value: '*',
      },
    ],
  },
];
