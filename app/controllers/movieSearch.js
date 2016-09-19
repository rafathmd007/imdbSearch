(function() {

	var movie = angular.module("imdbSearch");
	

	movie.controller("searchInImdbMovie", searchInImdbMovie);
	

	function searchInImdbMovie($scope, $http, $timeout) {

		$scope.movieSearch = '';
		var url = 'http://api.themoviedb.org/3/';
		var key = 'deb34c3f1638b952829276ae8e1c5414';
		$scope.movieLoaded=false;
		$scope.picUrl="http://image.tmdb.org/t/p/w500";
		
		$scope.getMovie=function (){
				if ($scope.movieSearch != '') {
				var promise = $http.get(url+'search/movie?api_key='+key+'&query='+$scope.movieSearch);
				promise.then(successCallback, errorCallback);
		}
			else
			{

					$scope.resultsMovie=[{title:"no results!"}];
						$scope.movieLoaded=false;


			}	
			
				function successCallback(response) {
				$scope.resultsMovie = response.data.results;
				
			}
			function errorCallback(response) {
				$scope.resultsMovie="error";
			}
			
			
		};
		
		$scope.actorOfMovie=function(id){
			$scope.movieLoaded=true;
			if(id!='')
			{
					var promise = $http.get(url+'movie/'+id+'/credits?api_key='+ key);
				promise.then(successCallback2, errorCallback2);
				
			}
			else
			{

					$scope.actorResult=[{name:"no results!"}];
				


			}	
			
				function successCallback2(response) {
				$scope.actorResult = response.data.cast;
				
			}
			function errorCallback2(response) {
				$scope.actorResult="error";
			}
			
			
			
		};
	}

})();
