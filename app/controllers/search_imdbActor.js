(function (){
	
	
	var imdbName=angular.module("imdbSearch");
	imdbName.controller("searchInImdbActor",searchInImdbActor);
	imdbName.controller("moviesSearchInActors",moviesSearchInActors);
	
	
	function searchInImdbActor ($scope,$http,$timeout) {
		
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
			
		this.actorName=actorName;
 var resultsMovie;
 var resultCrew;
			if (id != '') {
				var promise = $http.get(url + 'person/' + id + '/movie_credits?api_key=' + key);
				promise.then(successCallback, errorCallback);

			} 

			function successCallback(response) {
				resultsMovie = response.data.cast;
				resultCrew=response.data.crew;
				if(resultsMovie.length!=0 )
				{
			localStorage["resultsMovie"] = JSON.stringify(resultsMovie);
			}
			if(resultCrew!=0)
			{
			localStorage["resultCrew"] = JSON.stringify(resultCrew);
			}
             localStorage.setItem('actorName', actorName);
           window.open("pages/movieInActor.html");
        
			}

			function errorCallback(response) {
				resultsMovie = "error";
			}
			

			};
			
	
			

			}
				function moviesSearchInActors($scope){
			 $scope.arrayMovies=function(){
			 if((JSON.parse(localStorage["resultsMovie"])).length!=0)
				$scope.resultMovie = JSON.parse(localStorage["resultsMovie"]);
				if((JSON.parse(localStorage["resultCrew"])).length!=0)
				$scope.crew = JSON.parse(localStorage["resultCrew"]);
				$scope.actorName = localStorage.getItem('actorName');
			
			
			};
			
			};

	
})();
