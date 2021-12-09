const input = Deno.args[0]
    .split(',')
    .map(char => Number.parseInt(char))

const max = input.reduce((prev, curr) => prev > curr ? prev : curr)
const min = input.reduce((prev, curr) => prev < curr ? prev : curr)

const positions:{[position:number]: number} = {}

const calcFuel = (from: number, to:number) => {
    let outcome = 0;
    const diff = Math.abs(from - to)

    for(let i = 0; i <= diff; ++i){
        outcome += i;
    }

    return outcome;
}

for (let position = min; position <= max; position++) {
    positions[position] = input.reduce((acc, curr) => acc + calcFuel(position, curr), 0)
}

console.log(Object.values(positions).reduce((prev, curr) => prev < curr ? prev : curr))