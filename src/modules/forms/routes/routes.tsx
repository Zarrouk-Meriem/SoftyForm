/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteProps } from "react-router-dom";
import { Fragment, lazy } from "react";
import MainLayout from "../../shared/layout/MainLayout/MainLayout";
import { PATH } from "./paths";
import GuestGuard from "../../shared/guards/GuestGuard";
// import AuthGuard from '../../shared/guards/AuthGuard'

type RouteConfig = {
	exact: boolean | null;
	path: string;
	component: React.ComponentType<any>;
	guard?: React.ComponentType<any> | typeof Fragment | any;
	layout?: React.ComponentType<any> | typeof Fragment;
} & RouteProps;

const routes: RouteConfig[] = [
	{
		exact: true,
		// guard: AuthGuard,
		path: PATH.FORM,
		component: lazy(() => import("../features/forms/forms")),
		layout: MainLayout,
	},
	{
		exact: true,
		guard: GuestGuard,
		path: PATH.FORM_QUESTIONS,
		component: lazy(() => import("../features/forms/forms")),
		layout: MainLayout,
	},
	{
		exact: true,
		guard: GuestGuard,
		path: PATH.FORM_RESPONSES,
		component: lazy(
			() => import("../../responses/features/Responses/Responses")
		),
		layout: MainLayout,
	},
	{
		exact: true,
		guard: GuestGuard,
		path: PATH.FORM_PREVIEW,
		component: lazy(() => import("../features/preview/preview")),
		layout: MainLayout,
	},
	{
		exact: true,
		guard: GuestGuard,
		path: PATH.FORM_RESPONSE,
		component: lazy(() => import("../features/preview/preview")),
		layout: MainLayout,
	},
	{
		exact: true,
		guard: GuestGuard,
		path: PATH.FORM_SUBMIT,
		component: lazy(() => import("../features/preview/previewSubmitted")),
		layout: MainLayout,
	},
];

export default routes;
