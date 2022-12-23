// connecting sanity to client side
import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
	projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
	dataset: "production",
	apiVersion: "2022-12-04",
	token:  process.env.REACT_APP_SANITY_TOKEN,
	useCdn: true,
	ignoreBrowserTokenWarning: true // we put our tokens in .env
});

const builder = imageUrlBuilder(client);

// sanity's speical function to quickly generate and crop and hot-spot images_urls 
export const urlFor = (source) => builder.image(source);
