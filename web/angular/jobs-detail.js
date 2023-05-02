
app.factory("variable", function () {
    return {
      modulename: "parttimejobs",
    };
  });


app.controller(
    'my-jobs-detail-ctrl', function($scope, $http, $window,$location, config) {
    console.log(config.baseurl);
    $scope.baseurl = config.baseurl;
    $scope.base = config.base ;

    const urlParams = new URLSearchParams($window.location.search);
    $scope.jobId = urlParams.get('jobid');
    console.log( $scope.jobId );

    
    $scope.category = [
          {id : "1", name : "Food and Breverage"},
          {id : "2", name : "Logistics"},
          {id : "3", name : "Event Management"}
        ]; 


    $scope.init = function(req, res) {
        $scope.usertype = 0;
        $scope.getjobdetail($scope.jobId) ;
        $scope.listjobapplications($scope.jobId) ;
        $("#pagecounter").load("/pagecounter.html"); 
        var islogin = localStorage.getItem('islogin');
        
        console.log(islogin);
        if(islogin==1) {
            $scope.personaldata = JSON.parse(localStorage.getItem('personaldata'));
            $scope.usertype = $scope.personaldata.usertype
            console.log($scope.personaldata.usertype)
            console.log($scope.personaldata.name)
        }
        
       

    }

    var validate= this;
    validate.validateapplication = function(data) {
        if (data['name'] == "" || (data['name'] === undefined)) {
            console.log(data['name']);
            $scope.message = "Please provide a name."
            console.log(  $scope.message);
            $scope.validatename = "1";
            return false;

        } else if (data['intro'] == "" || (data['intro'] === undefined)) {
            $scope.message = "Please provide a proper introduction"
                console.log(  $scope.message);
            $scope.validateintro = "1";
            return false;
        }
          else if (data['phone'] == "" || (data['phone'] === undefined)) {
            $scope.message = "Please provide a phone number."
                console.log(  $scope.message);
            $scope.validatephone = "1";
            return false;
        }
        else if (data['password'] == "" || (data['password'] === undefined)) {
            $scope.message = "Please provide password."
                console.log(  $scope.message);
            $scope.validatepassword = "1";
            return false;
        }
        else {
            var confirm = 1
            return confirm;
        }

    }


    $scope.addapplication = function(application) {

        $scope.formvalidate = validate.validateapplication($scope.application);
        $scope.application.jobintro = $scope.application.intro
        $scope.application.profile_pic = $scope.application.file
      
        


        console.log($scope.application)
        if ($scope.formvalidate == 1){
            console.log($scope.application);
            $http.post(config.baseurl + 'parttimejobs' + "/addapplication", $scope.application)
                .success(function(response) {
                    if (response.status == 'error') {
                        console.log('message: ', $scope.response);
                    } else {
                        $scope.response = response.data;
                        $('#apply').modal("hide");
                        $('#success').modal("show");
                    }
                }).error(function() {});

        }

       
    }

    var validate= this;
  
    $scope.apply = function(data) {
       
        console.log("apply called.")
        var islogin = localStorage.getItem('islogin');
        $scope.data = data
        if (islogin == '1') {

            if ($scope.personaldata.usertype == 1){
                $("#iscandidate").modal("show");
            }
            else{


                $scope.application = $scope.personaldata ;
                $scope.application.jobId = $scope.data.id ;
                $scope.application.profile_pic = $scope.application.file
                $scope.application.jobhourlypay = $scope.data.jobhourlypay ;
                $scope.application.applicant_id = $scope.application.id
                $scope.application.user_id = $scope.data.user_id ;
                console.log("apply inside to show form");
                $("#apply").modal("show");

            }
          
        }
        else{
            $("#login").modal("show");
        }
        

    }



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


    $scope.listjobapplications = function(jobId) {
        $scope.data = {};
        $scope.data.jobId = jobId ;

        $http.post(config.baseurl + 'parttimejobs' + "/listJobApplications",  $scope.data )
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.dataset = res.data;
                    console.log('dataset: ', $scope.dataset);
                }
            }).error(function() {});
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