import React from 'react';
import Navbar from '../components/Navbar';

const NewJoiner = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">New Joiner Dashboard</h1>
                <p className="mb-2">Welcome to your dashboard! Here you can find the applications, tools, and resources selected by your project manager.</p>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Your Applications</h2>
                    {/* List of applications will be displayed here */}
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                    <h2 className="text-xl font-semibold mb-2">Your Tools</h2>
                    {/* List of tools will be displayed here */}
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                    <h2 className="text-xl font-semibold mb-2">Resources</h2>
                    {/* List of resources will be displayed here */}
                </div>
            </div>
        </div>
    );
};

export default NewJoiner;