import { useEffect } from "react";
import Chat from "./components/Chat/Chat";
import NavBar from "./components/NavBar/NavBar";
import { useAppSelector } from "./hooks/useAppSelector";
import { SocketSelectors } from "./store/selectors";

function App() {
  const { socket } = useAppSelector(SocketSelectors);

  useEffect(() => {
    console.log(socket);
  }, []);
  return (
    <>
      <NavBar />
      <Chat />
    </>
  );
}

export default App;
