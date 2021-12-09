{
    type Pt = {
        x: number;
        y: number;
    };
    
    const input =
        Deno.args[0]
            .split('\n')
            .map(line => [...line].map(vent => Number.parseInt(vent)).filter(vent => !Number.isNaN(vent)))

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

    const isNotContainedIn = (pts: Pt[]) => 
        (pt:Pt) => !pts.some(npt => cmpPt(pt, npt))

    const calcBasinSize = (pts: Pt[]): number => {
        const isNotTooDamnHigh = ({x,y}:Pt) => input[y]?.[x] !== undefined && input[y][x] < 9

        const newNeighbours = pts
            .flatMap(getNeighbours)
            .filter(isNotContainedIn(pts))
            .filter(isNotTooDamnHigh)
            .filter((pt, i, arr) => arr.findIndex(pt2 => cmpPt(pt, pt2)) === i)

        if(newNeighbours.length === 0 )
            return pts.length
        else
            return calcBasinSize([...pts, ...newNeighbours])
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
    
    const answer = lowPoints
        .reduce((agg, lowPoint) => [...agg, calcBasinSize([lowPoint])], [] as number[])
        .sort((b1, b2) => b2-b1)
        .slice(0,3)
        .reduce((prev, curr) => prev * curr)

    console.log(answer)
}