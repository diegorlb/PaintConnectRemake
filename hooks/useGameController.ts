type Cell = {
  x: number,
  y: number,
  color: number,
}

export type Grid = Array<Array<Cell>>

export enum GAMESTATE {
  RESET = -1,
  PLAYING = 0,
  COMPLETED = 1,
  LOST = 2,
}

const useGameController = () => ({
  populateGrid: (dimension: number, palette: string[]): Grid => {
    return Array(dimension).fill(0).map((_, x) => (
      Array(dimension).fill(0).map((_, y) => ({
        x, y,
        color: Math.floor(Math.random() * palette.length),
      }))
    ))
  },
  recalculateGrid: (grid: Grid, color: number): [Grid, number, boolean] => {
    const current = cloneGrid(grid)
    const same = [current[0][0]] //Top left cell (0, 0)

    for (let i = 0; i < same.length; i++) {
      const neighbours = findNeighbours(current, same[i])
      for (const neighbour of neighbours) {
        if (!neighbour || neighbour['color'] !== same[0]['color']) continue
        if (same.includes(neighbour)) continue
        same.push(neighbour)
      }
    }

    for (const { x, y, } of same) {
      if (current[x][y]['color'] !== color) current[x][y]['color'] = color
    }

    const completed = current.flat().every((cell) => cell['color'] === color)
    const progress = completed ? Math.pow(current.length, 2) : same.length

    return [current, progress, completed]
  },
  encodeOptions: (location: string, dim: number, max: number, pal: string[]): string => {
    return encodeURI(`${location}?dim=${dim}&max=${max}&pal=${pal.join('-')?.replace(/\#/g, '')}`)
  },
  decodeOptions: (query: string): { dim: number, max: number, pal: string[], } => {
    const { dim, max, pal } = Object.fromEntries(query
      .slice(1)
      .split('&')
      .map((pair) => pair.split('='))) as { dim: number, max: number, pal: string[], }

    const parsed = {}

    if (!Number.isNaN(+dim)) parsed['d'] = +dim
    if (!Number.isNaN(+max)) parsed['m'] = +max
    if (pal && String(pal).length > 0) {
      const colors = String(pal).split('-').filter((color) => {
        if (color.length === 3) return true
        if (color.length === 6) return true
        return false
      })
      if (colors.length > 0) parsed['p'] = colors.map((color) => `#${color}`)
    }

    return parsed as { dim: number, max: number, pal: string[], }
  }
})

const findNeighbours = (grid: Grid, { x, y, }: Cell) => [
  grid[x][y - 1],
  grid[x][y + 1],
  grid[x - 1] ? grid[x - 1][y] : undefined,
  grid[x + 1] ? grid[x + 1][y] : undefined,
]

const cloneGrid = (original: Grid): Grid => {
  const copy = []
  for (const originalRow of original) {
    const row = []
    for (const { x, y, color, } of originalRow) {
      row.push({ x, y, color })
    }
    copy.push(row)
  }
  return copy
}

export default useGameController