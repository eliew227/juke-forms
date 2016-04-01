'use strict';

juke.controller('SidebarCtrl', function ($scope, PlaylistFactory) {

  // nothing to see here for now… state transitions happening with ui-sref!
  PlaylistFactory.find()
  .then(function(arrayOfPlaylists){
  	$scope.playlists = arrayOfPlaylists;
  })

});
