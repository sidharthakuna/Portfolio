import { useEffect } from "react";
import profilePic from "@/assets/profile.jpg";
import { FiX } from "react-icons/fi";
import "@/styles/ui/DP.css";

export function DP({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="profile-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Profile photo preview"
    >
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close profile photo preview"
        >
          <FiX size={18} />
        </button>
        <img
          src={profilePic}
          alt="Sidhartha Kuna — Profile Photo"
          className="profile-full"
        />
      </div>
    </div>
  );
}

export default DP;
