import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import ProjectCard from '../components/ProjectCard';

const db = getFirestore();

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'photos'), orderBy('uploadedAt', 'desc'), limit(6));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), slug: doc.id }));
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
        {/* Geometric background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-emerald-400 rotate-45"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-emerald-400 rotate-12"></div>
          <div className="absolute bottom-32 left-40 w-20 h-20 border border-emerald-400 -rotate-12"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 border border-emerald-400 rotate-45"></div>
        </div>
        
        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block">Sayantan</span>
                <span className="block text-emerald-400 font-light tracking-wide">
                  Pandey
                </span>
              </h1>
              
              <div className="flex items-center justify-center space-x-4 my-8">
                <div className="h-px w-16 bg-emerald-400"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <div className="h-px w-16 bg-emerald-400"></div>
              </div>
              
              <p className="text-xl md:text-2xl text-slate-200 font-medium">
                Macro Photographer & Developer
              </p>
              
              <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Capturing the intricate beauty of nature through the lens of macro photography, where the smallest details reveal the grandest stories.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href="/projects">
                <button className="group px-8 py-3 bg-emerald-500 text-white text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/25">
                  <span className="flex items-center gap-2">
                    Explore Gallery
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </Link>
              
              <Link href="/about">
                <button className="px-8 py-3 border-2 border-slate-300 text-slate-300 text-lg font-semibold hover:bg-slate-300 hover:text-slate-800 transition-all duration-300">
                  About Me
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section */}
      <section className="py-16 lg:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-emerald-500"></div>
              <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Portfolio</span>
              <div className="w-8 h-px bg-emerald-500"></div>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Featured <span className="text-emerald-600">Work</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A curated selection showcasing the intricate beauty found in nature's smallest details through macro photography.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-square bg-slate-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="w-20 h-20 mx-auto mb-6 text-slate-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Gallery Coming Soon</h3>
              <p className="text-slate-500">New macro photography work will be featured here.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
              
              <div className="text-center">
                <Link href="/projects">
                  <button className="group px-8 py-3 bg-slate-800 text-white text-lg font-semibold hover:bg-slate-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                    <span className="flex items-center gap-2">
                      View Complete Gallery
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-8 h-px bg-emerald-500"></div>
                  <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">About</span>
                  <div className="w-8 h-px bg-emerald-500"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                  Capturing the <span className="text-emerald-600">Unseen</span>
                </h2>
              </div>
              
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p className="text-lg">
                  I'm a passionate macro photographer and developer based in India, specializing in revealing the extraordinary beauty hidden in ordinary subjects.
                </p>
                
                <p>
                  Through precision macro photography, I explore intricate patterns, textures, and colors that exist in nature's smallest subjects—from dewdrops on petals to the complex architecture of insects and delicate structures of everyday objects.
                </p>
                
                <p>
                  When not behind the camera, I craft digital experiences as a developer, bringing the same attention to detail and artistic vision to code as I do to photography.
                </p>
              </div>
              
              <div className="pt-4">
                <Link href="/about">
                  <button className="group inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300">
                    <span>Learn more about my journey</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-6 rounded-lg text-center border border-slate-200">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">Since 2020</div>
                  <div className="text-sm text-slate-600 font-medium uppercase tracking-wide">Macro Photography Journey</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-lg text-center border border-slate-200">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">200+</div>
                  <div className="text-sm text-slate-600 font-medium uppercase tracking-wide">Photos Captured</div>
                </div>
              </div>
              
              {/* Skills */}
              <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-6 rounded-lg border border-emerald-100">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">Specializations</h3>
                <div className="space-y-3">
                  {[
                    'Macro Nature Photography',
                    'Insect & Wildlife Close-ups',
                    'Abstract & Artistic Details',
                    'Web Development'
                  ].map((skill, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <span className="text-slate-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-20 px-6 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-emerald-400"></div>
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Contact</span>
              <div className="w-8 h-px bg-emerald-400"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Create Something <span className="text-emerald-400">Extraordinary</span>
            </h2>
            
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Whether you're interested in commissioning macro photography work or discussing web development projects, I'd love to collaborate with you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-3 bg-emerald-500 text-white text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                  Get In Touch
                </button>
              </Link>
              <Link href="/projects">
                <button className="px-8 py-3 border-2 border-slate-400 text-slate-300 text-lg font-semibold hover:bg-slate-300 hover:text-slate-800 transition-all duration-300">
                  View All Work
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-2">Sayantan Pandey</h3>
              <p className="text-slate-400 mb-4">Macro Photographer & Developer</p>
              <p className="text-slate-500 text-sm leading-relaxed">
                Capturing the extraordinary in the ordinary through macro photography and crafting digital experiences.
              </p>
            </div>
            
            {/* Links */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-emerald-400">Quick Links</h4>
              <div className="space-y-2">
                <Link href="/projects" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300">Gallery</Link>
                <Link href="/about" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300">About</Link>
                <Link href="/contact" className="block text-slate-400 hover:text-emerald-400 transition-colors duration-300">Contact</Link>
              </div>
            </div>
            
            {/* Social */}
            <div className="md:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-emerald-400">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348s2.348 1.051 2.348 2.348S9.746 16.988 8.449 16.988z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-700 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-500">
              &copy; {new Date().getFullYear()} Sayantan Pandey. All rights reserved. Built with Next.js & Tailwind CSS.
            </p>
          </div> */}
        </div>
      </footer>
    </div>
  );
}