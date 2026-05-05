const API_URL = "https://playground.4geeks.com/contact/agendas/genesis";


export const initialStore = () => ({
  contacts: []
});


export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...store, contacts: action.payload };
    default:
      return store;
  }
}

export const actions = {
  getContacts: async (dispatch) => {
    try {
      const resp = await fetch(API_URL);

      if (!resp.ok) {
        await fetch(API_URL, { method: "POST" });
        return actions.getContacts(dispatch);
      }

      const data = await resp.json();
      dispatch({ type: "SET_CONTACTS", payload: data.contacts });

    } catch (error) {
      console.log("Error cargando contactos:", error);
    }
  },

  addContact: async (dispatch, contact) => {
    await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });

    actions.getContacts(dispatch);
  },

  deleteContact: async (dispatch, id) => {
    await fetch(`${API_URL}/contacts/${id}`, { method: "DELETE" });
    actions.getContacts(dispatch);
  },

  updateContact: async (dispatch, id, contact) => {
    await fetch(`${API_URL}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact)
    });

    actions.getContacts(dispatch);
  }
};