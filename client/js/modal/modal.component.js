(function() {

  angular.module('app')
    .component('modal', {
      controller: controller,
      bindings: {
        word: '=',
        group: '=',
        content: '=',
        currentturn: '='
      },
      templateUrl: './js/modal/modal.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope', 'sentenceService']

  function controller(newService, $state, $rootScope, sentenceService) {
    const vm = this
    vm.$onInit = onInit
    vm.addWord = addWord

    function onInit() {
       $('.modal').modal();

    }

    function addWord(pos){
      sentenceService.updateSentence(vm.wordToAdd, pos, vm.group.id, vm.content, vm.currentturn)
    }

}

}())
