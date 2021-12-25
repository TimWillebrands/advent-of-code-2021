// Setup:
let rawInput =
    fsi.CommandLineArgs
    |> Seq.tail
    |> Seq.toList

let maxX = rawInput.[0] |> Seq.length
let maxY = rawInput |> Seq.length

// Functions:
let dump input =
    let checkNL i = if (i%maxX)=(maxX-1) then "\n" else ""
    input
    |> Seq.iteri (fun i char -> printf "%c%s" char (checkNL i))
    printfn ""

let horizontalStep (input:list<char>) i char =
    match char with
    | '.' ->
        let mutable prevPos = ((i-1) % maxX) + ((i/maxX)*maxX)
        prevPos <- if prevPos < 0 then maxX-1 else prevPos
        let prev = input.[prevPos]
        if prev = '>' then prev else char
    | '>' ->
        let nextPos = ((i+1) % maxX) + ((i/maxX)*maxX)
        let next = input.[nextPos]
        if next = '.' then '.' else char
    | _ -> char

let verticalStep (input:list<char>) i char =
    let downColumn i =
        let mutable col = (i/maxX)-1
        if col < 0 then col <- (maxY-1)
        (i%maxX) + (col*maxX)

    let upColumn i =
        let mutable col = (i/maxX)+1
        if col >= maxY then col <- 0
        (i%maxX) + (col*maxX)

    match char with
    | '.' -> 
        let prev = input.[downColumn i]
        if prev = 'v' then prev else char
    | 'v' ->
        let next = input.[upColumn i]
        if next = '.' then '.' else char
    | _ -> char 
    
let step (input:list<char>) =
    let step1 = input |> List.mapi (horizontalStep input)
    // dump step1
    let step2 = step1 |> List.mapi (verticalStep step1)
    // dump step2
    step2

let rec stepTrough i prev input =
    System.Console.Clear()
    printf "step %i" i
    match Seq.forall2 (=) prev input with
    | true -> i
    | false -> stepTrough (i+1) input (step input)

// Finish
let init =
    rawInput
    |> Seq.fold Seq.append Seq.empty
    |> Seq.toList

// dump init

printfn "\n%i" (stepTrough 1 init (step init))