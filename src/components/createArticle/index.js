import Quill from 'quill';

export default ['$http', '$sce', function($http, $sce) {
  const vm = this;
  const editor = new Quill('#editor', {
    modules: {
      'history': {          // Enable with custom configurations
        'delay': 2500,
        'userOnly': true
      }
    },
    theme: 'snow'
  });


  $http.get('/api/articles')
  .success(articles => {
    vm.articles = articles;
  })
  .error(err => {
    console.log(err);
  });

  vm.createArticle = () => {
    $http.post('/api/articles', {
      title: vm.title,
      thumbnail: vm.file,
      text: document.querySelector(".ql-editor").innerHTML,
    })
    .success(() => {
      console.log('Article created !');
    })
    .error((err) => {
      console.log(err);
    });
  };

  vm.deleteArticle = (article, index) => {
    $http.delete(`/api/articles/${article._id}`)
    .success(res => {
      vm.articles.splice(index, 1);
    });
  };
}];
