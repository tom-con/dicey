(function() {
  'use strict'

  angular.module('app')
    .service('sentenceService', service)

  service.$inject = ['$http']

  function service($http) {
    const sv = this
    sv.getSentence = getSentence
    sv.getWords = getWords
    sv.createSentence = createSentence
    sv.updateSentence = updateSentence
    sv.getActivity = getActivity

    function getSentence(id) {
      return $http.get(`/api/sentences/${id}`)
        .then(sentence => {
          if (sentence.data !== '') {
            sentence.data.current_turn = switchJSON(sentence.data.current_turn)
          }
          return sentence.data
        })
    }

    function getWords(sentence) {
      return $http.get(`/api/words/${sentence.id}`).then(wordsArray => {
        if (wordsArray.data.length > 0) {
          return wordsArray.data
        } else {
          let arr = []
          for (let i = 0; i < sentence.word_limit; i++) {
            arr.push({
              sentence_id: sentence.id,
              author_fbid: null,
              text: 'add word',
              position: i
            })
          }
          return Promise.all(arr.map(el => $http.post(`/api/words`, el).then(singleWord => singleWord.data)))
        }
      })
    }

    function createSentence(group) {
      return $http.get(`/api/usersgroups/${group.id}`)
        .then(groupArray => {
          let turns = randomTurns(groupArray.data, group.word_limit)
          let newSentence = {
            group_id: group.id,
            current_turn: switchJSON(turns)
          }
          return $http.post(`/api/sentences`, newSentence)
            .then(sentence => {
              sentence.data.current_turn = switchJSON(sentence.data.current_turn)
              sentence.data.word_limit = group.word_limit
              return sentence.data
          })
        })
    }

    function updateSentence(word, oldWord, sentence) {
      let author_fbid = sentence.current_turn.splice(0, 1)[0]
      return $http.patch(`/api/sentences/${sentence.id}`, {current_turn: switchJSON(sentence.current_turn)}).then(() => {
        return $http.patch(`/api/words/${oldWord.id}`, {
            text: word
          })
          .then(newWord => newWord.data)
      })
    }

    function getActivity(sentence){
      return $http.get(`/api/words/s/${sentence.id}`).then(activity_feed => {
        return Promise.all(activity_feed.data.map(activityItem => $http.get(`/api/users/${activityItem.author_fbid}`)
          .then(user => {
            activityItem.user = user.data
            return activityItem
          })
        ))
    })
  }

    function randomTurns(users, word_limit) {
      let arr = []
      let j = word_limit
      while (j > 0) {
        let thisArr = [...users]
        for (let i = 0; i < thisArr.length && j > 0; i++) {
          let pos = Math.floor(Math.random() * thisArr.length)
          arr.push(thisArr[pos].user_fbid)
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
