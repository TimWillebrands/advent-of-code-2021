const input = await Deno.readTextFile("input");
const answer = input
    .split('\n')
    .map(line => Number.parseInt(line))
    .map((current, index, array) => current + (array[index + 1]||0) + (array[index + 2]||0))
    // .splice(0,10)
    // .forEach(val => console.log(val))
    .reduce((acc, current, index, array) => !Number.isNaN(current) && current - array[index+1] < 0 ? ++acc : acc, 0)

console.log(answer)