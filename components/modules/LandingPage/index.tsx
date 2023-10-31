import { Box, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const LandingPage = () => {
	const router = useRouter();

	useEffect(() => {
		const timeOut = setTimeout(() => {
			router.push("/blogs");
		}, 1500);

		return () => clearTimeout(timeOut);
	}, []);

	return (
		<Flex
			minH="100vh"
			justifyContent="center"
			alignItems="center"
			bgGradient="linear(to-br, #7928CA, #FF0080)"
		>
			<Heading as="h1" size="3xl" color="white" p={4}>
				Welcome to Blog App
			</Heading>
		</Flex>
	);
};

export default LandingPage;
