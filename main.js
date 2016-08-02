var strategy = require('./genome.js')
var Game = require('./game.js')
var dna = require('./dna.js')

console.log(dna.random(4))

var currentGame = new Game(30)
var repeats = 100

function loop () {
  currentGame.playDna(0, strategy.titForTat)
  currentGame.playDna(1, strategy.joss)
  currentGame.count += 1

  if (currentGame.terminal()) {
    currentGame.draw()
    process.exit()
  }
  else {
    loop()
  }
}

loop()

// var scores = {}
// for (var strat in strategy) {
//   if (strategy.hasOwnProperty(strat)) {
//     scores[strat] = 0
//   }
// }
//
// for (var repeat = 1; repeat < repeats; repeat += 1) {
//   for (var strat1 in strategy) {
//     for (var strat2 in strategy) {
//       for (var length = 0; length < currentGame.total; length += 1) {
//         currentGame.playStrategy(0, strategy[strat1])
//         currentGame.playStrategy(1, strategy[strat2])
//         currentGame.count += 1
//       }
//       let grade = currentGame.grade()
//       scores[strat1] += grade[0]
//       scores[strat2] += grade[1]
//       currentGame.reset()
//     }
//   }
// }
//
// var sortedScores = []
// for (var score in scores) {
//   if (scores.hasOwnProperty(score)) {
//     scores[score] = scores[score] / (repeats * currentGame.total)
//     sortedScores.push([score, scores[score]])
//     sortedScores.sort(function (a, b) {
//       return b[1] - a[1]
//     })
//   }
// }

/*

testreturn
  a = cc
  b = dd
  c = cd
  d = dc

moveid
  a = first
    a = +0
    b = +1
    c = +2
    d = +3
  b = current
    a = -0
    b = -1
    c = -2
    d = -3
  c = final
    a = -0
    b = -1
    c = -2
    d = -3
  d = any
    a

randid
  a = 1x
  b = 2x
  c = 3x
  d = 5x
    a = x0
    b = x2
    c = x5
    d = x7

a = move
  moveid
    testreturn

b = self
  moveid
    testreturn

c = opponent
  moveid
    testreturn

d = random
  randid
    testreturn

mutability
  low med med high high
  1 - 2 - 2 - 5 - 5
*/
