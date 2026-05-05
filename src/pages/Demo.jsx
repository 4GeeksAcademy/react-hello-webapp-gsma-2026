import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store";
import { useNavigate, useParams } from "react-router-dom";

export const Demo = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (id) {
      const contact = store.contacts.find(c => c.id == id);
      if (contact) setForm(contact);
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (id) {
      await actions.updateContact(dispatch, id, form);
    } else {
      await actions.addContact(dispatch, form);
    }
    navigate("/");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "800px" }}>

      <h1 className="text-center mb-4">
        {id ? "Edit contact" : "Add a new contact"}
      </h1>

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input className="form-control" name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="Enter email" />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter phone" />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input className="form-control" name="address" value={form.address} onChange={handleChange} placeholder="Enter address" />
      </div>

      <button className="btn btn-primary w-100 mb-2" onClick={handleSave}>
        save
      </button>

      <div>
        <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate("/")}>
          or get back to contacts
        </span>
      </div>

    </div>
  );
};