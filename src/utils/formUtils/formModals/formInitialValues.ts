import { registrationFormModel } from "./registrationmodals";
export interface FormFields {
  [key: string]: string | boolean | number;
}

const {
  formField: {
    fullName,
    password,
    code,
    phonenumber,
    helpfulTips,
    termandcondition,
    jobRole,
    experience,
    need,
    companyname,
    companySize,
    companyindustry,
  },
} = registrationFormModel;

const formFields: FormFields = {
  [fullName.name]: "",
  [password.name]: "",
  [code.name]: "",
  [phonenumber.name]: "",
  [helpfulTips.name]: false,
  [termandcondition.name]: false,
  [jobRole.name]: "",
  [experience.name]: "",
  [need.name]: "",
  [companyname.name]: "",
  [companySize.name]: "",
  [companyindustry.name]: "",
};

export default formFields;
