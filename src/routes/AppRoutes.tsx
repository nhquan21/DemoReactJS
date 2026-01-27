import { Route, Routes } from "react-router-dom"
import { LoginPage } from "../features/auth/pages/LoginPage"
import { Register } from "../features/auth/pages/Register"
import { ProductListPage } from "../features/product/pages/ProductListPage"
import { ProductDetailPage } from "../features/product/pages/ProductDetailPage"
import { ProductForm } from "../features/product/components/ProductForm"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/signIn" element={<LoginPage />} />
            <Route path="/signUp" element={<Register />} />
            <Route path="/home"  element={<ProductListPage />}/>
            <Route path="/home/product-details/:id"  element={<ProductDetailPage />}/>
            <Route path="/home/product-create"  element={<ProductForm />}/>
            <Route path="/home/product-edit/:id"  element={<ProductForm />}/>
        </Routes>
    )
}