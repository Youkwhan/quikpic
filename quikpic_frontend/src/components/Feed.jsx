import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
	const [loading, setLoading] = useState(false);
	const [pins, setPins] = useState(null);
	const { categoryId } = useParams(); // get from URL, since clicking Links doesnt rerender

	// query to fetch the post belonging to a category or in general from sanity
	// useeffect will run on mount and whenever our category changes
	useEffect(() => {
		setLoading(true);
		// query all the pins/post for a specific category in sanity
		if (categoryId) {
			const query = searchQuery(categoryId);

			client.fetch(query).then((data) => {
				setPins(data);
				setLoading(false);
			});
		} else {
			// else if we are on / "Homepage" query all the data/post
			// since no parameters taken we dont have to call the query. But let's do it anyways so feedQuery is function
			const query = feedQuery();

			client.fetch(query).then((data) => {
				setPins(data);
				setLoading(false);
			});
		}
	}, [categoryId]);

	if (loading)
		return <Spinner message="We are adding new ideas to your feed!" />;

	if (!pins?.length) {
		return <h2 className="text-center">No pins available</h2>;
	}
	console.log(pins);

	return (
		<div>{pins && pins.length > 0 ? <MasonryLayout pins={pins} /> : null}</div>
	);
};

export default Feed;
