app.controller(
    'candidates-ctrl', function($scope, $http, $window,$location, config) {
    console.log(config.baseurl);
    $scope.baseurl = config.baseurl;
    $scope.data = {}
    $scope.data.name = "";
    $scope.data.phone = "";
    $scope.data.email = "";
    $scope.data.password = "" ;
    $scope.data.companyname = "";
    $scope.data.companyintro = "";
    $scope.data.specialnotes = "";
    $scope.data.useragreement = "";
    $scope.data.usertype = 2;

    console.log($scope.data)


    $scope.loginform = {}
    
    $scope.init = function(req, res) {
        var islogin = localStorage.getItem('islogin');
        
        console.log(islogin);

        if (islogin == '1') {

            $scope.personaldata = JSON.parse(localStorage.getItem('personaldata'));
            console.log($scope.personaldata.usertype)

            if($scope.personaldata.usertype == 1){
                $window.location = "/my-jobs.html";
            }else{
                $window.location = "/my-applications.html";
            }
          
           
        } 
        $scope.usertype = 0
        $("#pagecounter").load("/pagecounter.html"); 
    }

    var validate = this;
    
    validate.validatelogin = function(data) {
        console.log(data);
        if (data['email'] == "") {
            $scope.message = "Please provide an email address."
            $scope.validateemail = "1";
            return false;
        } else if (data['password'] == "") {
            $scope.message = "Please provide password."
            $scope.validatepassword = "1";
            return false;
        } else {
            var confirm = 1
            return confirm;
        }

    }


    $scope.login = function(loginform) {
        $scope.loginform = loginform ;
        console.log(loginform)


        $scope.formvalidate = validate.validatelogin($scope.login);
        if ($scope.formvalidate == 1) {
            console.log($scope.login);

            var config = {
                headers: {
                    'Content-Type': 'application/json;',
                    'Access-Control-Allow-Origin': '*',
                }
            }
            console.log("this is before post");
            console.log($scope.baseurl);
            console.log($scope.loginform);
            $scope.url = $scope.baseurl + 'parttimejobs/login'
            console.log($scope.url)
            $http.post($scope.url, $scope.loginform)
                .success(function(response, status, headers, config) {
                    if (response.status === "passworderror") {
                        $scope.message = response.msg;
                        $scope.validatepassword = "1";
                        console.log($scope.message);
                    } else if (response.status === "emailerror") {
                        $scope.message = response.msg;
                        $scope.validateemail = "1";
                        console.log($scope.message);
                    } else {
                        console.log(response.data);
                        localStorage.setItem('islogin', '1'); // setting
                        localStorage.setItem('personaldata', JSON.stringify(response.data));
                        console.log(localStorage.getItem('personaldata'));
                        $window.location = "index.html";

                    }

                })
                .error(function(response, status, header) {
                    $scope.ResponseDetails = "response: " + response +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;

                    console.log(response);


                });

        } else {
            console.log("Resolve validation error");
        }
    }

        validate.validateregister = function(data) {
        if (data['name'] == "" || (data['name'] === undefined)) {
            console.log(data['name']);
            $scope.message = "Please provide a name."
            console.log(  $scope.message);
            $scope.validatename = "1";
            return false;

        } else if (data['email'] == "" || (data['email'] === undefined)) {
            $scope.message = "Please provide an email address."
                console.log(  $scope.message);
            $scope.validateemail = "1";
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


    $scope.customersignup = function(data) {
        console.log($scope.data);
        $scope.formvalidate = validate.validateregister($scope.data);
        // console.log($scope.formvalidate);
        if ($scope.formvalidate == 1) {
            // console.log($scope.data);

            var config = {
                headers: {
                    'Content-Type': 'application/json;',
                    'Access-Control-Allow-Origin': '*',
                }
            }
            console.log("this is before post");
            // console.log($scope.baseurl);
            // console.log($scope.data);
            $http.post($scope.baseurl + 'parttimejobs/sign-up', $scope.data)
                .success(function(response, status, headers, config) {
                    console.log("Successful");
                    console.log(response);
                    
                    // $window.location = "login.html";
                    if(response.status== "error"){
                        $scope.msg = response.data ;
                        $("#error").modal("show");
                    }

                    else if (response.status =="success") {
                        $scope.msg = response.data ;
                        $("#success").modal("show");
                        $window.location = "/candidates.html";
                    }
                })
                .error(function(response, status, header) {
                    $scope.ResponseDetails = "response: " + response +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                    // console.log(response);
                });

        } else {
            console.log("Resolve validation error");
        }


    }

    $scope.forgotpassword = function(req, res) {

        console.log($scope.data);

        if (typeof $scope.data.id == 'undefined') {
            // alert($scope.data.id);
            $http.post(config.baseurl + 'password/email/', $scope.data)
                .success(function(res) {
                    if (res.status == 'error') {} else {
                        $scope.response = res.data;
                        console.log('message: ', $scope.response);
                        $window.location = "forgot_password.html";
                    }
                }).error(function() {});

        } else {

            // alert($scope.data.id);
            $http.patch(config.baseurl + 'password/email/', $scope.data)
                .success(function(res) {
                    if (res.status == 'false') {} else {
                        $scope.response = res.data;
                        console.log('message: ', $scope.response);
                        window.location.reload();
                    }
                }).error(function() {});
        }


    }


    
    $scope.logout = function(req, res) {

        localStorage.clear();
        location.href = 'index.html';
    }


    


});