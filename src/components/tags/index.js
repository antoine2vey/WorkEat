export default function($scope, $http) {
  function getTags(){
    $http.get('/api/tags')
      .success(function(res) {
        $scope.tags = res;
        console.log(res);
      })
      .error(function(err) {
        console.log(err);
      });
  }

  getTags();


  $scope.tagForm = function(){
    $http({
      method: 'POST',
      url: '/api/tags/create',
      data : {
        'name': $scope.name
      }
    })
    .success(function(res) {
      $scope.reqStatus = res;
      getTags();
    })
    .error(function(err) {
      $scope.reqStatus = err;
    });
  };

  $scope.editTag = function(tag) {
    $scope.isEditing = true;
    $scope.tagObj = tag;
  };

  $scope.removeTag = function(tag, index) {
    $http({
      method: 'DELETE',
      url: '/api/tags/'+tag._id,
    })
    .success(function() {
      $scope.tags.splice(index, 1);
    })
    .error(function(err) {
      console.log(err);
    });
  };

  $scope.updateTag = function(tag) {
    $http({
      method: 'PUT',
      url: '/api/tags/'+tag._id,
      data : {
        name: tag.name
      }
    })
    .success(function(res) {
      console.log(res);
    })
    .error(function(err) {
      console.log(err);
    });
  };
}
