(function() {

  angular.module('app')
    .component('sentence', {
      controller: controller,
      bindings: {
        group: '=',
        me: '<'
      },
      templateUrl: './js/sentence/sentence.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope', 'sentenceService', 'loginService', 'authService', '$scope', 'moment']

  function controller(newService, $state, $rootScope, sentenceService, loginService, authService, $scope, moment) {
    const vm = this
    vm.$onInit = onInit
    vm.open = open
    vm.getPic = getPic


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
        vm.sentence = sentence
        vm.sentence.curr_user = user.name
        vm.myTurn = vm.sentence.current_turn[0] === vm.me.fbid
        getActivity(sentence)
      })
    }

    function getActivity(sentence){
      sentenceService.getActivity(sentence).then(activity_feed => {
        vm.activity_feed = activity_feed
        $state.go('group.sentence', {sid: sentence.group_id}, {reload: true})
      })
    }

    function getPic(uid){
      return vm.group.members[uid].prof_picture
    }

    function open(pos) {
      $(`#modal${pos}`).modal('open');
    }

  }

}())
