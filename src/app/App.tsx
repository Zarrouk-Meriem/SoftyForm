import { Helmet } from "react-helmet-async";
import DarkModeProvider from "../modules/shared/provider/DarkModeProvider";
import InternationalizationProvider from "../modules/shared/provider/InternationalizationProvider";
import { useTranslation } from "react-i18next";
import routes, { renderRoutes } from "../modules/shared/routes";

const App = () => {
	const { t } = useTranslation("translation");

	return (
		<main className={"app"}>
			<Helmet>
				<title>{t("title")}</title>
				<link rel='icon' href='/favicon.ico' />
			</Helmet>

			<DarkModeProvider>
				<InternationalizationProvider>
					{renderRoutes(routes)}
				</InternationalizationProvider>
			</DarkModeProvider>
		</main>
	);
};

export default App;
