app.controller('profile-ctrl', function($scope, $http, $window,$location,$timeout, config, Upload) {
    console.log(config.baseurl);
    $scope.baseurl = config.baseurl;
    $scope.base = config.base ;
    $scope.logout = function(req, res) {

        localStorage.clear();
        location.href = 'index.html';
    }


    
    $scope.init = function(req, res) {
        var islogin = localStorage.getItem('islogin');
        
        console.log(islogin);

        if (islogin == '1') {
            $scope.personaldata = JSON.parse(localStorage.getItem('personaldata'));
            $scope.getprofile($scope.personaldata.id)
            $scope.usertype = $scope.personaldata.usertype;
        } 
        else{

            $location.href = 'index.html'
        }
        
        
        $("#pagecounter").load("/pagecounter.html"); 
    }

   

    $scope.uploadPic = function(id,file) {

        $scope.url = $scope.baseurl + 'parttimejobs/saveProfileImg'
        var data = {id:id,file: file}
        console.log(data)
        file.upload = Upload.upload({
          url:  $scope.url,
          data: data,
        });
    
        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            $scope.data.profile_url = $scope.base + "/media/" + file.result.msg
          });
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
        }

    
    $scope.getprofile = function(profileId) {
          $scope.data = {};
          $scope.data.id = profileId ;
  
          $http.get(config.baseurl + 'parttimejobs' + "/getprofile/" + profileId  )
              .success(function(response) {
                  if (response.status == 'false') {} else {
                      $scope.data = response.data;
                      localStorage.setItem('personaldata', JSON.stringify(response.data));
                      console.log('dataset: ', $scope.dataset);
                      $scope.data.profile_url = config.base + $scope.personaldata.file

                  }
              }).error(function() {

                console.log("Profile information couldnt be fetched.")
              });
      }
  

    


});