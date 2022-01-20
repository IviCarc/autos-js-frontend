import React from "react";
import Busqueda from "./components/busqueda";
import Header from "./components/header.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
	const [autocmpDataClients, setAutocmpDataClients] = useState(false);
	const [autocmpDataPatentes, setAutocmpDataPatentes] = useState(false);
	const [autocmpDataAutos, setAutocmpDataAutos] = useState(false);

	const getAll = async () => {
		try {
			const res = await (await axios.get(`http://localhost:5000/lista/clientes`)).data;
			setAutocmpDataClients(res);
		} catch (e) {
			setAutocmpDataClients(false);
			console.log(e);
		}
		try {
			const res = await (await axios.get(`http://localhost:5000/lista/patentes`)).data;
			setAutocmpDataPatentes(res);
		} catch (e) {
			setAutocmpDataPatentes(false);
			console.log(e);
		}

		try {
			const res = await (await axios.get(`http://localhost:5000/lista/autos`)).data;
			setAutocmpDataAutos(res);
		} catch (e) {
			setAutocmpDataAutos(false);
			console.log(e);
		}
	};

	useEffect(getAll, []);
	return (
		<div className='App'>
			<Header></Header>
			<Busqueda
				autocmpDataClients={autocmpDataClients}
				autocmpDataPatentes={autocmpDataPatentes}
				autocmpDataAutos={autocmpDataAutos}
			></Busqueda>
		</div>
	);
};

export default App;
