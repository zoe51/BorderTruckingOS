import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Phone, MapPin, Heart, Radio, FileText, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function SOSPage() {
  const [, setLocation] = useLocation();
  const [activated, setActivated] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!activated) return;
    if (countdown <= 0) {
      toast.success("SOS信号已发送，车队已收到通知");
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [activated, countdown]);

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background relative overflow-hidden">
      {/* Pulsing background */}
      {activated && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-cyber-red/5 animate-pulse-glow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-cyber-red/20">
            <div className="absolute inset-0 rounded-full border border-cyber-red/10 animate-ping" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-background/95 backdrop-blur-lg">
        <button onClick={() => setLocation("/")} className="flex items-center gap-1 text-muted-foreground">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">返回</span>
        </button>
      </div>

      <div className="px-4 py-8 flex flex-col items-center">
        {!activated ? (
          <>
            {/* SOS Button */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 rounded-full bg-cyber-red/20 animate-ping" style={{ animationDuration: "2s" }} />
              <button
                onClick={() => setActivated(true)}
                className="relative w-40 h-40 rounded-full bg-gradient-to-br from-cyber-red to-cyber-red/70 flex flex-col items-center justify-center glow-red border-4 border-cyber-red/50 active:scale-95 transition-transform"
              >
                <span className="text-3xl font-black" style={{ fontFamily: "Orbitron, monospace" }}>SOS</span>
                <span className="text-xs mt-1 opacity-80">长按激活</span>
              </button>
            </motion.div>

            <p className="text-sm text-muted-foreground text-center mb-2">紧急求救 · Экстренный вызов</p>
            <p className="text-xs text-muted-foreground text-center max-w-[280px]">
              点击SOS按钮将自动上报GPS位置、车辆信息至车队调度，并推送就近急救资源
            </p>

            {/* Status Check */}
            <div className="w-full mt-8 space-y-3">
              <p className="text-xs text-muted-foreground font-medium">系统确认</p>
              {[
                { q: "您是否意识清醒？", icon: Heart },
                { q: "是否有人员受伤？", icon: Heart },
                { q: "是否需要医疗救助？", icon: Phone },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border">
                  <item.icon className="w-4 h-4 text-cyber-red" />
                  <span className="text-sm flex-1">{item.q}</span>
                  <div className="flex gap-2">
                    <button onClick={() => toast("已记录")} className="px-3 py-1 rounded-lg bg-cyber-green/20 text-cyber-green text-xs">是</button>
                    <button onClick={() => toast("已记录")} className="px-3 py-1 rounded-lg bg-muted text-muted-foreground text-xs">否</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Activated State */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center mb-8"
            >
              <div className="w-24 h-24 rounded-full bg-cyber-red/20 flex items-center justify-center mx-auto mb-4 border border-cyber-red/30">
                <Radio className="w-10 h-10 text-cyber-red animate-pulse" />
              </div>
              {countdown > 0 ? (
                <>
                  <p className="text-lg font-bold text-cyber-red">SOS信号发送中...</p>
                  <p className="text-4xl font-black text-cyber-red mt-2" style={{ fontFamily: "Orbitron, monospace" }}>{countdown}</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-cyber-green">SOS信号已发送</p>
                  <p className="text-xs text-muted-foreground mt-1">车队调度已收到通知</p>
                </>
              )}
            </motion.div>

            {/* Auto-reported Info */}
            <div className="w-full space-y-2">
              <p className="text-xs text-muted-foreground font-medium">已自动上报</p>
              {[
                { icon: MapPin, label: "GPS位置", value: "N55.7558° E37.6173°", color: "text-cyber-green" },
                { icon: Radio, label: "车辆信息", value: "豫B·58723 重汽HOWO", color: "text-cyber-blue" },
                { icon: FileText, label: "事件时间", value: new Date().toLocaleString("zh-CN"), color: "text-primary" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 + 1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border"
                >
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                  <div className="flex-1">
                    <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    <p className="text-xs font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Emergency Contacts */}
            <div className="w-full mt-4 space-y-2">
              <p className="text-xs text-muted-foreground font-medium">就近急救资源</p>
              {[
                { name: "急救电话 · 112", desc: "Скорая помощь" },
                { name: "最近医院 · 18km", desc: "Городская больница" },
                { name: "车队调度", desc: "河南跨欧物流" },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => toast(`正在拨打 ${item.name}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-cyber-red/30 transition-all"
                >
                  <Phone className="w-4 h-4 text-cyber-red" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => { setActivated(false); setCountdown(5); }}
              className="w-full mt-4 py-3 rounded-xl bg-muted text-sm font-medium"
            >
              取消求救
            </button>
          </>
        )}
      </div>
    </div>
  );
}
