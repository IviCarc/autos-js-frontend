import * as React from "react";
import { useState } from "react";
import axios from "axios";
import "./busqueda.scss";
import Nuevo from "./nuevo";
import mapFunc from "./functions/funcs";

const Busqueda = (props) => {
	const [cliente, setCliente] = useState("");
	const [patente, setPatente] = useState("");
	const [data, setData] = useState(false);
	const [error, setError] = useState(0);
	const [errMsg, setErrMsg] = useState("");

	const onChangeCliente = (e) => {
		setCliente(e.target.value);
	};
	const onChangePatente = (e) => {
		setPatente(e.target.value);
	};

	const send = async (e, valueSending) => {
		e.preventDefault();
		let url;
		if (valueSending === 1) {
			url = `http://localhost:5000/cliente/${cliente}`;
			setErrMsg(`El cliente '${cliente}' no existe`);
		} else {
			url = `http://localhost:5000/patente/${patente}`;
			setErrMsg(`La patente '${patente}' no existe`);
		}
		let res;
		try {
			res = await (await axios.get(url)).data;
		} catch (e) {
			setData(false);
			try {
				setError(e.response.status);
			} catch (e) {
				setError(503);
				setErrMsg(`El servidor no se encuentra disponible`);
			}
			return;
		}
		setData(res);
		setError(0);
	};

	return (
		<div className="cliente">
			<header className="header">
				<form action="">
					<label htmlFor="cliente">Nombre del cliente:</label>
					<input
						onChange={onChangeCliente}
						autoComplete="off"
						list="clientes-datalist"
						type="text"
						name="cliente"
					/>
					<datalist id="clientes-datalist">
						{props.listClientes &&
							props.listClientes.map((obj, i) => <option key={i}>{obj}</option>)}
					</datalist>
					<button onClick={(e) => send(e, 1)}>Buscar</button>
				</form>
				<form action="">
					<label htmlFor="cliente">Patente:</label>
					<input
						onChange={onChangeCliente}
						autoComplete="off"
						list="patentes-datalist"
						type="text"
						name="cliente"
					/>
					<datalist id="patentes-datalist">
						{props.listPatentes &&
							props.listPatentes.map((obj, i) => <option key={i}>{obj}</option>)}
					</datalist>
					<button onClick={(e) => send(e, 0)}>Buscar</button>
				</form>
			</header>
			<div className="datos-container">
				<ul className="datos-ul titulos">
					<li className="datos-li titulo">Cliente</li>
					<li className="datos-li titulo">Auto</li>
					<li className="datos-li titulo" id="trabajo">
						Trabajo
					</li>
					<li className="datos-li titulo">Km</li>
					<li className="datos-li titulo">Fecha</li>
					<li className="datos-li titulo">Patente</li>
				</ul>
				<Nuevo
					listClientes={props.listClientes}
					listPatentes={props.listPatentes}
					listAutos={props.listAutos}
				></Nuevo>

				{data && mapFunc(data)}
			</div>

			{error === 400 && <h2 style={{ color: "red", textAlign: "center" }}>{errMsg}</h2>}
			{error === 503 && <h2 style={{ color: "red", textAlign: "center" }}>{errMsg}</h2>}
		</div>
	);
};

export default Busqueda;
