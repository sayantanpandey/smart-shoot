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
  const [photos, setPhotos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  const [availableCategories, setAvailableCategories] = useState([]);
const [confirmModal, setConfirmModal] = useState({
  open: false,
  title: '',
  message: '',
  onConfirm: () => {},
});



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
    if (filterCategory !== 'All') {
      q = query(collection(db, 'photos'), where('category', '==', filterCategory));
    }
    const snapshot = await getDocs(q);
    const fetchedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setPhotos(fetchedData);

    // 👇 Extract unique categories safely
    const uniqueCategories = [...new Set(fetchedData.map((photo) => photo.category))];
    setAvailableCategories(uniqueCategories);
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

  useEffect(() => {
    if (user) fetchPhotos();
  }, [user, filterCategory]);

  const handleUploadOrUpdate = async (e) => {
    e.preventDefault();
    if (!caption || !category) return;

    setUploading(true);
    let imageUrl = null;

    if (imageFile) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'smartshoot_upload');

      const res = await fetch('https://api.cloudinary.com/v1_1/dx3q4bbgq/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      imageUrl = data.secure_url;
    }

    if (editingId) {
      const ref = doc(db, 'photos', editingId);
      await updateDoc(ref, {
        caption,
        description,
        category: category === 'other' ? customCategory : category,
        ...(imageUrl && { imageUrl }),
      });
    } else {
      await addDoc(collection(db, 'photos'), {
        caption,
        description,
        category: category === 'other' ? customCategory : category,
        imageUrl,
        uploadedAt: new Date(),
      });
    }

    setCaption('');
    setDescription('');
    setCategory('');
    setImageFile(null);
    setEditingId(null);
    await fetchPhotos();
    setUploading(false);
  };


  const handleDelete = (id) => {
  setConfirmModal({
    open: true,
    title: 'Delete Photo?',
    message: 'Are you sure you want to permanently delete this photo?',
    onConfirm: async () => {
      await deleteDoc(doc(db, 'photos', id));
      setConfirmModal({ ...confirmModal, open: false });
      await fetchPhotos();
    },
  });
};

  const handleEdit = (photo) => {
    setCaption(photo.caption);
    setDescription(photo.description);
    setCategory(photo.category);
    setEditingId(photo.id);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
          <h1 className="text-xl font-bold mb-4">Admin Login</h1>
          <form onSubmit={login} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
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
        <h2 className="text-xl font-semibold mb-4">{editingId ? 'Update Photo' : 'Upload New Photo'}</h2>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer mb-4 transition ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
            }`}
        >
          <input {...getInputProps()} />
          {imageFile ? (
            <p className="text-sm text-green-600">{imageFile.name}</p>
          ) : isDragActive ? (
            <p className="text-sm text-blue-500">Drop the image here...</p>
          ) : (
            <p className="text-sm text-gray-500">Drag & drop an image here, or click to select</p>
          )}
        </div>
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="w-full max-h-64 object-contain mb-4 rounded border"
          />
        )}

        <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded" required />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
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
        <button type="submit" disabled={uploading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
          {uploading ? 'Uploading...' : editingId ? 'Update' : 'Upload'}
        </button>
      </form>

      {/* Filter by Category */}
      <div className="mb-6 max-w-sm">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Category:</label>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full px-4 py-2 border rounded">
          <option value="All">All</option>
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

{/* Confirm Modal */}
{confirmModal.open && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">{confirmModal.title}</h2>
      <p className="text-sm text-gray-600 mb-6">{confirmModal.message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setConfirmModal({ open: false })}
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
              <p className="text-sm text-gray-700 mb-2">{photo.caption}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(photo)} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                <button onClick={() => handleDelete(photo.id)} className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
