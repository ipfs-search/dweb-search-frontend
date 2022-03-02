export default [
  {
    label: 'File extension',
    queryParam: 'extensions',
    apiKey: 'references.name',
    multiple: true,
    items: [
      {
        text: 'jpeg',
        value: 'jpeg',
        apiEntry: ['*.jpeg', '*.jpg'],
      },
      {
        text: 'png',
        value: 'png',
        apiEntry: ['*.png'],
      },
    ],
  },
  {
    label: 'Size',
    queryParam: 'size',
    apiKey: 'size',
    items: [
      {
        text: '0-10mb',
        value: '0-10mb',
        apiEntry: ['<=10485760'],
      },
      {
        text: '10-100mb',
        value: '10-100mb',
        apiEntry: ['>10485760', '<=104857600'],
      },
      {
        text: '100mb-1gb',
        value: '100mb-1gb',
        apiEntry: ['>104857600', '<=1073741824'],
      },
      {
        text: '1gb+',
        value: '1gb+',
        apiEntry: ['>1073741824'],
      },
      {
        text: 'any',
        value: 'any',
        apiEntry: [],
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
        text: '<24hr',
        value: '<24hr',
        apiEntry: '[ now-24h/h TO *]',
      },
      {
        text: '<7d',
        value: '<7d',
        apiEntry: '[ now/h-7d TO *]',
      },
      {
        text: '<30d',
        value: '<30d',
        apiEntry: '[ now/d-30d TO *]',
        initial: true,
      },
      {
        text: 'any',
        value: 'any',
        apiEntry: '*',
      },
    ],
  },
];
