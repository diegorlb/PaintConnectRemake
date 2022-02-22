import { FunctionComponent, useCallback, useEffect, useRef, } from 'react'
import { useSelector, } from '../../hooks/useStore'

const ColorsCanvas: FunctionComponent = ({ }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!)

  const dimension = useSelector(({ options, }) => options['dimension'])
  const palette = useSelector(({ options, }) => options['palette'])

  const grid = useSelector(({ game, }) => game['grid'])

  const reDrawCanvas = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { width, height, } = canvas
    const [w, h] = [width / dimension, height / dimension]
    ctx.clearRect(0, 0, width, height)
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        ctx.fillStyle = palette[grid[x][y]['color']]
        ctx.fillRect(x * w, y * h, w, h)
      }
    }
  }, [dimension, palette, grid])

  const resizeCanvas = useCallback((canvas: HTMLCanvasElement) => {
    if (!canvas) return
    const { width, height, } = canvas.getBoundingClientRect()
    if (canvas.width !== width) canvas.width = dimension * Math.floor(width / dimension)
    if (canvas.height !== height) canvas.height = dimension * Math.floor(height / dimension)
  }, [dimension])

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      resizeCanvas(canvasRef.current)
      reDrawCanvas(canvasRef.current)
    })
    observer.observe(canvasRef.current)

    return () => observer.disconnect()
  }, [canvasRef.current])

  useEffect(() => {
    reDrawCanvas(canvasRef.current)
  }, [canvasRef.current, dimension, palette, grid])

  return (
    <div className={'w-full aspect-square bg-secondary p-2 rounded-lg'}>
      <canvas
        className={'w-full h-full rounded-md'}
        ref={canvasRef} />
    </div>
  )
}

export default ColorsCanvas