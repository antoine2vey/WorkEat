import {
  getProducts,
  _getPlat,
  _getEntree,
  _getDessert
} from '../../utils/product.js';

function filterId(items) {
  items.forEach((item, idx) => {
    if (item === null) {
      items.splice(idx, 1);
    }
  });

  return items.map(item => item._id);
}

export default ['$http', function($http) {
  const vm = this;

  function getBundles() {
    $http.get('/api/bundles')
    .success(bundles => {
      vm.bundles = bundles;
    })
    .error(err => {
      console.log(err);
    });
  }

  getBundles();

  getProducts($http)
  .success((products) => {
    vm.plat = _getPlat(products);
    vm.entree = _getEntree(products);
    vm.dessert = _getDessert(products);
  });

  vm.bundleForm = () => {
    $http.post('/api/bundles', {
      name: vm.name,
      description: vm.description,
      price: vm.price,
      reduction: vm.reduction,
      itemsId: filterId([
        vm.selectedEntree,
        vm.selectedPlat,
        vm.selectedDessert,
      ]),
    }).success(res => {
      vm.reqStatus = res;
      getBundles();
    }).error(err => {
      vm.reqStatus = res;
    });
  };

  vm.removeBundle = (bundle, index) => {
    $http.delete(`/api/bundles/${bundle._id}`)
    .success(res => {
      vm.reqStatus = res;
      vm.bundles.splice(index, 1);
    })
    .error(err => {
      vm.reqStatus = err;
    });
  };

  /**
   * Supprime les dupliqué dans le tableau ciblé
   * @param  {Boolean} constant  Type de plat
   * @param  {Array} compareTo Tableau ciblé à comparer
   * @param  {Object} object    Object à comparer
   */
  function magicDelete(constant, compareTo, object) {
    // Pour chaque plat :
    compareTo.forEach((item, i) => {
      // On vérifie si le nom de l'entree choisie
      // est présente dans les plats
      if (object.name === item.name) {
        // L'item temporaire est stocké
        tmp = item;
        // On a donc matché
        matched = true;
        // Et l'origin est donc l'entrée
        origin = constant;
        // On supprime donc l'entrée choisi des plats (car dupliqué)
        compareTo.splice(i, 1);
      }
    });
    // Hors boucle, on vérifie que le nom choisi est différent du tmp
    // Si on a matché et que l'origin est la même alors :
    if(object.name !== tmp.name && matched && (constant === origin)) {
      // On repush le tmp dans le tableau des plats (car il est dispo)
      compareTo.push(tmp);
      // On ne match plus
      matched = false;
      // L'origin est reset
      origin = null;
      // ainsi que le tmp!
      tmp = {};
    }
  }

  let tmp = {};
  let matched = false;
  let origin;
  vm.checkDuplicates = {
    entree: (entree) => {
      let isEntree = 'entree';
      magicDelete(isEntree, vm.plat, entree);
      magicDelete(isEntree, vm.dessert, entree);
    },
    plat: (plat) => {
      let isPlat = 'plat';
      magicDelete(isPlat, vm.entree, plat);
      magicDelete(isPlat, vm.dessert, plat);
    },
    dessert: (dessert) => {
      let isDessert = 'dessert';
      magicDelete(isDessert, vm.entree, dessert);
      magicDelete(isDessert, vm.plat, dessert);
    }
  };
}];
