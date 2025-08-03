import React, { useState, useEffect } from 'react';
import { useDummyData } from '../../hooks/useDummyData.js';
import TrackList from '../music/TrackList.tsx';
import { formatDate } from '../../utils/formatters.js';

const PlaylistView = ({ 
  playlistId, 
  currentTrack, 
  isPlaying, 
  onTrackPlay, 
  onAddToPlaylist 
}) => {
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { getPlaylistById, getTracksByIds } = useDummyData();

  useEffect(() => {
    const loadPlaylist = async () => {
      if (!playlistId) return;
      
      setIsLoading(true);
      setError('');

      try {
        const playlistData = await getPlaylistById(parseInt(playlistId));
        if (playlistData) {
          setPlaylist(playlistData);
          if (playlistData.trackIds && playlistData.trackIds.length > 0) {
            const playlistTracks = await getTracksByIds(playlistData.trackIds);
            setTracks(playlistTracks);
          }
        } else {
          setError('Playlist not found');
        }
      } catch (err) {
        setError('Failed to load playlist');
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaylist();
  }, [playlistId, getPlaylistById, getTracksByIds]);

  const handlePlayPlaylist = () => {
    if (tracks.length > 0) {
      onTrackPlay(tracks[0], tracks, 0);
    }
  };

  const handleShufflePlaylist = () => {
    if (tracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      onTrackPlay(tracks[randomIndex], tracks, randomIndex);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-red-300 mb-2">Error</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
        <h3 className="text-lg font-medium text-gray-300 mb-2">Playlist not found</h3>
        <p className="text-gray-500">The playlist you're looking for doesn't exist</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Playlist Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
          {/* Playlist Cover */}
          <img
            src={playlist.coverArt}
            alt={playlist.name}
            className="w-48 h-48 rounded-xl shadow-2xl"
          />

          {/* Playlist Info */}
          <div className="flex-1">
            <p className="text-purple-200 text-sm font-medium mb-2">PLAYLIST</p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {playlist.name}
            </h1>
            {playlist.description && (
              <p className="text-purple-100 text-lg mb-4">
                {playlist.description}
              </p>
            )}
            <div className="flex items-center space-x-4 text-purple-200">
              <span>{tracks.length} songs</span>
              <span>•</span>
              <span>Created {formatDate(playlist.createdAt)}</span>
              <span>•</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                playlist.isPublic ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
              }`}>
                {playlist.isPublic ? 'Public' : 'Private'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 mt-8">
          <button
            onClick={handlePlayPlaylist}
            disabled={tracks.length === 0}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors flex items-center space-x-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>Play</span>
          </button>

          <button
            onClick={handleShufflePlaylist}
            disabled={tracks.length === 0}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0l2 2m8-2l-2 2m-8 14V6m0 12l2-2m-2 2l-2-2m10-12v12m0-12l-2 2m2-2l2 2" />
            </svg>
            <span>Shuffle</span>
          </button>

          <button className="text-white hover:text-purple-200 p-3 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <button className="text-white hover:text-purple-200 p-3 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Track List */}
      <div className="bg-gray-900 rounded-xl p-6">
        {tracks.length > 0 ? (
          <TrackList
            tracks={tracks}
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTrackPlay={onTrackPlay}
            onAddToPlaylist={onAddToPlaylist}
            showHeader={false}
            showIndex={true}
          />
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <h3 className="text-lg font-medium text-gray-300 mb-2">No songs in this playlist</h3>
            <p className="text-gray-500">Add some songs to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistView;