(function(){

  angular
	   .module('app')
	   .controller('MainController', [
		  'navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state', '$mdToast', '$http',
		  MainController
	   ]);

  function MainController(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast, $http) {
	var vm = this;
	initPhysicians();
	vm.menuItems = [ ];
	vm.selectItem = selectItem;
	vm.toggleItemsList = toggleItemsList;
	vm.showActions = showActions;
	vm.title = $state.current.data.title;
	vm.showSimpleToast = showSimpleToast;
	vm.toggleRightSidebar = toggleRightSidebar;
	vm.toggleRightSidebar = toggleLeftSidebar;

	vm.physicianList = []
	vm.currentPhys = {}
	vm.apptList = []

	vm.selectPhysician = function(phys) {
		vm.currentPhys = phys
		vm.apptList=
		console.log("new physician", phys)
		initAppointments()
	}

	function initPhysicians() {
		console.log("initPhysicians")
		$http({
			method:"GET",
			url:"http://0.0.0.0:5000/getPhysicians"
		}).then(function(response) {
				console.log("response", response)
				vm.physicianList = response["data"]["data"]
				vm.currentPhys = vm.physicianList[0];
				initAppointments()
			});
	}

	function initAppointments(){
		$http({
			method:"GET",
			url:"http://0.0.0.0:5000/getAppointments/"+vm.currentPhys["id"]
		}).then(function(response) {
				console.log("response", response)
				vm.apptList = response["data"]["appointmentList"]
			});
	}

	navService
	  .loadAllItems()
	  .then(function(menuItems) {
		vm.menuItems = [].concat(menuItems);
	  });

	function toggleRightSidebar() {
		$mdSidenav('right').toggle();
	}
	function toggleLeftSidebar() {
		$mdSidenav('left').toggle();
	}

	function toggleItemsList() {
	  var pending = $mdBottomSheet.hide() || $q.when(true);

	  pending.then(function(){
		$mdSidenav('left').toggle();
	  });
	}

	function selectItem (item) {
	  vm.title = item.name;
	  vm.toggleItemsList();
	  vm.showSimpleToast(vm.title);
	}

	function showActions($event) {
		$mdBottomSheet.show({
		  parent: angular.element(document.getElementById('content')),
		  templateUrl: 'app/views/partials/bottomSheet.html',
		  controller: [ '$mdBottomSheet', SheetController],
		  controllerAs: "vm",
		  bindToController : true,
		  targetEvent: $event
		}).then(function(clickedItem) {
		  clickedItem && $log.debug( clickedItem.name + ' clicked!');
		});

		function SheetController( $mdBottomSheet ) {
		  var vm = this;

		  vm.actions = [
			{ name: 'Share', icon: 'share', url: 'https://twitter.com/intent/tweet?text=Angular%20Material%20Dashboard%20https://github.com/flatlogic/angular-material-dashboard%20via%20@flatlogicinc' },
			{ name: 'Star', icon: 'star', url: 'https://github.com/flatlogic/angular-material-dashboard/stargazers' }
		  ];

		  vm.performAction = function(action) {
			$mdBottomSheet.hide(action);
		  };
		}
	}

	function showSimpleToast(title) {
	  $mdToast.show(
		$mdToast.simple()
		  .content(title)
		  .hideDelay(2000)
		  .position('bottom right')
	  );
	}
  }

})();
