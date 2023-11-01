import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
	return (
		<Flex justifyContent="center" alignItems="center">
			<Spinner size="lg" thickness="4px" speed="0.5s" color="blue.600" />
		</Flex>
	);
};

export default Loader;
