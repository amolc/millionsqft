app.controller('stockdataCtrl', function($scope, $http, $window, $location, $sce, $timeout, store, config) {


    
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
                $("#menu").load("menu-simple.html"); 
            }
            // $("#menu").load("menu.html"); 
            $("#general").addClass("active"); 
            $("#category").addClass("active"); 
            $("#modelcategory").addClass("active"); 
          $scope.list();
          $scope.name = localStorage.getItem("name");
        }
      };


    $scope.list = function(req, res) {
        $http.get(config.baseurl + 'stockdata/')
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.dataset = res.data;

            
                    console.log('dataset: ', $scope.dataset);
                }
            }).error(function() {});
    }


    $scope.add = function(req, res) {
        console.log($scope.data);
        $http.post(config.baseurl + 'stockdata/', $scope.data)
            .success(function(res) {

                if (res.status == 'false') {} else {
                    $scope.response = res.data;
                    console.log('message: ', $scope.response);
                    window.location.reload();
                }
            }).error(function() {});
        

    }


    $scope.update = function(id) {
        $http.patch(config.baseurl + 'stockdata/' + id, $scope.data)
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.data = res.data;
                    console.log('data: ', $scope.data);
                  
                }
            }).error(function() {});
    }

   

    $scope.delete = function(id) {
        console.log("delete idsssss");
        console.log(id);
        $http.delete(config.baseurl + 'stockdata/' + id)
            .success(function(res) {
                if (res.status == 'false') {} else {
                    // $scope.list();

                }
            }).error(function(error_response) {
                console.log(error_response);
            });
        $window.location.reload();
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
        $scope.data = {}
        $scope.data.id = data.id ;
        $scope.data.stock = data.stock 

        $("#deleteform").modal("show");
      };

      $scope.addform = function () {
        
        $scope.data = {}
        $("#editform").modal("show");
      };

      $scope.onsubmit  = function (data) {
        
        $scope.data = data
        console.log($scope.data.id);
      
        if($scope.data.id != ''){ 
            console.log("addform")
            $scope.add( $scope.data);
        }else{
            console.log("updateform")
            $scope.update( $scope.data);
        }
        
        $("#editform").modal("hide");
      };
  



      
  
      //orderCtrl ends
    



    //orderCtrl ends
});
