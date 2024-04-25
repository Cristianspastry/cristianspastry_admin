import { navBarLinks } from "@/utils/const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="md:hidden bg-blue-500 text-white py-4">
      <div className="flex justify-between items-center px-4">
        <Link href="/" className="text-xl font-bold">
         {" Cristian's pastry admin"}
        </Link>
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>
      </div>
      {isOpen && (
        <div className="bg-white px-4 py-2 mt-2 rounded-md">
          <ul className="flex flex-col">
            {navBarLinks.map((link) => (
              <li key={link.title} className="mb-2">
                <Link href={link.href} className={`text-lg ${pathname === link.href ? 'text-blue-700' : 'text-gray-800'}`} onClick={closeMenu}>
                  <FontAwesomeIcon icon={link.icon} className="mr-2" />
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MobileNavBar;
