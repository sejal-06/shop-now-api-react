import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.setItem("token", null);
    window.location.href = "/shop";
  });
  return <div></div>;
}

export default Logout;
