app.factory("variable", function () {
    return {
      modulename: "parttimejobs",
    };
  });


app.controller(
    'my-applications-ctrl', function($scope, $http, $window,$location, config) {
    console.log(config.baseurl);
    $scope.baseurl = config.baseurl;

    
    $scope.category = [
          {id : "1", name : "Food and Breverage"},
          {id : "2", name : "Logistics"},
          {id : "3", name : "Event Management"}
        ]; 


    $scope.init = function(req, res) {
        $("#dtBox").DateTimePicker();
        var islogin = localStorage.getItem('islogin');
        
        console.log(islogin);

        if (islogin == '1') {
            $scope.personaldata = JSON.parse(localStorage.getItem('personaldata'));
            $scope.usertype =   $scope.personaldata.usertype ;
            console.log($scope.personaldata.name)
            $scope.listapplications($scope.personaldata.id) ;
            
            
        
        } else{

            $location.href = 'index.html'
        }
        
        $("#pagecounter").load("/pagecounter.html"); 
    }

    
    var validate= this;
  


    $scope.createjobs = function() {
        console.log($scope.addjob);

        console.log($scope.addjob.id)
        if( $scope.addjob.id === "" || $scope.addjob.id === null){

            alert("inside add job");
            $scope.addjob.jobstatus = 1
            $scope.addjob.jobisapproved = 1 ;
        
            console.log($scope.addjob);

            console.log($scope.addjob.jobdate);

            $scope.addjob.jobdate = moment($scope.addjob.jobdate,'DD/MM/YYYY HH:mm').format("YYYY-MM-DD[T]HH:mm:ss");
            console.log($scope.addjob.jobdate);
                $http.post(config.baseurl + 'parttimejobs' + "/createjobs", $scope.addjob)
                    .success(function(response) {
                        if (response.status == 'error') {
                            console.log('message: ', $scope.response);

                        } else {
                            $scope.response = response.data;
                            $scope.listjobs($scope.personaldata.id) ;
                        }
                    
                    }).error(function() {});

        }
        else{
            alert(" update job");

            $scope.addjob.jobdate = moment($scope.addjob.jobdate,'DD/MM/YYYY HH:mm').format("YYYY-MM-DD[T]HH:mm:ss");
            console.log($scope.addjob.jobdate);
                $http.post(config.baseurl + 'parttimejobs' + "/updateJobs", $scope.addjob)
                    .success(function(response) {
                        if (response.status == 'error') {
                            console.log('message: ', $scope.response);

                        } else {
                            $scope.response = response.data;
                            
                            $scope.listjobs($scope.personaldata.id) ;
                            
                        }
                    
                    }).error(function() {})


            }


    }

   


    $scope.listapplications = function(user_id) {
        $scope.data = {};
        $scope.data.user_id = user_id ;

        $http.post(config.baseurl + 'parttimejobs' + "/listapplications",  $scope.data )
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.dataset = res.data;
                    console.log('dataset: ', $scope.dataset);
                }
            }).error(function() {});
    }




    $scope.logout = function(req, res) {

        localStorage.clear();
        location.href = 'index.html';
    }

    


});