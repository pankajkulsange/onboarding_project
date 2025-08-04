import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /manager or /new-joiner based on your logic
    router.push('/manager'); // Change this to '/new-joiner' if needed
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold">Welcome to the New Joiner QA Portal</h1>
      <p className="mt-4 text-lg">Redirecting you to the appropriate dashboard...</p>
    </div>
  );
};

export default Home;