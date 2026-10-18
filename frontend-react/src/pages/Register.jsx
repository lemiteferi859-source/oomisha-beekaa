import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    preferredLanguage: 'en',
    role: 'farmer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(formData);
      toast.success('Account created successfully! Welcome!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-brandGreen hover:underline">
          ← Back to Home
        </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-700 rounded-full text-2xl mb-3">
            🌾
          </div>
          <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
          <p className="text-gray-500 text-sm mt-1">Join Oomisha Beekaa community</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl mb-5 text-sm flex items-center space-x-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1.5">Full Name</label>
            <input 
              type="text" 
              name="name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen transition" 
              placeholder="e.g. Chala Tolasa"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1.5">Email Address</label>
            <input 
              type="email" 
              name="email"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen transition" 
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1.5">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen transition pr-10" 
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 text-sm font-medium"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1.5">Language</label>
              <select 
                name="preferredLanguage" 
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen bg-white transition"
                value={formData.preferredLanguage}
                onChange={handleChange}
              >
                <option value="en">English</option>
                <option value="om">Afaan Oromoo</option>
                <option value="am">አማርኛ (Amharic)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1.5">Role</label>
              <select 
                name="role" 
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brandGreen focus:border-brandGreen bg-white transition"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="farmer">Farmer</option>
                <option value="expert">Agronomist</option>
                <option value="admin">Trader / Admin</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full font-bold py-3 px-4 rounded-xl text-gray-900 shadow-md transition transform active:scale-95 ${loading ? 'bg-yellow-200 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-300'}`}
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-brandGreen font-bold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
