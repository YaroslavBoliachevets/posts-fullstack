import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Store from "./store/store.js";

interface State {
	store: Store;
}
// создвем контекст, через провайдер для store, дальше через хук usecontext будем получать данные из состояния

const store = new Store();
export const Context = createContext<State>({ store });

createRoot(document.getElementById("root")!).render(
	<Context.Provider value={{ store }}>
		<App />,
	</Context.Provider>,
);
