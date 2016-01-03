(function(){

	recipiesApp.controller('modalController',['$scope','$modal',function ($scope, $modal){
		
		$scope.getAge= function(){
			return $modal.open({
                templateUrl: 'age.dialog.html',
                controller: ModalAgeController,
                backdrop : 'static'                 
            });
		}
	}])

	function ModalAgeController($scope, $modalInstance) {
        $scope.dialog = {
            title: 'Please confirm'
        };
       
        
        $scope.ok = function () {
            $modalInstance.close('success');
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
    ModalAgeController.$inject = ['$scope', '$modalInstance'];
    recipiesApp.controller('ModalAgeController',ModalAgeController);
})()