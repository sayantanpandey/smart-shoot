import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const ProjectCard = ({ project, viewMode = 'grid' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Grid view (original design)
  if (viewMode === 'grid') {
    return (
      <div className="relative flex flex-col h-full bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-500 group hover:shadow-xl hover:border-gray-200">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
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
        <div className="relative p-6 z-20 flex flex-col flex-grow">
          <div className="space-y-3 flex flex-col flex-grow justify-between">
            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-emerald-900 transition-colors duration-300">
              {project.caption || 'Untitled Project'}
            </h3>

            {project.description && (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {project.description}
              </p>
            )}

            {/* Lens Information */}
            {project.lens && (
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {project.lens}
              </div>
            )}

            {/* Metadata */}
            {project.uploadedAt && (
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {(() => {
                  const date = new Date(project.uploadedAt.seconds ? project.uploadedAt.seconds * 1000 : project.uploadedAt);
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const year = date.getFullYear();
                  return `${day}/${month}/${year}`;
                })()}
              </div>
            )}

            {/* Action Button */}
            <div className="mt-4">
              <Link
                href={`/projects/${project.id || project.slug}`}
                className="group/link inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-emerald-50 to-purple-50 hover:from-emerald-100 hover:to-purple-100 border border-emerald-100 hover:border-emerald-200 rounded-xl text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
              >
                <span>View Details</span>
                <svg
                  className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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

          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  // List view (responsive horizontal layout)
  return (
    <div className="relative bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden transition-all duration-500 group hover:shadow-xl hover:border-gray-200">
      {/* Category Badge - Positioned at top right */}
      {project.category && (
        <div className="absolute top-1 right-3 z-20 hidden sm:block">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700 border border-white/20 shadow-sm">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-500 to-emerald-200 rounded-full mr-1"></div>
            <span className="hidden xs:inline">
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </span>
            <span className="xs:hidden">
              {project.category.charAt(0).toUpperCase()}
            </span>
          </span>
        </div>

      )}

      <div className="flex items-center p-3 sm:p-4 space-x-3 sm:space-x-6">
        {/* Image Container - Responsive sizing */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg sm:rounded-xl">
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
                sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority={false}
              />
            </>
          ) : (
            /* Error State */
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content Section - Responsive layout */}
        <div className="flex-1 min-w-0 space-y-1 sm:space-y-2 pr-2 sm:pr-0">
          {/* Title - Responsive text size */}
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight group-hover:text-emerald-900 transition-colors duration-300 truncate">
            {project.caption || 'Untitled Project'}
          </h3>

          {/* Description - Hidden on very small screens, show on larger */}
         {project.description && (
  <p className="text-xs sm:text-sm text-gray-600 leading-snug line-clamp-2 overflow-hidden">
    {project.description}
  </p>
)}


          {/* Metadata Container - Responsive layout */}
          <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-4 space-y-1 xs:space-y-0">
            {/* Lens Information */}
            {project.lens && (
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="truncate">{project.lens}</span>
              </div>
            )}

            {/* Upload Date */}
            {project.uploadedAt && (
              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">
                  {(() => {
                    const date = new Date(project.uploadedAt.seconds ? project.uploadedAt.seconds * 1000 : project.uploadedAt);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                  })()}
                </span>
                <span className="sm:hidden">
                  {(() => {
                    const date = new Date(project.uploadedAt.seconds ? project.uploadedAt.seconds * 1000 : project.uploadedAt);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    return `${day}/${month}`;
                  })()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button - Responsive sizing and text */}
        <div className="flex-shrink-0">
          <Link
            href={`/projects/${project.id || project.slug}`}
            className="group/link inline-flex items-center px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-gradient-to-r from-emerald-50 to-purple-50 hover:from-emerald-100 hover:to-purple-100 border border-emerald-100 hover:border-emerald-200 rounded-lg text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
          >
            {/* Text changes based on screen size */}
            <span className="hidden md:block">View Details</span>
            <span className="hidden sm:block md:hidden">View</span>
            <span className="sm:hidden">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <svg className="hidden sm:block w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom breakpoint for extra small screens */
        @media (min-width: 475px) {
          .xs\:block {
            display: block;
          }
          .xs\:inline {
            display: inline;
          }
          .xs\:hidden {
            display: none;
          }
          .xs\:flex-row {
            flex-direction: row;
          }
          .xs\:items-center {
            align-items: center;
          }
          .xs\:space-x-4 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(1rem * var(--tw-space-x-reverse));
            margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
          }
          .xs\:space-y-0 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0px * var(--tw-space-y-reverse));
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;