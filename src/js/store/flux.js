const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			userToEdit: {},
			editing: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			getContacts: () => {
				fetch("https://playground.4geeks.com/contact/agendas/Yussef/contacts")
					.then((response) => response.json())
					.then(data => setStore({ contacts: data.contacts }))
			},
			deleteContact: (iDToDelete) => {
				fetch(`https://playground.4geeks.com/contact/agendas/Yussef/contacts/${iDToDelete}`, { method: 'DELETE' })
					.then(() => getActions().getContacts())
			},
			findMyUser: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100");
					const data = await response.json();
					const userExist = data.agendas.find(user => user.slug === "Yussef");

					if (!userExist) {
						const createResponse = await fetch(`https://playground.4geeks.com/contact/agendas/Yussef`, { method: 'POST' });
						await createResponse.json();
						console.log("Usuario Creado");
					} else {
						console.log("El usuario ya existe");
					}
				} catch (error) {
					console.error("Error finding user:", error);
				}
			},

			addContactsAPI: (name, phone, email, address) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"name": name,
						"phone": phone,
						"email": email,
						"address": address
					})
				};
				fetch('https://playground.4geeks.com/contact/agendas/Yussef/contacts', requestOptions)
					.then(response => response.json())
					.then(() => getActions().getContacts())
			},
			editContact: (iDSelected) => {
				const userSelected = getStore().contacts.find(user => user.id === iDSelected)
				setStore({ userToEdit: userSelected })
				setStore({ editing: true })
			},
			editContactAPI: (name, phone, email, address, iDToEdit) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						"name": name,
						"phone": phone,
						"email": email,
						"address": address
					})
				};
				fetch(`https://playground.4geeks.com/contact/agendas/Yussef/contacts/${iDToEdit}`, requestOptions)
					.then(response => response.json())
					.then(setStore({ userToEdit: {} }))
					.then(() => getActions().getContacts())
			},
			setEditing: (value) => {
				setStore({ editing: value });
			},
			loadSomeData: async () => {

				getActions().findMyUser()
				getActions().getContacts();
			},
		}
	};
};

export default getState;
