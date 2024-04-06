import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './UpdateLocation.css'; // Import the CSS file

export default function UpdateLocation() {
    const { id } = useParams(); // Change locationId to id
    const [locationName, setLocationName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8090/location/get/${id}`) // Change locationId to id
            .then((res) => {
                const location = res.data.location;
                setLocationName(location.locationName);
                setAddress(location.address);
                setPhone(location.phone);
            })
            .catch((err) => {
                console.error("Error fetching location:", err);
            });
    }, [id]); // Change locationId to id

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedLocation = {
            locationName,
            address,
            phone
        };

        axios.put(`http://localhost:8090/location/update/${id}`, updatedLocation) // Change locationId to id
            .then(() => {
                alert("Location updated successfully!");
                
            })
            .catch((err) => {
                console.error("Error updating location:", err);
            });
    };

    return (
        <div className="update-location-container"> {/* Different class name */}
            <h2>Update Location</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>Location Name</label>
                    <input
                        type="text"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button type="submit">Update Location</button>
            </form>
        </div>
    );
}
