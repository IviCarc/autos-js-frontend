import "./header.scss";
import * as React from "react";

function Header(props) {
	return (
		<div className="header">
			<div className="forms-container">
				<form action="">
					<input
						placeholder="Cliente"
						onChange={(e) => props.send(e, 1)}
						autoComplete="off"
						list="clientes-datalist"
						type="text"
						name="cliente"
					/>
					<datalist id="clientes-datalist">
						{props.listClientes &&
							props.listClientes.map((obj, i) => <option key={i}>{obj}</option>)}
					</datalist>
				</form>
				<form action="">
					<input
						placeholder="Patente"
						onChange={(e) => props.send(e, 2)}
						autoComplete="off"
						list="patentes-datalist"
						type="text"
						name="cliente"
					/>
					<datalist id="patentes-datalist">
						{props.listPatentes &&
							props.listPatentes.map((obj, i) => <option key={i}>{obj}</option>)}
					</datalist>
				</form>
			</div>
		</div>
	);
}

export default Header;
