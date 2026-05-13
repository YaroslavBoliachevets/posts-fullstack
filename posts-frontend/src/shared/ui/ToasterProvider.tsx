import React from "react";
import { Toaster } from "react-hot-toast";

export function ToasterProvider() {
	return (
		<Toaster
			toastOptions={{
				style: {
					background: "#1f1f1f",
					color: "#fff",
					borderRadius: "8px",
					padding: "12px 16px",
				},
				success: {
					iconTheme: {
						primary: "#4ade80",
						secondary: "#1f1f1f",
					},
				},
				error: {
					iconTheme: {
						primary: "#f87171",
						secondary: "#1f1f1f",
					},
				},
			}}
		/>
	);
}
