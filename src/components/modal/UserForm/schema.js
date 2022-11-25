import * as yup from "yup";

const contactRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

export const schema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required('Required'),
  contacts: yup.string().required('Require').matches(contactRegex, "Invalid Contact Number. e.g 0123456789"),
  });

export const userObject = {
  firstname: '',
  lastname: '',
  contacts: '',
  id: ''
}