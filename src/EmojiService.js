export class EmojiService {
  constructor(options = {}) {
    this.options = {
      baseUrl: options.baseUrl || 'https://cdn.joypixels.com/products/preview/emoji',
      format: options.format || 'svg',
      ...options
    };
  }

  getEmojiUrl(value) {
    if (value >= 90) {
      return this.getEmojiByName('star-struck');
    } else if (value >= 80) {
      return this.getEmojiByName('grinning-face-with-big-eyes');
    } else if (value >= 60) {
      return this.getEmojiByName('slightly-smiling-face');
    } else if (value >= 40) {
      return this.getEmojiByName('neutral-face');
    } else if (value >= 20) {
      return this.getEmojiByName('slightly-frowning-face');
    } else {
      return this.getEmojiByName('frowning-face');
    }
  }

  getEmojiByName(name) {
    return `${this.options.baseUrl}/${name}.${this.options.format}`;
  }

  getCustomEmoji(emoji) {
    if (!emoji) return null;
    return typeof emoji === 'string' ? emoji : this.getEmojiUrl(emoji);
  }
} 