import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

//object and how many pins per screen size
const breakpointObj = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
};

const MasonryLayout = ({ pins }) => {
	return (
		<Masonry
			className="flex animate-slide-fwd"
			breakpointCols={breakpointObj}
			columnClassName="my-masonry-ggrid-column"
		>
			{/* if pins exist from our Feed get fetched data and create <Pins/>  */}
			{pins?.map((pin) => (
				<Pin key={pin._id} pin={pin} className="w-max" />
			))}
		</Masonry>
	);
};

export default MasonryLayout;
