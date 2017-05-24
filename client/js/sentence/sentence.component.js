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
      sentenceService.getSentence($state.params.sid).then(sentence => {
        if (sentence) {
          getUser(sentence.current_turn[0], sentence)
        } else {
          sentenceService.createSentence(vm.group).then(newSentence => {
            $state.go('group', {sid: sentence.group_id})
          })
        }
      })
    }

    function getUser(turn, sentence) {
      loginService.getUser(turn).then(user => {
          vm.sentence = sentence
          vm.sentence.curr_user = user.name
      })
    }
    function open(pos) {
      $(`#modal${pos}`).modal('open');
    }
  }

}())
