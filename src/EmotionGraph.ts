import { EmojiService, EmojiServiceOptions } from './EmojiService';

export interface EmotionGraphOptions {
  container: HTMLElement | null;
  width?: number;
  height?: number;
  animationDuration?: number;
  columnCenters?: number[];
  stageCount?: number;
  emotionData?: number[];
  customEmojis?: (string | null)[];
  stageLabels?: string[];
  onEmotionChange?: (index: number, value: number) => void;
  onEmojiChange?: (index: number, emoji: string | null) => void;
  emojiOptions?: EmojiServiceOptions;
}

export interface PointMovedEvent {
  index: number;
  value: number;
}

export interface EmojiChangedEvent {
  index: number;
  emoji: string | null;
}

type EventHandlers = {
  [key: string]: Array<(data?: any) => void>;
};

export class EmotionGraph {
  private options: Required<Pick<EmotionGraphOptions, 'width' | 'height' | 'animationDuration' | 'columnCenters' | 'stageCount' | 'emotionData' | 'customEmojis' | 'stageLabels'>> & Omit<EmotionGraphOptions, 'width' | 'height' | 'animationDuration' | 'columnCenters' | 'stageCount' | 'emotionData' | 'customEmojis' | 'stageLabels'>;
  private emojiService: EmojiService;
  private eventHandlers: EventHandlers;
  private svg!: SVGSVGElement;
  private linePath!: SVGPathElement;
  private areaPath!: SVGPathElement;
  private draggingPoint: SVGCircleElement | null = null;

  constructor(options: EmotionGraphOptions) {
    // Apply default values
    const defaults = {
      width: 600,
      height: 180,
      animationDuration: 300,
      columnCenters: [],
      stageCount: 6,
      emotionData: [],
      customEmojis: [],
      stageLabels: []
    };

    // Merge with user options
    this.options = {
      ...defaults,
      ...options
    };

    this.emojiService = new EmojiService(options.emojiOptions);
    this.eventHandlers = {};
    this.initialize();
  }

  initialize(): void {
    this.createSvg();
    this.setupEventListeners();
    this.render();
  }

  createSvg(): void {
    const { width, height } = this.options;
    
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    this.svg.setAttribute('preserveAspectRatio', 'none');
    this.svg.classList.add('emotion-line-graph');
    
    // Create gradient definition
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'emotion-gradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '0%');
    gradient.setAttribute('y2', '100%');
    
    const stops = [
      { offset: '0%', color: 'var(--text-emotion)', opacity: '0.5' },
      { offset: '100%', color: 'var(--text-emotion)', opacity: '0' }
    ];
    
    stops.forEach(({ offset, color, opacity }) => {
      const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-color', color);
      stop.setAttribute('stop-opacity', opacity);
      gradient.appendChild(stop);
    });
    
    defs.appendChild(gradient);
    this.svg.appendChild(defs);
    
    // Create path elements
    this.linePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.linePath.classList.add('emotion-line-path');
    
    this.areaPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.areaPath.classList.add('emotion-area-path');
    
    this.svg.appendChild(this.areaPath);
    this.svg.appendChild(this.linePath);
    
    // Add to container
    if (this.options.container) {
      this.options.container.appendChild(this.svg);
    }
  }

  setupEventListeners(): void {
    this.svg.addEventListener('mousedown', this.startDrag.bind(this));
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.endDrag.bind(this));
    
    // Touch events
    this.svg.addEventListener('touchstart', this.startDrag.bind(this));
    document.addEventListener('touchmove', this.drag.bind(this));
    document.addEventListener('touchend', this.endDrag.bind(this));
  }

  startDrag(e: MouseEvent | TouchEvent): void {
    const point = this.getPointFromEvent(e);
    if (point) {
      this.draggingPoint = point;
      e.preventDefault();
    }
  }

  drag(e: MouseEvent | TouchEvent): void {
    if (this.draggingPoint) {
      const { height } = this.options;
      const rect = this.svg.getBoundingClientRect();
      
      // Handle both mouse and touch events
      const clientY = 'touches' in e && e.touches.length 
        ? e.touches[0].clientY 
        : (e as MouseEvent).clientY;
      
      const y = clientY - rect.top;
      
      // Convert to percentage (0-100)
      let value = Math.max(0, Math.min(100, (1 - y / height) * 100));
      
      // Update point position
      this.draggingPoint.setAttribute('cy', (height * (1 - value / 100)).toString());
      
      // Update data
      const points = Array.from(this.svg.querySelectorAll('.emotion-point'));
      const index = points.indexOf(this.draggingPoint);
      
      if (index !== -1) {
        this.options.emotionData[index] = value;
        this.updatePaths();
        
        // Trigger callback
        if (this.options.onEmotionChange) {
          this.options.onEmotionChange(index, value);
        }
        
        // Emit event
        this.emit('pointMoved', { index, value });
      }
    }
  }

  endDrag(): void {
    this.draggingPoint = null;
  }

  getPointFromEvent(e: MouseEvent | TouchEvent): SVGCircleElement | null {
    const target = e.target as Element;
    if (target.classList.contains('emotion-point')) {
      return target as SVGCircleElement;
    }
    return null;
  }

  updatePaths(): void {
    const { width, height } = this.options;
    const points = Array.from(this.svg.querySelectorAll('.emotion-point')) as SVGCircleElement[];
    
    if (points.length === 0) return;
    
    // Generate line path
    const linePath = points.map((point, i) => {
      const x = point.getAttribute('cx');
      const y = point.getAttribute('cy');
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
    }).join(' ');
    
    // Generate area path (add bottom corners)
    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;
    
    this.linePath.setAttribute('d', linePath);
    this.areaPath.setAttribute('d', areaPath);
  }

  render(): void {
    const { width, height, emotionData, customEmojis } = this.options;
    
    // Clear existing points
    this.svg.querySelectorAll('.emotion-point').forEach(point => point.remove());
    
    // Add points
    emotionData.forEach((value, i) => {
      const x = width * (i / (emotionData.length - 1));
      const y = height * (1 - value / 100);
      
      const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      point.classList.add('emotion-point');
      point.setAttribute('cx', x.toString());
      point.setAttribute('cy', y.toString());
      point.setAttribute('r', '4');
      
      // Add emoji if available
      const emoji = customEmojis[i];
      if (emoji) {
        const emojiUrl = this.emojiService.getCustomEmoji(emoji);
        if (emojiUrl) {
          const emojiImage = document.createElementNS('http://www.w3.org/2000/svg', 'image');
          emojiImage.setAttribute('href', emojiUrl);
          emojiImage.setAttribute('width', '24');
          emojiImage.setAttribute('height', '24');
          emojiImage.setAttribute('x', (x - 12).toString());
          emojiImage.setAttribute('y', (y - 30).toString());
          this.svg.appendChild(emojiImage);
        }
      }
      
      this.svg.appendChild(point);
    });
    
    this.updatePaths();
    this.emit('graphRendered');
  }

  on(event: string, callback: (data?: any) => void): void {
    if (!this.eventHandlers[event]) {
      this.eventHandlers[event] = [];
    }
    this.eventHandlers[event].push(callback);
  }

  off(event: string, callback: (data?: any) => void): void {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event] = this.eventHandlers[event]
        .filter(handler => handler !== callback);
    }
  }

  emit(event: string, data?: any): void {
    if (this.eventHandlers[event]) {
      this.eventHandlers[event].forEach(callback => callback(data));
    }
  }

  updateEmotionData(data: number[]): void {
    this.options.emotionData = data;
    this.render();
  }

  updateCustomEmojis(emojis: (string | null)[]): void {
    this.options.customEmojis = emojis;
    this.render();
  }

  destroy(): void {
    // Remove event listeners
    document.removeEventListener('mousemove', this.drag.bind(this));
    document.removeEventListener('mouseup', this.endDrag.bind(this));
    document.removeEventListener('touchmove', this.drag.bind(this));
    document.removeEventListener('touchend', this.endDrag.bind(this));
    
    // Remove SVG
    if (this.svg.parentNode) {
      this.svg.parentNode.removeChild(this.svg);
    }
    
    // Clear event handlers
    this.eventHandlers = {};
  }
} 