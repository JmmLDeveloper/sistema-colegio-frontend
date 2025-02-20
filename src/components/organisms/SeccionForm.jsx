import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TextField, Button, FormControl } from "@mui/material";
import CustomForm from "../CustomForm";
import { useLocation } from "react-router-dom";

function SeccionForm({
	defaultValues = { año: "", seccion: "" },
	onSubmit = () => null,
	especial = false,
}) {

	const [año, setAño] = useState(defaultValues.año);
	const [codigo, setSeccion] = useState(defaultValues.seccion);

	const handleSubmit = async (e) => {
		e.preventDefault();
		onSubmit({ año, codigo });
	};
	return (
		<CustomForm onSubmit={handleSubmit}>
			<FormControl>
				<InputLabel id="select-label">Año</InputLabel>
				<Select
					labelId="select-label"
					id="select"
					value={año}
					label="Año"
					onChange={(e) => {
						setAño(e.target.value);
					}}
				>
					<MenuItem value={1}>1</MenuItem>
					<MenuItem value={2}>2</MenuItem>
					<MenuItem value={3}>3</MenuItem>
					<MenuItem value={4}>4</MenuItem>
					<MenuItem value={5}>5</MenuItem>
				</Select>
			</FormControl>

			<TextField
				id="outlined-basic"
				label="Sección"
				variant="outlined"
				value={codigo}
				onChange={(e) => {
					setSeccion(e.target.value);
				}}
			/>

			<Button variant="contained" type="submit">
				Enviar {/* TODO Nombre de este boton no es dinamico */}
			</Button>
		</CustomForm>
	);
}

export default SeccionForm;
