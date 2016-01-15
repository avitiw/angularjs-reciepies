(function(){
	
    //page controller
	recipiesApp.controller('parentController',['$scope','$modal','$log',function ($scope, $modal,$log){
		
		$scope.items = [{"id": "1","name":"Ajay Devan","Hit":"Singham"},
        {"id": "2","Name":"Akshay Kumar","Hit": "Khiladi"},
        {"id": "3","Name": "Amitabh Bacchan","Hit":"Sholay"}]
        var mode = $scope.mode = "list"
		
        $scope.toggle= function(state){
			mode = state;
		}
	}])

	
})()