import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const CreateNewContact = () => {
  const { dispatch, store } = useGlobalReducer();
  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (id) {
      const contactToEdit = store.contacts.find((contact) => contact.id === parseInt(id));
      if (contactToEdit) {
        setContact(contactToEdit);
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const updatedContact = {
        ...contact,
        agenda_slug: "demiancaivano",
      };

      try {
        const response = await fetch(
          `https://playground.4geeks.com/contact/agendas/demiancaivano/contacts/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContact),
          }
        );

        if (!response.ok) throw new Error("Error al actualizar el contacto");

        const data = await response.json();

        dispatch({ type: "updateContact", payload: data });

      } catch (error) {
        console.error("Error actualizando el contacto:", error);
      }
    } else {

      const newContact = { ...contact, id: Date.now() }; 

      try {
        await fetch("https://playground.4geeks.com/contact/agendas/demiancaivano/contacts", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),  
        });
        
        dispatch({ type: "addContact", payload: newContact });
      } catch (error) {
        console.error("Error adding contact:", error);
      }
    }

    navigate("/home"); 
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{id ? "Actualizar Contacto" : "Crear Nuevo Contacto"}</h2>

      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={contact.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={contact.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {id ? "Actualizar Contacto" : "Agregar Contacto"}
        </button>
      </form>
    </div>
  );
};

export default CreateNewContact;