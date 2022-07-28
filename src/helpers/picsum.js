export const picsum = (options) => {
  const opts = { width: 200, height: 200, ...options };
  let param = "";
  if (opts.seed) param = `/seed/${opts.seed}`;
  if (opts.id) param = `/id/${opts.id}`;
  const p = `https://picsum.photos${param}/${opts.width}/${opts.height}`;
  const query = [];
  opts.random && query.push("random=" + Math.random());
  opts.grayscale && query.push("grayscale");
  opts.blur && query.push("blur=" + opts.blur);
  return `${p}${query.length ? "?" + query.join("&") : ""}`;
};
