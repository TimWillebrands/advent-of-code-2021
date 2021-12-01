fsi.CommandLineArgs 
    |> Array.tail
    |> Array.map (fun arg -> arg |> int)
    |> Array.fold (fun (acc, prev) current -> 
        let newAcc = 
            match current > prev with 
            | true -> acc+1 
            | false -> acc
        (newAcc, current)) 
        (0, 0)
    |> (fun (acc,_) -> acc )
    |> printf "Hallo %i" 