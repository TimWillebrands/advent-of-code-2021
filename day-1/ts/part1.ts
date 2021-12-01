const input = await Deno.readTextFile("input");
const answer = input
    .split('\n')
    .map(line => Number.parseInt(line))
    .reduce((acc, current, index, array) => !Number.isNaN(current) && current - array[index+1] < 0 ? ++acc : acc, 0)

console.log(answer)