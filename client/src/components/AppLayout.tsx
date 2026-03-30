import { useLocation } from "wouter";
import { Navigation, AlertTriangle, User } from "lucide-react";
import { useState } from "react";
import TranslateFAB from "./TranslateFAB";

const tabs = [
  { path: "/", label: "行程", labelRu: "Маршрут", icon: Navigation },
  { path: "/events", label: "事件", labelRu: "События", icon: AlertTriangle },
  { path: "/profile", label: "我的", labelRu: "Профиль", icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [showTranslate, setShowTranslate] = useState(false);

  return (
    <div className="relative min-h-screen max-w-[480px] mx-auto bg-background flex flex-col overflow-hidden">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {children}
      </div>

      {/* Translate FAB */}
      <TranslateFAB open={showTranslate} onToggle={() => setShowTranslate(!showTranslate)} />

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-card/95 backdrop-blur-xl border-t border-border z-40">
        <div className="flex items-center justify-around h-16 px-4">
          {tabs.map((tab) => {
            const isActive = location === tab.path || (tab.path === "/" && location === "/");
            const Icon = tab.icon;
            return (
              <button
                key={tab.path}
                onClick={() => setLocation(tab.path)}
                className={`flex flex-col items-center gap-0.5 py-1 px-4 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
