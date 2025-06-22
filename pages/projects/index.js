import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ProjectCard from '../../components/ProjectCard';

const db = getFirestore();

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const categories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const snapshot = await getDocs(collection(db, 'photos'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        slug: doc.id,
      }));
      setProjects(data);
    } catch (err) {
      setError('Failed to load gallery. Please try again.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300"></div>
          <div className="p-6 space-y-3">
            <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Main loader component
  const MainLoader = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-emerald-600"></div>
        <div className="w-12 h-12 border-4 border-transparent rounded-full animate-ping absolute top-2 left-2 border-t-emerald-400"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-gray-600 animate-pulse">
        Loading your gallery...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 ">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-purple-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-700">Portfolio Gallery</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-4">
              Creative <span className="text-emerald-600">Collection</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
              Discover a curated selection of visual stories and creative moments
            </p>

            {/* {!loading && projects.length > 0 && (
              <div className="flex items-center justify-center space-x-6 pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        {loading ? (
          <div className="space-y-8">
            <MainLoader />
            <LoadingSkeleton />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-100 to-purple-100 rounded-2xl flex items-center justify-center mb-8 transform rotate-3">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No images yet</h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Your gallery is waiting for its first masterpiece. Start building your collection today.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-purple-600 text-white font-medium rounded-xl hover:from-emerald-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload First Image
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Filter/Sort Bar */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <label htmlFor="category" className="text-sm font-semibold text-gray-700">
                  Filter by:
                </label>
                <div className="relative">
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block appearance-none w-48 bg-white border border-gray-300 text-sm text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2  transition duration-150 ease-in-out"
                  >
                    <option value="all">All Categories</option>
                    {Array.from(new Set(projects.map((p) => p.category).filter(Boolean))).map(
                      (category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      )
                    )}
                  </select>

                  {/* Custom dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  title="List view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  title="Grid view"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Projects Grid/List */}
            <div className={`${viewMode === 'grid'
              ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
              : 'space-y-6'
              }`}>
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`group transform transition-all duration-500 ease-out ${viewMode === 'grid'
                    ? 'hover:scale-[1.02] hover:-translate-y-2'
                    : 'hover:scale-[1.01]'
                    }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: `fadeInUp 0.6s ease-out forwards ${index * 100}ms`,
                    opacity: 0
                  }}
                >
                  {/* <div className={`relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden  transition-all duration-300 ${
                    viewMode === 'list' ? 'flex items-center p-4' : ''
                  }`}> */}
                  {/* <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-purple-50/0 group-hover:from-emerald-50/20 group-hover:to-purple-50/20 transition-all duration-300 z-10 pointer-events-none"></div> */}
                  {viewMode === 'list' ? (
                    <ProjectCard project={project} viewMode={viewMode} />
                  ) : (
                    <ProjectCard project={project} viewMode={viewMode} />
                  )}
                  {/* </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 80px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;