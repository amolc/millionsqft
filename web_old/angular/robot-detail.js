app.controller(
  "robot-detail-ctrl",
  function ($scope, $http, $window, $location, config) {
    $scope.baseurl = config.baseurl;


    $scope.logout = function (req, res) {
      localStorage.clear();
      location.href = "index.html";
    };

    const urlParams = new URLSearchParams($window.location.search);
    $scope.modelportfolioId = urlParams.get('modelportfolioId');
    console.log( $scope.modelportfolioId );
    
    
    
  
    
    $scope.init = function (req, res) {
      console.log("portfoliodetailctrl");
      console.log(config.baseurl);
      var islogin = localStorage.getItem("islogin");

      if (islogin != "1") {
        location.href = "index.html";
      } else {
        $scope.name = localStorage.getItem("name");
        $scope.customerId = localStorage.getItem("customerId");

        if( $scope.customerId == 1){
            $("#menu").load("../menu-admin.html"); 
        }else{
            $("#menu").load("menu-demo.html"); 
        }
        // $("#menu").load("menu.html"); 
        $("#general").addClass("active"); 
        $("#modelcategory").addClass("active");
        console.log( $scope.modelportfolioId) 
        $scope.getCustomerdemoBalance($scope.customerId);
        $scope.getCustomerliveBalance($scope.customerId);

        $scope.getmodelportfolio($scope.modelportfolioId);
        $scope.getportfoliostocks($scope.modelportfolioId);
        
      }
    
    }

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




    $scope.getmodelportfolio = function(modelportfolioId) {
      var data = {}
      data.modelportfolioId = modelportfolioId ;
    
      console.log(data);
        var urlconfig = {
            headers: {
              "Content-Type": "application/json;"
            },
          };
          

          $http
            .get( $scope.baseurl + "modelportfolio/" + $scope.modelportfolioId , urlconfig)
            .success(function (data, status, headers, config) {
            
              $scope.portfolioDetails = data.data ;
              $scope.portfolioDetails.portfolio_startDate = new Date($scope.portfolioDetails.portfolio_startDate);
              // $scope.portfolioDetails.stockdataId = 1;
              // console.log( $scope.portfolioDetails.stockdataId)
              console.log(data.data);
            })
            .error(function (data, status, header, config) {
              console.log(data);
             
            });
    
    }

    
    $scope.onedit = function () {
        $scope.data = $scope.portfolioDetails ;
       
        $scope.data.portfolio_startDate = new Date($scope.data.portfolio_startDate);
        $scope.data.initial_value = 0 ;
        $scope.data.last_value = 0 ;
        $scope.data.roi = 0 ;
     
        console.log( $scope.data);
      
        console.log($scope.data);
        $("#editform").modal("show");
      };

      $scope.onsubmit  = function (data) {
        
        $scope.data = data
        console.log($scope.data.id);
      
        if($scope.data.id != ''){ 
            console.log("addform")
            $scope.update( $scope.data);
        }else{
            console.log("updateform")
            $scope.update( $scope.data);
        }
        
        $("#editform").modal("hide");
      };


      $scope.update = function(data) {

        var id = data.id ;
        $http.patch(config.baseurl + 'modelportfolio/' + id,data)
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.data = res.data;
                    console.log('data: ', $scope.data);
                  
                }
            }).error(function() {});
    }
    


   


  $scope.getportfoliostocks = function(modelportfolioId) {
    var data = {}
    data.modelportfolioId = modelportfolioId ;
  
    console.log(data);
      var urlconfig = {
          headers: {
            "Content-Type": "application/json;"
          },
        };
        

        $http
          .get( $scope.baseurl + "modelportfolio/stocks/" + $scope.modelportfolioId , urlconfig)
          .success(function (data, status, headers, config) {
          
            $scope.portfoliostocks = data.data ;

            console.log( $scope.portfolioDetails);
          })
          .error(function (data, status, header, config) {
            console.log(data);
           
          });
  
  }


  $scope.addstock_modal = function ( stockdataId,modelportfolioId, portfolio_name, capital) {
    console.log("show_add_stock_modal");
    var data = {}
  
    var urlconfig = {
      headers: {
        "Content-Type": "application/json;"
      },
    };

    
  $scope.addstock = {}
  $scope.addstock.modelportfolio_id = modelportfolioId ;
  $scope.addstock.capital = capital ;
  $scope.addstock.stockdataId = stockdataId ;
  $scope.addstock.modelportfolio_name = portfolio_name ;
  


  console.log($scope.addstock)
  
  $scope.url = $scope.baseurl + "stockdata/portfolio/" + stockdataId +"/" ;

  $http.get( $scope.url , data, urlconfig)
          .success(function (response, status, headers, config) {
            $scope.stockdata_list = response.data ;
            console.log($scope.stockdata_list) ;
            $("#addstock").modal("show");
        })
        .error(function (response, status, header, config) {
            console.log(response);
            $scope.errormsg = "We were not able to get the stockdata. Please try again after some time.";
            $("#stockdata-issue").modal('show');
        });
    
  };


  $scope.onaddstockSubmit = function (data) {
    console.log("addnewstock");
    console.log("customer_id");
    console.log("portfolio_id");
    console.log(addstock);

    if(data.portfolioId == 7){
      data.asset_class = "CRYPTO";
    }else{
      data.asset_class = "STOCK";
    }


    console.log(data);
      var urlconfig = {
          headers: {
            "Content-Type": "application/json;"
          },
        };
        $http
          .post( $scope.baseurl + "modelportfolio/stocks/addstock", data, urlconfig)
          .success(function (data, status, headers, config) {
            $scope.addstock = data.data ;
            $("#addstock").modal("hide");
            // location.reload();
            $scope.getportfoliostocks(addstock.myportfolioId);
          })
          .error(function (data, status, header, config) {
            console.log(data);
          });
};


$scope.deletestockmodal = function (id) {
  console.log("deletestockmodal")


  $scope.data = {}
  $scope.data.id =  id

   $("#deletestock").modal("show");
};

$scope.deletestock = function (data) {
  console.log("editstock")
  console.log(data);
    var urlconfig = {
        headers: {
          "Content-Type": "application/json;"
        },
      };
      $http
        .post( $scope.baseurl + "modelportfolio/stocks/deletestock", data, urlconfig)
        .success(function (data, status, headers, config) {
          $scope.edit = data.data ;
          $("#deletestock").modal("hide");
          $scope.getportfoliostocks($scope.myportfolioId);
        })
        .error(function (data, status, header, config) {
          console.log(data);
        });
};

  $scope.editstockmodal = function (data,capital) {
    console.log("addnewstock")

      $scope.data = data
      $scope.data.percentage = parseInt(data.percentage)
      $scope.data.capital = parseInt(capital)


     $("#editstock").modal("show");
};

$scope.editstock = function (data) {
    console.log("editstock")
    console.log(data);
      var urlconfig = {
          headers: {
            "Content-Type": "application/json;"
          },
        };
        $http
          .post( $scope.baseurl + "modelportfolio/stocks/editstock", data, urlconfig)
          .success(function (data, status, headers, config) {
            $scope.edit = data.data ;
            $("#editstock").modal("hide");
            $scope.getportfoliostocks($scope.myportfolioId);
          })
          .error(function (data, status, header, config) {
            console.log(data);
          });
};





    });
