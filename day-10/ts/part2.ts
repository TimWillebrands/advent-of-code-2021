{
    type HashMap<T> = { [key: string]: T }

    const open: HashMap<string> = { '(': ')', '[': ']', '{': '}', '<': '>' }
    const points: HashMap<number> = { ')': 1, ']': 2, '}': 3, '>': 4 }

    const uninvitedSyntax = Deno.args[0]
        .split('\n')
        .map(line => [...line]
            .reduce((acc, curr) => {
                if (open[curr]) {
                    acc.stack.push(curr)
                } else if (open[acc.stack.at(-1)!] !== curr) {
                    return { ...acc, isIlligal: true }
                }else {
                    acc.stack.pop()
                }
                return acc
            }, { stack: [] as string[], isIlligal: false }))
        .filter(unfinished => !unfinished.isIlligal)
        .map(unfinished => unfinished.stack
            .map(char => open[char])
            .reverse()
            .reduce((acc, curr) => (acc * 5) + points[curr] ,0)
        )
        .sort((a, b) => a-b)

    uninvitedSyntax.forEach((asd, i) => console.log(i+1, asd))
    // gtfo.forEach((asd, i) => console.log(i+1, `${Deno.args[0].split('\n')[i]}\t${asd}`))
    // console.log('\n',Math.trunc(uninvitedSyntax.length/2), uninvitedSyntax[Math.trunc(uninvitedSyntax.length/2)])
}