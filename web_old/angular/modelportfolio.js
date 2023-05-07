app.controller('modelportfolioCtrl', function($scope, $http, $window, $location, $sce, $timeout, store, config) {


    
    $scope.data = {}
  
    $scope.init = function (req, res) {
        console.log("roboctrl");
        console.log(config.baseurl);
        var islogin = localStorage.getItem("islogin");

        if (islogin != "1") {
          location.href = "index.html";
        } else {
            $scope.customerId = localStorage.getItem("customerId");
            if( $scope.customerId == 1){
                $("#menu").load("menu-admin.html"); 
            }else{
                $("#menu").load("menu-demo.html"); 
            }
        //   $("#menu").load("menu.html"); 
          $("#general").addClass("active"); 
          $("#modelcategory").addClass("active"); 
        

          $scope.list();
          $scope.name = localStorage.getItem("name");
        }
      };


    $scope.list = function(req, res) {
        $http.get(config.baseurl + 'modelportfolio/')
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.dataset = res.data;
                    console.log('dataset: ', $scope.dataset);
                }
            }).error(function() {});
    }


    $scope.add = function(req, res) {
        console.log($scope.data);
        $http.post(config.baseurl + 'modelportfolio/', $scope.data)
            .success(function(res) {

                if (res.status == 'false') {} else {
                    $scope.response = res.data;
                    console.log('message: ', $scope.response);
                    window.location.reload();
                }
            }).error(function() {});
        

    }


    $scope.update = function(data) {


        $http.patch(config.baseurl + 'modelportfolio/' + data['id'], $scope.data)
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.data = res.data;
                    console.log('data: ', $scope.data);
                  
                }
            }).error(function() {});
    }

   

    $scope.delete = function(id) {
        console.log("delete id");
        console.log(id);
        $http.delete(config.baseurl + 'modelportfolio/' + id)
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.list();

                }
            }).error(function(error_response) {
                console.log(error_response);
            });
       
    }



    $scope.redirect = function() {
        //console.log("redirect");
        location.href = 'dashboard.html';
    }




    $scope.onedit = function (data) {
        console.log(data);
        $scope.data = data;
        console.log($scope.data);
        $("#editform").modal("show");
      };

      $scope.ondelete = function (data) {
        console.log("delete modal");
        $scope.data = data ;
        $("#deleteform").modal("show");
      };

      $scope.addform = function () {
        
        $scope.data = {}
        $scope.data.customer_id = localStorage.getItem("customerId");
        $scope.data.org_id = 1;
        $scope.data.status = 1;
        $scope.data.stockdataId = 1;

        $("#addform").modal("show");

      };



      $scope.onsubmit  = function (data) {
        $scope.data = data
        console.log($scope.data.id);

        console.log("v11");
        if($scope.data.id  ===  'undefined'){ 
            console.log("add form ")
            $scope.add( $scope.data);
        }else{
            console.log("update form ")
            $scope.update( $scope.data);
        }
        


        $("#editform").modal("hide");
      };



      
  
      //orderCtrl ends
    



    //orderCtrl ends
});
