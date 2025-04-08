# Emotion Graph

A customizable, interactive emotion graph component for visualizing customer satisfaction across journey stages. Perfect for customer journey maps, user experience analysis, and satisfaction tracking.

![Emotion Graph Demo](docs/images/demo.gif)

## Features

- 📊 Interactive SVG-based graph visualization
- 😊 Built-in emoji support with customizable icons
- 📱 Responsive design that adapts to any screen size
- 🎨 Customizable styles and themes
- 🔄 Real-time updates and animations
- 🎯 Drag-and-drop interaction
- 🌙 Dark mode support
- ⚡ Lightweight with zero dependencies

## Installation

```bash
npm install @journey-map/emotion-graph
```

## Quick Start

```javascript
import { EmotionGraph } from '@journey-map/emotion-graph';

// Create a new emotion graph
const graph = new EmotionGraph({
  container: document.querySelector('#graph-container'),
  emotionData: [60, 70, 80, 90, 95, 98],
  stageLabels: ['Awareness', 'Consideration', 'Decision', 'Onboarding', 'Retention', 'Advocacy']
});

// Listen for changes
graph.on('pointMoved', ({ index, value }) => {
  console.log(`Point ${index} moved to ${value}`);
});
```

## Configuration

The EmotionGraph constructor accepts the following options:

```javascript
{
  container: null,               // DOM element to render the graph in
  width: 600,                   // Default width
  height: 180,                  // Default height
  animationDuration: 300,       // Animation duration in ms
  columnCenters: [...],         // Array of column center positions (0-1)
  stageCount: 6,               // Number of stages
  emotionData: [60, 70, ...],  // Array of emotion values (0-100)
  customEmojis: [null, ...],   // Array of custom emojis for each point
  stageLabels: ['Stage 1', ...], // Array of stage labels
  onEmotionChange: null,       // Callback when emotions change
  onEmojiChange: null          // Callback when emojis change
}
```

## Events

The component supports the following events:

- `pointMoved`: Triggered when a point is dragged
- `emojiChanged`: Triggered when an emoji is changed
- `graphRendered`: Triggered when the graph is rendered

```javascript
graph.on('pointMoved', ({ index, value }) => {
  // Handle point movement
});

graph.on('emojiChanged', ({ index, emoji }) => {
  // Handle emoji change
});
```

## Styling

The component comes with default styles but can be customized using CSS variables:

```css
:root {
  --emotion-graph-line-color: #0288d1;
  --emotion-graph-point-color: #0288d1;
  --emotion-graph-point-hover-color: #01579b;
  --emotion-graph-gradient-start: #2ecc71;
  --emotion-graph-gradient-middle: #f1c40f;
  --emotion-graph-gradient-end: #e74c3c;
}
```

## API Reference

### Methods

- `initialize()`: Initialize the graph
- `render()`: Re-render the graph
- `updateEmotionData(data)`: Update emotion values
- `updateCustomEmojis(emojis)`: Update custom emojis
- `on(event, callback)`: Register event handler
- `off(event, callback)`: Remove event handler
- `destroy()`: Clean up the graph

### Properties

- `emotionData`: Array of current emotion values
- `customEmojis`: Array of current custom emojis
- `points`: Array of point coordinates
- `svg`: Reference to the SVG element

## Examples

Check out the [examples](examples/) directory for more usage examples:

- Basic usage
- Custom styling
- Dark mode
- Dynamic updates
- Custom emojis
- Multiple graphs
- React integration
- Vue integration

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern JavaScript
- Inspired by customer journey mapping best practices
- Uses SVG for smooth rendering
- Emoji support powered by JoyPixels

## Support

- 📚 [Documentation](https://yourusername.github.io/emotion-graph/)
- 🐛 [Issue Tracker](https://github.com/yourusername/emotion-graph/issues)
- 💬 [Discussions](https://github.com/yourusername/emotion-graph/discussions) 