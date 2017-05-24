(function() {
  'use strict'

  angular.module('app')
    .service('sentenceService', service)

  service.$inject = ['$http']

  function service($http) {
    const sv = this
    sv.getSentence = getSentence
    sv.createSentence = createSentence
    sv.updateSentence = updateSentence

    function getSentence(id) {
      return $http.get(`/api/sentences/${id}`).then(sentence => {
        if(sentence.data !== ''){
          sentence.data.content = switchJSON(sentence.data.content)
          sentence.data.current_turn = switchJSON(sentence.data.current_turn)
          return sentence.data
        } else {
          return sentence.data
        }
      })
    }

    function createSentence(group) {
      let arr = []
      arr.length = group.word_limit
      for(let i = 0; i < arr.length; i++){
        arr[i] = {}
        arr[i].word = "add"
        arr[i].pos = i
      }

      return $http.get(`/api/usersgroups/g/${group.id}`).then(groupArray => {
        let turns = randomTurns(groupArray.data, group.word_limit)

        let newSentence = {
          group_id: group.id,
          content: switchJSON(arr),
          current_turn: switchJSON(turns),
        }
        return $http.post(`/api/sentences`, newSentence).then(sentence => {
          sentence.data.content = switchJSON(sentence.data.content)
          sentence.data.current_turn = switchJSON(sentence.data.current_turn)
          return sentence.data
        })
      })
    }

    function updateSentence(word, pos, groupID, content, current_turn){
      content[pos].user = current_turn.splice(0, 1)[0]
      content[pos].word = word
      return $http.patch(`api/sentences/${groupID}`, {content: switchJSON(content), current_turn: switchJSON(current_turn)})
        .then(() => {
          getSentence(groupID)
        })
    }

    function randomTurns(users, word_limit) {
      let arr = []
      let j = word_limit
      while (j > 0) {
        let thisArr = [...users]
        for (let i = 0; i < thisArr.length && j > 0; i++) {
          let pos = Math.floor(Math.random() * thisArr.length)
          arr.push(thisArr[pos].user_id)
          j -= 1
          i -= 1
          thisArr.splice(pos, 1)
        }
      }
      return arr
    }

    function switchJSON(input) {
      return typeof input === 'string' ? JSON.parse(input) : JSON.stringify(input)
    }

  }
}())
