export default ['$http', 'Tags', function($http, Tags) {
  const vm = this;
  const { getTags, createTag, updateTag, deleteTag } = Tags;

  const displayTags = () => {
    getTags()
    .success((res) => {
      vm.tags = res;
    })
    .error((err) => {
      console.error(err);
    });
  }

  displayTags();


  vm.tagForm = () => {
    createTag({
      name: vm.name,
    })
    .success((res) => {
      vm.reqStatus = res;
      displayTags();
    })
    .error((err) => {
      vm.reqStatus = err;
    });
  };

  vm.editTag = (tag) => {
    vm.isEditing = true;
    vm.tagObj = tag;
  };

  vm.removeTag = (tag, index) => {
    deleteTag(tag._id)
    .success(() => {
      vm.tags.splice(index, 1);
    })
    .error((err) => {
      console.log(err);
    });
  };

  vm.updateTag = (tag) => {
    const { name } = tag;

    updateTag(tag._id, {
      name,
    })
    .success((res) => {
      vm.reqStatus = res;
    })
    .error((err) => {
      vm.reqStatus = err;
    });
  };
}];
