(function() {

  angular.module('app')
    .component('modal', {
      controller: controller,
      bindings: {
        word: '='
      },
      templateUrl: './js/modal/modal.html'
    })

  controller.$inject = ['newService', '$state', '$rootScope']

  function controller(newService, $state, $rootScope) {
    const vm = this
    vm.$onInit = onInit
    vm.addWord = addWord

    function onInit() {
       $('.modal').modal();
      console.log(vm.word);
    }

    function addWord(){
      console.log(vm.word);
      console.log(vm.wordToAdd);
    }

}

}())
