import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const AddEditContact = () => {
	const { store, actions } = useContext(Context);
	const [fullName, setFullName] = useState(store.userToEdit?.name || "");
	const [email, setEmail] = useState(store.userToEdit?.email || "");
	const [phone, setPhone] = useState(store.userToEdit?.phone || "");
	const [address, setAddress] = useState(store.userToEdit?.address || "");
	const [contactAdded, setContactAdded] = useState(false);
	const [formValid, setFormValid] = useState(false);

	const addContacts = (e) => {
		e.preventDefault()
		if (fullName.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && address.trim() !== "") {
			actions.addContactsAPI(fullName, phone, email, address)
			setFullName("")
			setEmail("")
			setPhone("")
			setAddress("")
			setContactAdded(true)
		}
	}

	const editContactInForm = (e) => {
		e.preventDefault()
		if (fullName.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && address.trim() !== "") {
			actions.editContactAPI(fullName, phone, email, address, store.userToEdit.id)
			setContactAdded(true)
			actions.setEditing(false)
		}
	}

	useEffect(() => {
		if (fullName.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && address.trim() !== "") setFormValid(true);
		else setFormValid(false)
	}, [fullName, email, phone, address])

	return (
		<div className="container mt-5">
			{!store.editing ? <h1 className="text-center">Add a new contact</h1>
				:
				<h1 className="text-center">Edit a contact</h1>
			}
			{!formValid && !contactAdded &&
				<div className="alert alert-danger fw-bold" role="alert">
					Some fields are missing
				</div>}
			{contactAdded &&
				<div className="alert alert-success fw-bold" role="alert">
					Your contact was added successfully!
				</div>}
			<form>
				<div className="mb-3 ">
					<label htmlFor="fullName" className="form-label">Full Name</label>
					<input type="text" className="form-control" onChange={(e) => setFullName(e.target.value)} value={fullName} id="fullName" placeholder="Name and last name" />
				</div>
				<div className="mb-3">
					<label htmlFor="emailAddress" className="form-label">Email</label>
					<input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} id="emailAddress" placeholder="name@example.com" />
				</div>
				<div className="mb-3">
					<label htmlFor="phone" className="form-label">Phone</label>
					<input type="text" className="form-control" onChange={(e) => setPhone(e.target.value)} value={phone} id="phone" placeholder="+34 678 123 456" />
				</div>
				<div className="mb-3">
					<label htmlFor="address" className="form-label">Address</label>
					<input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} value={address} id="address" placeholder="Enter your address" />
				</div>
				{!store.editing ? <button onClick={addContacts} className="btn btn-primary w-100 fw-bold">Save</button>
					:
					<button onClick={editContactInForm} className="btn btn-primary w-100 fw-bold">Save changes</button>
				}
			</form>
			<Link to="/">
				or get back to contacts
			</Link>
		</div>
	);
};
