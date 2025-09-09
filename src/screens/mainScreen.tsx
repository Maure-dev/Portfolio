import { OutletInterface } from "../interfaces/outletInterface";
import { OutletProvider } from "../containers/contexts/outletContext";
import { HeaderInterface } from "../interfaces/headerInterface";
import React, { useEffect } from "react";

export const MainScreen = () => {

  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("Este navegador no soporta notificaciones.");
      return;
    }

    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <React.Fragment>
      <OutletProvider>
        <HeaderInterface />
        <OutletInterface />
      </OutletProvider>
    </React.Fragment>
  );
};
