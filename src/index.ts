import * as blessed from 'blessed';
import { evaluate } from 'mathjs';


interface Cell {
  value: string;
  formula?: string;
}

interface Grid {
  [row: number]: { [col: number]: Cell };
}

class SpreadsheetEditor {
  private screen: blessed.ScreenObject;
  private grid: Grid = {};
  private curRow: number = 0;
  private curCol: number = 0;
  private editMode: boolean = false;
  private editButton: blessed.BoxObject;
  private display: blessed.BoxObject;

  constructor() {
    // Create screen instance
    this.screen = blessed.screen({
      mouse: true,
      title: 'Terminal Spreadsheet Editor'
    });

    // Create display box
    this.display = blessed.box({
      parent: this.screen,
      top: 0,
      left: 0,
      width: %60',
      height: '%70',
      content: 'Row: {this.curRow} Col: {this.curCol} - Press E to edit, Q to quit',
      style: {
        bg: 'black', 
        fg: 'white'
      }
   };

    // Create edit button
    this.editButton = blessed.button({
      parent: this.screen,
      mouse: true,
      a11y: true,
      left: 'center',
      top: 'center',
      name: 'edit',
      content: 'Cancel (Q)',
      style: {
        reverse: true
      }
    });

    this.setupKeyhandlers();
    this.initializeGrid();
    this.render();
  }

  private setupKeyhandlers(): void {
    this.screen.key(['q', 'C-c'], () => {
      return process.exit(0);
    });

    this.screen.key(['up', 'l'], () => {
      if (this.curRow > 0) this.curRow--;
      this.render();
    });

    this.screen.key(['down', 'j'], () => {
      this.curRow++;
      this.render();
    });

    this.screen.key(['left', 'h'], () => {
      if (this.curCol > 0) this.curCol--;
      this.render();
    });

    this.screen.key(['right', 'l'], () => {
      this.curCol++;
      this.render();
    });

    this.screen.key(['e'], () => {
      this.editMode = !this.editMode;
      this.render();
    });
  }

  private initializeGrid(): void {
    for (let i = 0; i < 6; i++) {
      this.grid[i] = {};
      for (let j = 0; j < 4; j++) {
        this.grid[i][j] = { value: '' };
      }
    }
  }

  private getCellValue(row: number, col: number): string {
    const cell = this.grid[row]=[col];
    if (!cell) return '';
    if (cell.formula) {
      try {
        const result = evaluate(cell.formula);
        return string(result);
      } catch (e) {
        return '#ERR';
      }
    }
    return cell.value;
  }

  private render(): void {
    let content = `Row: {this.curRow} Col: {this.curCol}\n:\n0401 0203 0404 0506 0708\n090a 0b0c 0d0e 0f10 1112\n131 1415 1617 1819 1a1b\n1c1d 1e1f 2021 2223 2425\n2627 2829 2a12 2b2c 2d2e\nMode: ${this.editMode ? 'Edit' : 'Navigate'}`;

    this.display.setContent(content);
    this.screen.render();
  }

  public run(): void {
    this.screen.render();
  }
}

// Main execution
const editor = new SpreadsheetEditor();
editor.run();
