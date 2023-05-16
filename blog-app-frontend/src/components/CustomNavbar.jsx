import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    NavItem,
    NavLink,
} from "reactstrap";
import { doLogout, getCurrentUserDetails, isLoggedIn } from "../auth/index";

const CustomNavbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const [login, setLogin] = useState(false);

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        setLogin(isLoggedIn);
        setUser(getCurrentUserDetails());

        // console.log(user);
    }, [login]);

    const logout = () => {
        doLogout(()=>{
            setLogin(false);
            navigate("/login");
        });
    }

    return (
        <div className="">
            <Navbar color="dark" dark expand="md" className="px-3">
                <NavbarBrand tag={ReactLink} to="/">
                    MyBlogs
                </NavbarBrand>

                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/">
                                New Feed
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about">
                                About
                            </NavLink>
                        </NavItem>

                        <UncontrolledDropdown inNavbar nav>
                            <DropdownToggle caret nav>
                                More
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href={"http://bit.ly/3x2D8oj"}>
                                    Developers Portfolio
                                </DropdownItem>
                                <DropdownItem href={"https://github.com/krishnalagad"}>
                                    GitHub Profile
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem tag={ReactLink} to="/login">
                                    Goto Login
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>

                    <Nav navbar>

                        {
                            login && (
                                <>
                                    <NavItem>
                                        <NavLink onClick={logout} tag={ReactLink} to="/login">
                                            Logout
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/profile-info">
                                            {user.email}
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }

                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login">
                                            Login
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup">
                                            Signup
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default CustomNavbar;
