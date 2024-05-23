// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import 'primeicons/primeicons.css';
// import 'App.css';
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AppointmentsPage } from "pages/appointment-page";
import { ClientsPage } from "pages/clients-page";
import { ExpertsPage } from "pages/experts-page";
import { ServicesPage } from "pages/services-page";
import { BaseLayout } from "layout/base-layout";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ width: "425px" }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
