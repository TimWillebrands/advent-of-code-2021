const meestVoorkomend = [...Deno.args[0]]
    .filter(char => char === '1' || char === '0')
    .map(char => Number.parseInt(char))
    .reduce((agg, current, index) => {agg[index % 12] += current; return agg}, [0,0,0,0,0,0,0,0,0,0,0,0])
    .map(totals => totals > 500 ? '1' : '0')
    .join('')

const gamma = Number.parseInt(meestVoorkomend, 2);
const epsil = (~Number.parseInt(meestVoorkomend, 2)) ^ 4294963200

console.log(meestVoorkomend, gamma, epsil, gamma * epsil)