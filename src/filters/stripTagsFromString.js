export default function (value) {
  return value.replace(/<\/?[^>]+>/ig, ' ');
}
