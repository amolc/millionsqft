app.factory('variable', function() {
  return {
      baseurl: "http://localhost:9001/1/api/",
      orgurl: "http://localhost:9001/api/",
      orgId: "1"
  };
})

app.controller(
  "robots-ctrl",
  function ($scope, $http, $window, $location,$interval,$timeout, config) {
    $scope.baseurl = config.baseurl;
    
    
    $scope.logout = function (req, res) {
      console.log("logout");
      alert("logout");
      localStorage.clear();
      
    };

    $scope.portfolioId = 1;
    
    $scope.init = function (req, res) {
      console.log("robotsctrl");
      console.log(config.baseurl);

      var islogin = localStorage.getItem("islogin");

      if (islogin != "1") {
        location.href = "index.html";
      } else {
        $scope.customerId = localStorage.getItem("customerId");
        if( $scope.customerId == 1){
            $("#menu").load("../menu-admin.html"); 
        }else{
            $("#menu").load("menu-demo.html"); 
        }       
        // $("#menu").load("menu.html"); 
        $("#general").addClass("active"); 
        $("#modelcategory").addClass("active"); 
        $scope.name = localStorage.getItem("name");
        $scope.email = localStorage.getItem('email');
        $scope.phone = localStorage.getItem("phone");
        
        $("#createportfolio").addClass("hideblock");
        $("#createportfolio").fadeOut("slow");
        $("#intro").fadeIn("slow");
        $("#categorylist").fadeIn("slow"); 
        $scope.getCustomerdemoBalance( $scope.customerId);
        $scope.getCustomerliveBalance( $scope.customerId);
        $scope.modelportfoliolist();
        console.log("init else loop");
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


   



    $scope.modelportfoliolist = function (req, res) {
      $http.get(config.baseurl + 'modelportfolio/')
      .success(function(res) {
          if (res.status == 'false') {} else {
              $scope.dataset = res.data;
              console.log('dataset: ', $scope.dataset);
          }
      }).error(function() {});
    };

    $scope.createportfolioform = function (
      customerId,
      portfolioId,
      portfolio_name
    ) {
      $scope.customerId = customerId;
      $scope.portfolioId = portfolioId;
      $scope.portfolio_name = portfolio_name;
      $scope.createportfolio = {};
      $scope.createportfolio.customer_id = customerId;
      $scope.createportfolio.name = $scope.name ;
      $scope.createportfolio.email = $scope.email;
      $scope.createportfolio.phone_number = $scope.phone;
      $scope.createportfolio.portfolio_id = portfolioId;
      $scope.createportfolio.portfolio_name = portfolio_name;
      $scope.createportfolio.portfolio_startdate = new Date();
      $scope.createportfolio.promocode = 0;

      // $("#categorylist").removeClass("showblock");
      $("#categorylist").fadeOut("slow");
      $("#intro").fadeOut("slow");
      $("#createportfolio").fadeIn("slow");   
      $("#intro").addClass("hideblock");
      $("#categorylist").addClass("hideblock");
      console.log("fadeout completed");
      console.log(  $scope.createportfolio)
    };

    $scope.submitcreateform = function (data) {
      console.log(data);

      var urlconfig = {
        headers: {
          "Content-Type": "application/json;",
        },
      };

      $http
        .post($scope.baseurl + "roboportfolio/createuserportfolio", data, urlconfig)
        .success(function (response, status, headers, config) {
          $scope.msg = response.msg;


          $("#success").modal("show");
          console.log(response.data);
         
          
          
          localStorage.setItem("portfolio_name",response.data.portfolio_name );
          localStorage.setItem("myportfolio_id",response.data.id  );
          localStorage.setItem("category_id",response.data.portfolio_id );
         
           $window.location.href = 'portfolio_detail.html';


        })
        .error(function (data, status, header, config) {
          console.log(data);
          $("#getportfolio-issue").modal("show");
        });
    };

        


   
  }
);
