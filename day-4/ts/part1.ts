type Board = number[]

const input = Deno.args[0];

const rollSets = input
    .slice(0, input.search('\n'))
    .split(',')
    .map(char => Number.parseInt(char))
    .map((_, index, array) => array.slice(0, index))

const boards = input
    .slice(input.search('\n')+2)
    .split('\n\n')
    .map(board => board
        .replaceAll('\n', ' ')
        .split(' ')
        .map(char => Number.parseInt(char))
        .filter(number => !Number.isNaN(number)) as Board)
    
const isBoardFinished = (board: Board, rolls: number[]): boolean => {
    for (let i = 0; i < 5; ++i) {
        const row    = board.slice(i*5, (i*5) + 5).every(n => rolls.includes(n))
        const column = [board[i], board[i + 5], board[i + 10], board[i + 15], board[i + 20]].every(n => rolls.includes(n))
        
        if (row || column)
            return true
    }

    return false
}

rollSets.some(rolls => {
    const finishedBoardIndex = boards.findIndex(board => isBoardFinished(board, rolls))
    const finishedBoard = boards[finishedBoardIndex]

    if (finishedBoard) {
        const leftoverNumbersSum = finishedBoard
            .filter(number => !rolls.includes(number))
            .reduce((prev, curr) => prev += curr)
        
        console.log(`winrar Board: board-${finishedBoardIndex}`, finishedBoard, ', rolls: ', rolls)
        console.log(leftoverNumbersSum, rolls[rolls.length - 1],leftoverNumbersSum * rolls[rolls.length - 1])
        return true;
    }
})