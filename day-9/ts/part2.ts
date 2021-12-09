{
    type Pt = {
        x: number;
        y: number;
    };
    
    const input =
        Deno.args[0]
            .split('\n')
            .map(line => [...line].map(vent => Number.parseInt(vent)))

    const width = input[0].length
    const height = input.length

    const lowPoints: Pt[] = [];

    const cmpPt = (pt1: Pt, pt2: Pt) => pt1.x === pt2.x && pt1.y === pt2.y

    const getNeighbours = ({x,y}:Pt):Pt[] => [
        {x: x    , y: y- 1},
        {x: x    , y: y+ 1},
        {x: x - 1, y: y   },
        {x: x + 1, y: y   },
    ]

    const calcNeighbours = (y: number, x: number) => [
        input[y - 1]?.[x] ?? 9,
        input[y + 1]?.[x] ?? 9,
        input[y]?.[x - 1] ?? 9,
        input[y]?.[x + 1] ?? 9,
    ]

    const calcBasinSize = (pts: Pt[]): number => {
        const ignoredNeighbours: Pt[] = [...pts];
    
        const isNotIgnored = ((pt:Pt) => !ignoredNeighbours.some(npt => cmpPt(pt, npt)) )

        const allNeighbours = pts
            .flatMap(getNeighbours)
            .filter(isNotIgnored)

        console.log(allNeighbours)
        
        return allNeighbours.length;

    }
    
    for (let x = 0; x < width; ++x)
    for (let y = 0; y < height; ++y)
    {
        const vent  = input[y][x]
        const neighbours = calcNeighbours(y, x)

        const ventRelativeHeight = neighbours.reduce((agg, neighbour) => agg += vent < neighbour ? 0 : 1, 0)
        
        if (ventRelativeHeight === 0)
            lowPoints.push({x,y});
    }
    

    const basins = lowPoints.reduce((agg, lowPoint) => [...agg, calcBasinSize([lowPoint])], [] as number[])

    // console.log('lowPoints:', lowPoints)
    console.log('basins:', basins)
}