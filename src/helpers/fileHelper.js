/**
 * Note that the npm-package 'mime-types' is not helpful here, because it turns 'audio/mpeg' into
 * mpga and that does not work for howler audio player. In the cases I've tried at least.
 *
 * @type {{'audio/mp3': string, 'audio/mpeg': string}}
 */
// TODO: add more mimetype mappings
// Howler supports:  "mp3", "mpeg", "opus", "ogg", "oga", "wav", "aac", "caf", "m4a", "m4b",
// "mp4", "weba", "webm", "dolby", "flac"
const mimetypeMap = {
  'audio/mpeg': 'mp3',
  'audio/mp3': 'mp3',
  'audio/vorbis': 'ogg',
  'audio/mp4': 'mp4',
  'video/mp4': 'mp4',
  'audio/aac': 'aac',
  'audio/opus': 'opus',
  'audio/wav': 'wav',
  'audio/vnd.wave': 'wav',
  // omitting weba and webm because they have the same mimetype

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
  const extractFromTitle = /(?:\.([^.]+))?$/
    .exec(file.title)[1]
    .replace(/<[^>]+>/g, '');// remove xml tags
  return extractFromTitle || 'mp3';
}

export default {
  getFileExtension,
};
