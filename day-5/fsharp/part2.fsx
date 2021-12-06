type Pos = {
    X: int
    Y: int
}

type Line = {
    From: Pos
    To: Pos
}

let formPairs stuff = 
    stuff
        |> Seq.pairwise
        |> Seq.mapi (fun i x -> i%2=0, x) 
        |> Seq.filter fst 
        |> Seq.map snd

let lines = 
    fsi.CommandLineArgs
        |> Seq.tail
        |> Seq.filter (fun line -> not (line.Equals "->"))
        |> Seq.map (fun (coord:string) -> coord.Split(",") |> Array.map int)
        |> Seq.map (fun array -> {X=array.[0];Y=array.[1]})
        |> formPairs
        |> Seq.map (fun (from, dest) -> {From=from;To=dest})

let (maxX, maxY) = 
    lines
        |> Seq.map (fun line -> [line.From; line.To] )
        |> Seq.concat 
        |> Seq.fold 
            (fun acc line -> (max (fst acc) line.X, max (snd acc) line.Y )) 
            (0,0) 

let initGridVal = seq { for x in 0..maxX do for y in 0..maxY -> ({X=x;Y=y}, 0) }

let grid = Map initGridVal

let (..) a b =
    if a < b then seq { a .. b }
             else seq { a .. -1 .. b }

let addToInt = 
    (fun v -> 
        match v with
        | Some (b:int) -> Some (b+1)
        | None -> None)

let pow2 = (fun a -> pown (float a) 2)

let distance = 
    (fun p1 p2 -> sqrt (pow2 (p2.X - p1.X) + pow2 (p2.Y - p1.Y)))

let isStreight pos1 pos2 = pos1.X = pos2.X || pos1.Y = pos2.Y

let isDiagonal pos1 pos2 = 
    let pos3 = {X=pos1.X; Y=pos2.Y}
    let pos4 = {X=pos2.X; Y=pos1.Y}
    let d1 = distance pos1 pos4
    let d4 = distance pos3 pos1

    d1 = d4

let drawLineInGrid (grid:Map<Pos,int>) (line:Line) =
    let streight = isStreight line.From line.To
    let diagonal = isDiagonal line.From line.To 

    match streight || diagonal with
    | false -> grid
    | true ->
        let mutable supaGrid = grid

        for x in line.From.X..line.To.X do
            for y in line.From.Y..line.To.Y do 
                if streight || (diagonal && isDiagonal line.From {X=x;Y=y}) then 
                    supaGrid <- ( supaGrid |> Map.change {X=x;Y=y} addToInt )
        supaGrid

let finalGrid = lines |> Seq.fold drawLineInGrid grid

let drawGrid = 
    let positionsToString positions =
        positions 
            |> Seq.map snd  
            |> Seq.map string
            |> Seq.map (fun char -> match char with | "0" -> "." | _ -> char)
            |> String.concat " "

    finalGrid
        |> Map.toSeq
        |> Seq.groupBy (fun (pos, _) -> pos.Y)
        |> Seq.iter (fun (_ , positions ) -> printfn "%s" (positionsToString positions))


printfn "\nTotal collisions: %i" (finalGrid |> Map.filter (fun _ hits -> hits > 1) |> Map.count)