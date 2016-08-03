var strategy = require('./genome.js')
var Game = require('./game.js')
var dna = require('./dna.js')
var Evolution = require('./evolve.js')

var currentGame = new Game(30)
var evolution = new Evolution(100, 200, 25, 3, [2, 4, 6, 6])
// evolution.run()

var thisStrat = new dna.Genome(evolution.best)
var thisStrat = new dna.Genome('bdcbacdbccdc')

function loop () {
  currentGame.playDna(0, thisStrat)
  currentGame.playDna(1, strategy.joss)
  currentGame.count += 1

  if (currentGame.terminal()) {
    currentGame.draw()
  }
  else {
    loop()
  }
}

loop()

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
