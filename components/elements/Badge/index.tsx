import React from "react";
import { BadgeProps } from "./interface";
import { Badge as ChakraBadge } from "@chakra-ui/react";
import { getStyling } from "./constant";

const Badge: React.FC<BadgeProps> = ({ type, status, gender }) => {
	const color = getStyling(type, gender, status);

	return (
		<ChakraBadge colorScheme={color} variant="solid" px={2} rounded="md">
			{type === "status" ? status : gender}
		</ChakraBadge>
	);
};

export default Badge;
