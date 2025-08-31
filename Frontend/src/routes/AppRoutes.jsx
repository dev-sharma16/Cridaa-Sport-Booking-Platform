import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VenueDetail from "../pages/VenueDetail";
import ConfirmBooking from "../pages/ConfirmBooking";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/venue/:venueId" element={<VenueDetail />} />
            <Route path="/book/:slotId" element={<ConfirmBooking />} />
        </Routes>
    )
}

export default AppRoutes;
