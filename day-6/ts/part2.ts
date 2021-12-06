const fishies: { [fishAge: number]: number } = {}
for (let i = 0; i <= 8; ++i){
    fishies[i] = 0;
}

Deno.args[0]
    .split(',')
    .map(char => Number.parseInt(char))
    .forEach(fishAge => fishies[fishAge]++)

for (let i = 0; i <= 256; ++i){
    const totalFishies = Object.values(fishies).reduce((prev, curr) => prev + curr);
    console.log(`After ${i} days:\t${totalFishies} fishies`, fishies)

    const newFishies = fishies[0];

    for (let j = 0; j <= 7; ++j){
        fishies[j] = fishies[j + 1];
    }

    fishies[6] += newFishies;
    fishies[8] = newFishies;
}