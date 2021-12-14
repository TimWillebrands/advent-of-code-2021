type HashMap<T> = { [key: string]: T }

const rawInput = Deno.args[0]
    .split('\n')
    .filter(line => line !== '')

const input = rawInput[0]

const rules = rawInput
    .slice(1)
    .map(rule => rule.split(' -> '))
    .reduce((rules, rule) => {
        rules[rule[0]] = rule[1]
        return rules;
    }, {} as HashMap<string>);

const idk = (base: string, cycle:number, cycles: number):string => {
    let result = "";
    let lastHit = -999;
    
    for (let i = 0; i < base.length - 1; i++) {
        if (lastHit !== (i - 1)) {
            result += base[i]
        }
        lastHit = i;
        result += rules[base[i] + base[i + 1]] ?? ''
        result += base[i + 1]
    }

    if(cycle === cycles)
        return result
    else
        return idk(result, ++cycle, cycles)
}

const elements = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
    .reduce((elements, char) => {
        elements[char[0]] = 0
        return elements;
    }, {} as HashMap<number>);

[...idk(input, 1, 40)].forEach(char => elements[char]++)

const stuff = Object.values(elements)
    .filter(value => value !== 0)
    .sort((a,b) => a - b)

console.log(stuff[0], stuff[stuff.length-1], stuff[stuff.length-1] - stuff[0])