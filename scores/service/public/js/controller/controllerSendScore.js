(function() {
  app.controller("controllerSendScore", function(
    $rootScope,
    $scope,
    $window,
    $location,
    $http,
    api
  ) {
    // Loading indicator
    $rootScope.spinner = false;
    $scope.check = true;

    $scope.$watch("inputScore", function() {
      if (angular.isString($scope.inputScore)) {
        if ($scope.theInputScore === "") {
          $scope.theInputScore = "has-danger";
        } else {
          if (isNaN($scope.theInputScore)) {
            $scope.theInputScore = "has-success";
          } else {
            $scope.theInputScore = "has-danger";
          }
        }
      }
    });

    $scope.$watch("theFirst_name", function() {
      if (angular.isString($scope.theFirst_name)) {
        $scope.inputFirst_name = "has-success";
        if ($scope.theFirst_name === "") {
          $scope.inputFirst_name = "has-danger";
        }
      }
    });

    $scope.$watch("theLast_name", function() {
      if (angular.isString($scope.theLast_name)) {
        $scope.inputLast_name = "has-success";
        if ($scope.theLast_name === "") {
          $scope.inputLast_name = "has-danger";
        }
      }
    });

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

    $scope.sendScore = function(theInputScore, 
                                theFirst_name, 
                                theLast_name,
                                theUser,
                                thePassword) {
      var theDate = new Date().getTime();
      console.log(
        "Score: (" +
          theInputScore +
          ") Time: (" +
          theDate +
          ") First name: (" +
          theFirst_name +
          ") Last name: (" +
          theLast_name
      );
      if (parseInt(theInputScore) && (theFirst_name && theLast_name)) {
        $rootScope.spinner = true;
        var sendData = {
          score: parseInt(theInputScore),
          gameDate: theDate,
          firstName: theFirst_name,
          lastName: theLast_name
        };

        $scope.inputClassifierNameClass = "";
        var userpass = theUser + ":" + thePassword;
        var theAuth = "Basic " + btoa ( userpass );
        var request = {
          method: "POST",
          url: "api/v1/addscore/",
          data: sendData,
          headers: {
            "Content-Type": "application/json",
            "Authorization": theAuth
          }
        };
        // SEND SCORE.
        $http(request)
          .success(function(d) {
            $rootScope.spinner = false;
            console.log(">>> Success Upload ", JSON.stringify(d));
            var msg = "Score : " + JSON.stringify(d);
            $window.alert(msg);
            //alert(d);
          })
          .error(function() {
            $window.alert("Error");
            $rootScope.spinner = false;
          });
      } else {
        $window.alert("Verify your entries!");
        $scope.inputScore = "has-danger";
        $scope.inputFirst_name = "has-danger";
        $scope.inputLast_name = "has-danger";
      }
    };
  });
})();
