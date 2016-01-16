(function(){
	
    //page controller
	recipiesApp.controller('modalController',['$scope','$modal','$log',function ($scope, $modal,$log){
		
		$scope.getAge= function(){
			var modalInstance =  $modal.open({
                templateUrl: 'age.dialog.html',
                controller: ModalAgeController,
                backdrop : 'static'                 
            });

            modalInstance.result.then(function (dateOfBirth) {
                $scope.dateOfBirth = dateOfBirth;
            },function(){
                $log.info('Modal dismissed at: ' + new Date());
            });
		}
	}])

	//Modal Dialog controller
	function ModalAgeController($scope, $log,$modalInstance) {
        $scope.dob = {}
        $scope.dialog = {
            title: 'Please confirm'
        };
        $scope.ok = function () {
            var dob = $scope.dob.date + "/" + $scope.dob.month + "/" + $scope.dob.year;
            $log.info(dob);
            $modalInstance.close(new Date($scope.dob.year,$scope.dob.month, $scope.dob.date));
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

    ModalAgeController.$inject = ['$scope', '$log','$modalInstance'];
    recipiesApp.controller('ModalAgeController',ModalAgeController);

    recipiesApp.directive('ngSelectNum', ['$parse', function ($parse) {
         
        var link = function (scope, element, attr, ctrls) {
            var model = $parse(attr.angularModel) ;
            var modelSet = model.assign; 
            element.bind('change', function () {
                scope.$apply(function () {
                    var value = element.val();
                    modelSet && modelSet(scope, value);
                });
            }); 
           
        };
        return {
            restrict: 'A', 
            compile: function (elem, attrs) {
                var innerHtml = "<option value='select'>select</option>";
                for (i = attrs.min; i <= attrs.max; i++) {
                    var item =  i;
                    innerHtml += "<option value='" + item + "'>" + item +"</option>";
                }
                elem.html(innerHtml);

                return link;
            }
           
        };
    }]);
})()