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

const stuff = boards
    .map(board => {    
        const winningRollIndex  = rollSets.findIndex(rolls => isBoardFinished(board, rolls))
        const winningRollSet    = rollSets[winningRollIndex]
        const winningRoll       = [...winningRollSet].pop()

        const leftoverNumbersSum = board
            .filter(number => !winningRollSet.includes(number))
            .reduce((prev, curr) => prev += curr)
            
        return {roll: winningRollIndex, score: winningRoll! * leftoverNumbersSum}
    })
    .sort((a, b) => b.roll - a.roll)

console.log(stuff)