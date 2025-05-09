export const initialStore = () => {
  return {
    contacts: [] 
  };
};

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'setContacts':
      return {
        ...store,
        contacts: action.payload, 
      };
    case 'delete': 
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id !== action.payload) 
      };
    case 'addContact':  
      return {
        ...store,
        contacts: [...store.contacts, action.payload], 
      };
    case 'updateContact': 
      return {
        ...store,
        contacts: store.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact 
        ),
      };
    default:
      throw Error('Unknown action.');
  }
}