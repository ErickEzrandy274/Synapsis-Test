import { BadgeType, GenderType, StatusType } from "./interface";

const GENDER_COLOR = {
	male: "yellow",
	female: "red",
};

const STATUS_COLOR = {
	active: "teal",
	inactive: "purple",
};

const getGenderColor = (gender: GenderType) => GENDER_COLOR[gender];
const getStatusColor = (status: StatusType) => STATUS_COLOR[status];

export const getStyling = (
	type: BadgeType,
	gender: GenderType | undefined,
	status: StatusType | undefined
) => {
	switch (type) {
		case "status":
			return getStatusColor(status!);

		case "gender":
			return getGenderColor(gender!);

		default:
			break;
	}
};
