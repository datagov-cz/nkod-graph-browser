import {FC, useState} from "react";
import {
  Navbar, NavbarBrand, NavbarToggler, Container,  Collapse,  Nav,  NavItem,
  NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from "reactstrap";
import {DatasetHeader} from "./dataset-header";
import "../index.css";

export const Application: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <>
    <div>
      <Navbar light expand="md" container="lg">
        <NavbarBrand href="/">
          <img
            width="174" height="30"
            alt={"sdf"}
            className="d-inline-block align-top"
            src="https://dev.nkod.opendata.cz/assets/images/opendata-logo.png"
          />
        </NavbarBrand>
      </Navbar>
      <Container>
        <DatasetHeader />
        <p>Agendy evidované v Registru práv a povinností ve smyslu § 51 zákona č. 111/2009 Sb. o základních registrech.</p>
        <hr/>
      </Container>
    </div>
    <div style={{flexGrow: 1, backgroundColor: "#eee", alignItems: "center", display: "flex", justifyContent: "center"}}>
      <h1>GRAPH AREA</h1>
    </div>
  </>;
}
