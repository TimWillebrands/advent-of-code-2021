fsi.CommandLineArgs 
    |> Array.tail
    |> Array.map int
    |> Array.fold (fun (acc, prev) current -> 
        let newAcc = 
            match current > prev with 
            | true -> acc+1 
            | false -> acc
        (newAcc, current)) 
        (0, 0)
    |> (fun (acc, _) -> printf "%i" <| acc-1)