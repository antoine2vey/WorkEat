function nl2br(str, is_xhtml = false) {
  const breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

export default ['$http', function($http) {
  const vm = this;

  $http.get('/api/articles')
  .success(articles => {
    vm.articles = articles;
  })
  .error(err => {
    console.log(err);
  })

  vm.createArticle = () => {
    $http.post('/api/articles', {
      title: vm.title,
      thumbnail: vm.file,
      text: nl2br(vm.content),
    })
    .success(() => {
      console.log('Article created !');
    })
    .error((err) => {
      console.log(err);
    })
  };

  vm.deleteArticle = (article, index) => {
    $http.delete(`/api/articles/${article._id}`)
    .success(res => {
      vm.articles.splice(index, 1);
    })
  }
}];
