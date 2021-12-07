const input = Deno.args[0]
    .split(',')
    .map(char => Number.parseInt(char))

const max = input.reduce((prev, curr) => prev > curr ? prev : curr)
const min = input.reduce((prev, curr) => prev < curr ? prev : curr)

const positions:{[position:number]: number} = {}

for (let position = min; position <= max; position++) {
    positions[position] = input.reduce((acc, curr) => acc + Math.abs(position - curr), 0)
}

console.log(Object.values(positions).reduce((prev, curr) => prev < curr ? prev : curr))