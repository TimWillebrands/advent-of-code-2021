type HashMap<T> = { [key: string]: T }

const rawInput = Deno.args[0]
    .split('\n')
    .filter(line => line !== '')

const empty = rawInput
    .slice(1)
    .map(rule => rule.split(' -> '))
    .reduce((rules, rule) => {
        rules[rule[0]] = 0
        return rules;
    }, {} as HashMap<number>);

const input = rawInput[0]

const rules = rawInput
    .slice(1)
    .map(rule => rule.split(' -> '))
    .reduce((rules, rule) => {
        rules[rule[0]] = rule[1]
        return rules;
    }, {} as HashMap<string>);

const idk = (base: HashMap<number>, cycle:number, cycles: number):HashMap<number> => {
    const result:HashMap<number> = {...empty};
    
    Object.keys(base).forEach(key => {
        const value = base[key]

        const rule = rules[key]
        // console.log(key, rule, key[0]+rule, rule+key[1])

        result[key[0]+rule] += value
        result[rule+key[1]] += value
    })

    if(cycle === cycles)
        return result
    else
        return idk(result, ++cycle, cycles)
}

const agg = rawInput
    .slice(1)
    .map(rule => rule.split(' -> '))
    .reduce((rules, rule) => {
        rules[rule[0]] = [...input].reduce((cnt, curr, i, arr) => cnt + (curr+arr[i+1]==rule[0] ? 1 : 0), 0)
        return rules;
    }, {} as HashMap<number>);

const polymer = idk(agg, 1, 40)

const elements = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
    .reduce((elements, char) => {
        elements[char[0]] = 0
        return elements;
   }, {} as HashMap<number>);

Object.keys(polymer)
    .forEach(key => {
        const value = polymer[key]
        elements[key[0]] += value
    })

const stuff = Object.values(elements)
    .filter(value => value !== 0)
    .sort((a,b) => a - b)

console.log(stuff[0], stuff[stuff.length-1], stuff[stuff.length-1] - stuff[0] + 1)