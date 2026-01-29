import { Link, useNavigate } from "react-router-dom";
import "../../../assets/css/AuthForm.css";
import { AuthLayout } from "../../../layout/AuthLayout";
import { useForm } from "react-hook-form";
import type { AuthRequest, AuthResponse } from "../auth.types";
import { login } from "../../../api/auth.api";
import type { ApiResponse } from "../../../api/utils/ApiResponse";

export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<AuthRequest>();

    const navigate = useNavigate();

    const onSubmit = async (data: AuthRequest): Promise<void> => {
        try {
            const res: ApiResponse<AuthResponse> | undefined = await login(data);

            if (res?.code == 200) {
                // thành công set user vào localStorage
                localStorage.setItem("user", JSON.stringify(res.data));
                // chuyển trang
                navigate("/");
            } else {
                alert(res?.message || "Login failed");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Server error. Please try again.");
        }
    };
    return (
        <AuthLayout>
            <div className="auth-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to your account</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format"
                                }
                            })}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </div>

                    <div className="form-options">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button className="btn-primary">Login</button>

                    <p className="switch-text">
                        Don't have an account? <Link to={"/signUp"}>Register</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};
