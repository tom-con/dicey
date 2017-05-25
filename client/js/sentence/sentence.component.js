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

  controller.$inject = ['newService', '$state', '$rootScope', 'sentenceService', 'loginService', 'authService', '$scope', 'moment', 'groupService']

  function controller(newService, $state, $rootScope, sentenceService, loginService, authService, $scope, moment, groupService) {
    const vm = this
    vm.$onInit = onInit
    vm.open = open
    vm.getPic = getPic
    vm.authPublish = authPublish


    function onInit() {
      vm.sentence = {}
      getSentence()
    }

    function getSentence() {
      sentenceService.getSentence($state.params.sid)
        .then(sentence => {

          if(sentence.current_turn.length === 0){
            vm.completedSentence = true;
          }




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

    function authPublish(){
      authService.addPublish()
        .then(() => {
          groupService.checkApproval(vm.sentence.group_id).then((notApprovedArr) => {
            console.log(notApprovedArr);
          })
        })
    }

    function getActivity(sentence){
      sentenceService.getActivity(sentence).then(activity_feed => {
        vm.activity_feed = activity_feed
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
