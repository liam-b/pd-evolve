var strategy = require('./genome.js')
var Game = require('./game.js')
var dna = require('./dna.js')
var Evolution = require('./evolve.js')

var settings = {
  populationCount: 50,
  generations: 100,
  gameLength: 20,
  playCount: 2,
  chances: [2, 4, 6, 6, 2]
}

var slow = {
  populationCount: 200,
  generations: 200,
  gameLength: 20,
  playCount: 3,
  chances: [2, 4, 6, 6, 2]
}

var fast = {
  populationCount: 50,
  generations: 50,
  gameLength: 20,
  playCount: 1,
  chances: [2, 4, 6, 6, 2]
}

var evolution = new Evolution(fast)
evolution.run()

var game = new Game(settings.gameLength)
game.run(new dna.Genome(evolution.best), strategy.joss)

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
