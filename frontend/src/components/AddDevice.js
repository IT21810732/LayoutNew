import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddDevice() {
  const [serialNumber, setSerialNumber] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  function sendData(e) {
    e.preventDefault();

    const newDevice = {
      serialNumber,
      type,
      status
    };

    axios
      .post("http://localhost:8090/device/add", newDevice)
      .then(() => {
        setShowModal(true);
        resetForm();
      })
      .catch((err) => {
        alert(err);
      });
  }

  function resetForm() {
    setSerialNumber("");
    setType("");
    setStatus("");
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
                        <h5 className="modal-title">Device Added</h5>
                      </div>
                      <div className="modal-body">
                        <p>Device has been successfully added!</p>
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
                  <label htmlFor="serialNumber" className="form-label">
                    Serial Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="serialNumber"
                    name="serialNumber"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    placeholder="Enter serial number"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Enter type"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Enter status"
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
