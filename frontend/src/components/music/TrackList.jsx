import { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, SortDesc, Play, Shuffle, Clock } from 'lucide-react';
import { TrackItem } from './TrackItem.jsx';
import { useDummyData } from '../../hooks/useDummyData.js';
import { useAudioPlayer } from '../../hooks/useAudioPlayer.jsx';
import { sortFunctions, formatDuration } from '../../utils/formatters.js';

export const TrackList = ({ 
  tracks: propTracks, 
  title = "All Songs", 
  showHeader = true,
  showSearch = true,
  playlistId = null,
  isPlaylist = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterGenre, setFilterGenre] = useState('all');
  
  const { tracks: allTracks, stats } = useDummyData();
  const { playQueue } = useAudioPlayer();
  
  // Use provided tracks or all tracks
  const baseTracks = propTracks || allTracks;
  
  // Filtered and sorted tracks
  const processedTracks = useMemo(() => {
    let filtered = baseTracks;
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(track => 
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.album.toLowerCase().includes(query) ||
        track.genre.toLowerCase().includes(query)
      );
    }
    
    // Genre filter
    if (filterGenre !== 'all') {
      filtered = filtered.filter(track => 
        track.genre.toLowerCase() === filterGenre.toLowerCase()
      );
    }
    
    // Sort
    const sortFn = sortFunctions[`by${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}`] || sortFunctions.byTitle;
    const sorted = [...filtered].sort(sortFn);
    
    return sortOrder === 'desc' ? sorted.reverse() : sorted;
  }, [baseTracks, searchQuery, sortBy, sortOrder, filterGenre]);
  
  // Get unique genres for filter
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(baseTracks.map(track => track.genre))];
    return uniqueGenres.sort();
  }, [baseTracks]);
  
  // Calculate total duration
  const totalDuration = useMemo(() => {
    return processedTracks.reduce((total, track) => total + (track.duration || 0), 0);
  }, [processedTracks]);
  
  const handleSort = (newSortBy) => {
    if (newSortBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };
  
  const handlePlayAll = () => {
    if (processedTracks.length > 0) {
      playQueue(processedTracks, 0);
    }
  };
  
  const handleShuffle = () => {
    if (processedTracks.length > 0) {
      const shuffled = [...processedTracks].sort(() => Math.random() - 0.5);
      playQueue(shuffled, 0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      {showHeader && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{title}</h1>
              <p className="text-slate-400 mt-1">
                {processedTracks.length} song{processedTracks.length !== 1 ? 's' : ''}
                {totalDuration > 0 && `, ${formatDuration(totalDuration)}`}
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePlayAll}
                disabled={processedTracks.length === 0}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="h-4 w-4" />
                <span>Play all</span>
              </button>
              
              <button
                onClick={handleShuffle}
                disabled={processedTracks.length === 0}
                className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Shuffle className="h-4 w-4" />
                <span>Shuffle</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Search and Filters */}
      {showSearch && (
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks..."
                className="input-primary pl-10 w-full"
              />
            </div>
          </div>
          
          {/* Genre Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="input-primary pl-10 pr-8 appearance-none cursor-pointer"
            >
              <option value="all">All Genres</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          
          {/* Sort Options */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleSort('title')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                sortBy === 'title' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <span>Title</span>
              {sortBy === 'title' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
              )}
            </button>
            
            <button
              onClick={() => handleSort('artist')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                sortBy === 'artist' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <span>Artist</span>
              {sortBy === 'artist' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
              )}
            </button>
            
            <button
              onClick={() => handleSort('duration')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                sortBy === 'duration' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <Clock className="h-3 w-3" />
              {sortBy === 'duration' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>
      )}
      
      {/* Track List Header */}
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-2 text-sm font-medium text-slate-400 border-b border-white/10">
        <div className="w-8">#</div>
        <div>TITLE</div>
        <div className="hidden md:block w-48">ALBUM</div>
        <div className="hidden lg:block w-24">GENRE</div>
        <div className="w-12 text-right">
          <Clock className="h-4 w-4 ml-auto" />
        </div>
      </div>
      
      {/* Track List */}
      <div className="space-y-1">
        {processedTracks.length > 0 ? (
          processedTracks.map((track, index) => (
            <TrackItem
              key={track.id}
              track={track}
              index={index}
              showAlbum={true}
              showDuration={true}
              isPlaylist={isPlaylist}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              {searchQuery ? 'No tracks found matching your search' : 'No tracks available'}
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="btn-ghost"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Summary Footer */}
      {processedTracks.length > 0 && (
        <div className="pt-6 border-t border-white/10">
          <div className="text-sm text-slate-400 text-center">
            Showing {processedTracks.length} of {baseTracks.length} tracks
            {filterGenre !== 'all' && ` in ${filterGenre}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>
      )}
    </div>
  );
};