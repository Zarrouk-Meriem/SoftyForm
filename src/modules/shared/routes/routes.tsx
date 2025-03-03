import sharedRoutes from "./sharedRoutes";
import authRoutes from "../../auth/routes/routes";
import questionsRoutes from "../../questions/routes/routes";
import responsesRoutes from "../../responses/routes/routes";

import formsRoutes from "../../forms/routes/routes";

const routes = [
	...sharedRoutes,
	...formsRoutes,
	...authRoutes,
	...questionsRoutes,
	...responsesRoutes,
];

export default routes;
