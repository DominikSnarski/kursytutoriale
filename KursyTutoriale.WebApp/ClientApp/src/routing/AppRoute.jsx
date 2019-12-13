import React from "react";
import { Route } from "react-router-dom";

export const AppRoute = props => {
	const {component: Component,layout: Layout,  ...routeProps} = props;
	
	return(
		<Route
		{...routeProps}
		render={(props)=>
			<Layout>
				<Component {...props}/>
			</Layout>
		}
		/>
	);
}