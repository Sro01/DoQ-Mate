interface NavItemProps {
  icon: string;
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, hasDropdown = false, isActive = false, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors rounded ${
        isActive
          ? 'bg-white text-gray-800 font-semibold'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1">{label}</span>
      {hasDropdown && <span>›</span>}
    </button>
  );
}

export default NavItem;
