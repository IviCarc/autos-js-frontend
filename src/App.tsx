import React from "react";
import Busqueda from "./components/busqueda.tsx";
import Header from "./components/header.tsx";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
	const [listClientes, setListClientes] = useState(false);
	const [listPatentes, setListPatentes] = useState(false);
	const [listAutos, setListAutos] = useState(false);

	const getAll = async () => {
		try {
			const { clientes, autos, patentes } = await (await axios.get("http://localhost:5000/lista")).data;
			setListAutos(autos);
			setListClientes(clientes);
			setListPatentes(patentes);
		} catch (e) {
			console.log(e);
			return;
		}
	};

	useEffect(getAll, []);
	return (
		<div className="App">
			<Header></Header>
			<Busqueda
				listClientes={listClientes}
				listPatentes={listPatentes}
				listAutos={listAutos}
			></Busqueda>
		</div>
	);
};

export default App;
