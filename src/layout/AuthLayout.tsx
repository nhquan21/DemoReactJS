import React from "react";
import "../assets/css/Layout.css";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <div className="auth-container">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="overlay">
          <h1>MyApp</h1>
          <p>Build something amazing with modern technology.</p>
        </div>
      </div>

      {/* RIGHT SIDE (FORM AREA) */}
      <div className="auth-right">{children}</div>
    </div>
  );
};
