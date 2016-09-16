(function (){
	
	
	var imdb=angular.module("imdbSearch");
	imdb.controller("searchInImdb",searchInImdb);
	
	
	function searchInImdb ($scope,$http,$timeout) {
		
		    $scope.nameSearch='';
			var url='http://api.themoviedb.org/3/';
			var key='deb34c3f1638b952829276ae8e1c5414';
			$scope.picUrl="http://image.tmdb.org/t/p/w500";
			
			$scope.getActors=function ()
			{	
			if ($scope.nameSearch != '') {
				var promise = $http.get(url+'search/person?api_key='+key+'&query='+ $scope.nameSearch);
				promise.then(successCallback, errorCallback);
			}
			else
			{

					$scope.results=[{name:"no results!"}];


			}	
			
				function successCallback(response) {
				$scope.results = response.data.results;
				
			}
			function errorCallback(response) {
				$scope.results="error";
			}


			};
		
		$scope.movieOfActor=function(id,actorName)
		{
			
			$scope.actorName=actorName;
		
			if (id != '') {
				var promise = $http.get(url + 'person/' + id + '/movie_credits?api_key=' + key);
				promise.then(successCallback, errorCallback);

			} 

			function successCallback(response) {
				$scope.resultsMovie = response.data.cast;
           window.localStorage.setItem("cast",JSON.stringify(response.data.cast));
           
			}

			function errorCallback(response) {
				 $scope.resultsMovie = "error";
			}

			};

			}

	
})();
