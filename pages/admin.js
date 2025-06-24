import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getFirestore } from 'firebase/firestore';
import { auth } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const db = getFirestore();

export default function Admin() {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [lens, setLens] = useState('');
  const [customLens, setCustomLens] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [photos, setPhotos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterLens, setFilterLens] = useState('All');

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableLenses, setAvailableLenses] = useState([]);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  // Helper function to format date for input
  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Set default date when component mounts
  useEffect(() => {
    if (!uploadDate && !editingId) {
      setUploadDate(formatDateForInput(new Date()));
    }
  }, [editingId]);

  const login = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch {
      setError('Invalid email or password');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setImageFile(acceptedFiles[0]);
    },
  });

  const fetchPhotos = async () => {
    try {
      let q = collection(db, 'photos');
      
      // Apply filters properly - both category and lens if needed
      const conditions = [];
      if (filterCategory !== 'All') {
        conditions.push(where('category', '==', filterCategory));
      }
      if (filterLens !== 'All') {
        conditions.push(where('lens', '==', filterLens));
      }
      
      if (conditions.length > 0) {
        q = query(collection(db, 'photos'), ...conditions);
      }
      
      const snapshot = await getDocs(q);
      const fetchedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      setPhotos(fetchedData);

      // Extract unique categories and lenses safely
      const uniqueCategories = [...new Set(fetchedData.map((photo) => photo.category).filter(Boolean))];
      const uniqueLenses = [...new Set(fetchedData.map((photo) => photo.lens).filter(Boolean))];
      
      setAvailableCategories(uniqueCategories);
      setAvailableLenses(uniqueLenses);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    if (user) fetchPhotos();
  }, [user, filterCategory, filterLens]);

  const handleUploadOrUpdate = async (e) => {
    e.preventDefault();
    if (!caption || !category || !lens || !uploadDate) return;

    setUploading(true);
    let imageUrl = null;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'smartshoot_upload');

      try {
        const res = await fetch('https://api.cloudinary.com/v1_1/dx3q4bbgq/image/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        imageUrl = data.secure_url;
      } catch (error) {
        console.error('Error uploading image:', error);
        setUploading(false);
        return;
      }
    }

    try {
      const photoData = {
        caption,
        description,
        category: category === 'other' ? customCategory : category,
        lens: lens === 'other' ? customLens : lens,
        uploadedAt: new Date(uploadDate),
        ...(imageUrl && { imageUrl }),
      };

      if (editingId) {
        const ref = doc(db, 'photos', editingId);
        await updateDoc(ref, photoData);
      } else {
        await addDoc(collection(db, 'photos'), photoData);
      }

      // Reset form
      setCaption('');
      setDescription('');
      setCategory('');
      setCustomCategory('');
      setLens('');
      setCustomLens('');
      setUploadDate(formatDateForInput(new Date())); // Reset to current date
      setImageFile(null);
      setEditingId(null);
      
      await fetchPhotos();
    } catch (error) {
      console.error('Error saving photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id) => {
    setConfirmModal({
      open: true,
      title: 'Delete Photo?',
      message: 'Are you sure you want to permanently delete this photo?',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'photos', id));
          setConfirmModal({ ...confirmModal, open: false });
          await fetchPhotos();
        } catch (error) {
          console.error('Error deleting photo:', error);
        }
      },
    });
  };

  const handleEdit = (photo) => {
    setCaption(photo.caption || '');
    setDescription(photo.description || '');
    setCategory(photo.category || '');
    setLens(photo.lens || '');
    setUploadDate(formatDateForInput(photo.uploadedAt?.toDate ? photo.uploadedAt.toDate() : photo.uploadedAt));
    setEditingId(photo.id);
    setImageFile(null); // Clear any selected file
  };

  const cancelEdit = () => {
    setCaption('');
    setDescription('');
    setCategory('');
    setCustomCategory('');
    setLens('');
    setCustomLens('');
    setUploadDate(formatDateForInput(new Date()));
    setImageFile(null);
    setEditingId(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
          <h1 className="text-xl font-bold mb-4">Admin Login</h1>
          <form onSubmit={login} className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full px-4 py-2 border rounded" 
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-2 border rounded" 
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
              required 
            />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Admin Dashboard</h1>
        <button
          onClick={() =>
            setConfirmModal({
              open: true,
              title: 'Logout Confirmation',
              message: 'Are you sure you want to logout?',
              onConfirm: () => {
                logout();
                setConfirmModal({ ...confirmModal, open: false });
              },
            })
          }
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUploadOrUpdate} className="bg-white p-6 rounded shadow-md max-w-lg w-full mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{editingId ? 'Update Photo' : 'Upload New Photo'}</h2>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer mb-4 transition ${
            isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
          }`}
        >
          <input {...getInputProps()} />
          {imageFile ? (
            <p className="text-sm text-green-600">{imageFile.name}</p>
          ) : isDragActive ? (
            <p className="text-sm text-blue-500">Drop the image here...</p>
          ) : (
            <p className="text-sm text-gray-500">
              {editingId ? 'Drag & drop to replace image, or click to select' : 'Drag & drop an image here, or click to select'}
            </p>
          )}
        </div>
        
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="w-full max-h-64 object-contain mb-4 rounded border"
          />
        )}

        <input 
          type="text" 
          placeholder="Caption" 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          className="w-full mb-4 px-4 py-2 border rounded" 
          required 
        />
        
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded h-20 resize-none"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
          <option value="other">Other</option>
        </select>

        {category === 'other' && (
          <input
            type="text"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
        )}

        <select
          value={lens}
          onChange={(e) => setLens(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
          required
        >
          <option value="">Select Lens</option>
          {availableLenses.map((lensOption) => (
            <option key={lensOption} value={lensOption}>
              {lensOption.charAt(0).toUpperCase() + lensOption.slice(1)}
            </option>
          ))}
          <option value="other">Other</option>
        </select>

        {lens === 'other' && (
          <input
            type="text"
            placeholder="Enter custom lens"
            value={customLens}
            onChange={(e) => setCustomLens(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Date & Time
          </label>
          <input
            type="datetime-local"
            value={uploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Set when this photo was taken or should be displayed as uploaded
          </p>
        </div>

        <button 
          type="submit" 
          disabled={uploading} 
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : editingId ? 'Update' : 'Upload'}
        </button>
      </form>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category:</label>
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)} 
            className="w-full px-4 py-2 border rounded"
          >
            <option value="All">All Categories</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div className="max-w-sm">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Lens:</label>
          <select 
            value={filterLens} 
            onChange={(e) => setFilterLens(e.target.value)} 
            className="w-full px-4 py-2 border rounded"
          >
            <option value="All">All Lenses</option>
            {availableLenses.map((lensOption) => (
              <option key={lensOption} value={lensOption}>
                {lensOption.charAt(0).toUpperCase() + lensOption.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Confirm Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{confirmModal.title}</h2>
            <p className="text-sm text-gray-600 mb-6">{confirmModal.message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: () => {} })}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmModal.onConfirm}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white rounded shadow overflow-hidden">
            <img src={photo.imageUrl} alt={photo.caption} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-xs uppercase text-blue-500 font-semibold">{photo.category}</p>
              <p className="text-xs text-gray-400 mb-1">{photo.lens}</p>
              <p className="text-sm text-gray-700 mb-2">{photo.caption}</p>
              <p className="text-xs text-gray-600 mb-2">{photo.description}</p>
              {photo.uploadedAt && (
                <p className="text-xs text-gray-500 mb-3">
                  {new Date(photo.uploadedAt.toDate ? photo.uploadedAt.toDate() : photo.uploadedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(photo)} 
                  className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(photo.id)} 
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {photos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No photos found. Upload your first photo above!</p>
        </div>
      )}
    </div>
  );
}