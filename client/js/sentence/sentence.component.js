(function() {

  angular.module('app')
    .component('sentence', {
      controller: controller,
      bindings: {
        group: '='
      },
      templateUrl: './js/sentence/sentence.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope', 'sentenceService', 'loginService', 'authService']

  function controller(newService, $state, $rootScope, sentenceService, loginService, authService) {
    const vm = this
    vm.$onInit = onInit
    vm.open = open


    function onInit() {
      getSentence()
    }

    function getSentence() {
      sentenceService.getSentence($state.params.sid).then(sentence => {
        if (sentence) {
          vm.sentence = sentence
          getUser(vm.sentence.current_turn[0])
        } else {
          sentenceService.createSentence(vm.group).then(newSentence => {
            vm.sentence = newSentence
            getUser(vm.sentence.current_turn[0])
          })
        }
      })
    }

    function getUser(turn) {
      loginService.getUser(turn).then(user => {
        vm.sentence.curr_user = user.name
      })
    }
    function open(pos) {
      $(`#modal${pos}`).modal('open');
    }
  }

}())
