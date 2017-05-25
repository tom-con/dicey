(function() {

  angular.module('app')
    .component('modal', {
      controller: controller,
      bindings: {
        word: '<',
        index: '<',
        sentence: '<'
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

    function addWord(){

      sentenceService.updateSentence(vm.wordToAdd, vm.word, vm.sentence)
        .then(word => {
          console.log("getSentence?", vm.sentence);
          $state.go('group.sentence', {sid: vm.sentence.group_id}, {reload: true})      })
          $(`#modal${vm.index}`).modal('close');
    }

}

}())
