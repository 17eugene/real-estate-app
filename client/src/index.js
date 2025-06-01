import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { SocketContextProvider } from "./context/SocketContext";
import Loader from "./components/ui/Loader/Loader";
import Backdrop from "./components/ui/Backdrop/Backdrop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense
          fallback={
            <Backdrop isActiveFallback>
              <Loader width={90} height={20} radius={9} />
            </Backdrop>
          }
        >
          <BrowserRouter>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </BrowserRouter>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
