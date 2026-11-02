// Pixel art for pages, drawn as SVG on a grid. The 5x7 glyphs are the arcade's
// (leonkarsten-arcade/engine/font.js), plus '&', so page titles match the games.

const GLYPHS: Record<string, string> = {
  A: '.###. #...# #...# ##### #...# #...# #...#',
  B: '####. #...# #...# ####. #...# #...# ####.',
  C: '.###. #...# #.... #.... #.... #...# .###.',
  D: '####. #...# #...# #...# #...# #...# ####.',
  E: '##### #.... #.... ####. #.... #.... #####',
  F: '##### #.... #.... ####. #.... #.... #....',
  G: '.###. #...# #.... #.### #...# #...# .####',
  H: '#...# #...# #...# ##### #...# #...# #...#',
  I: '.###. ..#.. ..#.. ..#.. ..#.. ..#.. .###.',
  J: '..### ...#. ...#. ...#. ...#. #..#. .##..',
  K: '#...# #..#. #.#.. ##... #.#.. #..#. #...#',
  L: '#.... #.... #.... #.... #.... #.... #####',
  M: '#...# ##.## #.#.# #.#.# #...# #...# #...#',
  N: '#...# #...# ##..# #.#.# #..## #...# #...#',
  O: '.###. #...# #...# #...# #...# #...# .###.',
  P: '####. #...# #...# ####. #.... #.... #....',
  Q: '.###. #...# #...# #...# #.#.# #..#. .##.#',
  R: '####. #...# #...# ####. #.#.. #..#. #...#',
  S: '.###. #...# #.... .###. ....# #...# .###.',
  T: '##### ..#.. ..#.. ..#.. ..#.. ..#.. ..#..',
  U: '#...# #...# #...# #...# #...# #...# .###.',
  V: '#...# #...# #...# #...# #...# .#.#. ..#..',
  W: '#...# #...# #...# #.#.# #.#.# #.#.# .#.#.',
  X: '#...# #...# .#.#. ..#.. .#.#. #...# #...#',
  Y: '#...# #...# .#.#. ..#.. ..#.. ..#.. ..#..',
  Z: '##### ....# ...#. ..#.. .#... #.... #####',
  0: '.###. #...# #..## #.#.# ##..# #...# .###.',
  1: '..#.. .##.. ..#.. ..#.. ..#.. ..#.. .###.',
  2: '.###. #...# ....# ...#. ..#.. .#... #####',
  3: '##### ...#. ..#.. ...#. ....# #...# .###.',
  4: '...#. ..##. .#.#. #..#. ##### ...#. ...#.',
  5: '##### #.... ####. ....# ....# #...# .###.',
  6: '..##. .#... #.... ####. #...# #...# .###.',
  7: '##### ....# ...#. ..#.. .#... .#... .#...',
  8: '.###. #...# #...# .###. #...# #...# .###.',
  9: '.###. #...# #...# .#### ....# ...#. .##..',
  ' ': '..... ..... ..... ..... ..... ..... .....',
  '.': '..... ..... ..... ..... ..... .##.. .##..',
  '!': '..#.. ..#.. ..#.. ..#.. ..#.. ..... ..#..',
  '-': '..... ..... ..... .###. ..... ..... .....',
  ':': '..... .##.. .##.. ..... .##.. .##.. .....',
  '&': '.##.. #..#. #.#.. .#... #.#.# #..#. .##.#',
};

/** Text as grid rows. Each lit pixel is the digit of its glyph row (0-6), so a
 *  palette can stripe a logo one colour per row, the way arcade titles did. */
export function textRows(str: string): string[] {
  const s = str.toUpperCase();
  const rows: string[] = [];
  for (let r = 0; r < 7; r++) {
    let line = '';
    for (let i = 0; i < s.length; i++) {
      const g = (GLYPHS[s[i]] ?? GLYPHS[' ']).split(' ')[r];
      line += g.replaceAll('#', String(r)) + (i < s.length - 1 ? '.' : '');
    }
    rows.push(line);
  }
  return rows;
}

/** A palette that paints every row of textRows() in one colour, or one per row. */
export function textPalette(colors: string | string[]): Record<string, string> {
  const list = Array.isArray(colors) ? colors : Array(7).fill(colors);
  return Object.fromEntries(list.map((c, i) => [String(i), c]));
}

export interface Rect { x: number; y: number; w: number; fill: string }

/** Grid rows to rects, merging horizontal runs of one colour. '.' is empty;
 *  a character missing from the palette throws, so a typo in art fails the build. */
export function toRects(rows: string[], palette: Record<string, string>): Rect[] {
  const rects: Rect[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let end = x + 1;
      while (end < row.length && row[end] === ch) end++;
      if (ch !== '.') {
        const fill = palette[ch];
        if (!fill) throw new Error(`pixels: no colour for '${ch}' in row ${y}: ${row}`);
        rects.push({ x, y, w: end - x, fill });
      }
      x = end;
    }
  });
  return rects;
}
