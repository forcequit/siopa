var app = angular.module("shop", ["firebase"]);
var shop = "https://x.firebaseio.com/" + "null";

var u = getParameterByName('u');
var p = getParameterByName('p');
if(u == "" ) {
	location.href="//siopa.io";
}
var date = new Date();

var ref = new Firebase(shop);

app.controller("shopController", ["$scope", "$firebaseArray",
	function($scope, $firebaseArray) {		
	
		$scope.items = $firebaseArray(ref);

		document.getElementById("title").innerHTML = "Siopa - " + getParameterByName('u');
		document.getElementById("title2").innerHTML = "<title>Siopa - " + getParameterByName('u') + "</title>";
		
		$scope.addItem = function() {
    			if ($scope.newItem.name !== "") {
						
				$scope.items.$add({
					name: $scope.newItem.name,
					bought: false,
					flagged:false,
					createdAt:date,
					url: $scope.newItem.url
				});
				
				console.log($scope.newItem.url);
				$scope.newItem.name = "";
			}
		};
			$scope.boughtItem = function(item) {
			item.bought = true;
			$scope.items.$save(item);
			$scope.items = $firebaseArray(ref);
		};

			$scope.rebuy = function(item) {
			item.bought = false;
			$scope.items.$save(item);
			$scope.items = $firebaseArray(ref);
		};

			$scope.trash = function(item) {
			$scope.items.$remove(item);
			$scope.items = $firebaseArray(ref);
		};
		
	
		
}]);	

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


