fsi.CommandLineArgs 
    |> Array.tail
    |> Array.map int
    |> Array.windowed 3
    |> Array.map (fun arr -> arr |> Array.reduce (+))
    |> Array.fold (fun (acc, prev) current -> 
        let newAcc = 
            match current > prev with 
            | true -> acc+1 
            | false -> acc
        (newAcc, current)) 
        (0, 0)
    |> (fun (acc,_) -> acc )
    |> printf "%i" 