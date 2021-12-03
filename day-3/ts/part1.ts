// const movement = Deno.args[0]
//     .split('\n')
//     .reduce((agg, current) => current.forEach, [0,0,0,0,0,0,0,0,0,0,0,0])

// console.log(movement[0] * movement[1])

const meestVoorkomend = [...Deno.args[0]]
    .filter(char => char === '1' || char === '0')
    .map(char => Number.parseInt(char))
    .reduce((agg, current, index) => {agg[index % 12] += current; return agg}, [0,0,0,0,0,0,0,0,0,0,0,0])
    .map(totals => totals > 500 ? '1' : '0')
    .join('')

console.log(meestVoorkomend)