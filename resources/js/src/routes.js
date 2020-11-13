import Person from "@material-ui/icons/Person";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Language from "@material-ui/icons/Language";
import UserProfile from "./views/UserProfile/UserProfile.js";
import Icons from "./views/Icons/Icons.js";
import RTLPage from "./views/RTLPage/RTLPage.js";
import CreateQuiz from "./views/Quiz/create";
import Quizzes from "./views/Quiz/quizzes";
import Model from "./views/Quiz/Model";

const dashboardRoutes = [
    {
        path: "/user",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        icon: Person,
        component: UserProfile,
        layout: "/admin"
    },
    {
        path: "/icons",
        name: "Icons",
        rtlName: "الرموز",
        icon: BubbleChart,
        component: Icons,
        layout: "/admin"
    },
    {
        path: "/rtl-page",
        name: "RTL Support",
        rtlName: "عربى",
        icon: Language,
        component: RTLPage,
        layout: "/rtl"
    },
    {
        path: "/create-quiz",
        name: "Create Quiz",
        rtlName: "انشاء امتحان",
        icon: Language,
        component: CreateQuiz,
        layout: "/admin"
    },
    {
        path: "/quizzes",
        name: "Quizzes",
        rtlName: "الامتحانات",
        icon: Language,
        component: Quizzes,
        layout: "/admin"
    },
    {
        path: "/model/:id",
        name: "Model",
        rtlName: "نموذج امتحان",
        icon: Language,
        component: Model,
        layout: "/admin"
    },
];

export default dashboardRoutes;
