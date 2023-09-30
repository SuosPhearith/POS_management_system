import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "../pages/dashboard/DashboardPage";
import InvoicePage from "../pages/invoice/InvoicePage";
import ProductPage from "../pages/product/ProductPage";
import RatePage from "../pages/rate/RatePage";
import ReportPage from "../pages/report/ReportPage";
import SalePage from "../pages/sale/SalePage";
import UserPage from "../pages/user/UserPage";
import PrivateRoutes from "../utils/ProtectedRoutes";
import LoginPage from "../pages/login/LoginPage";
import NotFoundPage from "../pages/notFound/NotFoundPage";
import AdminLayout from "../layouts/admin/AdminLayout";
import ManagerLayout from "../layouts/manager/ManagerLayout";
import SalerLayout from "../layouts/saler/SalerLayout";
import EmptyLayout from "../layouts/empty/EmptyLayout";
import SupplierPage from "../pages/supplier/SupplierPage";
import CategoryPage from "../pages/category/CategoryPage";
import ReceiveProductPage from "../pages/receiveProduct/ReceiveProductPage";
import ProductSalePage from "../pages/sale/ProductSalePage";
import SpecialSalePage from "../pages/sale/SpecialSalePage";
import CustomerPage from "../pages/customer/CustomerPage";
function MainRoute() {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
  return (
    <BrowserRouter>
      {token && role === "admin" && (
        <AdminLayout>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<DashboardPage />} exact />
              <Route path="/sale" element={<SalePage />} />
              <Route path="/productSale" element={<ProductSalePage />} />
              <Route path="/specialSale" element={<SpecialSalePage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/rate" element={<RatePage />} />
              <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/supplier" element={<SupplierPage />} />
              <Route path="/receiveProduct" element={<ReceiveProductPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AdminLayout>
      )}
      {token && role === "manager" && (
        <ManagerLayout>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<DashboardPage />} exact />
              <Route path="/sale" element={<SalePage />} />
              <Route path="/productSale" element={<ProductSalePage />} />
              <Route path="/specialSale" element={<SpecialSalePage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/rate" element={<RatePage />} />
              <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/supplier" element={<SupplierPage />} />
              <Route path="/receiveProduct" element={<ReceiveProductPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ManagerLayout>
      )}
      {token && role === "seller" && (
        <SalerLayout>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<SalePage />} exact />
              <Route path="/productSale" element={<ProductSalePage />} />
              <Route path="/specialSale" element={<SpecialSalePage />} />
              <Route path="/invoice" element={<InvoicePage />} />
              <Route path="/customer" element={<CustomerPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </SalerLayout>
      )}
      {!token && (
        <EmptyLayout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </EmptyLayout>
      )}
    </BrowserRouter>
  );
}

export default MainRoute;
