import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Cars, Dashboard, Login, Marchandises, Missions, Users } from '../pages';
import { Navbar } from '../components';

const MainRoute = () => {
    return (
        <div className="w-full min-h-full">
        <Navbar />
        <div className="px-10 pt-10">
            <Routes>

                <Route index element={<Dashboard />} />
                <Route path="login" element={<Login />} />
                <Route path="employees" element={<Users />} />
                <Route path="vehicules" element={<Cars />} />
                <Route path="Missions" element={<Missions />} />
                <Route path="Marchandises" element={<Marchandises />} />
            </Routes>
        </div>
        </div>
    )
}

export default MainRoute