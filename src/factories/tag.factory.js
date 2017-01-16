import angular from 'angular';
const Tags = angular.module('Tags', [])
.factory('Tags', ($http) => {
  function getTags() {
    return $http.get('/api/tags');
  }

  function createTag(tag) {
    return $http.post('/api/tags/create', tag);
  }

  function updateTag(tagId, obj) {
    return $http.put(`/api/tags/${tagId}`, obj);
  }

  function deleteTag(tagId) {
    return $http.delete(`/api/tags/${tagId}`);
  }

  return {
    getTags,
    createTag,
    updateTag,
    deleteTag
  };
});

export default Tags;
