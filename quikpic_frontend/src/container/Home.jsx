import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import { client } from "../client";
import logo from "../assets/logo.png";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {
	const [toggleSidebar, setToggleSidebar] = useState(false);
	const [user, setUser] = useState(null);
	const scrollRef = useRef(null);

	// get userinfo from GoogleLogin
	const userInfo = fetchUser();
	// const userInfo =
	// 	localStorage.getItem("user") !== "undefined"
	// 		? JSON.parse(localStorage.getItem("user"))
	// 		: localStorage.clear();

	useEffect(() => {
		// query user data from sanity that matches userInfo: _id (logged in user)
		const query = userQuery(userInfo?.sub);

		client.fetch(query).then((data) => {
			setUser(data[0]);
		});
	}, []);

	useEffect(() => {
		scrollRef.current.scrollTo(0, 0);
	}, []);

	return (
		<div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
			{/* visiable on md:display (pc) (no Navbar)*/}
			<div className="hidden md:flex h-screen flex-initial">
				{/* desktop Sidebar */}
				<Sidebar user={user && user} />
			</div>

			{/* visiable Navbar on sm:display (mobile)*/}
			<div className="flex md:hidden flex-row">
				<div className="pd-2 w-full flex flex-row justify-between items-center shadow-md">
					<HiMenu
						fontSize={40}
						className="cursor-pointer"
						onClick={() => setToggleSidebar(true)}
					/>
					<Link to="/">
						<img src={logo} alt="logo" className="w-28" />
					</Link>
					<Link to={`user-profile/${user?.id}`}>
						<img src={user?.image} alt="logo" className="w-28" />
					</Link>
				</div>
				{toggleSidebar && (
					<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
						<div className="absolute w-full flex justify-end items-center p-2">
							<AiFillCloseCircle
								fontSize={30}
								className="cursor-pointer"
								onClick={() => setToggleSidebar(false)}
							/>
						</div>
						{/* mobile Sidebar */}
						<Sidebar user={user && user} closeToggle={setToggleSidebar} />
					</div>
				)}
			</div>
			{/* below navbar depending on the Route */}
			<div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
				<Routes>
					<Route path="/user-profile/:userId" element={<UserProfile />} />
					<Route path="/*" element={<Pins user={user && user} />} />
				</Routes>
			</div>
		</div>
	);
};

export default Home;
