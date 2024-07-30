import { ROUTE_NAMES } from "@/shared/routeNames";
import { WorkOption } from "@/types/global";
import { dateHandler } from "./helperUtils";

export const SideBarData = [
  {
    url: "/assets/icons/logo.svg",
    routerPath: ROUTE_NAMES.DASHBOARD,
    title: "Dashboard",
  },
  {
    url: "/assets/icons/mdi_deal-outline.svg",
    routerPath: ROUTE_NAMES.DEALS,
    title: "Deals",
  },
  {
    url: "/assets/icons/mingcute_schedule-line.svg",
    routerPath: ROUTE_NAMES.SCHEDULE_POST,
    title: "Schedule posts",
  },
  {
    url: "/assets/icons/majesticons_puzzle-line.svg",
    routerPath: ROUTE_NAMES.COMINGSOON,
    title: "Integrations",
  },
  {
    url: "/assets/icons/Frame 17.svg",
    routerPath: ROUTE_NAMES.COMINGSOON,
    title: "Coming Soon",
  },
  {
    url: "/assets/icons/ion_diamond-outline.svg",
    routerPath: ROUTE_NAMES.COMINGSOON,
    title: "Gems",
  },
  {
    url: "/assets/icons/mdi_rocket-outline.svg",
    routerPath: ROUTE_NAMES.ACCELERATOR,
    title: "Accelerator",
  },
];

export const MorInformationDeals = [
  {
    iconRight: "/assets/icons/arrowRight.svg",
    iconLeft: "/assets/icons/Vector.svg",
    leftTitle: "Deated deals:",
    alt: "Handhsake",
    rightTitle: " Go to deals section",
    routerPath: "#!",
  },
  {
    iconRight: "/assets/icons/arrowRight.svg",
    iconLeft: "/assets/icons/Vector (1).svg",
    alt: "Handhsake",
    leftTitle: "Lost deals:",
    rightTitle: " Go to deals section",
    routerPath: "#!",
  },
  {
    iconRight: "/assets/icons/arrowRight.svg",
    iconLeft: "/assets/icons/Vector (2).svg",
    leftTitle: "Remaining deals:",
    alt: "Handhsake",
    rightTitle: " Go to deals section",
    routerPath: "#!",
  },
];
export const FeatureLinksItem = [
  {
    name: "Terms of Service",
    routerPath: "#",
  },
  {
    name: "Privacy Notice",
    routerPath: "#",
  },
  {
    name: "Site map",
    routerPath: "#",
  },
  {
    name: "Cookie Notice",
    routerPath: "#",
  },
  {
    name: "Cookies Settings",
    routerPath: "#",
  },
];

export enum loinAndSignUpVariable {
  signupUrlEndpoint = "/signup",
  loginUrlEndpoint = "/login",
  loginType = "LINKEDIN",
  userIsAlreadyRegister = "User is Already Register",
  scope = "profile email openid",
  windowObject = "object",
  somethingWentWrong = "Something Went Wrong",
  linkedinAuthToken = "LINKEDIN_AUTH_TOKEN",
  jwtToken = "JWT_TOKEN",
  signupSuccessful = "Signup successful",
  emailIsAlreadyRegister = "Email is Already Register",
  loginSuccessful = "Login successful",
  loginNotSuccessful = "Login is not successful",
  userIsNotFind = "USER IS NOT FIND",
  userIsNotFindSignup = "User is not found please Sign up",
  requiredEmailAndPassword = "Please filled the all credentials",
  email = "email",
  Email = "Email",
  password = "password",
  Password = "Password",
  emailIsRequired = "Email is required",
  passworldIsRequired = "Password is required",
  emailAndPasswordNotMacthed = "Email and password do not match",
}
export const EvolutionProgressData = [
  {
    url: "/assets/icons/Rectangleblue.svg",
    status: "In progress",
    billing: "58,550.00€",
    NumbersOfDeals: "65",
  },
  {
    url: "/assets/icons/Rectanglegreen.svg",
    status: "Won",
    billing: "12,630.00€",
    NumbersOfDeals: "20",
  },
  {
    url: "/assets/icons/Rectanglegray.svg",
    status: "Estimated billing",
    billing: "80,000€",
    NumbersOfDeals: "100",
  },
];

export const ProgressOfDeals = [
  {
    status: "Leads",
    billing: "43,200€",
  },
  {
    status: "Contact Made",
    billing: "10,000€",
  },
  {
    status: "Demo Scheduled",
    billing: "7,500€",
  },
  {
    status: "Proposal Made",
    billing: "7,500€",
  },
  {
    status: "Negotiations",
    billing: "1,980€",
  },
];

export const Counterdata = [
  {
    title: "Billing",
    percentage: "206.4%",
    billingamount: "12,630.00€",
    src: "/assets/icons/Vector (3).svg",
    alt: "Icons",
    status: true,
  },
  {
    title: "Number of leads obtained",
    percentage: "130.2%",
    billingamount: "49",
    src: "/assets/icons/Vector (4).svg",
    alt: "Icons",
    status: false,
  },
  {
    title: "Number of leads closed",
    percentage: "100%",
    billingamount: "20",
    src: "/assets/icons/Vector (3).svg",
    alt: "Icons",
    status: true,
  },
];

export const workOption: WorkOption[] = [
  {
    label: "Work",
    value: "Work",
  },
  {
    label: "Mobile",
    value: "Mobile",
  },
];

export const valueOption = [
  {
    label: "Euro (EUR)",
    value: "Euro (EUR)",
  },
  {
    label: "US Dollar (USD)",
    value: "US Dollar (USD)",
  },
  {
    label: "Pound (GBP)",
    value: "Pound (GBP)",
  },
];

export const lostReasons = [
  {
    label: "Low Budget",
    value: "Low Budget",
  },
  {
    label: "Bad Solution",
    value: "Bad Solution",
  },
  {
    label: "Undefined",
    value: "Undefined",
  },
  {
    label: "Competitor",
    value: "Competitor",
  },
];

export const dateOptions = [
  {
    value: "Current month",
    label: "Current month",
    fieldvalue: dateHandler("Current month"),
  },
  {
    value: "Last month",
    label: "Last month",
    fieldvalue: dateHandler("Last month"),
  },
  {
    value: "Last quarter",
    label: "Last quarter",
    fieldvalue: dateHandler("Last quarter"),
  },
  {
    value: "Last year",
    label: "Last year",
    fieldvalue: dateHandler("Last year"),
  },
  {
    value: "Historical",
    label: "Historical",
    fieldvalue: dateHandler("Historical"),
  },
];

export const calenderName = {
  Daily: "daily",
  Weekly: "weekly",
  Monthly: "monthly",
};

export const schedulePostOption = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Scheduled",
    value: "Scheduled",
  },
  {
    label: "Posted",
    value: "Posted",
  },
  {
    label: "Failed",
    value: "Failed",
  },
  {
    label: "Drafts",
    value: "Drafts",
  },
];

export const schedulePostmember = [
  {
    label: "All members",
    value: "All members",
  },
  {
    label: "Team: Walid A...",
    value: "Team: Walid A...",
  },
  {
    label: "Team: Mencia...",
    value: "Team: Mencia...",
  },
];

export const AddtoPostData = {
  id: "34191399-d848-4599-ba03-530d1f8d0f38",
  userId: "ee80bf3a-d7ff-4229-913d-c1973c9a3f81",
  name: "dfgdfg",
  organization: "dfgdfg",
  value: "",
  valueType: "Euro (EUR)",
  stage: {
    id: "6726d876-2516-43f2-b817-e1181451d964",
    boardName: "Proposal Made",
    boardConstraint: "PROPOSAL_MADE",
    __typename: "KanbanBoard",
  },
  email: "",
  phone: "",
  phoneType: "Work",
  linkedin: "https://www.linkedin.com/in/hemant-kumar-sasdsdhu-198431192/",
  calendly: "",
  webURL: null,
  tags: [],
  teamMembers: [],
  leadImage:
    "https://socialmotion-app.s3.eu-north-1.amazonaws.com/leadImage//estimate.png",
  expectedCloseDate: "2023-11-25",
  createdAt: "2023-11-01T08:07:51.092Z",
  dealManagement_isDeleted: null,
  dealManagement_isWon: null,
  dealManagement_isLost: null,
  __typename: "Deal",
};

interface DataItem {
  id: number;
  name: string;
  image: string;
}
export const MultiProfileCheckData: DataItem[] = [
  {
    id: 0,
    name: "Elizabeth Miller",
    image: "/assets/images/user.png",
  },
  {
    id: 1,
    name: "Oliver Brown",
    image: "/assets/images/user.png",
  },
  {
    id: 2,
    name: "Oliver Jones",
    image: "/assets/images/user.png",
  },
  {
    id: 3,
    name: "John Oliver",
    image: "/assets/images/user.png",
  },
  {
    id: 4,
    name: "John Oliver",
    image: "/assets/images/user.png",
  },
  {
    id: 5,
    name: "John Oliver",
    image: "/assets/images/user.png",
  },
];
