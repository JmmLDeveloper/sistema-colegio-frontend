import { Backdrop, CircularProgress, css } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { setName } from "../store/features/main";

function AuthComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loadingBackdrop = useSelector( state => state.main.loading )

  if (sessionStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;
  }

  const token = sessionStorage.getItem("token");
  const userType = sessionStorage.getItem("user-type");
  const name = sessionStorage.getItem("name") || "";

  useEffect(() => {
    dispatch(setName(name));
  }, []);

  useEffect(() => {
    if (token && userType && name) {
      // there was prev login
      if (location.pathname == "/") {
        if (userType == "Profesor") {
          navigate("/dashboard-profesor", { replace: true });
        } else {
          navigate("/dashboard-control", { replace: true });
        }
      } else if (
        userType == "Profesor" &&
        location.pathname.startsWith("/dashboard-control")
      ) {
        navigate("/dashboard-profesor", { replace: true });
      } else if (
        userType == "Administrador" &&
        location.pathname.startsWith("/dashboard-profesor")
      ) {
        navigate("/dashboard-control", { replace: true });
      }
    } else if (location.pathname != "/login") {
      // i am not logged and i am not in login
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <>
      <Backdrop
        css={css` z-index:3000; `}
        open={loadingBackdrop}
      >
        <CircularProgress css={css`svg{ color:#EEE; } `}  />
      </Backdrop>
      <Outlet />
    </>
  );
}

export default AuthComponent;
