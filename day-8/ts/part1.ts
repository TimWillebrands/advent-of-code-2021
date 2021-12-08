/**     number  digits
 *      0:      6
 *      1:      2*
 *      2:      5
 *      3:      5
 *      4:      4*
 *      5:      5
 *      6:      6
 *      7:      3*
 *      8:      7*
 *      9:      6
 */

const lookup: {[n:number]: number[]} = {
    2: [1],
    3: [7],
    4: [4],
    5: [2, 3, 5],
    6: [0, 6, 9],
    7: [8]
}

const count: { [n: number]: number } = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0
}

const input = Deno.args[0]
    .split('\n')
    .map(line => line.split('|'))
    .map(pieces => ({
        signalPatterns: pieces[0].split(' ').filter(word => word.length > 0),
        digitOutput: pieces[1].split(' ').filter(word => word.length > 0)
    }))

input.forEach(input =>
    input.digitOutput.forEach(digit => {
        const digits = lookup[digit.length];

        if(digits.length === 1)
            count[lookup[digit.length][0]] += 1
    }))

console.log(Object.values(count).reduce((prev, curr) => prev + curr))