export type GenderType = "male" | "female";
export type StatusType = "active" | "inactive";
export type BadgeType = "status" | "gender";

export interface BadgeProps {
	status?: StatusType;
	gender?: GenderType;
	type: BadgeType;
}
