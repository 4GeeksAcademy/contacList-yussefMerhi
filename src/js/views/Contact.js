import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

import profileImage from "../../img/profile-image.jpg"

export const Contact = () => {
	const { store, actions } = useContext(Context);
	let contactID = 11

	useEffect(() => {
		actions.setEditing(false);
	}, [])

	return (
		<div className="container">
			<div className="my-4 d-flex justify-content-end">
				<Link to="/addEditContact">
					<button className="btn btn-success fw-bold">Add New Contact</button>
				</Link>
			</div>
			<ul className="list-group row">
				{store.contacts.map((contact, index) =>
					<li
						key={index}
						className="list-group-item d-flex contact col-12"
					>
						<img src={profileImage} alt="Profile" className="img-profile rounded-circle" />
						<div className="d-flex flex-column justify-content-center ms-3 ms-xl-5">
							<div className="fw-bold mb-1">{contact.name}</div>
							<div>
								<i className="fa-solid fa-phone me-xl-3"></i>
								{contact.phone}
							</div>
							<div>
								<i className="fa-solid fa-envelope me-xl-3"></i>
								{contact.email}
							</div>
							<div>
								<i className="fa-solid fa-location-dot me-xl-3"></i>
								{contact.address}
							</div>
						</div>
						<div className="ms-auto">
							<Link to="/addEditContact">
								<i className="fa-solid fa-pencil btn ms-auto" onClick={() => actions.editContact(contact.id)}></i>
							</Link>
							<i className="fa-solid fa-trash-can btn" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => contactID = contact.id}></i>
						</div>
					</li>
				)}
			</ul>
			<div className="modal" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="deteleModalLabel">Are you sure?</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							They could be a very important person in your future, really?
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">I'm gonna think it better...</button>
							<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => actions.deleteContact(contactID)}>Do it!</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

