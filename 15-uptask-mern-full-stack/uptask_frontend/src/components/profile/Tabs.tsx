import { FingerPrintIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Pestañas
const tabs = [
  { name: "Mi Cuenta", href: "/profile", icon: UserIcon },
  {
    name: "Cambiar Password",
    href: "/profile/password",
    icon: FingerPrintIcon,
  },
];

// Esta función se encarga de unir las clases de tailwindCSS en una sola
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Requiere instalar una libreria, tailwind para formularios con npm i @tailwindcss/forms
export default function Tabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = tabs.filter((tab) => tab.href === location.pathname)[0]
    .href;

  return (
    <div className="mb-10">
      {/* Este contenido se muestra en dispositivos pequeños */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-purple-800 focus:ring-purple-800"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            navigate(e.target.value)
          }
          value={currentTab}
        >
          {tabs.map((tab) => {
            return (
              <option value={tab.href} key={tab.name}>
                {tab.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* Se muestra en dispositivos grandes */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                className={classNames(
                  location.pathname === tab.href
                    ? "border-purple-800 text-purple-800"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium"
                )}
              >
                <tab.icon
                  className={classNames(
                    location.pathname === tab.href
                      ? "text-purple-800"
                      : "text-gray-400 group-hover:text-gray-500",
                    "-ml-0.5 mr-2 h-5 w-5"
                  )}
                  aria-hidden="true"
                />
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
