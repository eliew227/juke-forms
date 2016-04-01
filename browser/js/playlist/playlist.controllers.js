// playlist.controller.js

juke.controller('PlaylistCtrl', function ($scope, PlaylistFactory, $state) {
	// $scope.showError = function() {
	// 	if ($scope.newPlaylistFormCtrl.$dirty 
	// 		&& $scope.newPlaylistFormCtrl.$invalid 
	// 		&& !$scope.newPlaylistFormCtrl.$submitted) {
	// 			return true;
	// 		}
	// }
	$scope.newPlaylistFormCtrl = {};
	console.log($scope);
	console.log($scope.newPlaylistFormCtrl);

	$scope.create = function(data){
		$scope.newPlaylistFormCtrl.$submitted = true;
		$scope.name = null;
		PlaylistFactory.create(data)
		.then(function(playlist) {
			$state.go('singlePlaylist', {playlistId: playlist._id});
		});
	};
});



juke.controller('SinglePlaylistCtrl', function ($scope, PlaylistFactory, thePlaylist, SongFactory, $state, PlayerFactory) {
	console.log('controller is running');
	$scope.playlist = thePlaylist;
	SongFactory.fetchAll()
	.then(function(songs) {
		$scope.songs = songs;
		// $scope.selected = $scope.songs[0];
	});

	$scope.addSong = function () {
		PlaylistFactory.addSong($scope.playlist, $scope.selected)
		.then(function(songlist){
			$scope.playlist.songs = songlist;
			console.log(songlist);
			$scope.selected = null;
		})
	}

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.deleteSong = function (song) {
	return PlaylistFactory.deleteSong($scope.playlist, song);
  }

});