import { useState } from 'react';
import { IoMenu, IoClose } from 'react-icons/io5';
import { 
  FaBriefcase, 
  FaProjectDiagram
} from 'react-icons/fa';

export default function FloatingNav({ setShowPortfolio, setShowExperience }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    {
      icon: <FaBriefcase className="w-6 h-6" />,
      label: 'My Experience',
      action: () => setShowExperience(true)
    },
    {
      icon: <FaProjectDiagram className="w-6 h-6" />,
      label: 'My Portfolio',
      action: () => setShowPortfolio(true)
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-4">
          <div className="flex flex-col gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  toggleMenu();
                }}
                className="flex items-center gap-6 bg-white px-10 py-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-200"
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={toggleMenu}
        className="bg-gray-500 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200"
      >
        {isOpen ? <IoClose className="w-6 h-6" /> : <IoMenu className="w-6 h-6" />}
      </button>
    </div>
  );
} 