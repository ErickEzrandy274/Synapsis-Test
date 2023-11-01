import React from "react";
import { BadgeProps } from "./interface";
import { Badge as ChakraBadge } from "@chakra-ui/react";

const Badge: React.FC<BadgeProps> = ({ status }) => {
	return (
		<ChakraBadge colorScheme={status === "active" ? "teal" : "red"}>
			{status}
		</ChakraBadge>
	);
};

export default Badge;
