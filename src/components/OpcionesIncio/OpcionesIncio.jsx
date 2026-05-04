import { Link, useNavigate } from "react-router-dom";
import { HiOutlineLightBulb, HiOutlineSearchCircle } from "react-icons/hi";

export const OpcionesIncio = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Registra tu idea",
      description:
        "Completa el formulario para registrar tu idea de mejora continua.",
      path: "registroIdea",
      icon: <HiOutlineLightBulb className="w-8 h-8" />,
      color: "indigo",
    },
    {
      title: "Seguimiento",
      description: "Consulta el estado de tus ideas registradas anteriormente.",
      path: "seguimiento",
      icon: <HiOutlineSearchCircle className="w-8 h-8" />,
      color: "blue",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {options.map((opt) => (
        <Link
          key={opt.path}
          to={opt.path}
          className="group relative bg-white p-8 rounded-2xl shadow-sm border 
          border-slate-200 text-left transition-all duration-300 hover:shadow-xl
          hover:border-indigo-300 hover:-translate-y-1 focus:outline-none focus:right-2
          focus:ring-indigo-500/50"
        >
          <div className="flex flex-col items-center text-center">
            <div
              className={`mb-5 rounded-xl bg-${opt.color}-50 text-${opt.color}-600
                group-hover:scale-110 transition-transform duration-300
              `}
            >
              {opt.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              {opt.title}
            </h3>
            <p className="text-slate-500 leading-relaxed">{opt.description}</p>
            <div
              className="mt-6 flex items-center text-sm font-semibold text-indigo-600 
              group-hover:opacity-100 transition-opacity"
            >
              Comenzar ahora →
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
