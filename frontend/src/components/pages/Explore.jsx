import { useState, useMemo } from 'react';
import { Play, Heart, MoreHorizontal, Search, Filter } from 'lucide-react';
import { useDummyData } from '../../hooks/useDummyData.js';
import { formatDuration } from '../../utils/formatters.js';

export const Explore = () => {
  const { tracks, loading } = useDummyData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [filterGenre, setFilterGenre] = useState('all');

  // Get unique genres for filter
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(tracks.map(track => track.genre))];
    return ['all', ...uniqueGenres];
  }, [tracks]);

  // Filter and sort tracks
  const filteredTracks = useMemo(() => {
    let filtered = tracks.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           track.album.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = filterGenre === 'all' || track.genre === filterGenre;
      return matchesSearch && matchesGenre;
    });

    // Sort tracks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'duration':
          return a.duration - b.duration;
        case 'release_date':
          return new Date(b.release_date) - new Date(a.release_date);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tracks, searchTerm, sortBy, filterGenre]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-300">Loading tracks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Explore Music
          </h1>
          <p className="text-dark-300">
            Discover and browse through our music library ({filteredTracks.length} tracks)
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search songs, artists, albums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:border-primary-500 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
            >
              <option value="title">Sort by Title</option>
              <option value="artist">Sort by Artist</option>
              <option value="duration">Sort by Duration</option>
              <option value="release_date">Sort by Release Date</option>
            </select>

            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="px-4 py-2 bg-dark-800 border border-dark-600 rounded-lg text-white focus:border-primary-500 focus:outline-none"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tracks List */}
        <div className="card p-0 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-dark-700 grid grid-cols-12 gap-4 text-dark-400 text-sm font-medium">
            <div className="col-span-1">#</div>
            <div className="col-span-5">TITLE</div>
            <div className="col-span-3">ALBUM</div>
            <div className="col-span-2">GENRE</div>
            <div className="col-span-1 text-right">⏱</div>
          </div>

          {/* Tracks */}
          <div className="max-h-96 overflow-y-auto">
            {filteredTracks.map((track, index) => (
              <div
                key={track.id}
                className="px-6 py-3 hover:bg-white/5 transition-colors group grid grid-cols-12 gap-4 items-center"
              >
                {/* Track Number */}
                <div className="col-span-1 text-dark-400 text-sm">
                  <span className="group-hover:hidden">{index + 1}</span>
                  <Play className="h-4 w-4 hidden group-hover:block text-white cursor-pointer" />
                </div>

                {/* Title and Artist */}
                <div className="col-span-5 flex items-center gap-3">
                  <img
                    src={track.cover_image_url}
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-white font-medium truncate">{track.title}</h3>
                    <p className="text-dark-400 text-sm truncate">{track.artist}</p>
                  </div>
                </div>

                {/* Album */}
                <div className="col-span-3">
                  <p className="text-dark-300 text-sm truncate">{track.album}</p>
                </div>

                {/* Genre */}
                <div className="col-span-2">
                  <span className="px-2 py-1 bg-primary-900/30 text-primary-300 text-xs rounded-full">
                    {track.genre}
                  </span>
                </div>

                {/* Duration and Actions */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button className="p-1 hover:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="h-4 w-4 text-dark-400 hover:text-red-400" />
                  </button>
                  <span className="text-dark-400 text-sm w-12 text-right">
                    {formatDuration(track.duration)}
                  </span>
                  <button className="p-1 hover:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4 text-dark-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTracks.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Filter className="h-12 w-12 text-dark-600 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">No tracks found</h3>
              <p className="text-dark-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Stats */}
        {filteredTracks.length > 0 && (
          <div className="mt-6 flex justify-between items-center text-sm text-dark-400">
            <span>Showing {filteredTracks.length} of {tracks.length} tracks</span>
            <span>
              Total duration: {formatDuration(filteredTracks.reduce((acc, track) => acc + track.duration, 0))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};