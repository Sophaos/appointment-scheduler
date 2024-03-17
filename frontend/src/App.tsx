
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AppointmentsPage } from "pages/appointment-page";
import { ClientsPage } from "pages/clients-page";
import { ExpertsPage } from "pages/experts-page";
import { ServicesPage } from "pages/services-page";
import { BaseLayout } from "layout/base-layout";

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route
              element={
              <BaseLayout>
                <Outlet />
              </BaseLayout>
              }
            >
              <Route index path="appointments" element={<AppointmentsPage />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="experts" element={<ExpertsPage />} />
              <Route path="services" element={<ServicesPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/appointments" />} />
          </Routes>
        </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ width: "350px" }}
      />
    </>
  );
}

export default App
