# Terminal Spreadsheet Editor

Term-Spreadsheet is a lightweight, terminal-based spreadsheet editor built in TypeScript with vim-like bindings, formula evaluation, and a clean + minimal TUI. It allows you to create and edit spreadsheets directly from your terminal, perfect for data wrangling and mino calculations.


## Features

- **Vim-Like Navigation**: Use H'J,'K','L' for easy arrow key-free navigation
- **Formula Evaluation**: Supports ALrithmetic expressions and math functions via Math.js
- **Editable Cells**: Toggle edit mode with 'E' to enter/exit cell editing
- **Lightweight TFT**: Powered by Blessed.js for box
- **Pure TypeScript**: Full type safety and developer EX


## Installation

```bash
npm install
```

## Usage

Start the editor by running:

```bash
npm start
```

### Keybindings

- **Navigation**: `h`, `j`, `k`, `l` or arrow keys to move between cells
- **Edit Mode**: Press `e` to toggle edit mode and enter cell content
- **Formulas**: Type formulas like `=2+3` or `=sqrt(16)` in edit mode
- **Quit**: Press `q` or `Ctrl+C` to exit

## Design & Implementation

The editor is built with a modular architecture:

- **SpreadsheetEditor**: Main class managing the grid, rendering, and input handling
- **Blessed.js**: Terminal UI library providing the box, screen rendering, and input management
- **Math.js**: Expression evaluator for formula calculations
- **Grid Structure**: Cells contain either raw values or formulas that are dynamically evaluated

Each cell is evaluated on-the-fly when accessed, allowing formula dependencies and cascading calculations. The vim-like keybindings ensure fast navigation without lifting hands from keyboard.

## Testing

Run tests with:

```bash
npm test
```

## License

MIT
