import * as React from "react";
import { useState } from "react";
import axios from "axios";
import "./busqueda.scss";
import Nuevo from "./nuevo";
import mapFunc from "./functions/funcs";
import Header from "./header";

const Busqueda = (props) => {
	const [cliente, setCliente] = useState("");
	const [patente, setPatente] = useState("");
	const [data, setData] = useState(false);
	const [error, setError] = useState(0);
	const [errMsg, setErrMsg] = useState("");

	const send = async (e, valueSending) => {
		e.preventDefault();
		const value = e.target.value;
		let url;
		if (valueSending === 1) {
			url = `http://localhost:5000/cliente/${value}`;
			setErrMsg(`El cliente '${value}' no existe`);
		} else {
			url = `http://localhost:5000/patente/${value}`;
			setErrMsg(`La patente '${value}' no existe`);
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
			<Header
				listClientes={props.listClientes}
				listPatentes={props.listPatentes}
				listAutos={props.listAutos}
				send={send}
			/>
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
				{error === 400 && <h2 style={{ color: "red", textAlign: "center" }}>{errMsg}</h2>}
				{error === 503 && <h2 style={{ color: "red", textAlign: "center" }}>{errMsg}</h2>}
			</div>
		</div>
	);
};

export default Busqueda;
