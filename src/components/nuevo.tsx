import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import mapFunc from "./functions/funcs";
import "./nuevo.scss";

const Nuevo = (props) => {
	const [data, setData] = useState(false);
	const [error, setError] = useState(false);

	const [inputs, setInputs] = useState({
		cliente: { value: "", valid: null },
		auto: { value: "", valid: null },
		trabajo: { value: "", valid: null },
		km: { value: "", valid: null },
		fecha: { value: "", valid: null },
		patente: { value: "", valid: null },
	});

	const onChange = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setInputs({
			...inputs,
			[inputName]: {
				...inputs[inputName],
				value: inputValue,
			},
		});
	};

	const sendData = async (e) => {
		e.preventDefault();
		let data = {};
		for (const key in inputs) data[key] = inputs[key].value;
		console.log("DATA OBJECT", data);
		try {
			data = await axios.post("http://localhost:5000/nuevo", data);
		} catch (e) {
			console.log(e);
			return;
		}

		console.log("AUTO AGREGADO");
	};

	return (
		<>
			<ul className="datos-ul">
				<li className="datos-li">
					<input
						autoComplete="off"
						name="cliente"
						list="cliente-datalist"
						onChange={onChange}
						className="datos-input"
						type="text"
					/>
					<datalist id="cliente-datalist">
						{props.listClientes &&
							props.listClientes.map((obj, i) => <option key={i}>{obj}</option>)}
					</datalist>
				</li>
				<li className="datos-li">
					<input
						autoComplete="off"
						list="auto-datalist"
						name="auto"
						onChange={onChange}
						className="datos-input"
						type="text"
					/>
					<datalist id="auto-datalist">
						{props.listAutos && props.listAutos.map((obj, i) => <option key={i}>{obj}</option>)}
					</datalist>
				</li>
				<li className="datos-li">
					<input name="trabajo" onChange={onChange} className="datos-input" type="text" />
				</li>
				<li className="datos-li">
					<input
						autoComplete="off"
						name="km"
						onChange={onChange}
						className="datos-input"
						type="text"
					/>
				</li>
				<li className="datos-li">
					<input
						autoComplete="off"
						name="fecha"
						onChange={onChange}
						className="datos-input"
						type="text"
					/>
				</li>
				<li className="datos-li">
					<input
						autoComplete="off"
						list="patente-datalist"
						name="patente"
						onChange={onChange}
						className="datos-input"
						type="text"
					/>
					<datalist id="patente-datalist">
						{props.listPatentes &&
							props.listPatentes.map((obj, i) => <option key={i}>{obj}</option>)}
					</datalist>
				</li>
			</ul>
			<button className="datos-btn send-btn" onClick={sendData}>
				Cargar
			</button>
		</>
	);
};

export default Nuevo;
