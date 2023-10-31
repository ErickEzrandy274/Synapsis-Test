import { ReactNodeProps } from "@/components/modules/Layout/interface";
import { createContext, useContext, useEffect, useState } from "react";

const PostDetailsContext = createContext<any>({});

export const usePostDetails = () => useContext(PostDetailsContext);

export const PostDetailsContextProvider: React.FC<ReactNodeProps> = ({
	children,
}) => {
	const [postDetails, setPostDetails] = useState(null);

	return (
		<PostDetailsContext.Provider
			value={{
				postDetails,
				setPostDetails,
			}}
		>
			{children}
		</PostDetailsContext.Provider>
	);
};