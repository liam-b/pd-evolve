module.exports = function (total) {
  this.data = [[], []]
  this.count = 0
  this.total = total
  this.play = function (player, move) {
    this.data[player].push(move)
  }

  this.run = function (strat1, strat2) {
    this.playDna(0, strat1)
    this.playDna(1, strat2)
    this.count += 1

    if (this.terminal()) {
      this.draw()
    }
    else {
      this.run(strat1, strat2)
    }
  }

  this.reset = function () {
    this.data = [[], []]
    this.count = 0
  }

  this.playStrategy = function (player, strategy) {
    var opponent
    if (player == 0) {
      opponent = 1
    }
    else {
      opponent = 0
    }

    this.play(player, strategy({
      history : this.data[player]
    },
    {
      history : this.data[opponent]
    },
    {
      current : this.count,
      last : this.count - 1,
      total : this.total - 1,
      random : function (range) {
        return Math.random() < range / 100
      }
    }))
  }

  this.playDna = function (player, dna) {
    var opponent = 0
    if (player == 0) {
      opponent = 1
    }
    else {
      opponent = 0
    }

    this.play(player, dna.run({
      history : this.data[player]
    },
    {
      history : this.data[opponent]
    },
    {
      current : this.count,
      last : this.count - 1,
      total : this.total - 1,
      random : function (range) {
        return Math.random() < range / 100
      }
    }))
  }

  this.terminal = function () {
    return this.count == this.total
  }

  this.grade = function () {
    var scores = [0, 0]

    for (var move in this.data[0]) {
      if (this.data[0][move] == 'c' && this.data[1][move] == 'c') {
        scores[0] += 3
        scores[1] += 3
      }
      else if (this.data[0][move] == 'd' && this.data[1][move] == 'c') {
        scores[0] += 5
        scores[1] += 0
      }
      else if (this.data[0][move] == 'c' && this.data[1][move] == 'd') {
        scores[0] += 0
        scores[1] += 5
      }
      else if (this.data[0][move] == 'd' && this.data[1][move] == 'd') {
        scores[0] += 1
        scores[1] += 1
      }
    }
    return scores
  }

  this.draw = function () {
    var output = '0: '
    for (let i = 0; i < this.data[0].length; i += 1) {
      output += this.data[0][i]
    }
    let score = this.grade()
    output += ' ' + score[0] + '\n1: '
    for (let i = 0; i < this.data[1].length; i += 1) {
      output += this.data[1][i]
    }
    console.log(output + ' ' + score[1])
  }
}
