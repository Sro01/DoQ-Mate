interface SubMenuItemProps {
  label: string;
  onClick?: () => void;
}

function SubMenuItem({ label, onClick }: SubMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
    >
      {label}
    </button>
  );
}

export default SubMenuItem;
