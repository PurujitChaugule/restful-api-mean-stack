var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function(){
$http.get('/submit').then( function(response) {
	console.log("I GOT THE DATA I REQUESTED.");
	 var data = response.data;
    var status = response.status;
    var statusText = response.statusText;
    var headers = response.headers;
    var config = response.config;

	$scope.submit = data;
	console.log(data);
	//$scope.contact="";
});
};

refresh();

$scope.addData = function() {
	console.log($scope.contact);
	$http.post('/submit',$scope.contact).then( function(response) {
		var data = response.data;
    var status = response.status;
    var statusText = response.statusText;
    var headers = response.headers;
    var config = response.config;

    $scope.submit = data;
	console.log(data);
	refresh();
	});
};
 
$scope.remove = function(id) {
	console.log(id);
	$http.delete('/submit/' + id).then( function(response) {
		refresh();
	})
};

$scope.edit = function(id){
	console.log(id);
	$http.get('/submit/' + id).then(function(response) {
		var data = response.data;
    var status = response.status;
    var statusText = response.statusText;
    var headers = response.headers;
    var config = response.config;

    $scope.contact = data;
    console.log(data);
	});
};

$scope.update = function(){
	console.log($scope.contact._id);
	$http.put('/submit/' + $scope.contact._id, $scope.contact).then(function(response) {
		refresh();
	})
};

$scope.deselect = function() {
	$scope.contact= "";
};

}]);