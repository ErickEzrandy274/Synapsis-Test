import React from "react";
import { ReactNodeProps } from "./interface";
import { Box } from "@chakra-ui/react";
import Navbar from "@/components/elements/Navbar";

const Layout: React.FC<ReactNodeProps> = ({ children }) => {
	return (
		<Box>
			<Navbar />
			<Box p={5} minH="100vh">{children}</Box>
		</Box>
	);
};

export default Layout;
