import Language from "@material-ui/icons/Language";
import Quizzes from "./views/Quiz/quizzes";

const dashboardRoutes = [
    {
        path: "/quizzes",
        name: "Quizzes",
        rtlName: "الامتحانات",
        icon: Language,
        component: Quizzes,
        layout: "/admin"
    }
];

export default dashboardRoutes;
