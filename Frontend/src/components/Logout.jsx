import React, { useEffect } from "react";

import { useAuthStore } from "../store/auth.store";

function Logout() {
  const { logout, authUser } = useAuthStore();
  useEffect(() => {
    logout();
  }, []);
  return <div>logout</div>;
}

export default Logout;
