import { EmotionGraph } from '../EmotionGraph';

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveAttribute(attr: string, value?: string): R;
    }
  }
}

describe('EmotionGraph', () => {
  let container: HTMLDivElement;
  let graph: EmotionGraph;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (graph) {
      graph.destroy();
    }
    container.remove();
  });

  it('should create an SVG element', () => {
    graph = new EmotionGraph({ container });
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg).toHaveAttribute('class', 'emotion-line-graph');
  });

  it('should render points based on emotion data', () => {
    const emotionData = [60, 70, 80];
    graph = new EmotionGraph({
      container,
      emotionData,
      width: 300,
      height: 150
    });

    const points = container.querySelectorAll('.emotion-point');
    expect(points).toHaveLength(3);

    // Check point positions
    points.forEach((point, i) => {
      const x = 300 * (i / 2); // width * (index / (length-1))
      const y = 150 * (1 - emotionData[i] / 100); // height * (1 - value/100)
      expect(point).toHaveAttribute('cx', x.toString());
      expect(point).toHaveAttribute('cy', y.toString());
    });
  });

  it('should update when emotion data changes', () => {
    graph = new EmotionGraph({
      container,
      emotionData: [60, 70, 80],
      width: 300,
      height: 150
    });

    const newData = [80, 90, 100];
    graph.updateEmotionData(newData);

    const points = container.querySelectorAll('.emotion-point');
    points.forEach((point, i) => {
      const y = 150 * (1 - newData[i] / 100);
      expect(point).toHaveAttribute('cy', y.toString());
    });
  });

  it('should emit events when points are moved', () => {
    const onEmotionChange = jest.fn();
    graph = new EmotionGraph({
      container,
      emotionData: [60, 70, 80],
      onEmotionChange
    });

    const mockEvent = {
      preventDefault: jest.fn(),
      target: container.querySelector('.emotion-point')
    };

    // Simulate drag start
    graph.startDrag(mockEvent as unknown as MouseEvent);

    // Simulate drag
    const dragEvent = {
      clientY: 50,
      preventDefault: jest.fn()
    };
    graph.drag(dragEvent as unknown as MouseEvent);

    expect(onEmotionChange).toHaveBeenCalled();
  });

  it('should clean up event listeners on destroy', () => {
    graph = new EmotionGraph({ container });
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    graph.destroy();

    expect(removeEventListenerSpy).toHaveBeenCalledTimes(4); // mousemove, mouseup, touchmove, touchend
    expect(container.querySelector('svg')).toBeNull();
  });
}); 