import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

interface AuthLinkProps extends React.ComponentProps<typeof Link> {
  to: string;
}

export default function AuthLink({ to, ...props }: AuthLinkProps) {
  const { isAuthenticated, authenticatedNavigate } = useAuth();
  const isProtected = ["/cart", "/mypage", "/order"].some((p) => to.startsWith(p));

  const handleClick = (e: React.MouseEvent) => {
    if (isProtected && !isAuthenticated) {
      e.preventDefault();
      authenticatedNavigate(to);
    }
  };

  return <Link to={to} onClick={handleClick} {...props} />;
}
