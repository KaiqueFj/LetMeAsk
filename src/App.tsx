import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/New_Room";
import { AuthContextProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Rooms/new" component={NewRoom} />
          <Route path="/Rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
