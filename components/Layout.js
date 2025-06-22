import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
    <Navbar />
    
    {/* Add top padding to account for fixed navbar */}
    <main className="flex-grow w-full max-w-6xl mx-auto px-4 pt-24 pb-8">
      {children}
    </main>

    <footer className="bg-white text-center text-sm text-gray-500 py-8 border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <p>&copy; {new Date().getFullYear()} Sayantan</p>
        <p className="text-xs text-gray-400 mt-1">Built with Next.js & TailwindCSS</p>
      </div>
    </footer>
  </div>
);

export default Layout;