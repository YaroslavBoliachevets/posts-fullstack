import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../../context/context";

function Navbar() {
	const { isAuth, setIsAuth } = useContext(AuthContext);

	const logout = () => {
		setIsAuth(false);
		localStorage.removeItem("auth");
		// перекидает на страницу входа
		navigate("/login");
	};
	return (
		<div className="navbar App">
			{isAuth ? <MyButton onClick={logout}>выход</MyButton> : ""}
			<div className="navbar__links">
				<Link to="/about">about</Link>
				<Link to="/posts">posts</Link>
			</div>
		</div>
	);
}

export default Navbar;
