angular.module('controllers', [])

.controller('WelcomeCtrl', function($scope, $state, UserService, $ionicLoading) {

  //This method is executed when the user press the "Login with Google" button
  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Logging in...'
    });

    window.plugins.googleplus.login(
        {},
        function (user_data) {
          console.log(user_data);

          //for the purpose of this example I will store user data on local storage
          UserService.setUser({
            userID: user_data.userId,
            name: user_data.displayName,
            email: user_data.email,
            picture: user_data.imageUrl,
            accessToken: user_data.accessToken,
            idToken: user_data.idToken
          });

          $ionicLoading.hide();
          $state.go('app.home');
        },
        function (msg) {
          $ionicLoading.hide();
          console.log(msg);
        }
    );
  };
})


.controller('AppCtrl', function($scope){

})

.controller('HomeCtrl', function($scope, UserService, $ionicActionSheet, $state, $ionicLoading){

	$scope.user = UserService.getUser();

	$scope.showLogOutMenu = function() {
		var hideSheet = $ionicActionSheet.show({
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {},
			buttonClicked: function(index) {
				return true;
			},
			destructiveButtonClicked: function(){
				$ionicLoading.show({
					template: 'Logging out...'
				});
				//google logout
				window.plugins.googleplus.logout(
					function (msg) {
						console.log(msg);
						$ionicLoading.hide();
						$state.go('welcome');
					},
					function(fail){
						console.log(fail);
					}
				);
			}
		});
	};
})

;
