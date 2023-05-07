app.controller(
    "deposit-ctrl",
    function ($scope, $http, $window, $location, config) {
      $scope.baseurl = config.baseurl;
      $scope.logout = function (req, res) {
        localStorage.clear();
        location.href = "index.html";
      };
  
      $scope.portfolioId = 1;
      $scope.init = function (req, res) {
        var islogin = localStorage.getItem("islogin");
        if (islogin != "1") {
          location.href = "index.html";
        } else {
          if( $scope.customerId == 1){
            $("#menu").load("menu-admin.html"); 
        }else{
            $("#menu").load("menu-demo.html"); 
        }
        $("#general").addClass("active"); 
        $("#modelcategory").addClass("active");
        
        //   $scope.portfoliolist();
          $scope.name = localStorage.getItem("name");
          $scope.customerId = localStorage.getItem("customerId");
          $scope.getCustomerdemoBalance($scope.customerId);
          $scope.getCustomerliveBalance($scope.customerId);

          $scope.getDeposits();
          $scope.getAgents();
        }
      };

      $scope.depositform = {}
      $scope.depositform.org_id = localStorage.getItem("org_id");
      $scope.depositform.datetime = moment().format("YYYY-MM-DD[T]HH:mm:ss");
      $scope.depositform.customerId = localStorage.getItem("customerId");
      $scope.depositform.amount = 0;
      $scope.depositform.ref_no = 0;
      $scope.depositform.agent_name = 0;
      $scope.depositform.transaction_type = 'DEPOSIT';
      $scope.depositform.transaction_dbt_cdt = 'CR';
      $scope.depositform.status = 'PENDING';
      $scope.depositform.name = localStorage.getItem("name");
      $scope.depositform.email = localStorage.getItem("email");
      $scope.depositform.phone = localStorage.getItem("phone");

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

    $scope.getDeposits = function (req, res) {
        console.log("calling deposit", $scope.baseurl);
        $scope.data = {}
        $scope.data.customerId = localStorage.getItem("customerId")

        $scope.getdepositsurl = $scope.baseurl + "demobank/getDepositbyCustomerId" ;
        console.log($scope.getdepositsurl)
        $http.post($scope.getdepositsurl, $scope.data)
            .success(function (response, status) {
                $scope.dataset = response.data;
                console.log("result", $scope.dataset)
            })
            .error(function (response, status, header, config) {
                $scope.ResponseDetails = response;
                console.log(response);
            });
            
    };

    $scope.resetDeposit = function (req, res) {
        $scope.depositform.amount = null;
        $scope.depositform.ref_no = null;
        $scope.depositform.agent_name = 0;


    }

    $scope.getAgents = function (req, res) {
        console.log("calling getAgents");
        $scope.url = $scope.baseurl + "customer/getAgents/" +  localStorage.getItem("customerId") + "/";
        console.log($scope.url)
        $http.get($scope.url)
            .success(function (response, status) {
                $scope.agent_list = response.data;
                console.log("result", $scope.agent_list)
            })
            .error(function (response, status, header, config) {
                $scope.ResponseDetails = response;
                console.log(response);
            });
    };
  
      var vm = this;
      vm.depositvalidate = function (data) {
          // Validation for null parameters . Basics
          if (data.amount == "") {
            $scope.message_1 = "Please provide a valid amount.";
            $scope.validate_amount = "1";
            return false;
          } else if (data["ref_no"] == "") {
            $scope.message_2 = "Please provide reference number.";
            $scope.validate_ref_no = "1";
            return false;
          } else if (data["agent_name"]== ""){
            $scope.message_3 = "Please select a agent.";
            $scope.validate_agent_name = "1";
            return false;
          }
          else {
            var confirm = 1;
            return confirm;
          }
        };  

      $scope.addDeposits = function (depositform) {

        $scope.validateentry = vm.depositvalidate(depositform);
        if ($scope.validateentry == 1){ 

            console.log("Addd Deposits Calling ......", depositform);
            $scope.data = {};
            $scope.data.agent_name = depositform.agent_name ;
            $scope.data.amount = depositform.amount ;
            $scope.data.org_id = localStorage.getItem("org_id");
            $scope.data.status = "Pending" ;
            $scope.data.balance = 0 ;
            $scope.data.currency = "USD" ;
            $scope.data.customer_id = localStorage.getItem("customerId");
            $scope.data.customer_email = depositform.email ;
            $scope.data.customer_phone = depositform.phone ;
            $scope.data.customer_ref_no = depositform.ref_no ;
            $scope.data.customer_name = depositform.name ;
            console.log($scope.data);

            $http.post($scope.baseurl + "demobank/addDepositView", $scope.data, $scope.config)
                .success(function (response, status) {
                    console.log(response);
                    $scope.getDeposits()
                    if(response.status == 'success')
                    {   
                       
                        $scope.alertheader = "Alert" ;
                        $scope.alertmsg = "Your Deposit is submitted.";
                        console.log($scope.alertheader ) ;
                        console.log($scope.alertmsg ) ;
                        $("#deposit-success").modal("show");
                        $scope.getDeposits();
                        $scope.resetDeposit();
                    }
                    else if(response.status == 'alert'){
                        $scope.alertheader = "Alert" ;
                        $scope.alertmsg = "Please do not re-submit the same deposit";
                        console.log($scope.alertheader ) ;
                        console.log($scope.alertmsg ) ;
                        $("#deposit-alert").modal("show");
                        $scope.resetDeposit();
                    }

                })
                .error(function (response, status) {
                    $scope.error = response;
            });
        }
       
    };
  
    
   });
  