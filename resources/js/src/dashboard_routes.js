import Language from "@material-ui/icons/Language";
import Quizzes from "./views/Quiz/quizzes";
import Students from "./views/Students/Students";


var user = localStorage.getItem('user');
var dashboardRoutes = [];

if (user && JSON.parse(user).role_id === 1) {
    dashboardRoutes = [
        {
            path: "/quizzes",
            name: "Quizzes",
            rtlName: "الامتحانات",
            icon: Language,
            component: Quizzes,
            layout: "/admin"
        },
        {
            path: "/students",
            name: "Students",
            rtlName: "الطلاب",
            icon: Language,
            component: Students,
            layout: "/admin"
        },
    ];
}
else if(user && JSON.parse(user).role_id === 2) {
    dashboardRoutes = [
        {
            path: "/quizzes",
            name: "Quizzes",
            rtlName: "الامتحانات",
            icon: Language,
            component: Quizzes,
            layout: "/admin"
        }
    ];
}


console.log(dashboardRoutes)
export default dashboardRoutes;
