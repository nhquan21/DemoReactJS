import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../features/auth/pages/LoginPage"
import { Register } from "../features/auth/pages/Register"
import { ProductListPage } from "../features/product/pages/ProductListPage"
import { ProductDetailPage } from "../features/product/pages/ProductDetailPage"
import { ProductForm } from "../features/product/components/ProductForm"
import { AuthGuard } from "../guards/AuthGuard"

export const AppRoutes = () => {
    return (
        <Routes>

            {/* PUBLIC ROUTES */}
            <Route path="/signIn" element={<LoginPage />} />
            <Route path="/signUp" element={<Register />} />

            {/* PROTECTED ROUTES */}
            <Route element={<AuthGuard roles={["ROLE_ADMIN"]} />}>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/product-details/:id" element={<ProductDetailPage />} />
                <Route path="/product-create" element={<ProductForm />} />
                <Route path="/product-edit/:id" element={<ProductForm />} />
            </Route>
        </Routes>
    )
}
