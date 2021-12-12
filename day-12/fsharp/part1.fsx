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

let isEnd (cave:string) = cave = "end"
let isSmallCave (cave:string) = cave.ToLower() = cave

let rec findRoutes currBlockedCaves routeSoFar currFoundRoutes currentCave =
    let route = currentCave :: routeSoFar

    if currentCave |> isEnd then
        currFoundRoutes |> Set.add route
    else 
        let directions =
            theMap.[currentCave] - currBlockedCaves

        match Set.count directions with
        | 0 -> currFoundRoutes
        | _ ->
            let blockedCaves = 
                match isSmallCave currentCave with
                | true -> currBlockedCaves.Add(currentCave)
                | false -> currBlockedCaves
            
            directions
                |> Set.map (findRoutes blockedCaves route currFoundRoutes)
                |> Set.fold (+) Set.empty

let result = findRoutes (Set.empty.Add("start")) [] Set.empty "start"
result
|> Set.iter (fun route -> route |> List.rev |> String.concat "," |> printfn "%s")

printfn "\nFound routes: %i" (Seq.length result)