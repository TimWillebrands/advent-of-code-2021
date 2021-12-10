type HashMap<T> = { [key: string]: T }

const open:HashMap<string> = { '(': ')', '[': ']', '{': '}', '<': '>' }
const close = Object.keys(open).reduce((acc, key) => { acc[open[key]] = key; return acc }, {} as HashMap<string>) // lol
const points:HashMap<number> = { ')': 3, ']': 57, '}': 1197, '>':25137 }

const uninvitedSyntax = Deno.args[0].split('\n')
    .map(line => [...line]
        .reduce((acc, curr) => {
            if (open[curr]) {
                acc.stack.push(curr)
            } else {
                const closed = acc.stack.pop();
                if (close[curr] !== closed) {
                    acc.illigal.push(curr)
                }
            }
            return acc
        }, { stack: [] as string[], illigal: [] as string[] }))
    
console.log(uninvitedSyntax.reduce((acc, stuff) => { stuff.illigal.forEach(illChar => acc += points[illChar]); return acc}, 0))