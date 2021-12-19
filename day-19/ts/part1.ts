type V = {x:number, y:number, z:number} 
type Chart = Map<string, Map<string, number>>

const scannerInputs = Deno.args[0]
    .split('\n\n')
    .map(scanner => scanner
        .split('\n')
        .slice(1)
        .map(line => line.split(','))
        .map(coords => coords.map(coord => Number.parseInt(coord)))
        .map(coords => ({x:coords[0],y:coords[1],z:coords[2]})))

const idk = (n1: number, n2: number) => Math.min(n1, n2) - Math.max(n1, n2)
const str = (v:V) => `(x:${v.x.toString().padStart(5)}, y:${v.y.toString().padStart(5)}, z:${v.z.toString().padStart(5)})`
const eq = (v1: V, v2: V) => v1.x === v2.x && v1.y === v2.y && v1.z === v2.z
const add = (v1: V, v2: V) => ({ x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z })
const getScanner = (v1: V, v2: V) => ({ x: idk(v1.x,v2.x), y: idk(v1.y,v2.y), z: idk(v1.z,v2.z) })
const sub = (v1: V, v2: V) => ({ x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z })

// const rotate = (scanner:V[]) =>

const findMatches = (chart: V[], scanner: V[], chartIJkPt: V) =>
    scanner.some(scanIJkPt => {
        const shift = sub(chartIJkPt, scanIJkPt)
        const isInChart = (pt: V) => chart.some(chartPt => eq(chartPt, pt))
        
        const matches = scanner
            .map(pt => add(pt, shift))
            .reduce((acc, scanPt) => isInChart(scanPt) ? ++acc : acc, 0)
        
        // chartIJkPt.x === -618 && scanner
        //     .map(pt => add(pt, shift))
        //     .forEach((pt, i) => console.log((i+1).toString().padStart(5), str(pt), str(scanner[i]), str(shift), isInChart(pt).toString()))
        
        return matches >= 12
    }, 0)
    
const findScannerMatch = (scanner: V[], chart: V[]) => 
    chart.some(chartPt => findMatches(chart, scanner, chartPt))

const mapInputs = (scannerInputs: V[][], chart: V[]): V[] => {
    const matchedScanner = scannerInputs
        .findIndex(scanner => findScannerMatch(scanner, chart))
    
    console.log('Found match!', matchedScanner)
    
    const remainingInputs = scannerInputs.filter((_, i) => i !== matchedScanner)

    if (remainingInputs.length === 0)
        return chart
    else if (remainingInputs.length === scannerInputs.length)
        throw "shit"
    else
        return mapInputs(remainingInputs, chart)
}

const thaChart = mapInputs(scannerInputs.slice(1), scannerInputs[0])

console.log(thaChart, thaChart.length)