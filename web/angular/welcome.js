
app.factory('variable', function() {
  return {
    modulename: "backtesting",
  };
})


app.controller(
  "welcome-ctrl",
  function ($scope, $http, $window, $location, config, variable) {
    $scope.baseurl = config.baseurl;
    $scope.logout = function (req, res) {
      localStorage.clear();
      location.href = "index.html";
    };

    $scope.portfolioId = 1;
    $scope.init = function (req, res) {
      console.log("roboctrl");
      console.log(config.baseurl);
      var islogin = localStorage.getItem("islogin");

      if (islogin != "1") {
        location.href = "index.html";
      } else {
        $scope.customerId = localStorage.getItem("customerId");
     
        if ($scope.customerId == 1) {
          $("#menu").load("menu-admin.html");
        } else {
          $("#menu").load("menu-demo.html");
        }
        // $("#menu").load("menu.html");
        $("#general").addClass("active");
        $("#modelcategory").addClass("active");

        $scope.getCustomerdemoBalance( $scope.customerId);
        $scope.getCustomerliveBalance( $scope.customerId);
        $scope.portfoliolist();

        $scope.name = localStorage.getItem("name");
        $scope.customerId = localStorage.getItem("customerId");
        console.log($scope.customerId);
      }
    };


    $scope.getCustomerdemoBalance = function (customerId) {

      console.log(customerId)
      $scope.data = {}
      $scope.data.customerId = customerId
      console.log($scope.data )
      $scope.getbalanceurl = $scope.baseurl + "demobank/getCustomerBalance" ;
      console.log($scope.getbalanceurl);
      $http.post($scope.getbalanceurl ,$scope.data)
        .success(function (response, status) {
          $scope.balancedata = response.data
          console.log($scope.balancedata.cash_balance);
          $scope.demobalance = $scope.balancedata.cash_balance
          $scope.leveragebalance = $scope.tradebalance * 4  
          console.log($scope.tradebalance);
          console.log($scope.leveragebalance);
  
        })
        .error(function (erroresponse, status) {
          console.log(erroresponse)
          return NaN ;
        });
     
  
    };

    $scope.getCustomerliveBalance = function (customerId) {

      console.log(customerId)
      $scope.data = {}
      $scope.data.customerId = customerId
      console.log($scope.data )
      $scope.getbalanceurl = $scope.baseurl + "livebank/getCustomerBalance" ;
      console.log($scope.getbalanceurl);
      $http.post($scope.getbalanceurl ,$scope.data)
        .success(function (response, status) {
          $scope.balancedata = response.data
          console.log($scope.balancedata.cash_balance);
          $scope.livebalance = $scope.balancedata.cash_balance
         
          console.log($scope.tradebalance);
          console.log($scope.leveragebalance);
  
        })
        .error(function (erroresponse, status) {
          console.log(erroresponse)
          return NaN ;
        });
     
  
    };

    $scope.portfoliolist = function (req, res) {
      $scope.customerId = localStorage.getItem("customerId");
      console.log($scope.customerId);
      $scope.url =
        config.baseurl  +  variable.modulename  + "/getUserPortfolio/" + $scope.customerId;
      $http
        .get($scope.url)
        .success(function (res) {
          if (res.status == "false") {
          } else {
            $scope.portfoliolist = res.data;
            console.log("dataset: ", $scope.portfoliolist);
            $("#portfoliolist").removeClass("ng-hide");
          }
        })
        .error(function () { });
    };

    $scope.portfoliodetails = function (
      myportfolioId,
      portfolioId,
      customerId,
      portfolioName,
      capital
    ) {
      console.log(
        myportfolioId,
        portfolioId,
        customerId,
        portfolioName,
        capital
      );
      localStorage.setItem("portfolioName", portfolioName);
      localStorage.setItem("myportfolioId", myportfolioId);
      localStorage.setItem("portfolioId", portfolioId);
      localStorage.setItem("capital", capital);
      $window.location.href = "portfolio_detail.html";
    };
  }
);
