const input = Deno.args[0]
    .split(',')
    .map(char => Number.parseInt(char))

let mutInput = [...input];

for (let i = 0; i <= 256; ++i){
    const newFishies = mutInput.map(fish => --fish);

    newFishies
        .filter(fish => fish < 0)
        .forEach(_ => newFishies.push(8))

    const finalFishies = newFishies
        .map(fish => fish < 0 ? 6 : fish)

    console.log(`After ${i} days:\t${mutInput.length} fishies`)
    mutInput = finalFishies;
}