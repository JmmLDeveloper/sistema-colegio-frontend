import { css, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { crearClase } from "api/creartClase";
import ClaseForm from "components/organisms/ClaseForm";
import { setLoading } from "store/features/main";
import { addClase } from "store/features/profesorClases";

function CrearClase() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		dispatch(setLoading(true));
		const response = await crearClase({
			profesorId: state.profesor.id,
			materiaId: parseInt(data.materia),
			seccionId: parseInt(data.seccion),
		});
		dispatch(setLoading(false));

		if (response.status == 200) {
			dispatch(
				addClase({
					profesorId: state.profesor.id,
					clase: {
						...response.data,
						seccion: data.seccionObj,
						materia: data.materiaObj,
					},
				})
			);
			navigate(-1);
		} else {
			if (
				response.data.errors.some(
					(error) => error.field === "all" && error.rule === "duplicate"
				)
			) {
				return "dup-error";
			}
		}
	};

	return (
		<>
			<Typography variant="h2">Administracion de clases</Typography>
			<Typography variant="subtitle1">Creación de clase</Typography>
			<Typography variant="subtitle1">
				Profesor: {state?.profesor?.nombre} {state?.profesor?.apellido}
			</Typography>

			<ClaseForm onSubmit={onSubmit} />
		</>
	);
}

export default CrearClase;
