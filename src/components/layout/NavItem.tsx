import { ChevronRight, ChevronDown } from 'lucide-react';

interface NavItemProps {
  icon: string;
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  isCollapsed?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, hasDropdown = false, isActive = false, isCollapsed = false, isOpen = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 py-3 text-left transition-colors rounded ${
        isCollapsed ? 'px-2 justify-center' : 'px-4'
      } ${
        isActive
          ? 'bg-gray-300 text-gray-800 font-semibold'
          : 'text-gray-700 hover:bg-gray-300'
      }`}
      title={isCollapsed ? label : undefined}
    >
      <span className="text-xl">{icon}</span>
      {!isCollapsed && (
        <>
          <span className="flex-1">{label}</span>
          {hasDropdown && (
            isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />
          )}
        </>
      )}
    </button>
  );
}

export default NavItem;
