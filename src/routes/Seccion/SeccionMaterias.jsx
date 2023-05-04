import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClases } from "../../api/getClases";
import SeccionClases from "../../components/tables/SeccionClases";

function SeccionMaterias() {
  const [materias, setMaterias] = useState([]);
  const [clases, setClases] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfesores = async () => {
      const Res = await getClases(id);
      setClases(Res);
      Res.map(({ materia }) => {
        setMaterias((materias) => [...materias, materia]);
      });
    };

    fetchProfesores();
  }, []);

  return (
    <>
      <Typography> Adminstración de secciones</Typography>

      <Typography>Listado</Typography>

      <SeccionClases InfoMaterias={clases} />
    </>
  );
}

export default SeccionMaterias;
