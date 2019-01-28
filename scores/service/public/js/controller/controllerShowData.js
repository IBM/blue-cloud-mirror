(function() {
  app.controller("controllerShowData", function(
    $rootScope,
    $scope,
    $location,
    $window,
    $http,
    api
  ) {
    // Loading indicator
    $rootScope.spinner = false;
    $scope.showdata = false;
    $scope.showbutton = true;
    $scope.datalist = [];

    $scope.$watch("theUser", function() {
      if (angular.isString($scope.theUser)) {
        $scope.inputUser = "has-success";
        if ($scope.theUser === "") {
          $scope.inputUser = "has-danger";
        }
      }
    });

    $scope.$watch("thePassword", function() {
      if (angular.isString($scope.thePassword)) {
        $scope.inputPassword = "has-success";
        if ($scope.thePassword === "") {
          $scope.inputPassword = "has-danger";
        }
      }
    });

    // How to use $http.get https://docs.angularjs.org/api/ng/service/$http
    $scope.getData = function(
      theUser,
      thePassword) {
      $rootScope.spinner = true;
      
      var loaddataUrl = "api/v1/gethighscore";
      var userpass = theUser + ":" + thePassword;
      var theAuth = "Basic " + btoa ( userpass );
      var options = {headers: {
        "Content-Type": "application/json",
        "Authorization": theAuth
      }};

      $http
        .get(loaddataUrl, options)
        .success(function(res) {
          var items = res;
          $rootScope.spinner = false;
          console.log(">>> getData > res : ", res);
          $scope.datalist = items;
          console.log(">>> getData > datalist : ", $scope.datalist);
          $scope.showdata = true;
        })
        .error(function(err) {
          $rootScope.spinner = false;
          $scope.datalist = null;
          console.log(">>> getData > Error : ", err);
          var msg = "No Data: " + err;
          $window.alert(msg);
        });
    };
  });
})();
