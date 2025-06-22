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

  if (loading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading project...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.caption} | Portfolio</title>
        <meta name="description" content={project.caption} />
      </Head>

      <div className="min-h-screen px-4 py-12 bg-gray-50 flex justify-center animate-fade-in-up">
        <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-6 md:p-10">
          <Link
            href="/projects"
            className="inline-block mb-6 text-sm text-emerald-600 hover:text-emerald-800 font-medium"
          >
            ← Back to Projects
          </Link>

          <h1 className="text-4xl font-bold text-emerald-700 mb-6">{project.caption}</h1>

          <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6">
            <Image
              src={project.imageUrl}
              alt={project.caption}
              fill
              className="object-cover"
              priority
            />
          </div>

          <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
            {project.description || 'No description provided.'}
          </p>
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
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }
      `}</style>
    </>
  );
};

export default ProjectPage;
