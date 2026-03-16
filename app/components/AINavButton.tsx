import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

interface AINavButtonProps {
  mode?: "top" | "bottom"; // top = desktop header icon, bottom = mobile bottom nav
}

const AINavButton: FC<AINavButtonProps> = ({ mode = "top" }) => {
  const location = useLocation();
  const isActive = location.pathname === "/ai";

  if (mode === "bottom") {
    return (
      <Link
        to="/ai"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2px",
          padding: "4px 8px",
          textDecoration: "none",
          color: isActive ? "#22c993" : "rgba(255,255,255,0.54)",
          fontSize: "10px",
          fontWeight: 500,
          minWidth: "48px",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L14.4 8.4L21 9.3L16.5 13.8L17.7 20.4L12 17.1L6.3 20.4L7.5 13.8L3 9.3L9.6 8.4L12 2Z"
            fill={isActive ? "#22c993" : "rgba(255,255,255,0.54)"}
          />
        </svg>
        <span>AI</span>
      </Link>
    );
  }

  // Desktop top nav icon
  return (
    <Link
      to="/ai"
      title="Starchild AI"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "8px",
        background: isActive
          ? "rgba(34,201,147,0.15)"
          : "rgba(255,255,255,0.05)",
        border: isActive
          ? "1px solid rgba(34,201,147,0.5)"
          : "1px solid rgba(255,255,255,0.1)",
        transition: "all 0.2s ease",
        textDecoration: "none",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(34,201,147,0.1)";
          (e.currentTarget as HTMLElement).style.border =
            "1px solid rgba(34,201,147,0.3)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.05)";
          (e.currentTarget as HTMLElement).style.border =
            "1px solid rgba(255,255,255,0.1)";
        }
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L14.4 8.4L21 9.3L16.5 13.8L17.7 20.4L12 17.1L6.3 20.4L7.5 13.8L3 9.3L9.6 8.4L12 2Z"
          fill={isActive ? "#22c993" : "rgba(255,255,255,0.7)"}
          stroke={isActive ? "#22c993" : "none"}
          strokeWidth="0.5"
        />
      </svg>
    </Link>
  );
};

export default AINavButton;
