//playlist.state.js
'use strict';

juke.config(function ($stateProvider) {
  $stateProvider.state('playlist', {
    url: '/playlist/new',
    templateUrl: '/js/playlist/templates/playlist.html',
    controller: 'PlaylistCtrl'
    // resolve: {
    //   allArtists: function (ArtistFactory) {
    //     return ArtistFactory.fetchAll();
    //   }
    // }
  });
});


juke.config(function ($stateProvider) {
  $stateProvider.state('singlePlaylist', {
    url: '/playlist/:playlistId',
    templateUrl: '/js/playlist/templates/singlePlaylist.html',
    controller: 'SinglePlaylistCtrl',
    resolve: {
      thePlaylist: function (PlaylistFactory, $stateParams) {
        return PlaylistFactory.findOnePlaylist($stateParams.playlistId);
      }
    }
  });
});