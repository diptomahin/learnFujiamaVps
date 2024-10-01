import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";

const Student = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }

    return (
        <div>
            <div className="navbar px-5 shadow-lg bg-main h-[60px] fixed z-10">
                <div className="mx-auto">
                    <Link to={'/'}><img className="w-[150px]" src={'https://i.ibb.co/FKZd3SG/Learn-Fuji-Yama-Logo-1.png'} /></Link>
                </div>
            </div>
            <div className="flex">
                <div className="w-40 min-h-screen bg-main pt-10">
                    <ul className="menu p-4 mt-10">
                        <>
                            <li className="my-3"><NavLink to='/student-dashboard/st-dashboard' style={({ isActive }) => {
                                return {
                                    color: isActive ? "white" : "white",
                                    backgroundColor: isActive ? "inherit" : "inherit",
                                    textDecoration: isActive ? 'underline' : "none",
                                    textUnderlineOffset: isActive ? '10px' : 'none',
                                    textDecorationColor: isActive ? '#f02d00' : 'none',
                                    textDecorationThickness: isActive ? '2px' : 'none',
                                };
                            }}>Dashboard</NavLink></li>
                            <li className="my-3"><NavLink to='/student-dashboard/my-courses' style={({ isActive }) => {
                                return {
                                    color: isActive ? "white" : "white",
                                    backgroundColor: isActive ? "inherit" : "inherit",
                                    textDecoration: isActive ? 'underline' : "none",
                                    textUnderlineOffset: isActive ? '10px' : 'none',
                                    textDecorationColor: isActive ? '#f02d00' : 'none',
                                    textDecorationThickness: isActive ? '2px' : 'none',
                                };
                            }}>My Courses</NavLink></li>
                            <li className="my-3"><NavLink to='/student-dashboard/profile' style={({ isActive }) => {
                                return {
                                    color: isActive ? "white" : "white",
                                    backgroundColor: isActive ? "inherit" : "inherit",
                                    textDecoration: isActive ? 'underline' : "none",
                                    textUnderlineOffset: isActive ? '10px' : 'none',
                                    textDecorationColor: isActive ? '#f02d00' : 'none',
                                    textDecorationThickness: isActive ? '2px' : 'none',
                                };
                            }}>Profile</NavLink></li>
                        </>
                    </ul>
                    <hr style={{ border: 'none', height: '3px', backgroundColor: 'white' }} />
                    <ul className="menu p-4">
                        <>
                            <li className="my-3"><NavLink to='/' style={({ isActive }) => {
                                return {
                                    color: isActive ? "white" : "white",
                                    backgroundColor: isActive ? "inherit" : "inherit",
                                    textDecoration: isActive ? 'underline' : "none",
                                    textUnderlineOffset: isActive ? '10px' : 'none',
                                    textDecorationColor: isActive ? '#f02d00' : 'none',
                                    textDecorationThickness: isActive ? '2px' : 'none',
                                };
                            }}>Home</NavLink></li>
                            <li onClick={handleSignOut} className="my-3"><NavLink to='/' style={({ isActive }) => {
                                return {
                                    color: isActive ? "white" : "white",
                                    backgroundColor: isActive ? "inherit" : "inherit",
                                    textDecoration: isActive ? 'underline' : "none",
                                    textUnderlineOffset: isActive ? '10px' : 'none',
                                    textDecorationColor: isActive ? '#f02d00' : 'none',
                                    textDecorationThickness: isActive ? '2px' : 'none',
                                };
                            }}>Logout</NavLink></li>
                        </>
                    </ul>
                </div>
                <div></div>
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>

    );
};

export default Student;