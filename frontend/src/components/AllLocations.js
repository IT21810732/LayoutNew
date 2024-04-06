import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import './AllLocations.css';

export default function AllLocations() {
    const [locations, setLocations] = useState([]);
    const [locationToDelete, setLocationToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        function getLocations() {
            axios.get("http://localhost:8090/location")
                .then((res) => {
                    setLocations(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        function getDevices() {
            axios.get("http://localhost:8090/device")
                .then((res) => {
                    setDevices(res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        getLocations();
        getDevices();
    }, []);

    const handleDeleteConfirmation = (locationId) => {
        setLocationToDelete(locationId);
    };

    const handleDelete = async () => {
        if (!locationToDelete) return;

        try {
            await axios.delete(`http://localhost:8090/location/delete/${locationToDelete}`);
            setLocations(locations.filter(location => location._id !== locationToDelete));
            setLocationToDelete(null);
        } catch (error) {
            console.error("Error deleting location:", error);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Location Name', 'Address', 'Phone']],
            body: locations.map(location => [location.locationName, location.address, location.phone]),
        });
        doc.save('locations.pdf');
    };

    return (
        <div className="header1">
            <h1>Location Dashboard</h1>
            <div className="input-group mb-3" style={{ maxWidth: "400px" }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Location Name, Address, or Phone"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button onClick={downloadPDF} className="btn btn-download-pdf mb-3">
                Download PDF
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Location Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Devices</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location._id}>
                            <td>{location.locationName}</td>
                            <td>{location.address}</td>
                            <td>{location.phone}</td>
                            <td>
                                <ul>
                                    {location.devices && location.devices.map(device => (
                                        <li key={device._id}>{device.serialNumber}, {device.type}, {device.status}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <Link to={`/update/${location._id}`} className="btn btn-edit">Edit</Link>
                                <button onClick={() => handleDeleteConfirmation(location._id)} className="btn btn-danger">Delete</button>
                                <Link to={`/add-device`} className="btn btn-add-device">Add Device</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {locationToDelete && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete this location?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setLocationToDelete(null)}>Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div>
               
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Type</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device) => (
                            <tr key={device._id}>
                                <td>{device.serialNumber}</td>
                                <td>{device.type}</td>
                                <td>{device.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
