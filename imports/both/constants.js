// roles
export const ROLE_SUPER_ADMIN = "app_super_admin";
export const ROLE_MOBILE_APP_USER = "app_mobile_app_user"; // optional
export const ROLE_WEB_APP_USER = "app_web_app_user"; // optional
export const ROLE_ALUMNI = "app_alumni";
export const ROLE_STUDENT = "app_student";
export const ROLE_EVALUATOR = "app_evaluator";
// permissions
export const PERMISSION_ALLOW_ALL = "perm_allow_all";
export const PERMISSION_ALLOW_CMS = "perm_allow_cms";
export const PERMISSION_ALLOW_ADD_ADMIN = "perm_allow_add_admin";
export const PERMISSION_ALLOW_ADD_ROLE = "perm_allow_add_role";
export const PERMISSION_ALLOW_DELETE_ROLE = "perm_allow_delete_role";
export const PERMISSION_ALLOW_DELETE_ADMIN = "perm_allow_delete_admin";
export const PERMISSION_ALLOW_SEND_REQUEST = "perm_allow_send_request";
export const PERMISSION_ALLOW_MANAGE_OWN_ACCOUNT = "perm_allow_manage_own_account";
export const PERMISSION_ALLOW_VALIDATE_REQUEST = "perm_allow_validate_request";
export const PERMISSION_ALLOW_MANAGE_RECEIVED_REQUEST = "perm_allow_manage_received_request";
export const PERMISSION_ALLOW_MANAGE_SENT_REQUEST = "perm_allow_manage_sent_request";
export const PERMISSION_ALLOW_BAN_USER = "perm_allow_ban_user";
// perm - eval 1
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSAT = "perm_allow_evaluate_course_BSAT";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSENTREP = "perm_allow_evaluate_course_BSENTREP";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BACOM = "perm_allow_evaluate_course_BACOM";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSAIS = "perm_allow_evaluate_course_BSAIS";
// perm - eval 2
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSESCIENCE = "perm_allow_evaluate_course_BSESCIENCE";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSCRIMINOLOGY = "perm_allow_evaluate_course_BSCRIMINOLOGY";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSCS = "perm_allow_evaluate_course_BSCS";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSBAMM = "perm_allow_evaluate_course_BSBAMM";
// perm - eval 3
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSPSYCH = "perm_allow_evaluate_course_BSPSYCH";
export const PERMISSION_ALLOW_EVALUATE_COURSE_ABBS = "perm_allow_evaluate_course_ABBS";
export const PERMISSION_ALLOW_EVALUATE_COURSE_ABPOLSCI = "perm_allow_evaluate_course_ABPOLSCI";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSEENGLISH = "perm_allow_evaluate_course_BSEENGLISH";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSEENGLISHCHINESE = "perm_allow_evaluate_course_BSEENGLISHCHINESE";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSBAHRDM = "perm_allow_evaluate_course_BSBAHRDM";
// perm - eval 4
export const PERMISSION_ALLOW_EVALUATE_COURSE_BEEDSPED = "perm_allow_evaluate_course_BEEDSPED";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BEEDECED = "perm_allow_evaluate_course_BEEDECED";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSBAFMGT = "perm_allow_evaluate_course_BSBAFMGT";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSETLE = "perm_allow_evaluate_course_BSETLE";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSIE = "perm_allow_evaluate_course_BSIE";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSEMC = "perm_allow_evaluate_course_BSEMC";
export const PERMISSION_ALLOW_EVALUATE_COURSE_HRM = "perm_allow_evaluate_course_HRM";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BST = "perm_allow_evaluate_course_BST";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSA = "perm_allow_evaluate_course_BSA";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BPASPECIAL = "perm_allow_evaluate_course_BPASPECIAL";
// perm - eval 5
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSMATH = "perm_allow_evaluate_course_BSMATH";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSIT = "perm_allow_evaluate_course_BSIT";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSIS = "perm_allow_evaluate_course_BSIS";
export const PERMISSION_ALLOW_EVALUATE_COURSE_ABMATH = "perm_allow_evaluate_course_ABMATH";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BPA = "perm_allow_evaluate_course_BPA";
//perm - eval 6
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSTM = "perm_allow_evaluate_course_BSTM";
export const PERMISSION_ALLOW_EVALUATE_COURSE_BSOAD = "perm_allow_evaluate_course_BSOAD";
export const PERMISSION_ALLOW_EVALUATE_COURSE_COMSEC = "perm_allow_evaluate_course_COMSEC";
export const PERMISSION_ALLOW_EVALUATE_COURSE_CPE = "perm_allow_evaluate_course_CPE";
export const PERMISSION_ALLOW_EVALUATE_COURSE_CPED = "perm_allow_evaluate_course_CPED";

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const ACCOUNT_TYPE_STUDENT = "Student";
export const ACCOUNT_TYPE_ALUMNI = "Alumni";

export const COURSES = [
  "BSAT",
  "BSENTREP",
  "BACOM",
  "BSAIS",
  "BSESCIENCE",
  "BSCRIMINOLOGY",
  "BSCS",
  "BSBAMM",
  "BSPSYCH",
  "ABBS",
  "ABPOLSCI",
  "BSEENGLISH",
  "BSEENGLISHCHINESE",
  "BSBAHRDM",
  "BEEDSPED",
  "BEEDECED",
  "BSBAFMGT",
  "BSETLE",
  "BSIE",
  "BSEMC",
  "HRM",
  "BST",
  "BSA",
  "BPASPECIAL",
  "BSMATH",
  "BSIT",
  "BSIS",
  "ABMATH",
  "BPA",
  "BSTM",
  "BSOAD",
  "COMSEC",
  "CPE",
  "CPED",
];
