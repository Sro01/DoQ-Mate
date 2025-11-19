interface LogoProps {
  className?: string;
}

function Logo({ className = '' }: LogoProps) {
  return (
    <h1 className={`text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent ${className}`}>
      DoQ-Mate
    </h1>
  );
}

export default Logo;
