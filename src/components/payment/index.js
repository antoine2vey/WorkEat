export default ['$http', '$stateParams', '$localStorage', function ($http, $stateParams, $localStorage) {
  Stripe.setPublishableKey('pk_test_PJVcvbd18FBSYwdkNvtQDLX5');
  const vm = this;
  const { id } = $stateParams;

  vm.toggleTest = () => {
    if (vm.isChecked) {
      vm.number = '4242424242424242';
      vm.date = '08/19';
      vm.cvc = '433';
    } else {
      vm.number = '';
      vm.date = '';
      vm.cvc = '';
    }
  };

  vm.sendPayment = () => {
    const { number, date, cvc } = vm;
    const [month, year] = date.split('/');

    function stripeResponseHandler(status, res) {
      if (res.error) {
        return console.error(res);
      }

      const token = res.id;

      return $http.post(`/payment/${id}`, { token }).success((_res) => {
        // On vide le cart si la commande est passée
        $localStorage.cart = [];
        vm.success = _res;
      }).error((err) => {
        console.error(err);
      });
    }

    Stripe.card.createToken({
      number,
      cvc,
      exp_month: month,
      exp_year: year,
    }, stripeResponseHandler);
  };
}];
