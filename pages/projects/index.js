import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ProjectCard from '../../components/ProjectCard';

const db = getFirestore();

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLens, setSelectedLens] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique categories and lenses
  const categories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
  const lenses = Array.from(new Set(projects.map(p => p.lens).filter(Boolean)));

  // Filter projects based on both category and lens
  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
    const lensMatch = selectedLens === 'all' || project.lens === selectedLens;
    return categoryMatch && lensMatch;
  });

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
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedLens]);
  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
        >
          <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300"></div>
          <div className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3">
            <div className="h-4 sm:h-5 bg-gray-200 rounded-lg w-3/4"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded-lg w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Main loader component
  const MainLoader = () => (
    <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
      <div className="relative">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-200 rounded-full animate-spin border-t-emerald-600"></div>
        <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-transparent rounded-full animate-ping absolute top-2 left-2 border-t-emerald-400"></div>
      </div>
      <p className="mt-4 sm:mt-6 text-base sm:text-lg font-medium text-gray-600 animate-pulse">
        Loading your gallery...
      </p>
    </div>
  );

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedLens('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-purple-50/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-2 lg:py-4">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-xs sm:text-sm font-medium text-emerald-700">Portfolio Gallery</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-2 sm:mb-4">
              Creative <span className="text-emerald-600">Collection</span>
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-light px-4">
              Discover a curated selection of visual stories and creative moments
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12 lg:py-16">
        {loading ? (
          <div className="space-y-6 sm:space-y-8">
            <MainLoader />
            <LoadingSkeleton />
          </div>
        ) : error ? (
          <div className="text-center py-12 sm:py-20">
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 px-4">{error}</p>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white font-medium rounded-lg sm:rounded-xl hover:bg-emerald-700 transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
            <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-100 to-purple-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8 transform rotate-3">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">No images yet</h3>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Your gallery is waiting for its first masterpiece. Start building your collection today.
            </p>
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-purple-600 text-white font-medium rounded-lg sm:rounded-xl hover:from-emerald-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload First Image
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Mobile Filter Toggle */}
            <div className="block sm:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-semibold text-gray-700">Filters</span>
                  {(selectedCategory !== 'all' || selectedLens !== 'all') && (
                    <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Filter/Sort Bar */}
            <div className={`${showFilters ? 'block' : 'hidden'} sm:block`}>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-4 shadow-sm border border-gray-100">
                {/* Desktop Layout */}
                <div className="hidden sm:flex items-center justify-between">
                  <div className="flex items-center space-x-4 lg:space-x-6">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-gray-700">Filter by:</span>

                    {/* Category Filter */}
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="block appearance-none w-40 lg:w-48 bg-white border border-gray-300 text-sm text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-150 ease-in-out"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Lens Filter */}
                    <div className="relative">
                      <select
                        value={selectedLens}
                        onChange={(e) => setSelectedLens(e.target.value)}
                        className="block appearance-none w-40 lg:w-48 bg-white border border-gray-300 text-sm text-gray-700 py-2 pl-4 pr-10 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-150 ease-in-out"
                      >
                        <option value="all">All Lenses</option>
                        {lenses.map((lens) => (
                          <option key={lens} value={lens}>
                            {lens.charAt(0).toUpperCase() + lens.slice(1)}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {(selectedCategory !== 'all' || selectedLens !== 'all') && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-gray-500 hover:text-gray-700 underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* View Mode Toggle */}
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

                {/* Mobile Layout */}
                <div className="sm:hidden space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-700">Filters</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'list'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'hover:bg-gray-50 text-gray-600'
                          }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all duration-200 ${viewMode === 'grid'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'hover:bg-gray-50 text-gray-600'
                          }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-white border border-gray-300 text-sm text-gray-700 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Lens Filter */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Lens</label>
                      <select
                        value={selectedLens}
                        onChange={(e) => setSelectedLens(e.target.value)}
                        className="w-full bg-white border border-gray-300 text-sm text-gray-700 py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="all">All Lenses</option>
                        {lenses.map((lens) => (
                          <option key={lens} value={lens}>
                            {lens.charAt(0).toUpperCase() + lens.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Clear Filters */}
                    {(selectedCategory !== 'all' || selectedLens !== 'all') && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-gray-500 hover:text-gray-700 underline text-left"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </div>

                {/* Results Count */}
                <div className="pt-3 sm:pt-4 border-t border-gray-100 mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {filteredProjects.length} {filteredProjects.length === 1 ? 'photo' : 'photos'} found
                    </span>
                    {filteredProjects.length !== projects.length && (
                      <span className="text-xs">
                        of {projects.length} total
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Grid/List */}
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No photos match your filters</h3>
                <p className="text-gray-600 mb-4 sm:mb-6 px-4">
                  Try adjusting your category or lens filters to see more results.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 text-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`${viewMode === 'grid'
                ? 'grid gap-3 sm:gap-4 md:gap-6 lg:gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3'
                : 'space-y-4 sm:space-y-6'
                }`}>
                {filteredProjects
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((project, index) => (
                    <div
                      key={project.id}
                      className={`group transform transition-all duration-500 ease-out ${viewMode === 'grid'
                        ? 'hover:scale-[1.02] hover:-translate-y-1 sm:hover:-translate-y-2'
                        : 'hover:scale-[1.01]'
                        }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: `fadeInUp 0.6s ease-out forwards ${index * 100}ms`,
                        opacity: 0
                      }}
                    >
                      <ProjectCard project={project} viewMode={viewMode} />
                    </div>
                  ))}


              </div>


            )}
            {filteredProjects.length > itemsPerPage && (
              <div className="flex justify-center items-center space-x-2 mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border text-sm ${currentPage === 1
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                    }`}
                >
                  Prev
                </button>

                {Array.from({ length: Math.ceil(filteredProjects.length / itemsPerPage) }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md text-sm border ${currentPage === i + 1
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, Math.ceil(filteredProjects.length / itemsPerPage))
                    )
                  }
                  disabled={currentPage === Math.ceil(filteredProjects.length / itemsPerPage)}
                  className={`px-3 py-1 rounded-md border text-sm ${currentPage === Math.ceil(filteredProjects.length / itemsPerPage)
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'text-emerald-600 border-emerald-200 hover:bg-emerald-50'
                    }`}
                >
                  Next
                </button>
              </div>
            )}
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

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;