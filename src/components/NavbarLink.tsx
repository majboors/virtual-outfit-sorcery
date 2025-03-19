
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavbarLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

const NavbarLink = ({ 
  href, 
  children, 
  isActive = false, 
  className 
}: NavbarLinkProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "px-4 py-2 text-sm font-medium transition-colors relative",
        isActive 
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
      )}
    </Link>
  );
};

export default NavbarLink;
