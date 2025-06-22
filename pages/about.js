import Head from 'next/head';
import Image from 'next/image';

const About = () => {
  return (
    <>
      <Head>
        <title>About Me | Sayantan Pandey - Macro Photographer & Developer</title>
        <meta name="description" content="Learn about Sayantan Pandey, a passionate macro photographer and developer based in India, specializing in capturing nature's intricate details and creating digital experiences." />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white py-20 lg:py-28 px-6 ">
        {/* Geometric background patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-emerald-400 rotate-45"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-emerald-400 rotate-12"></div>
          <div className="absolute bottom-32 left-40 w-20 h-20 border border-emerald-400 -rotate-12"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto aspect-square bg-slate-700 shadow-2xl border-2 border-emerald-400/20 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent"></div>
              <Image
                src="/images/profile.jpg"
                alt="Sayantan Pandey - Macro Photographer and Developer"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-400/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-slate-400/20 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="w-full lg:w-1/2 text-center lg:text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-emerald-400"></div>
              <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">About</span>
              <div className="w-8 h-px bg-emerald-400"></div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              I am <span className="text-emerald-400">Sayantan</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
             A passionate macro photographer and developer who finds beauty in both the microscopic world of nature and the intricate details of well-crafted code.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-slate-50 py-20 lg:py-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Journey Section */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 lg:p-12 mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-8 h-px bg-emerald-500"></div>
                  <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Journey</span>
                  <div className="w-8 h-px bg-emerald-500"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  My <span className="text-emerald-600">Story</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 text-slate-700 leading-relaxed">
                  <p className="text-lg font-medium text-slate-800">
                    Based in the vibrant landscapes of India, I explore the intersection between technology and art, finding that both require patience, precision, and a keen eye for detail.
                  </p>

                  <p>
                    My journey into macro photography began with a simple curiosity about the world that exists just beyond our normal vision. Armed with specialized lenses and endless patience, I discovered an entire universe in dewdrops, flower petals, and the intricate architecture of insects.
                  </p>

                  <p>
                    As a developer, I bring the same meticulous attention to detail to my code. I specialize in creating modern, responsive web applications, always striving to craft digital experiences that are both functional and beautiful.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-slate-50 p-8 rounded-lg border border-emerald-100">
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">Core Values</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Precision', desc: 'Every detail matters, from code to composition' },
                      { title: 'Creativity', desc: 'Finding beauty in the unexpected' },
                      { title: 'Excellence', desc: 'Continuous improvement in craft' },
                      { title: 'Patience', desc: 'Great work takes time and dedication' }
                    ].map((value, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-slate-800">{value.title}:</span>
                          <span className="text-slate-600 ml-2">{value.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl shadow-xl p-8 lg:p-12 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-emerald-400"></div>
                <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Philosophy</span>
                <div className="w-8 h-px bg-emerald-400"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                My <span className="text-emerald-400">Approach</span>
              </h2>

              <blockquote className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed italic mb-10 relative">
                <div className="absolute -top-4 -left-4 text-6xl text-emerald-400/20">"</div>
                In both code and photography, the magic happens in the details that others might overlook. Every pixel matters, every function has purpose, and every frame tells a story.
                <div className="absolute -bottom-8 -right-4 text-6xl text-emerald-400/20">"</div>
              </blockquote>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-slate-700/50 p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">As a Developer</h3>
                  <p className="text-slate-300 leading-relaxed">
                    I believe in writing clean, maintainable code that stands the test of time. My approach focuses on creating scalable solutions that prioritize user experience while maintaining technical excellence.
                  </p>
                </div>

                <div className="bg-slate-700/50 p-6 rounded-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-emerald-400 mb-4">As a Photographer</h3>
                  <p className="text-slate-300 leading-relaxed">
                    I strive to reveal the extraordinary in the ordinary, showing viewers worlds that exist all around us but remain largely unseen. Each photograph is an invitation to pause and appreciate life's intricate beauty.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-emerald-500"></div>
                <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Expertise</span>
                <div className="w-8 h-px bg-emerald-500"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                What I <span className="text-emerald-600">Do</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                My expertise spans multiple disciplines, combining technical proficiency with creative vision to deliver exceptional results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Development */}
              <div className="group bg-white border border-slate-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Frontend Development</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Crafting responsive, performant web applications using modern frameworks. I focus on creating intuitive user interfaces that delight and engage users.
                </p>
                <div className="space-y-3">
                  {['React & Next.js', 'Material UI & JavaScript', 'Tailwind CSS & Styled Components', 'Firebase & API Integration'].map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Photography */}
              <div className="group bg-white border border-slate-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">Macro Photography</h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Specializing in extreme close-up photography that reveals hidden beauty in nature's smallest subjects. From intricate insect details to abstract patterns in everyday objects.
                </p>
                <div className="space-y-3">
                  {['Nature & Wildlife Macro', 'Abstract & Artistic Details', 'Technical & Scientific Photography', 'Focus Stacking Techniques'].map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-slate-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Equipment & Tools */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 lg:p-12 mb-16">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-8 h-px bg-emerald-500"></div>
                  <span className="text-emerald-600 font-semibold uppercase tracking-wider text-sm">Tools</span>
                  <div className="w-8 h-px bg-emerald-500"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                  My <span className="text-emerald-600">Arsenal</span>
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  The right tools make all the difference in bringing creative visions to life.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Development Stack</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {['React', 'Next.js', 'Material UI', 'Tailwind CSS', 'Firebase', 'Vercel'].map((tech, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                        <span className="text-slate-700 font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Photography Gear</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      'Macro Lenses (Various focal lengths)',
                      'Ring Flash & LED Panels',
                      'Focus Stacking Equipment',
                      'Adobe Creative Suite'
                    ].map((gear, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                        <span className="text-slate-700">{gear}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl shadow-xl p-8 lg:p-12 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-8 h-px bg-emerald-400"></div>
                <span className="text-emerald-400 font-semibold uppercase tracking-wider text-sm">Connect</span>
                <div className="w-8 h-px bg-emerald-400"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Let's <span className="text-emerald-400">Collaborate</span>
              </h2>
              
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                Whether you're interested in my photography work, need help with a development project, or want to discuss the intersection of technology and art, I'd love to connect.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="group px-8 py-3 bg-emerald-500 text-white text-lg font-semibold hover:bg-emerald-600 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                  <span className="flex items-center gap-2">
                    Get In Touch
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
                <a href="/projects" className="px-8 py-3 border-2 border-slate-400 text-slate-300 text-lg font-semibold hover:bg-slate-300 hover:text-slate-800 transition-all duration-300">
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;