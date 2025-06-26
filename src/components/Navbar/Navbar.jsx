import { useState } from "react";
import { 
    FaBars, 
    FaHome, 
    FaTimes, 
} from "react-icons/fa";
import Logo from "../../assets/logomesa.png";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
    const[isOpen, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <>
            <nav className="bg-primary shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <img 
                                src={ Logo } 
                                alt="logo"
                                className="h-12 w-auto mr-3" 
                            />
                            <h1 className="font-bold text-white text-xl">
                                MEJORA CONTINUA
                            </h1>
                        </div>

                        <div className="hidden md:flex space-x-6 items-center">
                            <a onClick={() => handleNavigate("/")} className="flex items-center text-white 
                                hover:text-secondary transition-colors cursor-pointer">
                                <FaHome className="mr-2"/>
                                <span>Inicio</span>
                            </a>                        
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={ () => setOpen(!isOpen) }
                                className="text-white focus:outline-none p-2 rounded cursor-pointer
                                transition-colors hover:bg-gray-300"
                            >
                                { isOpen ? <FaTimes size={ 24 }/> : <FaBars size={ 24 }/> }
                            </button>
                        </div>
                    </div>
                </div>

                {
                    isOpen && (
                        <div className="md:hidden bg-white shadow-lg">
                            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                <a  
                                    className="flex items-center px-3 py-2 
                                    rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer"
                                >
                                    <FaHome className="mr-2"/>
                                    Inicio
                                </a>                                
                            </div>
                        </div>
                    )
                }
            </nav>
        </>
    )
}
