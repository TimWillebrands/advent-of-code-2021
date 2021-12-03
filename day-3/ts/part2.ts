type Compare = (sum: number, total: number) => boolean;

const meestVoorkomend = (enenEnNullen: string[], compare: Compare) =>
    [...enenEnNullen]
        .map(char => Number.parseInt(char))
        .reduce((agg, current, index) => { agg[index % 12] += current; return agg }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        .map(sum => compare(sum, (enenEnNullen.length / 12)) ? '1' : '0');

const reduceerTot = (enenEnNullen: string[], nulTotElf: number, compare: Compare):string[] => {
    if (enenEnNullen.length === 12) return enenEnNullen;
    
    const meestvoorkomendOpIndex = meestVoorkomend(enenEnNullen, compare)[nulTotElf];

    const toegestaneWaarden = enenEnNullen
        .reduce((agg, _, index, array) =>
            index % 12 === 0 && array[index + nulTotElf] === meestvoorkomendOpIndex
                ? [...agg, ...array.slice(index, index + 12)]
                : agg, [] as string[])
        
    return reduceerTot(toegestaneWaarden, ++nulTotElf, compare);
}

const oorspronkelijkeEnenEnNullen = [...Deno.args[0]].filter(char => char === '1' || char === '0');

const oxygen = reduceerTot(oorspronkelijkeEnenEnNullen, 0, (sum, total) => sum >= total/2).join('')
const cotwee = reduceerTot(oorspronkelijkeEnenEnNullen, 0, (sum, total) => sum < total/2).join('')

console.log(oxygen, cotwee, Number.parseInt(oxygen, 2), Number.parseInt(cotwee, 2),Number.parseInt(oxygen, 2) * Number.parseInt(cotwee, 2))