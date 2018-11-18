(function(){

  angular
	   .module('app')
	   .controller('MainController', [
		  'navService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$state', '$mdToast',
		  MainController
	   ]);

  function MainController(navService, $mdSidenav, $mdBottomSheet, $log, $q, $state, $mdToast) {
	var vm = this;

	vm.menuItems = [ ];
	vm.selectItem = selectItem;
	vm.toggleItemsList = toggleItemsList;
	vm.showActions = showActions;
	vm.title = $state.current.data.title;
	vm.showSimpleToast = showSimpleToast;
	vm.toggleRightSidebar = toggleRightSidebar;
	vm.toggleRightSidebar = toggleLeftSidebar;

	vm.physicianList = [
	  {
			id: 100,
			contactInfo: {
				firstName: "Julius",
				lastName: "Hibbert",
				email: "hibbert@notablehealth.com"
			}
	  },
	  {
			id: 101,
			contactInfo: {
				firstName: "Algernop",
			lastName: "Krieger",
			email: "krieger@notablehealth.com"
			}
	  },
	  {
			id: 102,
			contactInfo: {
				firstName: "Nick",
				lastName: "Riviera",
				email: "riveiera@notablehealth.com"
			}
	  }
	]

	vm.currentPhys = vm.physicianList[0]

	vm.apptList = [
		{
			id:1,
			type: "New Patient",
			time: "8:00AM",
			name: "Sterling Archer"
		},
		{
			id:2,
			type: "Follow Up",
			time: "8:30AM",
			name: "Cyril Figis"
		},
		{
			id:3,
			type: "Follow Up",
			time: "9:00AM",
			name: "Ray Gilette"
		},
		{
			id:4,
			type: "New Patient",
			time: "9:30AM",
			name: "Lana Kane"
		},
		{
			id:5,
			type: "New Patient",
			time: "10:00AM",
			name: "Pam Poovey"
		}
	]

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
