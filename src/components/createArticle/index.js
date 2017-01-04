export default ['$http', function($http) {
    const vm = this;
    $http.get('/account/list').success((res) => {
        console.log(res);
        vm.users = res;
    }).error((err) => {
        console.log(err);
    });
}];
