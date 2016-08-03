var dna = require('./dna.js')
var Game = require('./game.js')

module.exports = function (populationCount, cycles, gameLength, playCount, chances) {
  this.population = []
  this.scores = []
  this.populationCount = populationCount
  this.gameLength = gameLength
  this.chances = chances
  this.cycles = cycles
  this.playCount = playCount
  this.game = new Game (gameLength)
  this.best = ''

  this.run = function () {
    this.populate()
    for (var cyc = 0; cyc < this.cycles; cyc += 1) {
      this.score()
      console.log('gen : ' + cyc + ', max : ' + Math.max.apply(Math, this.scores))
      this.depopulate()
      this.repopulate(this.chances)
    }
    this.score()
    console.log('best : ' + this.population[this.scores.indexOf(Math.max.apply(Math, this.scores))].code + ', score : ' + Math.max.apply(Math, this.scores))
    this.best = this.population[this.scores.indexOf(Math.max.apply(Math, this.scores))].code
  }

  this.populate = function () {
    for (let i = 0; i < populationCount; i += 1) {
      this.population.push(new dna.Genome(dna.random(3)))
      this.scores.push(0)
    }
  }

  this.score = function () {
    for (let count = 0; count < this.playCount; count += 1) {
      for (var strat1 in this.population) {
        for (var strat2 in this.population) {
          for (var gameCount = 0; gameCount < this.gameLength; gameCount += 1) {
            this.game.playDna(0, this.population[strat1])
            this.game.playDna(1, this.population[strat2])
            this.game.count += 1
          }
          let grade = this.game.grade()
          this.scores[strat1] += grade[0]
          this.scores[strat2] += grade[1]
          this.game.reset()
        }
      }
    }
  },

  this.depopulate = function () {
    var halfPopulation = this.population.length / 2
    for (let strat = 0; strat < halfPopulation; strat += 1) {
      this.population.splice(this.scores.indexOf(Math.min.apply(Math, this.scores)), 1)
      this.scores.splice(this.scores.indexOf(Math.min.apply(Math, this.scores)), 1)
    }
  },

  this.repopulate = function (chances) {
    var codes = []
    for (let strat in this.population) {
      codes.push(this.population[strat].code)
    }

    this.population = []
    this.scores = []
    for (let code in codes) {
      this.population.push(new dna.Genome(codes[code]))
      this.scores.push(0)
    }
    for (let strat in this.population) {
      this.population.push(new dna.Genome(this.mutate(this.population[strat].code, chances)))
      this.scores.push(0)
    }
  },

  this.mutate = function (code, chance) {
    var input = []
    var output = ''
    for (var i = 0; i < code.length; i += 1) {
      input.push(code.charAt(i))
    }
    for (var iter = 0; iter < code.length; iter += 4) {
      if (this.randChance(chance[0])) {
        input[iter + 0] = dna.randChar(1)
      }
      if (this.randChance(chance[1])) {
        input[iter + 1] = dna.randChar(1)
      }
      if (this.randChance(chance[2])) {
        input[iter + 2] = dna.randChar(1)
      }
      if (this.randChance(chance[3])) {
        input[iter + 3] = dna.randChar(1)
      }
      output += input[iter + 0] + input[iter + 1] + input[iter + 2] + input[iter + 3]
    }
    return output
  },

  this.randChance  = function (range) {
    return Math.random() < range / 100
  }
}
