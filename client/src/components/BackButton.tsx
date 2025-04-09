import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  label?: string;
}

export function BackButton({ to, label = "Quay lại" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (to) return;
    navigate(-1);
  };

  if (to) {
    return (
      <Link to={to}>
        <Button variant="ghost" className="flex items-center gap-2 pl-0 hover:bg-transparent hover:text-primary">
          <ArrowLeft size={18} />
          <span>{label}</span>
        </Button>
      </Link>
    );
  }

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 pl-0 hover:bg-transparent hover:text-primary"
      onClick={handleGoBack}
    >
      <ArrowLeft size={18} />
      <span>{label}</span>
    </Button>
  );
}