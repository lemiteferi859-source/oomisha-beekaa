import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="text-8xl mb-6">🌾</div>
      <h1 className="text-6xl font-black text-gray-900 mb-3">404</h1>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8">
        It seems like this field hasn't been planted yet. The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-brandGreen hover:bg-green-800 text-white font-bold px-6 py-3 rounded-xl shadow-md transition"
        >
          Go to Home
        </Link>
        <Link
          to="/disease"
          className="bg-white border-2 border-gray-300 hover:border-brandGreen text-gray-800 font-bold px-6 py-3 rounded-xl transition"
        >
          Scan a Crop
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
