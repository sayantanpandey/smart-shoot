import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const ProjectCard = ({ project, viewMode = 'grid' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Grid view (original design)
  if (viewMode === 'grid') {
    return (
      <div className="relative bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-500 group hover:shadow-xl hover:border-gray-200">
        {/* Image Container */}
        <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {!imageError ? (
            <>
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              )}

              <Image
                src={project.imageUrl || '/placeholder.png'}
                alt={project.caption || 'Project Image'}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority={false}
              />
            </>
          ) : (
            /* Error State */
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-purple-100 rounded-2xl flex items-center justify-center transform rotate-3">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 font-medium">Image unavailable</p>
              </div>
            </div>
          )}

          {/* Category Badge */}
          {project.category && (
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 border border-white/20 shadow-sm">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-emerald-200 rounded-full mr-2"></div>
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="relative p-6 z-20">
          <div className="space-y-3">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-emerald-900 transition-colors duration-300">
              {project.caption || 'Untitled Project'}
            </h3>
            {project.description && (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {project.description}
              </p>
            )}
            {/* Metadata */}
            {/* <div className="flex items-center justify-between pt-2">
              <div className="flex items-center text-xs text-gray-500">
                {project.createdAt && (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </>
                )}
              </div>
            </div> */}

            {/* Action Button */}
            <div className="pt-4">
              <Link
                href={`/projects/${project.slug}`}
                className="group/link inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-emerald-50 to-purple-50 hover:from-emerald-100 hover:to-purple-100 border border-emerald-100 hover:border-emerald-200 rounded-xl text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              >
                <span>View Details</span>
                <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          .animate-shimmer {
            animation: shimmer 1.5s infinite;
          }
        `}</style>
      </div>
    );
  }

  // List view (horizontal layout)
  return (
    <div className="relative bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-500 group hover:shadow-xl hover:border-gray-200">
      <div className="flex items-center p-4 space-x-6">
        {/* Image Container - Smaller for list view */}
        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
          {!imageError ? (
            <>
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              )}

              <Image
                src={project.imageUrl || '/placeholder.png'}
                alt={project.caption || 'Project Image'}
                fill
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                sizes="96px"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority={false}
              />
            </>
          ) : (
            /* Error State */
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Category Badge - Top right corner */}

        </div>

        {/* Content Section - Expanded for list view */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-emerald-900 transition-colors duration-300 truncate">
            {project.caption || 'Untitled Project'}
          </h3>

          {project.category && (
            <div className="absolute -top-1 -right-1 z-20">
              <span className="inline-flex items-center pr-5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 border border-white/20 shadow-sm">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-200 rounded-full mr-1"></div>
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </span>
            </div>
          )}
          {/* Description - Only show in list view */}
          {project.description && (
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
              {project.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center text-xs text-gray-500">
            {project.createdAt && (
              <>
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(project.createdAt).toLocaleDateString()}
              </>
            )}
          </div>
        </div>

        {/* Action Button - Compact for list view */}
        <div className="flex-shrink-0">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-purple-50 hover:from-emerald-100 hover:to-purple-100 border border-emerald-100 hover:border-emerald-200 rounded-lg text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
          >
            <span className="hidden sm:block">View Details</span>
            <span className="sm:hidden">View</span>
            <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;