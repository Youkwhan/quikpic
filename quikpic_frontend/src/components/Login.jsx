import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { fetchUser } from "../utils/fetchUser";
import { client } from "../client";

const Login = () => {
	const navigate = useNavigate();

	const googleLoginSuccess = async (response) => {
		try {
			localStorage.setItem('profile', response.credential);
			const { name, id, imageUrl } = fetchUser(response.credential);
			// deconstructuring

			// sanity schema
			const doc = {
				_id: id,
				_type: "user",
				userName: name,
				image: imageUrl,
			};

			// Redirect to home page and our user is created in sanity dashboard
			client.createIfNotExists(doc).then(() => {
				navigate("/", { replace: true });
			});
		} catch (error) {
			console.error(error);
		}
	};

	const googleLoginError = (error) => {
		console.error(
			"Google Sign In was not successful. Try again later. Details: ",
			error
		);
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
							onSuccess={googleLoginSuccess}
							onError={googleLoginError}
							useOneTap
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
