const directions: { [command:string]: [number, number] } = {
    "forward": [1, 0],
    "down": [0, 1],
    "up": [0, -1],
}

type Movement = {
    aim: number
    horizontal: number
    depth: number
}

const movement2 = Deno.args[0]
    .split('\n')
    .map(line => line.split(' '))
    .map(line => ({ command: line[0], value: Number.parseInt(line[1]) }))
    .map(instruction => directions[instruction.command].map(amount => instruction.value * amount))
    .reduce((movement, instruction) => ({
        aim: movement.aim + instruction[1],
        horizontal: movement.horizontal + instruction[0],
        depth: movement.depth + (movement.aim * instruction[0])
    }), { aim: 0, horizontal: 0, depth: 0 } as Movement)
    // .reduce((previous, current) => [previous[0] + current[0], previous[1] + current[1]])

console.log(movement2.depth * movement2.horizontal)