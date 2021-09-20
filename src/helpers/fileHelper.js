/**
 * Note that the npm-package 'mime-types' is not helpful here, because it turns 'audio/mpeg' into
 * mpga and that does not work for howler audio player. In the cases I've tried at least.
 *
 * @type {{'audio/mp3': string, 'audio/mpeg': string}}
 */
// TODO: add more mimetype mappings
const mimetypeMap = {
  'audio/mpeg': 'mp3',
  'audio/mp3': 'mp3',
};

/**
 * Get file extension based on mimetype, or if inconclusive, the title of the file.
 * Fallback is mp3
 * @param file
 * @returns {string|string|*}
 */
// TODO: try to get file type by file header
export function getFileExtension(file) {
  if (file.mimetype && mimetypeMap[file.mimetype]) return mimetypeMap[file.mimetype];
  const extractFromTitle = /(?:\.([^.]+))?$/.exec(file.title)[1];
  return extractFromTitle || 'mp3';
}

export default {
  getFileExtension,
};
