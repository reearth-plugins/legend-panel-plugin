# Legend Panel Plugin for Re:Earth Visualizer

A highly customizable legend panel plugin for Re:Earth Visualizer that helps you create beautiful, informative map legends. Built with React, TypeScript, and Tailwind CSS.

## Features

### General Settings

- **Panel Title**: Add a custom title to your legend panel with an optional icon
- **Title Icon**: Upload a custom icon to display alongside your panel title
- **Flexible Display**: Toggle the panel title on/off based on your needs

### Legend Items

- **Multiple Legend Types**: Create individual legend items with custom text and symbols
- **Symbol Options**:
  - Use solid color symbols with any hex color
  - Upload custom images as legend symbols
- **Grouping with Subtitles**: Organize your legends into logical groups using subtitle items
- **Unlimited Items**: Add as many legend items and subtitles as needed

### Size Options

Choose from three preset sizes, each optimized for different use cases:

- **Small (250px)**: Ultra-compact panel with 16px symbols, minimal spacing, perfect for minimal dashboards
- **Medium (300px, default)**: Balanced panel with 24px symbols, ideal for most use cases
- **Large (363px)**: Spacious panel with 32px symbols, great for detailed legends and presentations

Each size automatically adjusts:

- Symbol dimensions and border-radius
- Text sizes for title, subtitles, and legend items
- Spacing and gaps between elements

### Appearance Customization

- **Custom Width**: Optionally set a manual width (in pixels) that overrides the size preset
- **Background Color**: Choose any background color to match your map theme
- **Corner Radius**: Adjust the roundness of panel corners (in pixels)
- **Border Control**:
  - Toggle border visibility on/off
  - Customize border color
  - Adjust border width (in pixels)

### User Experience

- **Automatic Grouping**: Legend items are automatically grouped under their corresponding subtitles
- **Empty State**: Displays a helpful tip when no legend items are configured

## Use Cases

- Display layer classifications on choropleth maps
- Show symbol meanings for point-of-interest markers
- Organize multiple data layers with grouped legends
- Create compact legends for dashboards and story maps
