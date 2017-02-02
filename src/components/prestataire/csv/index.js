export default ['$http', '$location', function($http, $location) {
  const vm = this;

  vm.getCSV = () => {
    const ISODate = vm.date.toISOString();
    $http.post(`/api/csv`, {
      date: ISODate
    })
    .success(res => {
      console.log(res);
      // $http.get('/api/csv')
      // .success(res => {
      //   $location.url('/api/csv');
      // });
    })
    .error(err => {
      console.log(err);
    });
  };
}];
