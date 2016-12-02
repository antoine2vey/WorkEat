export default function($http) {
  const vm = this;

  const getTags = () => {
    $http.get('/api/tags')
      .success(res => {
        vm.tags = res;
      })
      .error(err => {
        console.log(err);
      });
  };

  getTags();


  vm.tagForm = () => {
    $http.post('/api/tags/create', {
      'name': vm.name
    })
    .success(res => {
      vm.reqStatus = res;
      getTags();
    })
    .error(err => {
      vm.reqStatus = err;
    });
  };

  vm.editTag = (tag) => {
    vm.isEditing = true;
    vm.tagObj = tag;
  };

  vm.removeTag = (tag, index) => {
    $http.delete(`/api/tags/${tag._id}`)
    .success(() => {
      vm.tags.splice(index, 1);
    })
    .error(err => {
      console.log(err);
    });
  };

  vm.updateTag = (tag) => {
    const { name } = tag;

    $http.put(`/api/tags/${tag._id}`, {
      name: name
    })
    .success(res => {
      vm.reqStatus = res;
    })
    .error(err => {
      vm.reqStatus = err;
    });
  };
}
