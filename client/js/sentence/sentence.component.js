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
    vm.pickTheWinner = pickTheWinner


    function onInit() {
      vm.sentence = {}
      vm.turnsTime = true
      vm.notAllApproved = false
      getSentence()

    }

    function getSentence() {
      sentenceService.getSentence($state.params.sid)
        .then(sentence => {
          return new Promise(function(resolve, reject) {
            if (sentence.winner && sentence.deployment_url) {
              vm.notAllApproved = false
              vm.turnsTime = false
              vm.completedSentence = false
              vm.postLink = sentence.deployment_url
              loginService.getUser(sentence.winner).then(win => {
                vm.winner = win
                win ? resolve(true) : reject(false)
              })
            } else if (sentence.current_turn && sentence.current_turn.length === 0) {
              vm.turnsTime = false
              vm.completedSentence = true;
              resolve(true)
            } else {
              resolve(true)
            }
          }).then(() => {
            if (sentence) {
              sentenceService.getWords(sentence).then(wordsArr => {
                sentence.words = wordsArr
                getUser(sentence.current_turn[0], sentence)
              })
            } else {
              console.log(vm.group);
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

    function authPublish() {
      authService.addPublish()
        .then((response) => {
          if (response.status === "connected") {
            vm.completedSentence = false
            vm.notAllApproved = true
            groupService.addApproval(vm.sentence.group_id).then(() => {
              groupService.checkApproval(vm.sentence.group_id).then(notApprovedArr => {
                if (notApprovedArr.length > 0) {
                  console.log("we'll deal with this condition later, but it should update the list of users who have not approved the app visually on the html");
                } else {
                  vm.pickTheWinner()
                }
              })
            })
          }
        })
    }

    function getActivity(sentence) {
      sentenceService.getActivity(sentence).then(activity_feed => {
        vm.activity_feed = activity_feed
      })
    }

    function getPic(uid) {
      return vm.group.members[uid].prof_picture
    }

    function pickTheWinner() {
      groupService.getMembers(vm.sentence.group_id).then(members => {
        return new Promise(function(resolve, reject) {
          if (vm.me.fbid === vm.sentence.owner_fbid) {
            let x = members.length
            let pos = Math.floor(Math.random() * x)
            let winner = members[pos]
            sentenceService.setWinner(vm.sentence, winner.fbid).then(newSen => {
              newSen.winner ? resolve(newSen.winner) : reject(newSen)
            })
          }
        }).then(() => {
            return sentenceService.getWinner(vm.sentence).then(newSen => {
              return newSen.winner ? newSen.winner : newSen
            })
        })
        .then(winner => {
          return new Promise(function(resolve, reject){
            // if (winner === vm.me.fbid) {
              authService.publishSentence(vm.sentence, vm.me.fbid).then(res => {
                sentenceService.setUrl(vm.sentence, res)
                res ? resolve(true) : reject(false)
              })
            // } else {
            //   resolve(true)
            // }
          })
        }).then(() => {
          $state.go('group.sentence', {sid: vm.sentence.group_id}, {reload: true})
        })
      })
    }

    function open(pos) {
      $(`#modal${pos}`).modal('open');
    }

  }




}())
