import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

interface SubPageHeaderProps {
  title: string;
  titleRu?: string;
  backPath?: string;
  rightAction?: React.ReactNode;
}

export default function SubPageHeader({ title, titleRu, backPath, rightAction }: SubPageHeaderProps) {
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="flex items-center justify-between h-12 px-3">
        <button
          onClick={() => backPath ? setLocation(backPath) : window.history.back()}
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors -ml-1"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
        <div className="text-center">
          <h1 className="text-sm font-semibold">{title}</h1>
          {titleRu && <p className="text-[9px] text-primary">{titleRu}</p>}
        </div>
        <div className="w-16 flex justify-end">
          {rightAction || <div />}
        </div>
      </div>
    </header>
  );
}
