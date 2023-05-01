import React from "react";
import { getEstudiantes } from "../../api/admin_estudiantes";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { Estudiantes_table } from "../../components/tables/EstudiantesTable";
import TablaBusqueda from "../../components/tables/GenericSearchTable";

import EditIcon from "@mui/icons-material/Edit";

function SeccionEstudiantes() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [estudiante, setEstudiante] = useState([]);

  const inputHandler = ({ target }) => {
    let lowerCase = target.value.toLowerCase();
    setText(lowerCase);
  };

  useEffect(() => {
    const fetchProfesores = async () => {
      let estudiantesRes = await getEstudiantes(id);
      let estudianteRes = estudiantesRes.map((estudiante) => {
        return {
          ...estudiante,
          nombre: `${estudiante.nombre} ${estudiante.apellido}`,
        };
      });
      setEstudiante(estudianteRes);
    };
    fetchProfesores();
  }, []);

  const Acciones = ({ cell }) => {
    return (
      <EditIcon
        onClick={() => {
          navigate(`${cell.row.original.id}/modificar`, {
            state: {
              nombre: cell.row.original.nombre,
              apellido: cell.row.original.apellido,
              id: cell.row.original.id,
            },
          });
        }}
      />
    );
  };

  return (
    <>
      <br></br>

      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Buscar profesores"
        onChange={inputHandler}
      />

      <br></br>
      <br></br>

      <TablaBusqueda
        input={text}
        datos={estudiante}
        nombre={"INFO_ESTUDIANTE"}
        acciones={Acciones}
      />
    </>
  );
}

export default SeccionEstudiantes;
