export default [
  {
    label: 'File type',
    queryParam: 'extensions',
    apiKey: 'references.name',
    multiple: true,
    items: [
      {
        text: 'jpeg', value: ['*.jpeg', '*.jpg'],
      },
      {
        text: 'png', value: ['*.png'],
      },
    ],
  },
  {
    label: 'Size',
    queryParam: 'size',
    apiKey: 'size',
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
    queryParam: 'last_seen',
    apiKey: 'last-seen',
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
