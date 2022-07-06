// SPDX-FileCopyrightText: 2022 2022 Mathijs de Bruin, <mathijs@visualspace.nl> et al.
//
// SPDX-License-Identifier: AGPL-3.0-only

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
