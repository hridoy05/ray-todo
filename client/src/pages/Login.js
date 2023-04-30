import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import axios from "../services/api";
import { setLogin } from "../redux/UserSlice";
import { toast } from "react-toastify";

const initialRegisterValues = {
  name: "",
  email: "",
  password: "",
};

const initialLoginValues = {
  email: "",
  password: "",
};

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Not valid").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Required"),
});

const loginScehma = Yup.object().shape({
  email: Yup.string().email("Not valid").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Required"),
});

const Login = () => {
  const [page, setPage] = useState("login");
  const [enable, setEnable] = useState(false);
  const isLogin = page === "login";
  const isRegister = page === "register";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery("(min-width:768px)");

  const handleLogin = (values, onSubmitProps) => {
    setEnable(true);
    axios
      .post("/api/v1/auth/login", values)
      .then((res) => {
        onSubmitProps.resetForm();
        dispatch(setLogin({ user: res.data.user, token: res.data.token }));
        navigate("/home");
        toast.success("Login successful!");
        setEnable(false);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          toast(err.response.data.message);
        } else {
          toast("Something went wrong!");
        }
        setEnable(false);
      });
  };

  const handleRegister = (values, onSubmitProps) => {
    setEnable(true);
    try {
      axios
        .post("/api/v1/auth/register", values)
        .then((res) => {
          onSubmitProps.resetForm();
          setPage("login");
          toast.success("registration successful!");
          setEnable(false);
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            toast.error(err.response.data.message);
          }
          setEnable(false);
        });
    } catch (err) {
      toast.error("something erroe");
    }
  };

  const handleForm = (values, onSubmitProps) => {
    if (isLogin) handleLogin(values, onSubmitProps);
    if (isRegister) handleRegister(values, onSubmitProps);
  };

  return (
    <Formik
      initialValues={isLogin ? initialLoginValues : initialRegisterValues}
      validationSchema={isLogin ? loginScehma : registerSchema}
      onSubmit={handleForm}
    >
      {({
        handleSubmit,
        handleBlur,
        touched,
        setFieldValue,
        values,
        handleChange,
        resetForm,
        errors,
      }) => (
        <Box p="2rem 0" m="2rem auto" width={isNotMobile ? "50%" : "90%"}>
          <Typography textAlign="center" mb="2rem">
            Welcome to Taskup
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="30px">
              {isRegister && (
                <>
                  <TextField
                    label="Enter name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </>
              )}
              <TextField
                label="Enter email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                label="Enter password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                m="2rem 0"
                sx={{
                  backgroundColor: "black",
                  padding: "5px",
                  width: "60%",
                  margin: "0 auto",
                  color: "white",
                }}
                disabled={enable}
              >
                {isLogin ? "Login" : "Register"}
              </Button>
              <Typography
                onClick={() => {
                  setPage(isLogin ? "register" : "login");
                  resetForm();
                }}
                variant="h6"
                textAlign="center"
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                {isLogin ? (
                  <Box
                    sx={{
                      backgroundColor: "black",
                      padding: "5px",
                      width: "60%",
                      margin: "0 auto",
                      color: "white",
                    }}
                  >
                    Not a user, go to register
                  </Box>
                ) : (
                  <Box
                    sx={{
                      backgroundColor: "black",
                      padding: "5px",
                      width: "60%",
                      margin: "0 auto",
                      color: "white",
                    }}
                  >
                    Already a user, go to login
                  </Box>
                )}
              </Typography>
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
};
export default Login;
