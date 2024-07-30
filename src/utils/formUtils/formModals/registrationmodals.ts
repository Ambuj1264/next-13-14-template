export const registrationFormModel = {
  formId: "registrationForm",
  formField: {
    fullName: {
      name: "fullName",
      label: "Name*",
      requiredErrorMsg: "This field is required",
    },
    password: {
      name: "password",
      label: "Password*",
      requiredErrorMsg: "This field is required",
    },
    code: {
      name: "countryCode",
      label: "Code*",
      requiredErrorMsg: "This field is required",
    },
    phonenumber: {
      name: "mobileNumber",
      label: "Phone Number*",
      requiredErrorMsg: "This field is required",
    },
    helpfulTips: {
      name: "helpfulTips",
      label: "Get helpful tips, product updates and exclusive offers via email",
    },
    termandcondition: {
      name: "termandcondition",
      label:
        "By signing up, you accept our Terms of service and Privacy Notice",
    },
    jobRole: {
      name: "jobRole",
      label: "Which title describes job role best?",
      requiredErrorMsg: "This option is required",
    },
    experience: {
      name: "experience",
      label: "What is your experience?",
      requiredErrorMsg: "This option is required",
    },
    need: {
      name: "firstWishlist",
      label: '"What do you want to do first?"*',
      requiredErrorMsg: "This field is required",
    },
    companyname: {
      name: "companyName",
      label: "Company Name*",
      requiredErrorMsg: "This field is required",
    },
    companySize: {
      name: "companySize",
      label: "How big is your company?",
      requiredErrorMsg: "This option is required",
    },
    companyindustry: {
      name: "industry",
      label: "Company industry*",
      requiredErrorMsg: "This option is required",
    },
  },
};
