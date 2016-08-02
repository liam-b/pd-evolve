module.exports = {
  defect : function (self, opponent, move) {
    return 'd'
  },

  cooperate : function (self, opponent, move) {
    return 'c'
  },

  random : function (self, opponent, move) {
    if (move.random(50)) {
      return 'd'
    }
    return 'c'
  },

  titForTat : function (self, opponent, move) {
    if (opponent.history[move.last] == 'd') {
      return 'd'
    }
    return 'c'
  },

  titForTatTat : function (self, opponent, move) {
    if (opponent.history[move.last] == 'd' && opponent.history[move.last - 1] == 'd') {
      return 'd'
    }
    return 'c'
  },

  forgivingTitForTat : function (self, opponent, move) {
    if (move.random(35)) {
      return 'c'
    }
    if (opponent.history[move.last] == 'd') {
      return 'd'
    }
    return 'c'
  },

  punisher : function (self, opponent, move) {
    if (opponent.history[move.last] == 'd') {
      return 'd'
    }
    if (opponent.history[move.last - 1] == 'd') {
      return 'd'
    }
    return 'c'
  },

  forgivingPunisher : function (self, opponent, move) {
    if (self.history[move.last - 1] == 'd') {
      return 'c'
    }
    if (self.history[move.last - 2] == 'd') {
      return 'c'
    }
    if (opponent.history[move.last] == 'd') {
      return 'd'
    }
    if (opponent.history[move.last - 1] == 'd') {
      return 'd'
    }
    return 'c'
  },

  grudger : function (self, opponent, move) {
    if (opponent.history[move.last] == 'd') {
      return 'd'
    }
    if (self.history[move.last] == 'd') {
      return 'd'
    }
    return 'c'
  },

  joss : function (self, opponent, move) {
    if (move.current == 0) {
      return 'c'
    }
    if (move.random(10)) {
      return 'd'
    }
    if (opponent.history[move.last] == 'd') {
      return 'd'
    }
    return 'c'
  },

  handshake : function (self, opponent, move) {
    if (move.current == 0) {
      return 'd'
    }
    if (move.current == 1) {
      return 'c'
    }
    if (opponent.history[0] == 'd' && opponent.history[1] == 'c') {
      if (opponent.history[move.last] == 'd') {
        return 'd'
      }
      return 'c'
    }
    return 'd'
  },

  imitator : function (self, opponent, move) {
    if (move.current == 0) {
      return 'd'
    }
    if (move.current == 1) {
      return 'c'
    }
    if (move.current == move.total) {
      return 'd'
    }
    if (opponent.history[move.last] == 'd') {
      return 'd'
    }
    return 'c'
  },

  inverter : function (self, opponent, move) {
    if (opponent.history[move.last] == 'c') {
      return 'd'
    }
    return 'c'
  },

  tester : function (self, opponent, move) {
    if (move.current == 0) {
      return 'c'
    }
    if (move.current == 1) {
      return 'd'
    }
    if (opponent.history[1] == 'd') {
      return 'c'
    }
    if (opponent.history[2] == 'c') {
      if (self.history[move.last] == 'c') {
        return 'd'
      }
      return 'c'
    }
    return 'c'
  }
}
