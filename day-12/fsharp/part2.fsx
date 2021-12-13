let addOrUpdateDestinations (addition:string) (destinations:option<Set<string>>) =
    match destinations with
    | Some existingDestinations -> Some (existingDestinations |> Set.union (Set.empty.Add(addition)))
    | None -> Some (Set.empty.Add(addition))

let updateMap (map:Map<string, Set<string>>) (points:string[]) =
    map 
    |> Map.change points.[0] (addOrUpdateDestinations points.[1])
    |> Map.change points.[1] (addOrUpdateDestinations points.[0])

let theMap = 
    fsi.CommandLineArgs 
    |> Seq.tail
    |> Seq.map (fun (line:string) -> line.Split "-")
    |> Seq.fold updateMap Map.empty

let isStart (cave:string) = cave = "start"
let isEnd (cave:string) = cave = "end"
let isSmallCave (cave:string) = not (isStart cave) && cave.ToLower() = cave

let rec findRoutes routeSoFar foundRoutes currentCave =
    let route = currentCave :: routeSoFar

    if currentCave |> isEnd then
        foundRoutes |> Set.add route
    else 
        let visitedSmall =
            route
            |> List.filter isSmallCave

        let visitedSmallDistinct = 
            visitedSmall
            |> List.distinct

        let blocked =
            match (visitedSmall |> List.length) <> (visitedSmallDistinct |> List.length) with
            | true -> Set.ofList visitedSmall
            | false -> Set.empty

        let directions =
            theMap.[currentCave] - blocked
            |> Set.filter ((<>) "start")

        match Set.count directions with
        | 0 -> foundRoutes
        | _ ->
            directions
            |> Set.map (findRoutes route foundRoutes)
            |> Set.fold (+) Set.empty

let findRoutesInit startPoint =
    findRoutes [] Set.empty startPoint

let result = findRoutesInit "start"

result
|> Set.map (fun route -> route |> List.rev |> String.concat ",")
|> Set.toList
|> List.sort
|> List.iter (printfn "%s")

printfn "\nFound routes: %i" (Seq.length result)