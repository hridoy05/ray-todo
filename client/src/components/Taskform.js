import { Formik } from "formik";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Button, Select } from "@mui/material";
import { useState } from "react";
import axiosInstance from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { initialCreateSchema, initialEditSchema } from "../schema/formschema";

let initialValues = {
  name: "",
  type: "",
  date: dayjs().format("YYYY-MM-DD"),
  time: dayjs(),
};
const TaskForm = ({ mode = "edit", task }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.user);
  const types = ["personal", "shopping", "wishlist", "work"];
  const handleFormSubmit = (values, onSubmitProps) => {
    if (mode === "edit") {
      axiosInstance
        .put(`/api/v1/tasks/${values._id}`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          navigate("/home");
          toast.success("successfully edited");
        });
    } else {
      values.time = values.time.format("HH:mm");
      axiosInstance
        .post(`/api/v1/tasks/create`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          navigate("/home");
          toast.success("successfully created");
        });
    }
  };
  const isNotMobile = useMediaQuery("(min-width: 768px)");
  const [date, setDate] = useState("2023-05-03");
  const [time, setTime] = useState("10:55");
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={mode === "create" ? initialValues : task}
      validationSchema={
        mode === "create" ? initialCreateSchema : initialEditSchema
      }
    >
      {({
        handleSubmit,
        handleBlur,
        touched,
        resetForm,
        values,
        handleChange,
        errors,
      }) => (
        <Box p="2rem 0" m="2rem auto" width={isNotMobile ? "50%" : "90%"}>
          <Typography textAlign="center" mb="2rem">
            {mode === "create" ? "create a task" : "Edit a task"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="30px">
              <TextField
                label="Task name"
                value={values.name}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={
                    mode === "edit" ? dayjs(values.date || null) : values.date
                  }
                  minDate={mode === "edit" ? null : dayjs()}
                  onChange={(newValue) => {
                    values.date = newValue.format("YYYY-MM-DD");
                    setDate(values.date);
                  }}
                  onBlur={handleBlur}
                  name="date"
                  renderInput={(params) => (
                    <TextField {...params} helperText="Select Date" />
                  )}
                  error={Boolean(touched.date) && Boolean(errors.date)}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Time"
                  value={
                    mode === "edit"
                      ? dayjs(
                          `${values.date.split("T")[0]}T${values.time}` || null
                        )
                      : values.time
                  }
                  onChange={(newValue) => {
                    values.time = newValue;
                    console.log(newValue);
                    setTime(values.time);
                  }}
                  name="time"
                  onBlur={handleBlur}
                  error={Boolean(touched.time) && Boolean(errors.time)}
                  renderInput={(params) => (
                    <TextField {...params} helperText="Set Time" />
                  )}
                />
              </LocalizationProvider>
              <FormControl>
                <InputLabel>Select Type</InputLabel>
                <Select
                  label="Task type"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="type"
                  error={Boolean(touched.type) && Boolean(errors.type)}
                >
                  {types.map((type, idx) => (
                    <MenuItem value={type} key={`${idx}-${type}`}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel>Status</InputLabel>
                <Select
                  label="Status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="outlined"
                type="submit"
                m="2rem 0"
                p="1rem 0"
                background="#00D5FA"
              >
                {mode === "edit" ? "Edit Task" : "Create Task"}
              </Button>
            </Box>
          </form>
        </Box>
      )}
    </Formik>
  );
};

export default TaskForm;
