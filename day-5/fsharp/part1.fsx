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
    

let drawLineInGrid (grid:Map<Pos,int>) (line:Line) =
    match line.From.X = line.To.X || line.From.Y = line.To.Y with
    | false -> grid
    | true ->
        let mutable supaGrid = grid

        for x in line.From.X..line.To.X do
            for y in line.From.Y..line.To.Y do 
                supaGrid <- ( supaGrid |> Map.change {X=x;Y=y} addToInt )
        supaGrid

let finalGrid = lines |> Seq.fold drawLineInGrid grid

// let drawGrid = 
//     let positionsToString positions =
//         positions 
//             |> Seq.map snd  
//             |> Seq.map string
//             |> String.concat " "

//     finalGrid
//         |> Map.toSeq
//         |> Seq.groupBy (fun (pos, _) -> pos.Y)
//         |> Seq.iter (fun (_ , positions ) -> printfn "%s" (positionsToString positions))


printfn "\nTotal collisions: %i" (finalGrid |> Map.filter (fun _ hits -> hits > 1) |> Map.count)