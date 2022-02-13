import moment from 'moment';

export default function (value) {
  const then = moment().diff(value);

  const difference = moment.duration(then);

  const duration = moment.duration(difference);

  if (duration < moment.duration({ hours: 24 })) {
    return 'green--text';
  }

  if (duration < moment.duration({ days: 7 })) {
    return 'orange--text';
  }

  if (duration > moment.duration({ days: 7 })) {
    return 'red--text';
  }

  return null;
}
