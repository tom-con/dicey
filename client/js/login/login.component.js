(function() {

  angular.module('app')
    .component('login', {
      controller: controller,
      templateUrl: './js/login/login.html'
    })

    controller.$inject = ['loginService', 'authService', 'sentenceService']

    function controller(loginService, authService, sentenceService){
      const vm = this
      vm.$onInit = onInit
      vm.getRecentSentences = getRecentSentences


      function onInit() {
        $('.carousel').carousel();
      }

      function getRecentSentences(){
        sentenceService.getRecentSentences().then(sentences => {
          vm.sentences = sentences
        })
      }

    }

}())
