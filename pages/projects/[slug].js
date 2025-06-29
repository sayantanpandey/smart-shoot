import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

const db = getFirestore();

const ProjectPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const fetchProject = async () => {
      const ref = doc(db, 'photos', slug);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProject(snap.data());
      }
      setLoading(false);
    };
    fetchProject();
  }, [slug]);

  const formatDate = (dateValue) => {
    if (!dateValue) return null;
    const date = new Date(dateValue.seconds ? dateValue.seconds * 1000 : dateValue);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm sm:text-base">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">The project you're looking for doesn't exist.</p>
          <Link
            href="/projects"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors duration-200 text-sm sm:text-base"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.caption || 'Untitled Project'} | Portfolio</title>
        <meta name="description" content={project.description || project.caption || 'Project details'} />
      </Head>

      <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/projects"
            className="inline-flex items-center mb-4 sm:mb-8 text-xs sm:text-sm text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-200 group px-2 sm:px-0"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden animate-fade-in-up">
            {/* Header Section */}
            <div className="relative p-4 sm:p-6 lg:p-8 pb-4 sm:pb-6 bg-gradient-to-br from-emerald-50 to-purple-50">
              {/* Category Badge */}
              {project.category && (
                <div className="absolute top-3 sm:top-6 right-3 sm:right-6">
                  <span className="inline-flex items-center px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-white/90 backdrop-blur-sm text-gray-700 border border-white/20 shadow-sm">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-emerald-500 to-emerald-200 rounded-full mr-1 sm:mr-2"></div>
                    {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                </div>
              )}

              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight pr-16 sm:pr-0">
                {project.caption || 'Untitled Project'}
              </h1>

              {/* Metadata Row */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-600">
                {project.uploadedAt && (
                  <div className="flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Uploaded:</span>
                    <span className="ml-1">{formatDate(project.uploadedAt)}</span>
                  </div>
                )}

                {project.lens && (
                  <div className="flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="font-medium">Lens:</span>
                    <span className="ml-1">{project.lens}</span>
                  </div>
                )}

                {project.id && (
                  <div className="flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span className="font-medium">ID:</span>
                    <span className="ml-1 font-mono text-xs">{project.id}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Image Section */}
            <div className="relative">
              <div className="relative w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200">
                {!imageError ? (
                  <>
                    {/* Loading Skeleton */}
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 bg-white rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            </div>
                            <p className="text-gray-500 font-medium text-sm sm:text-base">Loading image...</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <Image
                      src={project.imageUrl || '/placeholder.png'}
                      alt={project.caption || 'Project Image'}
                      fill
                      className={`object-contain transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                      priority
                    />
                  </>
                ) : (
                  /* Error State */
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center p-4 sm:p-8">
                      <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-6 bg-gradient-to-br from-emerald-100 to-purple-100 rounded-2xl sm:rounded-3xl flex items-center justify-center transform rotate-3">
                        <svg className="w-8 h-8 sm:w-12 sm:h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">Image Unavailable</h3>
                      <p className="text-xs sm:text-sm text-gray-500">Unable to load the project image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="p-4 sm:p-6 lg:p-8">
              {project.description ? (
                <div className="prose prose-sm sm:prose-lg max-w-none">
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">About this Project</h2>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                    {project.description}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm sm:text-base">No description provided for this project.</p>
                </div>
              )}
            </div>

            {/* Additional Details Section */}
            {(project.category || project.lens || project.uploadedAt || project.id) && (
              <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                <div className="border-t border-gray-200 pt-4 sm:pt-6 lg:pt-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Project Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {project.category && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 mt-1">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Category</h4>
                          <p className="text-gray-600 text-sm sm:text-base">{project.category.charAt(0).toUpperCase() + project.category.slice(1)}</p>
                        </div>
                      </div>
                    )}

                    {project.lens && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 mt-1">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Lens</h4>
                          <p className="text-gray-600 text-sm sm:text-base">{project.lens}</p>
                        </div>
                      </div>
                    )}

                    {project.uploadedAt && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 mt-1">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Upload Date</h4>
                          <p className="text-gray-600 text-sm sm:text-base">{formatDate(project.uploadedAt)}</p>
                        </div>
                      </div>
                    )}

                    {project.id && (
                      <div className="flex items-start">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4 mt-1">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Project ID</h4>
                          <p className="text-gray-600 font-mono text-xs sm:text-sm break-all">{project.id}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
              <div className="border-t border-gray-200 pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center">
                  <Link
                    href="/projects"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                  </Link>

                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                    <button
                      onClick={() => window.history.back()}
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-200 px-2 py-1"
                    >
                      ← Previous
                    </button>
                    <div className="w-px h-3 sm:h-4 bg-gray-300"></div>
                    <button
                      onClick={() => window.print()}
                      className="text-gray-500 hover:text-gray-700 transition-colors duration-200 px-2 py-1 no-print"
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }

        @media print {
          .no-print {
            display: none !important;
          }
        }

        /* Ensure proper mobile viewport */
        @media (max-width: 640px) {
          body {
            -webkit-text-size-adjust: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default ProjectPage;