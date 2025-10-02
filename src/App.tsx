import { useState } from "react";
//import icons from "./data/icons.json";
import { useMarketplaceClient } from "./utils/hooks/useMarketplaceClient";
import SelectIconPage from "./pages/SelectIconPage";
import type { Icon } from "./types";
import { LoadingIconsPage } from "./pages/LoadingIconsPage";

function App() {
  const { client } = useMarketplaceClient();
  const [icons, setIcons] = useState<Array<Icon>>();



  if (client && icons) {
    return (<SelectIconPage client={client} icons={icons}></SelectIconPage>);
  }

  if(client) {
    return <LoadingIconsPage client={client} setIcons={setIcons}></LoadingIconsPage>
  }

  return (
    <>
      <div>Loading...</div>
    </>
  );
}

export default App;
