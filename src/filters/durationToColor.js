import moment from 'moment';

export default function durationToColor(value) {
  const then = moment().diff(value);

  const difference = moment.duration(then);

  const duration = moment.duration(difference);

  if (duration < moment.duration({ hours: 24 })) {
    return 'text-green';
  }

  if (duration < moment.duration({ days: 7 })) {
    return 'text-orange';
  }

  if (duration > moment.duration({ days: 7 })) {
    return 'text-red';
  }

  return null;
}
