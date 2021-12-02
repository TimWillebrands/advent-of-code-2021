const directions: { [command:string]: [number, number] } = {
    "forward": [1, 0],
    "down": [0, 1],
    "up": [0, -1],
}

const movement = Deno.args[0]
    .split('\n')
    .map(line => line.split(' '))
    .map(line => ({command: line[0], value: Number.parseInt(line[1]) }))
    .map(instruction => directions[instruction.command].map(amount => instruction.value * amount))
    .reduce((previous, current) => [previous[0] + current[0], previous[1] + current[1]])

console.log(movement[0] * movement[1])