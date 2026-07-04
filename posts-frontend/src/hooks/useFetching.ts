import { useState } from "react";

export const useFetching = (callback: () => Promise<void>) => {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const fetching = async (): Promise<void> => {
		try {
			setIsloading(true);
			setError("");
			await callback();
		} catch (e) {
			if (e instanceof Error) {
				setError(e.message);
			} else {
				setError(String(e));
			}
		} finally {
			setIsloading(false);
		}
	};
	return [fetching, isLoading, error] as const;
};

export default useFetching;
