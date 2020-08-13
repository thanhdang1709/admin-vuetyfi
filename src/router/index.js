import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import DashBoard from "../components/DashBoard.vue";
import Employee from "../components/Employee.vue";
import AddEmployee from "../components/AddEmployee.vue";
import EditEmployee from "../components/EditEmployee.vue";
import Department from "../components/Department.vue";
import AddDepartment from "../components/AddDepartment.vue";
import EditDepartment from "../components/EditDepartment.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/",
		name: "DashBoard",
		component: DashBoard,
		meta: {
			progress: {
				func: [
					{ call: "color", modifier: "temp", argument: "#ffb000" },
					{ call: "fail", modifier: "temp", argument: "#6e0000" },
					{ call: "location", modifier: "temp", argument: "top" },
					{
						call: "transition",
						modifier: "temp",
						argument: { speed: "1.5s", opacity: "0.6s", termination: 400 },
					},
				],
			},
		},
	},
	{
		path: "/employee",
		name: "Employee",
		component: Employee,
	},
	{
		path: "/employee/add",
		name: "AddEmployee",
		component: AddEmployee,
	},
	{
		path: "/employee/edit",
		name: "EditEmployee",
		component: EditEmployee,
		props: { item: {} },
	},
	{
		path: "/department",
		name: "Department",
		component: Department,
	},
	{
		path: "/department/add",
		name: "AddDepartment",
		component: AddDepartment,
	},
	{
		path: "/department/edit",
		name: "EditDepartment",
		component: EditDepartment,
		props: { item: {} },
	},
	{
		path: "/about",
		name: "About",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	// chuyển đến trang login nếu chưa được login
	const publicPages = ["/login", "/register"];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem("user");
	console.log(loggedIn);
	if (authRequired && !loggedIn) {
		return next("/login");
	}

	next();
});

export default router;
