import { Chess } from 'chess.js'

const pieceValues: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 900 }

const evaluate = (game: Chess): number => {
  if (game.isCheckmate()) return game.turn() === 'w' ? -10000 : 10000
  if (game.isDraw() || game.isStalemate()) return 0
  let score = 0
  const board = game.board()
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]
      if (p) score += p.color === 'w' ? pieceValues[p.type] : -pieceValues[p.type]
    }
  }
  return score
}

const minimax = (game: Chess, depth: number, alpha: number, beta: number, isMaximizing: boolean): number => {
  if (depth === 0 || game.isGameOver()) return evaluate(game)
  const moves = game.moves({ verbose: true })
  if (isMaximizing) {
    let best = -Infinity
    for (const m of moves) {
      const g = new Chess(game.fen())
      g.move(m)
      best = Math.max(best, minimax(g, depth - 1, alpha, beta, false))
      alpha = Math.max(alpha, best)
      if (beta <= alpha) break
    }
    return best
  } else {
    let best = Infinity
    for (const m of moves) {
      const g = new Chess(game.fen())
      g.move(m)
      best = Math.min(best, minimax(g, depth - 1, alpha, beta, true))
      beta = Math.min(beta, best)
      if (beta <= alpha) break
    }
    return best
  }
}

export const findBestMove = (game: Chess, depth = 2) => {
  const moves = game.moves({ verbose: true })
  if (!moves.length) return null
  let best: any = moves[0]
  let bestVal = game.turn() === 'w' ? -Infinity : Infinity
  for (const m of moves) {
    const g = new Chess(game.fen())
    g.move(m)
    const val = minimax(g, depth - 1, -Infinity, Infinity, game.turn() === 'b')
    if ((game.turn() === 'w' && val > bestVal) || (game.turn() === 'b' && val < bestVal)) {
      bestVal = val
      best = m
    }
  }
  return best
}