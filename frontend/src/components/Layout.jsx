import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { logoutUser, user, isLoggedIn } = useAuth();

    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, []);

    const toggleDrawer = () => {
        setDrawerOpen((prev) => !prev);
    };

    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* NAVBAR */}
            <nav className="fixed w-full  z-50 bg-black border-b border-[#6fd6ff]/40 px-4 py-4 lg:px-32 shadow-lg shadow-[#6fd6ff]/10">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="h-14 cursor-pointer hover:opacity-80 transition"
                        onClick={() => navigate("/")}
                    />

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleDrawer}
                            className="text-[#6fd6ff] text-3xl focus:outline-none"
                        >
                            ☰
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 text-lg">
                        <Link className="hover:text-[#6fd6ff] transition" to="/">Home</Link>
                        <Link className="hover:text-[#6fd6ff] transition" to="/search">Search</Link>

                        {user.role === "admin" && (
                            <Link className="hover:text-[#6fd6ff] transition" to="/admin">Admin</Link>
                        )}

                        <button
                            onClick={handleLogout}
                            className="hover:text-red-400 transition"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {drawerOpen && (
                    <div className="absolute top-20 left-0 w-full bg-[#111] z-50 p-6 md:hidden border-t border-[#6fd6ff]/40 animate-slideDown">
                        <div className="flex flex-col space-y-6 text-xl">
                            <Link
                                to="/"
                                onClick={toggleDrawer}
                                className="hover:text-[#6fd6ff] transition"
                            >
                                Home
                            </Link>

                            <Link
                                to="/search"
                                onClick={toggleDrawer}
                                className="hover:text-[#6fd6ff] transition"
                            >
                                Search
                            </Link>

                            {user.role === "admin" && (
                                <Link
                                    to="/admin"
                                    onClick={toggleDrawer}
                                    className="hover:text-[#6fd6ff] transition"
                                >
                                    Admin
                                </Link>
                            )}

                            <button
                                onClick={() => {
                                    handleLogout();
                                    toggleDrawer();
                                }}
                                className="hover:text-red-400 transition"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* PAGE CONTENT */}
            <div className=" hello px-4  lg:px-32 pt-28">
                {children}
            </div>
        </div>
    );
};
