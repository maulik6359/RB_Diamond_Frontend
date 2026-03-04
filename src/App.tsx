import "./App.css";
import AppRoutes from "./app/router/AppRoutes.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store/store.ts";
import { BrowserRouter as Router } from "react-router-dom";
import posthog from "./app/config/posthogClient.ts";
import { PostHogProvider } from "posthog-js/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <PostHogProvider client={posthog}>
          <Router>
            <AppRoutes />
          </Router>
        </PostHogProvider>
      </Provider>
    </>
  );
}

export default App;
