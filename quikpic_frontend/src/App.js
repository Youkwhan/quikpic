import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fetchUser } from "./utils/fetchUser";

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = fetchUser();
		if (!userInfo) {
			localStorage.clear();
			navigate("/login");
		}
	}, [navigate]);

	return (
		<GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
			<Routes>
				<Route path="login" element={<Login />} />
				<Route path="/*" element={<Home />} />
			</Routes>
		</GoogleOAuthProvider>
	);
}

export default App;
