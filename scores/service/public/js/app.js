// Using: https://angular-ui.github.io/angular-google-maps/#!/quickstart
var app = angular.module("visual-recognition-demo", ["ngRoute"]);

// Define all constants.
app.constant("api", {
  url_db: "https://8f5db30-e9fe-489d-920a-de1f50a31930-bluemix.cloudant.com/",
  vr_url:
    "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classifiers",
  vr_key: "77fcccaea16c001fa2bec52ed8b5f9a3888bd542"
});

// Define all the routes for the web app.
app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      redirectTo: "/dashboard"
    })
    .when("#", {
      redirectTo: "/dashboard"
    })
    .when("/dashboard", {
      templateUrl: "templates/page/dashboard.html",
      controller: "controllerDashboard"
    })
    .when("/showalldata", {
      templateUrl: "templates/content/showalldata.html",
      controller: "controllerShowAllData"
    })
    .when("/showdata", {
      templateUrl: "templates/content/showdata.html",
      controller: "controllerShowData"
    })
    .when("/senddata", {
      templateUrl: "templates/content/senddata.html",
      controller: "controllerSendData"
    })
    .when("/sendscore", {
      templateUrl: "templates/content/sendscore.html",
      controller: "controllerSendScore"
    })
    .when("/setupdb", {
      templateUrl: "templates/content/setupdb.html",
      controller: "controllerSetupDB"
    })
    .otherwise({
      redirectTo: "/"
    });
});

app.directive("ngFiles", [
  "$parse",
  function($parse) {
    function fn_link(scope, element, attrs) {
      var onChange = $parse(attrs.ngFiles);
      console.log(">>> app.directive : ", onChange);
      element.on("change", function(event) {
        onChange(scope, { $files: event.target.files });
      });
    }

    return {
      link: fn_link
    };
  }
]);

app.run(function($location, $rootScope, $http, api) {
  $rootScope.$on("$routeChangeStart", function() {
    // Show the spinner
    $rootScope.spinner = true;
  });
});
