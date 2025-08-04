import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/manager">
                            <a className="text-white hover:text-gray-300">Manager</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/new-joiner">
                            <a className="text-white hover:text-gray-300">New Joiner</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;