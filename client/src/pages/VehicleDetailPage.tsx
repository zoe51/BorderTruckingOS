import { motion } from "framer-motion";
import { Car, Gauge, Wrench, Fuel, Weight, BarChart3 } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { vehicleInfo } from "@/lib/mockData";

export default function VehicleDetailPage() {
  const specs = [
    { icon: Car, label: "品牌型号", value: vehicleInfo.brand },
    { icon: Gauge, label: "轴数", value: `${vehicleInfo.axles}轴` },
    { icon: Weight, label: "载重", value: `${vehicleInfo.weight}吨` },
    { icon: Wrench, label: "上次保养", value: vehicleInfo.lastMaintenance },
    { icon: BarChart3, label: "总里程", value: vehicleInfo.mileage },
    { icon: Fuel, label: "油箱容量", value: "400L" },
  ];

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="车辆档案" titleRu="Транспортное средство" backPath="/profile" />
      <div className="px-4 py-4">
        {/* Vehicle Card */}
        <div className="p-4 rounded-xl bg-secondary border border-border mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center">
              <Car className="w-7 h-7 text-cyber-blue" />
            </div>
            <div>
              <p className="text-lg font-bold">{vehicleInfo.plate}</p>
              <p className="text-xs text-muted-foreground">{vehicleInfo.brand} · {vehicleInfo.axles}轴 · {vehicleInfo.weight}吨</p>
            </div>
          </div>

          {/* Vehicle SVG Illustration */}
          <div className="h-28 rounded-xl bg-muted/50 border border-border mb-4 flex items-center justify-center overflow-hidden relative">
            <svg viewBox="0 0 300 80" className="w-full h-full opacity-60">
              <rect x="20" y="25" width="200" height="40" rx="4" fill="oklch(0.3 0.02 260)" />
              <rect x="220" y="15" width="60" height="50" rx="6" fill="oklch(0.35 0.03 260)" />
              <rect x="225" y="20" width="25" height="20" rx="3" fill="oklch(0.45 0.1 250)" opacity="0.5" />
              <circle cx="60" cy="68" r="10" fill="oklch(0.25 0.02 260)" stroke="oklch(0.4 0.02 260)" strokeWidth="2" />
              <circle cx="120" cy="68" r="10" fill="oklch(0.25 0.02 260)" stroke="oklch(0.4 0.02 260)" strokeWidth="2" />
              <circle cx="180" cy="68" r="10" fill="oklch(0.25 0.02 260)" stroke="oklch(0.4 0.02 260)" strokeWidth="2" />
              <line x1="0" y1="78" x2="300" y2="78" stroke="oklch(0.3 0.02 260)" strokeWidth="1" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 border border-border"
              >
                <spec.icon className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <p className="text-[9px] text-muted-foreground">{spec.label}</p>
                  <p className="text-xs font-medium">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
