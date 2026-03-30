import { useState } from "react";
import { Bell, Volume2, Vibrate, MapPin, Gauge, AlertTriangle, Sun, Moon } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-10 h-6 rounded-full transition-all relative ${enabled ? "bg-primary" : "bg-muted"}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${enabled ? "left-5" : "left-1"}`} />
    </button>
  );
}

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    pushNotification: true,
    soundAlert: true,
    vibration: true,
    fatigueAlert: true,
    speedAlert: true,
    fuelAlert: true,
    locationSharing: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
    toast(`${settings[key] ? "已关闭" : "已开启"}`);
  };

  const sections = [
    {
      title: "通知设置",
      items: [
        { key: "pushNotification" as const, icon: Bell, label: "推送通知", desc: "接收车队消息和系统通知" },
        { key: "soundAlert" as const, icon: Volume2, label: "声音提醒", desc: "告警时播放提示音" },
        { key: "vibration" as const, icon: Vibrate, label: "震动反馈", desc: "操作和告警时震动" },
      ],
    },
    {
      title: "告警偏好",
      items: [
        { key: "fatigueAlert" as const, icon: AlertTriangle, label: "疲劳驾驶预警", desc: "连续驾驶超时提醒" },
        { key: "speedAlert" as const, icon: Gauge, label: "超速预警", desc: "超过限速时提醒" },
        { key: "fuelAlert" as const, icon: AlertTriangle, label: "油量预警", desc: "油量低于20%时提醒" },
      ],
    },
    {
      title: "隐私设置",
      items: [
        { key: "locationSharing" as const, icon: MapPin, label: "位置共享", desc: "与车队共享实时位置" },
      ],
    },
  ];

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="设置" titleRu="Настройки" backPath="/profile" />
      <div className="px-4 py-4 space-y-5">
        {/* Theme Switch Section */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium">外观设置</p>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
            {theme === "light" ? (
              <Sun className="w-4 h-4 text-primary flex-shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-primary flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">主题模式</p>
              <p className="text-[10px] text-muted-foreground">
                {theme === "light" ? "浅色模式 · Светлая тема" : "深色模式 · Тёмная тема"}
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-secondary rounded-lg p-0.5">
              <button
                onClick={() => {
                  if (theme === "dark" && toggleTheme) {
                    toggleTheme();
                    toast("已切换至浅色模式");
                  }
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  theme === "light"
                    ? "bg-card text-card-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sun className="w-3 h-3" />
                浅色
              </button>
              <button
                onClick={() => {
                  if (theme === "light" && toggleTheme) {
                    toggleTheme();
                    toast("已切换至深色模式");
                  }
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  theme === "dark"
                    ? "bg-card text-card-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Moon className="w-3 h-3" />
                深色
              </button>
            </div>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs text-muted-foreground mb-2 font-medium">{section.title}</p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <div key={item.key} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                  <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-card-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                  <Toggle enabled={settings[item.key]} onToggle={() => toggle(item.key)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
