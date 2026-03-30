import { useLocation } from "wouter";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background flex flex-col items-center justify-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-cyber-red/10 border border-cyber-red/30 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-cyber-red" />
      </div>
      <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: "Orbitron, monospace" }}>404</h1>
      <p className="text-sm text-muted-foreground mb-1">页面未找到</p>
      <p className="text-xs text-muted-foreground mb-8">Страница не найдена</p>
      <button
        onClick={() => setLocation("/")}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm glow-teal"
      >
        <Home className="w-4 h-4" />
        返回首页
      </button>
    </div>
  );
}
