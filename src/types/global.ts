export type LocalStorageKey = "AUTH_TOKEN" | "user";

export interface IAuth {
  isLoggedIn: boolean;
  authenticateUser: (token: string) => void;
  logout: () => void;
  isDashboard: boolean;
}

export interface ActionProps {
  isPreview: boolean;
  isComment: boolean;
  [key: string]: boolean;
}

interface EditorProp {
  editorHtml: string;
}
export interface SchedulePostProp {
  content: string;
  teamMembers: string[];
  img: string[];
  isRepost?: boolean;
  isPublish: boolean;
  schedulePostDate: string;
  time: string;
}

export interface TeamsProp {
  id: any;
  teamMembers: string[];
  teamName: string;
}
export interface IScheduler {
  calenderType: string;
  editorErr: string | null;
  editorState: EditorProp;
  onSecheduleOpen: boolean;
  postactionType: ActionProps;
  filteredData: SchedulePostProp[];
  weeklyDates: any[];
  filteredTeams: TeamsProp[];
  handleScheduleType: (value: string) => void;
  setEditorState: (value: EditorProp) => void;
  getEditorErr: (value: string) => boolean;
  handleSetWeeklyDates: (dates: any) => void;
  handleSetOnScheduleOpen: (value: boolean) => void;
  handleScheduleActions: (value: keyof ActionProps, value2: boolean) => void;
  setEditorError: (value: string) => void;
  refetch: () => void;
  teamsDataRefetch: () => void;
  searchPosts: (value: string) => void;
}
export interface IArray {
  [key: string]: any;
}
export interface Theme {
  colors: {
    primary: string;
    action: string;
  };
}

export interface ChildProps {
  children: React.ReactNode;
}

export interface RegistrationValues {
  fullName: string;
  password: string;
  code: string | number;
  number: string | number;
  helpfulTips: boolean;
  termandcondition: boolean;
  jobrole: string;
  experience: string;
  need: string;
  companyname: string;
  companySize: string;
  companyindustry: string;
}

export interface RegistrationFormFields {
  fullName: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
  password: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
  code: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
  phonenumber: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
  helpfulTips: {
    name: string;
    label: string;
  };
  termandcondition: {
    name: string;
    label: string;
  };
  jobRole: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
  experience: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
  need: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
  companyname: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
  companySize: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
  companyindustry: {
    name: string;
    label: string;
    requiredErrorMsg: string;
  };
}

export interface NewDealFormInitialProps {
  name: string;
  organization: string;
  value: string;
  valueType: string;
  phone: string;
  phoneType: string;
  email: string;
  expectedCloseDate: string;
  tags: string[];
  stage: string[];
  linkedin: string;
  teamMembers: string[];
  leadImage: any;
  calendly: string;
}
export interface WorkOption {
  label: string;
  value: string;
}

interface Deal {
  __typename: string;
  id: string;
  userId: string;
  name: string;
  organization: string;
  value: string;
  valueType: string;
  stage: {
    __typename: string;
    id: string;
    boardName: string;
    boardConstraint: string;
  };
  email: string;
  phone: string;
  phoneType: string;
  linkedin: string;
  calendly: string;
  webURL: string | null;
  tags: string[];
  teamMembers: {
    __typename: string;
    id: string;
    fullName: string;
  }[];
  leadImage: string;
  expectedCloseDate: string;
  createdAt: string;
  dealManagement_isDeleted: boolean | null;
  dealManagement_isWon: boolean | null;
  dealManagement_isLost: boolean | null;
}

interface DealEdge {
  __typename: string;
  node: Deal;
  cursor: string;
}

export interface DealArray {
  edges: DealEdge[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
}

export interface File {
  name: string;
  size: number;
  type: string;
  preview: string;
}

export interface ButtonConfigProp {
  backgroundColor: string;
  color: string;
  outline: boolean;
  buttonText: string;
  onclick: () => void;
}
export interface ImageProp {
  img: Array<{ file: File; previewUrl: string }>;
}

export interface TeamMember {
  title: string;
  id?: string;
  icon: string | null;
}
