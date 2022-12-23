import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

import { client, urlFor } from "../client";

const Pins = ({ pin: { postedBy, image, _id, destination } }) => {
	const [postHovered, setPostHovered] = useState(false);
	const [savingPost, setSavingPost] = useState(false);
	const navigate = useNavigate();

	return (
		<div className="m-2">
			<div
				onMouseEnter={() => setPostHovered(true)}
				onMouseLeave={() => setPostHovered(false)}
				onClick={() => navigate(`/pin-detail/${_id}`)}
				className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
			>
				{/* sanity's way to effectively fetch images. Optimized for set width.  */}
				<img
					className="rounded-lg w-full"
					alt="user-post"
					src={urlFor(image).width(250).url()}
				/>
			</div>
		</div>
	);
};

export default Pins;
