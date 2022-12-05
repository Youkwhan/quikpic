import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwt_decode from "jwt-decode";

import { client } from "../client";

const Login = () => {
	const navigate = useNavigate();

	const responseGoogle = (response) => {
		const decode = jwt_decode(response.credential);
		console.log(decode);
		// console.log(response);
		localStorage.setItem("user", JSON.stringify(decode));

		// deconstructuring
		const { name, aud, picture } = decode;

		// sanity schema
		const doc = {
			_id: aud,
			_type: "user",
			userName: name,
			image: picture,
		};

		// Redirect to home page and our user is created in sanity dashboard
		client.createIfNotExists(doc).then(() => {
			navigate("/", { replace: true });
		});
	};

	return (
		<div className="flex justify-start items-center flex-col h-screen">
			<div className="relative w-full h-full">
				{/* video is full screen bg */}
				<video
					src={shareVideo}
					type="video/mp4"
					loop
					controls={false}
					muted
					autoPlay
					className="w-full h-full object-cover"
				/>

				{/* on top of video we have black overlay and login */}
				<div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
					<div className="p-5">
						<img src={logo} width="130px" alt="logo" />
					</div>

					<div className="shadow-2xl">
						<GoogleLogin
							onSuccess={responseGoogle}
							onError={() => console.log("Error")}
						/>
					</div>
				</div>
			</div>
			Login
		</div>
	);
};

export default Login;
