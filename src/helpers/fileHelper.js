export function getFileExtension(fileName) {
  const re = /(?:\.([^.]+))?$/;
  return re.exec(fileName)[1];
}

export default {
  getFileExtension,
};
