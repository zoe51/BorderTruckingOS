import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Route, Clock, Fuel, DollarSign, Shield, CheckCircle } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { routeOptions } from "@/lib/mockData";
import { toast } from "sonner";

const riskColors: Record<string, { bg: string; text: string; label: string }> = {
  low: { bg: "bg-cyber-green/20", text: "text-cyber-green", label: "低风险" },
  medium: { bg: "bg-cyber-amber/20", text: "text-cyber-amber", label: "中风险" },
  high: { bg: "bg-cyber-red/20", text: "text-cyber-red", label: "高风险" },
};

export default function RouteSelectPage() {
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState(1);

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="路线选择" titleRu="Выбор маршрута" backPath="/" />
      <div className="px-4 py-4">
        <p className="text-xs text-muted-foreground mb-3">多路线方案对比（时效 / 油耗 / 收费 / 合规风险）</p>

        <div className="space-y-3 mb-4">
          {routeOptions.map((route, i) => {
            const isSelected = selected === route.id;
            const risk = riskColors[route.risk];
            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelected(route.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected ? "bg-primary/5 border-primary/30 glow-teal" : "bg-secondary border-border hover:border-primary/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isSelected && <CheckCircle className="w-4 h-4 text-primary" />}
                    <p className="text-sm font-bold">{route.name}</p>
                    {i === 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">推荐</span>}
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${risk.bg} ${risk.text}`}>{risk.label}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <Route className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-0.5" />
                    <p className="text-xs font-semibold">{route.distance}km</p>
                    <p className="text-[9px] text-muted-foreground">距离</p>
                  </div>
                  <div>
                    <Clock className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-0.5" />
                    <p className="text-xs font-semibold">{route.time}</p>
                    <p className="text-[9px] text-muted-foreground">时间</p>
                  </div>
                  <div>
                    <DollarSign className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-0.5" />
                    <p className="text-xs font-semibold">¥{route.toll}</p>
                    <p className="text-[9px] text-muted-foreground">过路费</p>
                  </div>
                  <div>
                    <Fuel className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-0.5" />
                    <p className="text-xs font-semibold">¥{route.fuel}</p>
                    <p className="text-[9px] text-muted-foreground">油费</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={() => {
            toast.success("路线已切换");
            setLocation("/");
          }}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm glow-teal"
        >
          确认选择路线
        </button>
      </div>
    </div>
  );
}
