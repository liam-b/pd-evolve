module.exports = {
  Genome : function (code) {
    this.code = code.replace(/ /g,'')
    this.run = function (self, opponent, move) {
      for (var index = 0; index < this.code.length; index += 4) {
        let gene = this.code.substr(index, index + 4)
        switch (gene.charAt(0)) {
          case 'a':
            if (move.current == this.moveId(gene.substr(1, 3), move)) {
              return this.testReturn(gene.charAt(3)).charAt(1)
            }
            else if (this.moveId(gene.substr(1, 3), move) == 'any') {
              return this.testReturn(gene.charAt(3)).charAt(1)
            }
            break
          case 'b':
            if (self.history[this.moveId(gene.substr(1, 3), move)] == this.testReturn(gene.charAt(3)).charAt(0)) {
              return this.testReturn(gene.charAt(3)).charAt(1)
            }
            if (this.moveId(gene.substr(1, 3), move) == 'any' && self.history.includes(this.testReturn(gene.charAt(3)).charAt(0))) {
              return this.testReturn(gene.charAt(3)).charAt(1)
            }
            break
          case 'c':
            if (opponent.history[this.moveId(gene.substr(1, 3), move)] == this.testReturn(gene.charAt(3)).charAt(0)) {
              return this.testReturn(gene.charAt(3)).charAt(1)
            }
            if (this.moveId(gene.substr(1, 3), move) == 'any' && opponent.history.includes(this.testReturn(gene.charAt(3)).charAt(0))) {
              return this.testReturn(gene.charAt(3)).charAt(1)
            }
            break
          case 'd':
              if (move.random(this.randId(gene.substr(1, 3), move))) {
                return this.testReturn(gene.charAt(3)).charAt(1)
              }
            break
        }
      }
    }

    this.randId = function (str, move) {
      var output
      var relative
      switch (str.charAt(0)) {
        case 'a':
          relative = 1
          break
        case 'b':
          relative = 2
          break
        case 'c':
          relative = 3
          break
        case 'd':
          relative = 5
          break
      }

      switch (str.charAt(1)) {
        case 'a':
          output = 0
          break
        case 'b':
          output = 2
          break
        case 'c':
          output = 5
          break
        case 'd':
          output = 7
          break
      }

      return (10 * relative) + output
    }
    this.moveId = function (str, move) {
      var output
      var relative
      switch (str.charAt(0)) {
        case 'a':
          relative = 0
          break
        case 'b':
          relative = move.last + 1
          break
        case 'c':
          relative = move.total
          break
        case 'd':
          relative = 'any'
          break
      }

      switch (str.charAt(1)) {
        case 'a':
          output = 0
          break
        case 'b':
          output = -1
          break
        case 'c':
          output = -2
          break
        case 'd':
          output = -3
          break

      }
      if (relative == 'any') {
        return 'any'
      }
      else if (relative == 0) {
        output = relative - output
      }
      else {
        output = relative + output
      }

      if (output < 0) {
        output = 0
      }
      return output
    }
    this.testReturn = function (str) {
      switch (str) {
        case 'a':
          return 'cc'
          break
        case 'b':
          return 'dd'
          break
        case 'c':
          return 'cd'
          break
        case 'd':
          return 'dc'
          break
      }
    }
  },

  random : function (genes) {
    var output = ''
    var text = ''
    var possible = 'abcd'

    for (var length = 0; length < genes; length += 1) {
      for (var i = 0; i < 4; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      output += text + ' '
      text = ''
    }

    return output + ''
  }
}
