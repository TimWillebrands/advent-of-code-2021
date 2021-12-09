/**     number  digits
 *      0:      6
 *      1:*     2*
 *      2:      5
 *      3:      5
 *      4:*     4*
 *      5:      5
 *      6:      6
 *      7:*     3*
 *      8:*     7*
 *      9:      6
 * 
 *  a = 7 - 1
 *  g = d6(9) - (7+4)     == 1 digit
 *  d = d5(3) - (7+g)     == 1 digit
 *  b = d5(5) - (7+g+d)   == 1 digit
 *  e = d5(2) - (1+a+g+d) == 1 digit
 *  c = d5(2) - (a+d+e+g) == 1 digit
 *  f = 8 - (a+g+d+b+e+c) == 1 digit
 * 
 */


const input = Deno.args[0]
    .split('\n')
    .map(line => line.split('|'))
    .map(pieces => ({
        signalPatterns: pieces[0].split(' ').filter(word => word.length > 0),
        digitOutput: pieces[1].split(' ').filter(word => word.length > 0)
    }))

const length = (l: number) =>
    (digit: string) => digit.length === l;

const subtr = (d1: string, d2: string) => 
    [...d1].filter(char => ![...d2].includes(char))
    
const fix = (stuff: string[]) =>
    stuff
        .sort((a, b) => a > b ? -1 : b > a ? 1 : 0)
        .join('')

const displays: number[] = []
for (const line of input) {
    const one = line.signalPatterns.find(length(2))!
    const four = line.signalPatterns.find(length(4))!
    const seven = line.signalPatterns.find(length(3))!
    const eight = line.signalPatterns.find(length(7))!

    const fiveDigits = line.signalPatterns.filter(length(5))
    const sixDigits = line.signalPatterns.filter(length(6))

    const a = subtr(seven, one)[0];
    const g = sixDigits
        .map(digit => subtr(digit, seven + four))
        .find(we => we.length === 1)![0]
    const d = fiveDigits
        .map(digit => subtr(digit, seven + g))
        .find(we => we.length === 1)![0]
    const b = subtr(four, one + d)![0]
    const e = sixDigits
        .map(digit => subtr(digit, one + a + g + d + b))
        .find(we => we.length === 1)![0]
    const c = fiveDigits
        .map(digit => subtr(digit, e + a + g + d))
        .find(we => we.length === 1)![0]
    const f = subtr(eight, a+g+d+b+e+c)![0]

    const digitLookup: {[k:string]: string} = {}
    digitLookup[fix([a,b,c,e,f,g])]   = '0'
    digitLookup[fix([c,f])]           = '1'
    digitLookup[fix([a,c,d,e,g])]     = '2'
    digitLookup[fix([a,c,d,f,g])]     = '3'
    digitLookup[fix([...four])]       = '4'
    digitLookup[fix([a,b,d,f,g])]     = '5'
    digitLookup[fix([a,b,d,e,f,g])]   = '6'
    digitLookup[fix([a,c,f])]         = '7'
    digitLookup[fix([a,b,c,d,e,f,g])] = '8'
    digitLookup[fix([a, b, c, d, f, g])] = '9'
    
    const display = line.digitOutput
        .map(digit => digitLookup[fix([...digit]) ?? '-'])
        .join('')

    displays.push(Number.parseInt(display))


    // if(display.join('').length < 4)
        // console.log(display, line.digitOutput.map(a => fix([...a])), digitLookup)
}

console.log(displays.reduce((a,b) => a+b))