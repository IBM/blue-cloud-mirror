(function() {
  app.controller("controllerSetupDB", function(
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
    $scope.setupDB = function(
      theUser,
      thePassword) {
      $rootScope.spinner = true;

      var loaddataUrl = "api/v1/setupDB";
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
          var databaseinfo = JSON.parse(items.dbconfig);
          console.log(">>> DB info : ", databaseinfo);

          var setupinfo = items.setupinfo;
          console.log(">>> Setup info : ", setupinfo);

          $rootScope.spinner = false;
          $scope.db = databaseinfo.db;
          $scope.url = databaseinfo.url;
          $scope.view = setupinfo.view;
          $scope.index = setupinfo.index;
          $scope.cors = setupinfo.cors;

          $scope.showdata = true;
        })
        .error(function(err) {
          $rootScope.spinner = false;
          $scope.datalist = null;
          console.log(">>> setupDB > Error : ", err);
          var msg = "No Data: " + err;
          $window.alert(msg);
        });
    };
  });
})();
