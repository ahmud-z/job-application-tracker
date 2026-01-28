import React from "react";
import Card from './components/Card';
import { Link } from "react-router";

const App = () => {


  return (
    <div className="bg-gray-100 min-h-screen pb-4">
      <div className="border-b border-gray-300">
        <nav className='flex items-center justify-between max-w-6xl mx-auto py-4 px-4'>
          <div className="space-y-1.5">
            <h1 className='text-4xl font-bold'>Job Application Tracker</h1>
            <p className="text-sm font-medium text-gray-500">Manage your job applications effortlessly.</p>
          </div>
          <div>
            <Link to={"/add-application"} className='bg-violet-500 hover:bg-violet-500/85 transition duration-100 text-xl text-white font-semibold py-2 px-4 rounded-lg'>+ Add Application</Link>
          </div>
        </nav>
      </div>
      <Card />
    </div>
  );
};

export default App;
