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
      console.log('sent');
        $http.post('/api/articles', {
                title: vm.title,
                thumbnail: vm.file,
                text: vm.content,
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
