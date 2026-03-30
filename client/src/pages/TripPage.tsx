import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Fuel, MapPin, FileText, Route, AlertTriangle,
  ChevronDown, ChevronUp, Navigation, Gauge
} from "lucide-react";
import { tripData, fuelRecommendation, restStops } from "@/lib/mockData";
import { toast } from "sonner";

export default function TripPage() {
  const [, setLocation] = useLocation();
  const [showPanel, setShowPanel] = useState(false);
  const [showFatigueAlert, setShowFatigueAlert] = useState(false);

  return (
    <div className="relative h-full min-h-screen bg-background">
      {/* Status Bar */}
      <div className="sticky top-0 z-20 px-4 py-2.5 bg-card/90 backdrop-blur-lg border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
          <span className="text-sm font-semibold text-foreground">{tripData.statusText}</span>
          <span className="text-xs text-primary ml-1">· {tripData.statusTextRu}</span>
        </div>
      </div>

      {/* Map Area - CSS-only simulated map */}
      <div className="relative h-[45vh] bg-secondary overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }} />

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500">
          <defs>
            <linearGradient id="routeGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Route dashed line */}
          <path
            d="M 200 450 Q 210 350 220 280 Q 230 200 250 150 Q 270 100 280 50"
            fill="none"
            stroke="url(#routeGrad)"
            strokeWidth="3"
            strokeDasharray="12 6"
          />
          {/* Current position */}
          <circle cx="200" cy="430" r="8" fill="var(--cyber-blue)" opacity="0.3">
            <animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="430" r="6" fill="var(--cyber-blue)" />
          {/* Destination */}
          <circle cx="280" cy="50" r="5" fill="var(--cyber-green)" />
          <circle cx="280" cy="50" r="10" fill="var(--cyber-green)" opacity="0.2">
            <animate attributeName="r" values="10;18;10" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Speed Display */}
        <div className="absolute left-4 bottom-20">
          <div className="bg-card/80 backdrop-blur-md rounded-xl px-4 py-3 border border-border">
            <p className="text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "Orbitron, monospace" }}>
              {tripData.speed}
            </p>
            <p className="text-[10px] text-muted-foreground">km/h</p>
          </div>
        </div>

        {/* ETA Display */}
        <div className="absolute right-4 bottom-20">
          <div className="bg-card/80 backdrop-blur-md rounded-xl px-4 py-3 border border-primary/30 glow-teal">
            <p className="text-xl font-bold text-primary" style={{ fontFamily: "Orbitron, monospace" }}>
              {tripData.eta}
            </p>
            <p className="text-[10px] text-muted-foreground">{tripData.distance}km · 到达</p>
          </div>
        </div>
      </div>

      {/* Trip Info Panel */}
      <div className="px-4 pt-3 pb-2">
        {/* Destination */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">{tripData.destination} ·</h2>
            <p className="text-sm text-muted-foreground">{tripData.destinationRu}</p>
          </div>
          <div className="flex gap-4 text-right">
            <div>
              <p className="text-xs text-muted-foreground">油量</p>
              <p className="text-sm font-semibold text-primary">{tripData.fuel}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">限速</p>
              <p className="text-sm font-semibold text-foreground">{tripData.speedLimit}</p>
            </div>
          </div>
        </div>

        {/* Fuel Recommendation Card */}
        <div className="bg-card rounded-xl p-3 mb-3 border border-cyber-green/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-cyber-green font-medium mb-0.5">智能加油推荐</p>
              <p className="text-sm font-semibold text-card-foreground">{fuelRecommendation.station} · 前方</p>
              <p className="text-xs text-muted-foreground">
                {fuelRecommendation.distance}km · {fuelRecommendation.pricePerLiter}{fuelRecommendation.currency}/L · 节省约 {fuelRecommendation.savingsCurrency}{fuelRecommendation.savings}
              </p>
            </div>
            <button
              onClick={() => toast("正在导航至加油站...")}
              className="px-4 py-2 bg-cyber-green text-white dark:text-primary-foreground rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
            >
              去加油
            </button>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { icon: Shield, label: "证件核查", path: "/documents" },
            { icon: MapPin, label: "沿途服务", path: "/nearby" },
            { icon: Route, label: "路线切换", path: "/routes" },
            { icon: FileText, label: "运单详情", path: "/arrival" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setLocation(item.path)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-medium text-card-foreground">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Expandable Panel Toggle */}
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="w-full flex items-center justify-center gap-1 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {showPanel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showPanel ? "收起" : "更多功能"}
        </button>

        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => setLocation("/fuel-record")}
                  className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <Fuel className="w-4 h-4 text-cyber-amber" />
                  <span className="text-xs text-card-foreground">加油记录</span>
                </button>
                <button
                  onClick={() => setLocation("/pre-check")}
                  className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <Shield className="w-4 h-4 text-cyber-green" />
                  <span className="text-xs text-card-foreground">行前检查</span>
                </button>
                <button
                  onClick={() => setShowFatigueAlert(true)}
                  className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-cyber-amber/30 transition-all"
                >
                  <AlertTriangle className="w-4 h-4 text-cyber-amber" />
                  <span className="text-xs text-card-foreground">疲劳预警演示</span>
                </button>
                <button
                  onClick={() => setLocation("/maintenance")}
                  className="flex items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                >
                  <Gauge className="w-4 h-4 text-primary" />
                  <span className="text-xs text-card-foreground">维修记录</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SOS Button */}
        <button
          onClick={() => setLocation("/sos")}
          className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-cyber-red/80 to-cyber-red/60 border border-cyber-red/40 glow-red flex items-center justify-center gap-2 text-white hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-bold text-sm">SOS 紧急求救</span>
          <span className="text-xs opacity-70">· Экстренный вызов</span>
        </button>
      </div>

      {/* Fatigue Alert Modal */}
      <AnimatePresence>
        {showFatigueAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
            onClick={() => setShowFatigueAlert(false)}
          >
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              className="w-full max-w-[480px] bg-card border-t border-cyber-amber/30 rounded-t-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Alert Header */}
              <div className="flex items-center justify-between mb-3 bg-cyber-amber/10 rounded-xl p-3 border border-cyber-amber/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-cyber-amber animate-pulse" />
                  <div>
                    <p className="text-sm font-bold text-cyber-amber">疲劳预警 · УСТАЛОСТЬ</p>
                    <p className="text-xs text-muted-foreground">已连续驾驶 3h 42min，建议就近休息</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFatigueAlert(false)}
                  className="text-xs text-cyber-amber hover:underline"
                >
                  知道了
                </button>
              </div>

              {/* Recommended Rest Stops */}
              <div className="border border-cyber-amber/20 rounded-xl p-3">
                <p className="text-xs font-semibold text-cyber-amber mb-2">推荐休息点</p>
                <div className="space-y-2">
                  {restStops.map((stop, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          stop.type === "rest" ? "bg-cyber-blue/20" : "bg-cyber-green/20"
                        }`}>
                          {stop.type === "rest" ? (
                            <Navigation className="w-4 h-4 text-cyber-blue" />
                          ) : (
                            <Fuel className="w-4 h-4 text-cyber-green" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{stop.name}</p>
                          <p className="text-[10px] text-muted-foreground">前方 {stop.distance}km · {stop.facilities}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          toast("正在导航至休息点...");
                          setShowFatigueAlert(false);
                        }}
                        className="text-xs text-primary font-bold hover:underline"
                      >
                        导航
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
