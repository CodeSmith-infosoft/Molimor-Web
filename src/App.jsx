import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { REJECT_ROUTES, ROUTES } from "./routes";
import ScrollToTop from "./components/AutoScroll/ScrollToTop";
import { Toaster } from "react-hot-toast";
import ScrollToTopButton from "./components/ScrollToTop";
import MainProvider from "./context/MainProvider";
import RejectAuth from "./routes/RejectAuth";

function App() {
  return (
    <div>
      <MainProvider>
        <ScrollToTopButton />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {ROUTES.map(({ path, component }) => (
              <Route path={path} element={<Layout>{component}</Layout>} />
            ))}
            <Route element={<RejectAuth />}>
              {REJECT_ROUTES.map(({ path, component }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={<Layout>{component}</Layout>}
                />
              ))}
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#fff",
              color: "#374151",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "14px",
              maxWidth: "400px",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
            loading: {
              iconTheme: {
                primary: "#3B82F6",
                secondary: "#fff",
              },
            },
          }}
        />
      </MainProvider>
    </div>
  );
}

export default App;
