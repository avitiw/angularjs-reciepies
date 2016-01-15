(function(){
	
    //page controller
	recipiesApp.controller('parentController',['$scope','$modal','$log','$rootScope',function ($scope, $modal,$log,$rootScope){
		
		$scope.items = [{"id": "1","name":"Ajay Devan","Hit":"Singham"},
        {"id": "2","Name":"Akshay Kumar","Hit": "Khiladi"},
        {"id": "3","Name": "Amitabh Bacchan","Hit":"Sholay"}]
        
        var mode = $scope.mode = "list"
		
        $scope.toggle= function(state){
        	$log.info("mode set to " + state)
			$scope.mode = state;
			$rootScope.$broadcast("mode",state);			
		}
	}]);

	recipiesApp.controller('gridController',['$scope','$modal','$log',function ($scope, $modal,$log){
		$scope.visible = false

		$scope.$on("mode",function(e,mode){
			 
			$scope.visible = (mode === 'grid');
		});
		 
	}]);
	recipiesApp.controller('listController',['$scope','$modal','$log',function ($scope, $modal,$log){
		$scope.visible = true
		 
		 $scope.$on("mode",function(e,mode){
		 	$log.info("list controller mode set to " + mode)
		 	$scope.visible = (mode === 'list');
		});
	}]);


})()