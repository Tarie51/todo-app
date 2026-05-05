import { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ShieldCheck, Loader2 } from 'lucide-react';

interface ProtectedData {
  message: string;
  user: string;
}

const Protected = () => {
  const [data, setData] = useState<ProtectedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<ProtectedData>('/protected');
        setData(response.data);
      } catch (err) {
        const axiosError = err as AxiosError<{ detail?: string }>;
        if (axiosError.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError(axiosError.response?.data?.detail ?? 'Failed to fetch protected data.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Verifying access...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md shadow-sm max-w-2xl mx-auto mt-8">
        <h3 className="text-lg font-medium text-red-800">Error</h3>
        <p className="mt-2 text-red-700">{error}</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-white text-center">
          <ShieldCheck className="h-16 w-16 mx-auto mb-4 text-indigo-100" />
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Welcome, {data?.user}!</h1>
          <p className="text-indigo-100 text-lg">{data?.message}</p>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Protected Resource</h2>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
            <p className="text-gray-700">
              Your token is valid and this content is available only to authenticated users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Protected;
