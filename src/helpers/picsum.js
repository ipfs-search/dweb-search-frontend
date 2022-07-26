export const picsum = ({ width = 200, height = 200, ...opts }) => {
  let param;
  if (opts.seed) param = `/seed/${opts.seed}`;
  if (opts.id) param = `/id/${opts.id}`;
  const p = `https://picsum.photos${param}/${width}/${height}`;
  const query = [];
  if (opts.random) query.push("random=" + Math.random());
  if (opts.grayscale) query.push("grayscale");
  if (opts.blur) query.push("blur=" + opts.blur);
  return `${p}${query.length ? "?" + query.join("&") : ""}`;
};
