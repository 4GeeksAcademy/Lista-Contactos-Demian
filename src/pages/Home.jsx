import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import ContactCard from "../components/ContactCard.jsx";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const slug = "demiancaivano";

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`);

        if (response.status === 404) {
          console.log("Agenda no encontrada. Creando una nueva...");
          await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
            method: "POST"
          });
          return fetchContacts();
        }

        const data = await response.json();
        dispatch({ type: "setContacts", payload: data.contacts });

      } catch (error) {
        console.error("Error al obtener o crear la agenda:", error);
      }
    };

    fetchContacts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el contacto de la API");
      }

      dispatch({ type: "delete", payload: id });
    } catch (error) {
      console.error("Error eliminando el contacto:", error);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Lista de Contactos</h1>
      {store.contacts && store.contacts.length > 0 ? (
        store.contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-center">No hay contactos que mostrar</p>
      )}
    </div>
  );
};