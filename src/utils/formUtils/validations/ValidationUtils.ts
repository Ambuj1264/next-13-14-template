import { keyType } from "@/utils/helperUtils";
import * as Yup from "yup";
import { registrationFormModel } from "../formModals/registrationmodals";

const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
export const IMAGE_URL_REGEXT =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/;
const LINKEDIN_PROFILE_REGEX =
  /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_]+\/?$/;
const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];
const NAME_REGEX = /^[A-Za-z]+( [A-Za-z]+)*$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/;
export const emailSchemaValidation = () => {
  return Yup.string()
    .required("Email is required")
    .matches(EMAIL_REGEX, "Please enter valid email");
};
export const passwordValidation = () => {
  return Yup.string().required("Password is required");
};

export const validatePhoneNumber = () =>
  Yup.string().matches(
    /^\+?\d{6,13}$/,
    "Phone number must only contain digits and optionally start with a '+' symbol",
  );

export const schema = Yup.object().shape({
  email: emailSchemaValidation(),
  termandcondition: Yup.boolean().oneOf(
    [true],
    "You must accept terms and conditions",
  ),
});

export const loginSchema = Yup.object().shape({
  email: emailSchemaValidation(),
  password: passwordValidation(),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: emailSchemaValidation(),
});

export const resetPasswordSchema = Yup.object().shape({
  newpassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      PASSWORD_REGEX,
      "Password must include at least one uppercase letter, one lowercase letter, a number, and a special character.",
    ),
  cnfmpassword: Yup.string()
    .oneOf([Yup.ref("newpassword"), ""], "Both passwords must match")
    .required("Confirm password is required"),
});

export const passwordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current password is required"),

  password: Yup.string()
    .required("New password is required")
    .notOneOf(
      [Yup.ref("oldPassword"), null],
      "New password must not be the same as the current password",
    )
    .min(8, "Password must be at least 8 characters long")
    .matches(
      PASSWORD_REGEX,
      "Password must include at least one uppercase letter, one lowercase letter, a number, and a special character.",
    ),

  newpassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Both passwords must match")
    .required("Repeat new password is required"),
});

export const getProfileAddSchema = (hasInteractedWithUpload: boolean) => {
  let profilePictureValidation = Yup.mixed();

  if (hasInteractedWithUpload) {
    profilePictureValidation = profilePictureValidation.test(
      "type",
      "Only jpg, png, jpeg format is allowed",
      (value: any) => SUPPORTED_FORMATS.includes(value?.type),
    );
  }

  return Yup.object().shape({
    fullName: Yup.string()
      .required("Name is required")
      .matches(
        NAME_REGEX,
        "Name should contain only alphabetic characters and single spaces between names.",
      ),
    mobileNumber: validatePhoneNumber(),
    profilePicture: profilePictureValidation,
  });
};

const nameInPasswordCheck = (name: string, passwordValue: string) => {
  const lowerCaseName = name?.toLowerCase();
  const lowerCasePassword = passwordValue?.toLowerCase();
  for (let i = 0; i <= name?.length - 4; i++) {
    if (lowerCasePassword?.includes(lowerCaseName?.substring(i, i + 4))) {
      return false;
    }
  }
  return true;
};

const {
  formField: {
    fullName,
    password,
    code,
    phonenumber,
    jobRole,
    experience,
    need,
    companyname,
    companySize,
    companyindustry,
  },
} = registrationFormModel;

export const validationSchema = [
  Yup.object().shape({
    [fullName.name]: Yup.string()
      .required(`${fullName.requiredErrorMsg}`)
      .max(30, "Length of the name should not exceed 30 characters.")
      .matches(
        NAME_REGEX,
        "Name should contain only alphabetic characters and single spaces between names.",
      ),
    [password.name]: Yup.string()
      .required(`${password.requiredErrorMsg}`)
      .min(8, "Set a minimum length to prevent short passwords.")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/,
        "Password must include at least one uppercase letter, one lowercase letter, a number, and a special character.",
      )
      .notOneOf(
        ["password123", "12345678"],
        "Common passwords are not allowed.",
      )
      .test(
        "nameCheck",
        "Password cannot contain a substring of your name with a minimum length of 4 characters.",
        function (value) {
          return nameInPasswordCheck(this.parent.fullName, value);
        },
      ),
    [code.name]: Yup.string()
      .required(`${code.requiredErrorMsg}`)
      .matches(/^\+\d+$/, "You should enter a valid country code."),
    [phonenumber.name]: Yup.string()
      .required(`${phonenumber.requiredErrorMsg}`)
      .matches(/^\+?\d{6,13}$/, "You should enter a valid phone number."),
  }),
  Yup.object().shape({
    [jobRole.name]: Yup.string().required(`${jobRole.requiredErrorMsg}`),
    [experience.name]: Yup.string().required(`${experience.requiredErrorMsg}`),
    [need.name]: Yup.string().required(`${need.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [companyname.name]: Yup.string().required(
      `${companyname.requiredErrorMsg}`,
    ),
    [companySize.name]: Yup.string().required(
      `${companySize.requiredErrorMsg}`,
    ),
    [companyindustry.name]: Yup.string().required(
      `${companyindustry.requiredErrorMsg}`,
    ),
  }),
];

export const adddealschema = Yup.object().shape({
  email: Yup.string().matches(EMAIL_REGEX, "Please enter valid email"),
  name: Yup.string()
    .required(`Name is required`)
    .matches(
      NAME_REGEX,
      "Name should contain only alphabetic characters and single spaces between names.",
    )
    .max(30, "Length of the name should not exceed 30 characters."),
  organization: Yup.string()
    .required(`Organization is required`)
    .matches(
      NAME_REGEX,
      "Organization should contain only alphabetic characters and single spaces between names.",
    )
    .max(30, "Length of the name should not exceed 30 characters."),
  value: Yup.number().typeError("Value must be a number"),
  valueType: Yup.string().max(
    30,
    "Length of the name should not exceed 30 characters.",
  ),
  phone: validatePhoneNumber(),
  phoneType: Yup.string().max(
    30,
    "Length of the name should not exceed 30 characters.",
  ),
  linkedin: Yup.string()
    .required(`LinkedIn URL is required`)
    .matches(LINKEDIN_PROFILE_REGEX, "Please enter a valid LinkedIn URL"),
  leadImage: Yup.mixed()
    .required(`Image is required`)
    .test(
      "type",
      "Only jpg, png, jpeg format is allowed",
      (value: any) =>
        !value || (value && SUPPORTED_FORMATS.includes(value?.type)),
    ),
  stage: Yup.array().min(1, "Select at least one value").required("required"),
});

export const lostDealSchema = Yup.object().shape({
  lostReason: Yup.string().required(`This field is required`),
  comment: Yup.string().required(`This field is required`),
});
export const wonDealSchema = Yup.object().shape({
  comment: Yup.string().required(`This field is required`),
});
const WEBURL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;

export const dealByUserFormSchema = (name: string) => {
  if (name === "email") {
    return Yup.object().shape({
      [name]: Yup.string()
        .required(`Email is required`)
        .matches(EMAIL_REGEX, "Please enter valid email"),
    });
  }
  if (name === "phone") {
    return Yup.object().shape({
      [name]: validatePhoneNumber(),
    });
  }
  if (name === "calendly") {
    return Yup.object().shape({
      [name]: Yup.string().required(`Calendly is required`),
    });
  }
  if (name === "linkedin") {
    return Yup.object().shape({
      [name]: Yup.string()
        .required(`LinkedIn URL is required`)
        .matches(LINKEDIN_PROFILE_REGEX, "Please enter a valid LinkedIn URL"),
    });
  }
  if (name === "webURL") {
    return Yup.object().shape({
      [name]: Yup.string()
        .required(`Web URL is required`)
        .matches(WEBURL_REGEX, "Please enter valid url"),
    });
  }
  if (name === "tags") {
    return Yup.object().shape({
      [name]: Yup.array()
        .min(1, "Select at least one value")
        .required("Tags are required"),
    });
  }
};

export const probabilitySchema = Yup.object().shape({
  probability: Yup.number()
    .required("Probability is required")
    .typeError("Please enter a probability")
    .max(100, "probability must be less than or equal to 100")
    .min(0, "probability not be less than 0"),
});

export const assigneeSchema = Yup.object().shape({
  teamMembers: Yup.array()
    .min(1, "Select at least one value")
    .required("required"),
});

export const valueUpdateSchema = Yup.object().shape({
  value: Yup.number()
    .typeError("Value must be a number")
    .required("This field is required"),
  valueType: Yup.string().max(
    30,
    "Length of the name should not exceed 30 characters.",
  ),
});

export const notesSchema = Yup.object().shape({
  notes: Yup.string().required("required").trim(),
});

export const handleKeyPress = (
  event: { key: any; preventDefault: () => void },
  values: { probability: string },
) => {
  const key = event.key;
  if (
    key === keyType.E_KEY ||
    (key === keyType.DOT_KEY && values?.probability?.includes(".")) ||
    !/^[0-9]*$/.test(values?.probability)
  ) {
    event.preventDefault();
  }
};

export const createNewteamSchema = Yup.object().shape({
  teamName: Yup.string().required("Team name is required"),
  teamMembers: Yup.array()
    .min(1, "Select at least one value")
    .required("required"),
});
