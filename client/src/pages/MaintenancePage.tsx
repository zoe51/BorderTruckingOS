import { motion } from "framer-motion";
import { Wrench, Calendar, MapPin, DollarSign } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { maintenanceRecords, vehicleInfo } from "@/lib/mockData";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="维修记录" titleRu="История обслуживания" backPath="/profile" />
      <div className="px-4 py-4">
        {/* Next Maintenance */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold">下次保养提醒</span>
          </div>
          <p className="text-xs text-muted-foreground ml-6">
            预计里程 13万km · 距上次保养已行驶 1万km
          </p>
          <div className="mt-2 ml-6">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary" style={{ width: "60%" }} />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">保养周期进度 60%</p>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 flex items-center justify-center">
            <span className="text-xs font-bold text-cyber-blue">🚛</span>
          </div>
          <div>
            <p className="text-sm font-semibold">{vehicleInfo.plate}</p>
            <p className="text-[10px] text-muted-foreground">{vehicleInfo.brand} · 总里程 {vehicleInfo.mileage}</p>
          </div>
        </div>

        {/* Records */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">维修保养历史</p>
        <div className="space-y-2">
          {maintenanceRecords.map((record, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-3 rounded-xl bg-secondary border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">{record.type}</p>
                <p className="text-sm font-bold text-cyber-amber" style={{ fontFamily: "Orbitron, monospace" }}>¥{record.cost}</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" />{record.date}</span>
                <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{record.location}</span>
                <span>{record.mileage}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
