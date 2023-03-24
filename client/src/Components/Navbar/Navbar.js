import { render } from "@testing-library/react";
import React, { Component, useState } from "react";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav
        className="NavbarItems"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="navbar-logo">Company Name</h1>
        <ul className="nav-menu">
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}
