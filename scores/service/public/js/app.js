// Using: https://angular-ui.github.io/angular-google-maps/#!/quickstart
var app = angular.module("visual-recognition-demo", ["ngRoute"]);

// Define all constants.
app.constant("api", {
  url_db: "",
  vr_url:
    "",
  vr_key: ""
});

// Define all the routes for the web app.
app.config(function($routeProvider) {
  console.log("info:", $routeProvider);
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
