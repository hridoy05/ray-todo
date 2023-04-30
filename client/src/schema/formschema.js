import * as Yup from "yup";
export const initialEditSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  date: Yup.string().required("required"),
  type: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
  status: Yup.string().required("Required"),
});

export const initialCreateSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  date: Yup.string().required("required"),
  type: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
});
