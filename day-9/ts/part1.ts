const input = 
    Deno.args[0]
        .split('\n')
        .map(line => [...line].map(vent => Number.parseInt(vent)))

const width  = input[0].length
const height = input.length

let lowPoints = 0;

for (let x = 0; x < width; ++x)
for (let y = 0; y < height; ++y)
{
    const vent  = input[y][x]
    const neighbours = [
        input[y-1]?.[x]   ?? 9,
        input[y+1]?.[x]   ?? 9,
        input[y]?.[x-1]   ?? 9,
        input[y]?.[x + 1] ?? 9,
    ]

    const ventRelativeHeight = neighbours.reduce((agg, neighbour) => agg += vent < neighbour ? 0 : 1, 0)
    
    if (ventRelativeHeight === 0)
    {
        console.log(`${x},${y} |`, vent, ventRelativeHeight, neighbours)
        lowPoints += (vent + 1);
    }
}

console.log('lowpoints:', lowPoints)