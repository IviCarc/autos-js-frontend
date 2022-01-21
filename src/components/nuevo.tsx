import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import mapFunc from "./functions/funcs";
import "./nuevo.scss";

const Nuevo = (props) => {
	const [data, setData] = useState(false);
	const [error, setError] = useState(false);

	const [inputs, setInputs] = useState({
		cliente: { value: "", valid: false },
		auto: { value: "", valid: false },
		trabajo: { value: "", valid: false },
		km: { value: "", valid: false },
		fecha: { value: "", valid: false },
		patente: { value: "", valid: false },
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

	const regexs = {
		cliente: /[a-z]{3,}-?$/,
		auto: /[a-z]{3,}-?[0-9]{0,}$/,
		trabajo: /^\w{3,}/,
		km: /(^\d{3,}$)|(^0$)/,
		fecha: /(^\d{4}-\d{2}-\d{2}$)|(^desconocida$)/,
		patente: /(^[a-z]{3}-\d{3}$)|(^[a-z]{2}-\d{3}-[a-z]{2}$)|(^desconocida$)/,
	};

	const validateInputs = (e) => {
		if (regexs[e.target.name].test(inputs[e.target.name].value)) {
			console.log("VALID");
			inputs[e.target.name].valid = true;
			e.target.classList.add("valid");
			e.target.classList.remove("invalid");
		} else {
			inputs[e.target.name].valid = false;
			e.target.classList.add("invalid");
			e.target.classList.remove("valid");
		}
	};

	const sendData = async (e) => {
		e.preventDefault();

		interface Data {
			cliente: string;
			auto: string;
			trabajo: string;
			km: number;
			fecha: string;
			patente: string;
		}

		function CreateDataObj(): Data {
			return {
				cliente: "",
				auto: "",
				trabajo: "",
				km: 0,
				fecha: "",
				patente: "",
			};
		}

		let data = CreateDataObj();

		for (const key in inputs) {
			if (inputs[key].valid === false) return;

			console.log("VALID");

			if (key === "km") data[key] = parseInt(inputs[key].value);
			else data[key] = inputs[key].value;
		}

		console.log("DATA OBJECT", data);
		try {
			data = await axios.post("http://localhost:5000/nuevo", data);
		} catch (e) {
			console.log(e);
			return;
		}
	};

	return (
		<div className="nuevo-container">
			<ul className="datos-ul">
				<li className="datos-li">
					<input
						onBlur={validateInputs}
						onKeyUp={validateInputs}
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
						onBlur={validateInputs}
						onKeyUp={validateInputs}
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
					<input
						onBlur={validateInputs}
						onKeyUp={validateInputs}
						name="trabajo"
						onChange={onChange}
						className="datos-input"
						type="text"
					/>
				</li>
				<li className="datos-li">
					<input
						onBlur={validateInputs}
						onKeyUp={validateInputs}
						autoComplete="off"
						name="km"
						onChange={onChange}
						className="datos-input"
						type="text"
					/>
				</li>
				<li className="datos-li">
					<input
						onBlur={validateInputs}
						onKeyUp={validateInputs}
						autoComplete="off"
						name="fecha"
						onChange={onChange}
						className="datos-input"
						type="text"
					/>
				</li>
				<li className="datos-li">
					<input
						onBlur={validateInputs}
						onKeyUp={validateInputs}
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
		</div>
	);
};

export default Nuevo;
