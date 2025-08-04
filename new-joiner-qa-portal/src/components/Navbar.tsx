import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { role, logout } = useAuth();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link href="/manager" className="text-white hover:text-gray-300">
                            Manager
                        </Link>
                    </li>
                    <li>
                        <Link href="/new-joiner" className="text-white hover:text-gray-300">
                            New Joiner
                        </Link>
                    </li>
                    {role && (
                        <li>
                            <button
                                onClick={logout}
                                className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;