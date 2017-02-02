import { getTags, deleteTag, updateTag, createTag } from '../../utils/tag.js';

export default ['$http', function($http) {
  const vm = this;

  const displayTags = () => {
    getTags($http)
    .success((res) => {
      vm.tags = res;
    })
    .error((err) => {
      console.error(err);
    });
  };

  displayTags();


  vm.tagForm = () => {
    createTag($http, {
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
    deleteTag($http, tag._id)
    .success(() => {
      vm.tags.splice(index, 1);
    })
    .error((err) => {
      console.log(err);
    });
  };

  vm.updateTag = (tag) => {
    const { name } = tag;

    updateTag($http, tag._id, {
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
