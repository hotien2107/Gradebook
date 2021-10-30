import React, { Fragment, useState } from "react";
import Appbar from "./appbar/Appbar";
import Sidebar from "./sidebar/Sidebar";


const Layout = ({ children }) => {

  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Fragment>
      {/* Navbar */}
      <Appbar openSidebarHandle={() => setOpenSidebar(true)}/>

      {/* Sidebar */}
      <Sidebar openSidebar={openSidebar} onOpen={() => setOpenSidebar(true)} onClose={() => setOpenSidebar(false)}/>

      <div className="page-layout p5">{children}</div>
    </Fragment>
  );
};

export default Layout;
