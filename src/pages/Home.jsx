import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    actions.getContacts(dispatch);
  }, []);

  return (
    <div className="container main-container">

   
      <div className="d-flex justify-content-end my-4">
        <Link to="/demo">
          <button className="btn btn-success">
            Add new contact
          </button>
        </Link>
      </div>

    
      <div className="border rounded bg-white p-3">
        {store.contacts.map((contact) => (
          <Card key={contact.id} contact={contact} />
        ))}
      </div>

    </div>
  );
};