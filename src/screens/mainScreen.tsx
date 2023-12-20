import { OutletInterface } from "../interfaces/outletInterface";
import { OutletProvider } from "../containers/contexts/outletContext";
import { HeaderInterface } from "../interfaces/headerInterface";

export const MainScreen = () => {
  return (
    <div>
      <OutletProvider>
        <HeaderInterface />
        <OutletInterface />
      </OutletProvider>
    </div>
  );
};
