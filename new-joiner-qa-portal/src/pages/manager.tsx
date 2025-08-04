import React from 'react';
import Navbar from '../components/Navbar';

const ManagerPage = () => {
    return (
        <div className="container mx-auto p-4">
            <Navbar />
            <h1 className="text-2xl font-bold mb-4">Project Manager Dashboard</h1>
            <p className="mb-4">Manage new joiners and track their progress here.</p>
            {/* Add forms or components for managing new joiners and tracking progress */}
        </div>
    );
};

export default ManagerPage;