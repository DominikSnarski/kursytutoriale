import React from "react";
import Footer from "./Shared/Footer";
import NavBar from "./Shared/NavBar";

export const MainLayout = props =>{
    return(
        <main className="my-5 py-5" id="Home">
			<NavBar/>
			    {props.children}
			<Footer/>
        </main>
    );
}