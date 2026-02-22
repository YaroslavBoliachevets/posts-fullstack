import React, { useContext, useEffect, useState } from "react";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";

// маршрутизация по страничкам
import AppRouter from "./components/AppRouter.jsx";

import Navbar from "./components/UI/navbar/Navbar.jsx";
import { observer } from "mobx-react-lite";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<AppRouter />
		</BrowserRouter>
	);
}
// export default App;
export default observer(App);
