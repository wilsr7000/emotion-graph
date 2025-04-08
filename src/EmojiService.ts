export interface EmojiServiceOptions {
  baseUrl?: string;
  format?: string;
  [key: string]: any;
}

export class EmojiService {
  private options: Required<Pick<EmojiServiceOptions, 'baseUrl' | 'format'>> & EmojiServiceOptions;

  constructor(options: EmojiServiceOptions = {}) {
    this.options = {
      baseUrl: options.baseUrl || 'https://cdn.joypixels.com/products/preview/emoji',
      format: options.format || 'svg',
      ...options
    };
  }

  getEmojiUrl(value: number): string {
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

  getEmojiByName(name: string): string {
    return `${this.options.baseUrl}/${name}.${this.options.format}`;
  }

  getCustomEmoji(emoji: string | number | null): string | null {
    if (!emoji) return null;
    return typeof emoji === 'string' ? emoji : this.getEmojiUrl(emoji);
  }
} 