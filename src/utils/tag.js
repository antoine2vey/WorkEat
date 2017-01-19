function getTags(http) {
  return http.get('/api/tags');
}

function createTag(http, tag) {
  return http.post('/api/tags/create', tag);
}

function updateTag(http, tagId, obj) {
  return http.put(`/api/tags/${tagId}`, obj);
}

function deleteTag(http, tagId) {
  return http.delete(`/api/tags/${tagId}`);
}

export { getTags, createTag, updateTag, deleteTag };
