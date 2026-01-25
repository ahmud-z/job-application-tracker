import React from "react";
import Card from './components/Card';
import { Link } from "react-router";

const App = () => {


  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className='flex items-center justify-between max-w-6xl mx-auto py-4 shadow px-4'>
        <div>
          <h1 className='text-xl font-bold'>Job Application Tracker</h1>
          <p>Track you job applications with less effort!</p>
        </div>
        <div>
          <Link to={"/add-application"} className='bg-blue-500 text-xl text-white font-semibold py-2 px-4 rounded-lg'>+ Add Application</Link>
        </div>
      </nav>
      <Card />
    </div>
  );
};

export default App;
