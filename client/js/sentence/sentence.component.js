(function() {

  angular.module('app')
    .component('sentence', {
      controller: controller,
      bindings: {
        group: '='
      },
      templateUrl: './js/sentence/sentence.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope', 'sentenceService', 'loginService', 'authService', '$scope']

  function controller(newService, $state, $rootScope, sentenceService, loginService, authService, $scope) {
    const vm = this
    vm.$onInit = onInit
    vm.open = open


    function onInit() {
      vm.sentence = {}
      getSentence()
    }

    function getSentence() {

      sentenceService.getSentence($state.params.sid)
      .then(sentence => {
        if (sentence) {

          sentenceService.getWords(sentence).then(wordsArr => {

            sentence.words = wordsArr
            getUser(sentence.current_turn[0], sentence)
          })
        } else {

          sentenceService.createSentence(vm.group)
            .then(createdSentence => {

              return sentenceService.getWords(createdSentence).then(words => {
                console.log("this is where we ended up with our array!", words);
                createdSentence.words = words
                return createdSentence
              })
            })
          .then(newSentence => {
            getUser(newSentence.current_turn[0], newSentence)
          })
        }
      })
    }

    function getUser(turn, sentence) {

      loginService.getUser(turn).then(user => {
        console.log("did we get the user?", user);
          vm.sentence = sentence
          vm.sentence.curr_user = user.name
          console.log("here's that final sentence", vm.sentence);
      })
    }
    function open(pos) {
      $(`#modal${pos}`).modal('open');
    }
  }

}())
