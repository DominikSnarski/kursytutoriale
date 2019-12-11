import { NavBar } from "../components/NavBar/NavBar";
export const AppRoute = props => {
	const {component, ...routeProps} = props;
	let Component = component;
	return(
		<Route
		{...routeProps}
		render={(props)=>
			<main className="my-5 py-5" id="Home">
				<NavBar/>
				<Component {...props}/>
				<Footer/>
           	</main>
		}
		/>
	);
}