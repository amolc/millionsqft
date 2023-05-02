
app.factory("variable", function () {
    return {
      modulename: "parttimejobs",
    };
  });


app.controller(
    'my-candidates-ctrl', function($scope, $http, $window,$location, config) {
    console.log(config.baseurl);
    $scope.baseurl = config.baseurl;

    const urlParams = new URLSearchParams($window.location.search);
    $scope.jobId = urlParams.get('jobid');
    console.log( $scope.jobId );

    
    $scope.category = [
          {id : "1", name : "Food and Breverage"},
          {id : "2", name : "Logistics"},
          {id : "3", name : "Event Management"}
        ]; 


    $scope.init = function(req, res) {
        var islogin = localStorage.getItem('islogin');
        
        console.log(islogin);

        if (islogin == '1') {
            $scope.personaldata = JSON.parse(localStorage.getItem('personaldata'));
            console.log($scope.personaldata.name)
            $scope.addjob = $scope.personaldata ;
            
            $scope.listmycandidates( $scope.personaldata.id) ;
        } 
        
        $("#pagecounter").load("/pagecounter.html"); 
    }

    
    var validate= this;
  



    $scope.updatejob = function() {
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


    $scope.listmycandidates = function(user_id) {
        $scope.data = {};
        $scope.data.user_id = user_id; ;


        $http.post(config.baseurl + 'parttimejobs' + "/listmycandidates",  $scope.data )
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.dataset = res.data;
                    console.log('dataset: ', $scope.dataset);
                }
            }).error(function(error) {
                console.log(error)


            });
    }

    $scope.getjobdetail = function(jobId) {
        $scope.data = {};
        $scope.data.jobId = jobId ;

        $http.post(config.baseurl + 'parttimejobs' + "/getJobDetails",  $scope.data )
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.data = res.data;
                    console.log('dataset: ', $scope.dataset);
                }
            }).error(function() {});
    }


    $scope.selectcandidate = function(candidate) {
        $scope.candidate = candidate
        $scope.jobdetail = $scope.data
        console.log( $scope.candidate);
        console.log( $scope.jobdetail);

        $("#selectcandidate").modal("show");
        
    }




    $scope.confirmcandidate = function(applicationId) {
        $scope.data = {};
        $scope.data.applicationId = applicationId ;
        $scope.data.confirmcandidate = 1 ;
        

        console.log($scope.data);

        $http.post(config.baseurl + 'parttimejobs' + "/confirmcandidate",  $scope.data )
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.data = res.data;
                    console.log('dataset: ', $scope.dataset);
                    $scope.listjobapplications($scope.jobId) ;
                }
            }).error(function() {});
    }


    
    $scope.logout = function(req, res) {

        localStorage.clear();
        location.href = 'index.html';
    }


    


});