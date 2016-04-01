// playlist.factory.js

'use strict';

juke.factory('PlaylistFactory', function ($http, $q, $log, SongFactory) {
  var cachedPlaylists = [];
  var PlaylistFactory = {};
  var cachedSongs = [];

  PlaylistFactory.create = function(data){
  	return $http.post('/api/playlists', {name: data})
  	.then(function(response){
  		var playlist = response.data;
  		cachedPlaylists.push(playlist);
  		return playlist;
  	});
  };

  PlaylistFactory.find = function(){
  	return $http.get('/api/playlists')
  	.then(function(response){
  		angular.copy(response.data, cachedPlaylists);
  		return cachedPlaylists;
  	})
  }

   PlaylistFactory.findOnePlaylist = function(playlistId){
    var playlist;
    return $http.get('/api/playlists/' + playlistId)
    .then(function(response){
      playlist = response.data;
      var newSongArray = response.data.songs.map(function(song){
        return $http.get('/api/songs/' + song._id)
        .then(function(response){
          return response.data;
        })
      });
      return $q.all(newSongArray);
    })
    .then(function(newSongArray){
      playlist.songs = newSongArray;
      angular.copy(playlist.songs, cachedSongs)
      return playlist;
    })
  }

  PlaylistFactory.addSong = function(playlist, song) {
    console.log('playlist:', playlist);
    console.log('songbefore', song);
    return $http.post('/api/playlists/' + playlist._id + '/songs', {song: song})
    .then(function(response){
      return SongFactory.convert(response.data)
    })
    .then(function(song) {
      cachedSongs.push(song);
      console.log('cachedSongs', cachedSongs);
     return cachedSongs;
    });
  }

  PlaylistFactory.deleteSong = function(playlist, song) {
    cachedSongs.splice(cachedSongs.indexOf(song),1);
    return $http.delete('/api/playlists/' + playlist._id + '/songs/' + song._id);
    // .then(function() {
    //   console.log(cachedSongs);
    //   return cachedSongs;
    // });
  }

  return PlaylistFactory;
});