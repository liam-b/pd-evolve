var strategy = require('./genome.js')
var Game = require('./game.js')
var dna = require('./dna.js')
var Evolution = require('./evolve.js')

var currentGame = new Game(30)
var evolution = new Evolution(10, 20)
evolution.populate()
evolution.cycle(1)

// console.log('pop', evolution.population)
// console.log('pop', evolution.population)
console.log('scr', evolution.scores)
// console.log('score', evolution.scores.indexOf(Math.min.apply(Math, evolution.scores)), Math.min.apply(Math, evolution.scores))

// for (var index = 0; index < populationCount; index += 1) {
//   population[index] = new dna.Genome(dna.random(3))
//   scores[index] = 0
// }
//
// runPop()
//
// function runPop () {
//   for (var strat1 in population) {
//     for (var strat2 in population) {
//       if (strat1 != 'sum' && strat2 != 'sum') {
//         for (var gameCount = 0; gameCount < gameLength; gameCount += 1) {
//           currentGame.playDna(0, population[strat1])
//           currentGame.playDna(1, population[strat2])
//           currentGame.count += 1
//         }
//         let grade = currentGame.grade()
//         scores[strat1] += grade[0]
//         scores[strat2] += grade[1]
//         currentGame.reset()
//       }
//     }
//   }
//
//   var half = Object.keys(population).length / 2
//   for (var iter = 0; iter < half; iter += 1) {
//     var lowest = Infinity
//     var lowestKey = ''
//     for (var i in population) {
//       if (scores[i] < lowest) {
//         lowest = scores[i]
//         lowestKey = i
//       }
//     }
//     delete scores[lowestKey]
//     delete population[lowestKey]
//   }
//
//   var codes = []
//   var temp = []
//   for (strat in population) {
//     codes.push(population[strat].code)
//     temp.push(population[strat])
//   }
//
//   population = {}
//   for (var i = 0; i < temp.length; i += 1) {
//     population[i] = temp[i]
//   }
//   for (var i = 5; i < populationCount; i += 1) {
//     population[i] = new dna.Genome(mutate(codes[i - 5], [10, 20, 30, 30]))
//   }
// }
//
//
// function randChance (range) {
//   return Math.random() < range / 100
// }
//
// function mutate (code, chance) {
//   var input = []
//   var output = ''
//   for (var i = 0; i < code.length; i += 1) {
//     input.push(code.charAt(i))
//   }
//   for (var iter = 0; iter < code.length; iter += 4) {
//     if (randChance(chance[0])) {
//       input[iter + 0] = dna.randChar(1)
//     }
//     if (randChance(chance[1])) {
//       input[iter + 1] = dna.randChar(1)
//     }
//     if (randChance(chance[2])) {
//       input[iter + 2] = dna.randChar(1)
//     }
//     if (randChance(chance[3])) {
//       input[iter + 3] = dna.randChar(1)
//     }
//     output += input[iter + 0] + input[iter + 1] + input[iter + 2] + input[iter + 3]
//   }
//   return output
// }
//
// for (var i = 0; i < Object.keys(population).length; i++) {
//   console.log(population[i].code, scores[i])
// }
//
// 'cbbb adaa'
// '1233 1233'

function loop () {
  currentGame.playDna(0, randStrat)
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

// loop()

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
  a = 0x
  b = 1x
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
