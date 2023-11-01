import { UserType } from "@/components/elements/Form/interface";
import { ReactNodeProps } from "@/components/modules/Layout/interface";
import { createContext, useContext, useEffect, useState } from "react";

const EntityDetailsContext = createContext<any>({});

export const useEntityDetails = () => useContext(EntityDetailsContext);

export const EntityDetailsContextProvider: React.FC<ReactNodeProps> = ({
	children,
}) => {
	const [postDetails, setPostDetails] = useState(null);
	const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

	return (
		<EntityDetailsContext.Provider
			value={{
				postDetails,
				setPostDetails,
				selectedUser,
				setSelectedUser,
			}}
		>
			{children}
		</EntityDetailsContext.Provider>
	);
};
