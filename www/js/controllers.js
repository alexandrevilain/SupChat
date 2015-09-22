angular.module('app.controllers', ['firebase', 'ngIOS9UIWebViewPatch'])

.controller('ConnexionCtrl', function($scope, $state) {
    // quand l'utilisateur clique sur "Connexion"
    // on sauvegarde les informations dans la variable user
    // on redirige l'utilisateur vers la page de chat avec en paramètres la conversation
    // et le pseudo de l'utilisateur
    $scope.save = function(user){
      $scope.conversation = user;
      $state.go("chat", { "conversation": user.conversation, "user" : user.pseudo });
    }
})
.controller('ChatCtrl', function($scope, $stateParams, $firebaseArray, $state){
    // on récupères les paramètres dans l'url (la conversation et l'utilisateur)
    $scope.conversation = $stateParams.conversation;
    $scope.user = $stateParams.user;
    //
    var ref = new Firebase("https://supchatarticle.firebaseio.com/chat");
    var query = ref.orderByChild("conversation").startAt($scope.conversation).endAt($scope.conversation);
    $scope.messages = $firebaseArray(query);
    // quand on reçoit un message, on joue une musique
    ref.on('child_added', function(snap) {
      var newMessage = snap.val();
      if (newMessage.user != $scope.user){
        var audio = new Audio('js/message.mp3');
        audio.play();
      };
    });
    // quand l'utilisateur clique sur envoyer
    // on ajoute le message dans la base de donnée Firebase
    $scope.add = function(add){
      $scope.messages.$add({
        "conversation": $scope.conversation,
        "date": new Date().getTime(),
        "user": $scope.user,
        "content": add.message
      });
      $scope.add.message = "";
    };
    // quand l'utilisateur clique sur le bouton de déconnexion
    // on le redirige vers le page d'acceuil
    $scope.logOut = function(){
      $state.go("connexion");
    };

  });
