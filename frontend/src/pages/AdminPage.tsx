import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import type { Song, Album, SongInput, AlbumInput } from '../types';
import { 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MusicalNoteIcon,
  PhotoIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'songs' | 'albums'>('songs');
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'song' | 'album'>('song');
  const [editingItem, setEditingItem] = useState<Song | Album | null>(null);

  // Form states
  const [songForm, setSongForm] = useState<SongInput>({
    title: '',
    artist: '',
    album_id: 0,
    duration: 0,
    genre: '',
    file_url: ''
  });

  const [albumForm, setAlbumForm] = useState<AlbumInput>({
    title: '',
    artist: '',
    release_date: '',
    genre: '',
    cover_image: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [songsData, albumsData] = await Promise.all([
        apiService.getAllSongs().catch(() => []),
        apiService.getAllAlbums().catch(() => [])
      ]);
      setSongs(songsData);
      setAlbums(albumsData);
    } catch {
      setError('Failed to load data. Using demo data.');
      // Demo data
      setSongs([
        {
          song_id: 1,
          title: "Bohemian Rhapsody",
          artist: "Queen",
          album_id: 1,
          duration: 355,
          genre: "Rock"
        }
      ]);
      setAlbums([
        {
          album_id: 1,
          title: "A Night at the Opera",
          artist: "Queen",
          release_date: "1975-11-21",
          genre: "Rock"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const openModal = (type: 'song' | 'album', item?: Song | Album) => {
    clearMessages();
    setModalType(type);
    setEditingItem(item || null);
    
    if (item) {
      if (type === 'song') {
        const song = item as Song;
        setSongForm({
          title: song.title,
          artist: song.artist,
          album_id: song.album_id,
          duration: song.duration,
          genre: song.genre || '',
          file_url: song.file_url || ''
        });
      } else {
        const album = item as Album;
        setAlbumForm({
          title: album.title,
          artist: album.artist,
          release_date: album.release_date,
          genre: album.genre || '',
          cover_image: album.cover_image || ''
        });
      }
    } else {
      setSongForm({
        title: '',
        artist: '',
        album_id: albums.length > 0 ? albums[0].album_id : 0,
        duration: 0,
        genre: '',
        file_url: ''
      });
      setAlbumForm({
        title: '',
        artist: '',
        release_date: '',
        genre: '',
        cover_image: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    clearMessages();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    
    try {
      setLoading(true);
      
      if (modalType === 'song') {
        if (editingItem) {
          await apiService.updateSong((editingItem as Song).song_id, songForm);
          setSuccess('Song updated successfully');
        } else {
          await apiService.createSong(songForm);
          setSuccess('Song created successfully');
        }
      } else {
        if (editingItem) {
          await apiService.updateAlbum((editingItem as Album).album_id, albumForm);
          setSuccess('Album updated successfully');
        } else {
          await apiService.createAlbum(albumForm);
          setSuccess('Album created successfully');
        }
      }
      
      closeModal();
      loadData();
    } catch {
      setError('Operation failed. Demo mode - changes not persisted.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type: 'song' | 'album', id: number) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    clearMessages();
    try {
      setLoading(true);
      
      if (type === 'song') {
        await apiService.deleteSong(id);
        setSongs(songs.filter(s => s.song_id !== id));
        setSuccess('Song deleted successfully');
      } else {
        await apiService.deleteAlbum(id);
        setAlbums(albums.filter(a => a.album_id !== id));
        setSuccess('Album deleted successfully');
      }
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Delete failed. Demo mode - changes not persisted.');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Redirect if not admin
  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
              {success}
            </div>
          )}

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
            <button
              onClick={() => setActiveTab('songs')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'songs'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Manage Songs ({songs.length})
            </button>
            <button
              onClick={() => setActiveTab('albums')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'albums'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Manage Albums ({albums.length})
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={() => openModal(activeTab === 'songs' ? 'song' : 'album')}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add {activeTab === 'songs' ? 'Song' : 'Album'}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'songs' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {songs.map((song) => (
                <li key={song.song_id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MusicalNoteIcon className="h-8 w-8 text-gray-400 mr-4" />
                      <div>
                        <p className="text-lg font-medium text-gray-900">{song.title}</p>
                        <p className="text-gray-600">{song.artist}</p>
                        <p className="text-sm text-gray-500">
                          Duration: {formatDuration(song.duration)} • Genre: {song.genre || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('song', song)}
                        className="p-2 text-blue-600 hover:text-blue-900"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete('song', song.song_id)}
                        className="p-2 text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {songs.length === 0 && (
                <li className="px-6 py-12 text-center text-gray-500">
                  No songs found. Add your first song!
                </li>
              )}
            </ul>
          </div>
        )}

        {activeTab === 'albums' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <div key={album.album_id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
                <div className="text-center mb-4">
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    {album.cover_image ? (
                      <img 
                        src={album.cover_image} 
                        alt={album.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <PhotoIcon className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{album.title}</h3>
                  <p className="text-gray-600 text-sm mb-1">{album.artist}</p>
                  <p className="text-gray-500 text-xs">{album.release_date}</p>
                </div>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => openModal('album', album)}
                    className="p-2 text-blue-600 hover:text-blue-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete('album', album.album_id)}
                    className="p-2 text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            {albums.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                No albums found. Add your first album!
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold mb-4">
                {editingItem ? 'Edit' : 'Add'} {modalType === 'song' ? 'Song' : 'Album'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {modalType === 'song' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={songForm.title}
                        onChange={(e) => setSongForm({...songForm, title: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Artist</label>
                      <input
                        type="text"
                        value={songForm.artist}
                        onChange={(e) => setSongForm({...songForm, artist: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Album</label>
                      <select
                        value={songForm.album_id}
                        onChange={(e) => setSongForm({...songForm, album_id: parseInt(e.target.value)})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select Album</option>
                        {albums.map(album => (
                          <option key={album.album_id} value={album.album_id}>
                            {album.title} - {album.artist}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration (seconds)</label>
                      <input
                        type="number"
                        value={songForm.duration}
                        onChange={(e) => setSongForm({...songForm, duration: parseInt(e.target.value)})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Genre</label>
                      <input
                        type="text"
                        value={songForm.genre}
                        onChange={(e) => setSongForm({...songForm, genre: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={albumForm.title}
                        onChange={(e) => setAlbumForm({...albumForm, title: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Artist</label>
                      <input
                        type="text"
                        value={albumForm.artist}
                        onChange={(e) => setAlbumForm({...albumForm, artist: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Release Date</label>
                      <input
                        type="date"
                        value={albumForm.release_date}
                        onChange={(e) => setAlbumForm({...albumForm, release_date: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Genre</label>
                      <input
                        type="text"
                        value={albumForm.genre}
                        onChange={(e) => setAlbumForm({...albumForm, genre: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </>
                )}
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editingItem ? 'Update' : 'Create')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}