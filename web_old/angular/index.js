
app.factory("variable", function () {
    return {
      modulename: "parttimejobs",
    };
  });


app.controller(
    'index-ctrl', function($scope, $http, $window,$location, config) {
    console.log(config.baseurl);
    $scope.baseurl = config.baseurl;
   
    $scope.loginform = {}
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
            $scope.addjob.jobcategory = 1
            $scope.usertype = $scope.personaldata.usertype ;
        } 
        else{
            $scope.usertype = 0 ;
            console.log("not logged in");
        }
    
        $scope.listalljobs() ;
        $("#pagecounter").load("/pagecounter.html"); 
    }
    
    var validate= this;
  
    $scope.apply = function(data) {
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
                
                $("#apply").modal("show");

            }
          
        }
        else{
            $("#login").modal("show");
        }
        

    }

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
                }).error(function(error) {

                    console.log('message: ', error);


                });

        }

       
    }


    $scope.listalljobs = function() {
        $scope.data = {};
        $scope.data.jobstatus = 1 ;

        $http.post(config.baseurl + 'parttimejobs' + "/listalljobs",  $scope.data )
            .success(function(res) {
                if (res.status == 'false') {} else {
                    $scope.joblist = res.data;
                    console.log('joblist: ', $scope.joblist);
                }
            }).error(function() {});
    }




    $scope.logout = function(req, res) {
          localStorage.clear();
        location.href = 'index.html';
    }

    $scope.opendetails = function(jobId) {
        location.href = 'jobs-detail.html?jobid='+ jobId;

    }
    
    

});