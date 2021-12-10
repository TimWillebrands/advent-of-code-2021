{
    type HashMap<T> = { [key: string]: T }

    const open: HashMap<string> = { '(': ')', '[': ']', '{': '}', '<': '>' }
    const points: HashMap<number> = { ')': 1, ']': 2, '}': 3, '>': 4 }

    const uninvitedSyntax = Deno.args[0].split('\n')
        .map((line,i) => [...line]
            .reduce((acc, curr) => {
                if (open[curr]) {
                    acc.push(curr)
                    console.log(`${i+1}\tpush\t${curr}\t${acc.join('')}`)
                } else {
                    const asd = []
                    for (let i = acc.length; i >= 0; i--) {
                        asd.push(acc[i])
                        if (curr === open[acc[i]]) {
                            acc.splice(i, 1);
                            break;
                        }
                    }
                    console.log(`${i+1}\tpop \t${curr}\t${acc.join('')}`)
                }
                return acc
            }, [] as string[]))
        .map(unfinished => unfinished
            .map(char => open[char])
            .reverse()
            .reduce((acc, curr) => (acc * 5) + points[curr] ,0)
        )
        .sort((a, b) => a-b)

    // const gtfo = Deno.args[0].split('\n')
    //     .map(line => [...line]
    //         .reduce((acc, curr) => {
    //             if (open[curr]) {
    //                 acc.push(curr)
    //             } else {
    //                 acc.pop();
    //             }
    //             return acc
    //         }, [] as string[]))
    //     .map(unfinished => unfinished
    //         // .map(char => open[char])
    //         // .reverse()
    //         .join('')
    //     )
    
    uninvitedSyntax.forEach((asd, i) => console.log(i+1, asd))
    // gtfo.forEach((asd, i) => console.log(i+1, `${Deno.args[0].split('\n')[i]}\t${asd}`))
    console.log('\n',Math.trunc(uninvitedSyntax.length/2), uninvitedSyntax[Math.trunc(uninvitedSyntax.length/2)])
}