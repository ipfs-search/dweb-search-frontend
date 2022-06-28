// Generate random image
import loremPicsum from 'lorem-picsum';

export const picsum = (opts = {}) => {
  const p = loremPicsum({width: 200, height: 200, random: true, ...opts})
  return `${p}&n=${Math.random()}`
}

