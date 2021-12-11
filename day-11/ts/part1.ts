const initGrid = Deno.args[0]
    .split('\n')
    .map(line => [...line].map(c => Number.parseInt(c)))

const xSize = initGrid[0].length
const ySize = initGrid.length

let totalFlashes = 0;

const dumpGrid = (grid: number[][], frame:number) => {
    console.clear()
    console.log(`Index: ${frame} | Total flashes: ${totalFlashes}\n`)
    grid.forEach(line => console.log(line.join(' ')));
}

const flashCell = (grid: number[][], x: number, y: number) => {
    grid[y][x] = 0;
    ++totalFlashes;

    for (let _ny = -1; _ny < 2; ++_ny)
    for (let _nx = -1; _nx < 2; ++_nx){
        const ny = y + _ny;
        const nx = x + _nx;
        if (grid[ny]?.[nx] && grid[ny][nx] > 0) {
            ++grid[ny][nx]

            if (grid[ny][nx] > 9) {
                flashCell(grid, nx, ny)
            }
        }
    }
}

const updateGrid = (grid: number[][], endFrame: number, frame = 0, speed = 500) => {
    dumpGrid(grid, frame)

    const newGrid = grid.map(row => row.map(cell => cell + 1))

    for (let y = 0; y < ySize; y++)
    for (let x = 0; x < xSize; x++) {
        if (newGrid[y][x] > 9) {
            flashCell(newGrid, x, y)
        }
    }
    
    if(frame < endFrame)
        setTimeout(() => updateGrid(newGrid, endFrame, ++frame, speed), speed)
}

updateGrid(initGrid, 100, 0 , 50)