import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function AddLocation() {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);

  function sendData(e) {
    e.preventDefault();

    const newLocation = {
      locationName,
      address,
      phone
    };

    axios
      .post("http://localhost:8090/location/add", newLocation)
      .then(() => {
        setShowModal(true);
        resetForm();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function resetForm() {
    setLocationName("");
    setAddress("");
    setPhone("");
  }

  function handleOK() {
    setShowModal(false);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              {showModal && (
                <div className="modal" style={{ display: "block" }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Location Added</h5>
                      </div>
                      <div className="modal-body">
                        <p>Location has been successfully added!</p>
                      </div>
                      <div className="modal-footer">
                        <Link to="/" className="btn btn-primary" onClick={handleOK}>
                          OK
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <form onSubmit={sendData}>
                <div className="mb-3">
                  <label htmlFor="locationName" className="form-label">
                    Location Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="locationName"
                    name="locationName"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="Enter location name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
