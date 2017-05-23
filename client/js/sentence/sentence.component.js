(function() {

  angular.module('app')
    .component('sentence', {
      controller: controller,
      bindings: {
        group: '='
      },
      templateUrl: './js/sentence/sentence.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope', 'sentenceService']

  function controller(newService, $state, $rootScope, sentenceService) {
    const vm = this
    vm.$onInit = onInit
    vm.getGroup = getGroup

    function onInit() {
      getSentence()
    }

    function getSentence(){
      sentenceService.getSentence($state.params.sid).then(sentence => {
        console.log(sentence);
      })
    }
}

}())
