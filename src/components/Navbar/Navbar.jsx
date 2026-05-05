import { useState } from "react";
import { FaBars, FaHome, FaTimes } from "react-icons/fa";
import Logo from "../../assets/logomesa.png";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-white/80 
      backdrop-blur-md border-b border-slate-200 print:hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="p-1 rounded-lg transition-colors group-hover:bg-slate-50">
              <img
                src={Logo}
                alt="MESA logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <div className="hidden md:block h-6 w-px bg-slate-200" />{" "}
            <h1 className="text-lg font-semibold tracking-tight text-slate-800">
              <Link to="/">
                MEJORA <span className="text-blue-600">CONTINUA</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
};
