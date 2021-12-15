// Ellendig gejat van: https://gist.github.com/stella-yc/49a7b96679ab3bf06e26421fc81b5636

type Pt = { x: number, y: number };

const map = Deno.args[0]
    .split('\n')
    .map(line => [...line].map(char => Number.parseInt(char)))

const xMax = map[0].length - 1
const yMax = map.length - 1

const lblPt = (lbl: string) => {
    const asd = lbl.split(',').map(a => Number.parseInt(a));
    return { x: asd[0], y: asd[1] }
}

const ptLbl = (x:number, y:number) => `${x},${y}`
const ptVal = (x:number, y:number) => map[y][x]

const costs = new Map<string, number>([
    [ptLbl(9,9), Infinity],
    [ptLbl(0,1), ptVal(0,1)],
    [ptLbl(1,0), ptVal(1,0)],
])
const parents = new Map<string, string>([
    [ptLbl(1,0), ptLbl(0,0)],
    [ptLbl(0,1), ptLbl(0,0)]
])

const processed = new Set<string>()

const getNeighbours = (pt: Pt) => {
    const stuff = [
        map[pt.y+1]?.[pt.x] !== undefined ? {x: pt.x, y: pt.y+1} : undefined,
        map[pt.y-1]?.[pt.x] !== undefined ? {x: pt.x, y: pt.y-1} : undefined,
        map[pt.y]?.[pt.x+1] !== undefined ? {x: pt.x+1, y: pt.y} : undefined,
        map[pt.y]?.[pt.x-1] !== undefined ? {x: pt.x-1, y: pt.y} : undefined,
    ]  as Pt[]

    return stuff.filter(thing => thing !== undefined)
}

const lowestCostNode = () => 
    [...costs.keys()].reduce((lowest, node) => {
        if (lowest === null || costs.get(node)! < costs.get(lowest)!) {
            if (!processed.has(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null as string | null);


// function that returns the minimum cost and path to reach Finish
const dijkstra = () => {
    let node = lowestCostNode();
  
    while (node) {
        const nodePt = lblPt(node);
        const cost = costs.get(node) ?? 0;
        const children = getNeighbours(nodePt);

        for (const child of children) {
            const newCost = cost + ptVal(child.x, child.y);
            const childLbl = ptLbl(child.x, child.y);
            const currCost = costs.get(childLbl);

            if (!currCost || currCost > newCost) {
                costs.set(childLbl, newCost);
                parents.set(childLbl, node);
            }
        }

        processed.add(node);
        node = lowestCostNode();

    }

    const optimalPath = [ptLbl(xMax, yMax)];
    let parent = parents.get(ptLbl(xMax, yMax));

    console.log(ptLbl(xMax, yMax));
    
    while (parent) {
        optimalPath.push(parent);
        parent = parents.get(parent);
        console.log(parent)

        if (parent === '0,0') break;
    }

    optimalPath.reverse();
  
    const results = {
        distance: costs.get(ptLbl(xMax, yMax)),
        path: optimalPath
    };
  
    return results;
  };
  

console.log(dijkstra())
