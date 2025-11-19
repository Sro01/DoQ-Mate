interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'small' | 'medium' | 'large';
}

function Button({ children, variant = 'primary', size = 'medium', className = '', ...props }: ButtonProps) {
  let baseClasses = "font-bold rounded transition-colors";
  let variantClasses = "";
  let sizeClasses = "";

  switch (variant) {
    case 'primary':
      variantClasses = "bg-blue-500 hover:bg-blue-700 text-white";
      break;
    case 'secondary':
      variantClasses = "bg-gray-200 hover:bg-gray-300 text-gray-800";
      break;
    case 'outline':
      variantClasses = "border border-blue-500 text-blue-500 hover:bg-blue-50";
      break;
    case 'white':
      variantClasses = "bg-white hover:bg-gray-50 text-gray-700";
      break;
    default:
      variantClasses = "bg-blue-500 hover:bg-blue-700 text-white";
  }

  switch (size) {
    case 'small':
      sizeClasses = "text-sm py-1 px-3";
      break;
    case 'large':
      sizeClasses = "text-lg py-3 px-6";
      break;
    default: // medium
      sizeClasses = "text-base py-2 px-4";
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
