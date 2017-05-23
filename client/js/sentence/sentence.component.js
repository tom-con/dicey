(function() {

  angular.module('app')
    .component('sentence', {
      controller: controller,
      bindings: {
        group: '='
      },
      templateUrl: './js/sentence/sentence.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope', 'sentenceService', 'loginService']

  function controller(newService, $state, $rootScope, sentenceService, loginService) {
    const vm = this
    vm.$onInit = onInit
    vm.addWord = addWord


    function onInit() {
      getSentence()
    }

    function addWord(word){
      console.log(word);
      console.log(vm.sentence.content.indexOf(word));
    }

    function getSentence(){
      sentenceService.getSentence($state.params.sid).then(sentence => {
        console.log("Sentence from the database got to the component", sentence);
        if(sentence){
          vm.sentence = sentence
          loginService.getUser(vm.sentence.current_turn[0]).then(user => {
            vm.sentence.curr_user = user.name
          })

        } else {
          sentenceService.createSentence(vm.group).then(newSentence => {

          })
        }
      })
    }
}

}())
