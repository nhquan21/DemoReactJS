import { useForm } from "react-hook-form";
import "../../../assets/css/AuthForm.css";
import { AuthLayout } from "../../../layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import type { AuthResponse } from "../auth.types";
import type { ApiResponse } from "../../../api/utils/ApiResponse";
import { registerUser } from "../../../api/auth.api";

export const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm<AuthResponse>();

    const onSubmit = async (data: AuthResponse) => {
        const payload: AuthResponse = {
            ...data,
            role: "ROLE_USER"
        };
        try {
            const res: ApiResponse<AuthResponse> | undefined = await registerUser(payload);

            if (res?.code == 201) {
                // thành công set user vào localStorage
                localStorage.setItem("user", JSON.stringify(res.data));
                reset();
                // chuyển trang
                navigate("/signIn");
            } else {
                alert(res?.message || "Login failed");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Server error. Please try again.");
        }
    }
    return (
        <AuthLayout>
            <div className="auth-card">
                <h2>Create Account</h2>
                <p className="subtitle">Start your journey</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="Your name"
                            {...register("username", { required: "Username is required" })}
                        />
                    </div>
                    {errors.username && <p className="error">{errors.username.message}</p>}

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Your email"
                            {...register("email", { required: "Email is required" ,pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email format"
                                }})}
                        />
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password"
                            {...register("password", { required: "Password is required" ,minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }})}
                        />
                    </div>
                    {errors.password && <p className="error">{errors.password.message}</p>}
                    <button type="submit" className="btn-success">Register</button>

                    <p className="switch-text">
                        Already have an account? <Link to={"/signIn"}>Login</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};
