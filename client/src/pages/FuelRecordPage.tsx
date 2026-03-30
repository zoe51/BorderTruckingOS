import { motion } from "framer-motion";
import { Fuel, MapPin, Calendar, TrendingDown } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { toast } from "sonner";

const fuelRecords = [
  { id: 1, station: "Лукойл АЗС", location: "Нижний Новгород", date: "2024.03.28", liters: 180, price: 52.3, currency: "₽", total: 9414, totalCNY: 736 },
  { id: 2, station: "Газпромнефть", location: "Казань", date: "2024.03.26", liters: 200, price: 54.1, currency: "₽", total: 10820, totalCNY: 846 },
  { id: 3, station: "Роснефть", location: "Самара", date: "2024.03.24", liters: 160, price: 51.8, currency: "₽", total: 8288, totalCNY: 648 },
  { id: 4, station: "中石化", location: "郑州", date: "2024.03.22", liters: 220, price: 7.82, currency: "¥", total: 1720, totalCNY: 1720 },
];

export default function FuelRecordPage() {
  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="加油记录" titleRu="Записи заправок" backPath="/" />
      <div className="px-4 py-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="p-3 rounded-xl bg-secondary border border-border text-center">
            <p className="text-lg font-bold text-cyber-green" style={{ fontFamily: "Orbitron, monospace" }}>760L</p>
            <p className="text-[10px] text-muted-foreground">本次总加油</p>
          </div>
          <div className="p-3 rounded-xl bg-secondary border border-border text-center">
            <p className="text-lg font-bold text-cyber-amber" style={{ fontFamily: "Orbitron, monospace" }}>¥3,950</p>
            <p className="text-[10px] text-muted-foreground">总费用(CNY)</p>
          </div>
          <div className="p-3 rounded-xl bg-secondary border border-border text-center">
            <p className="text-lg font-bold text-primary" style={{ fontFamily: "Orbitron, monospace" }}>
              <TrendingDown className="w-4 h-4 inline mr-0.5" />¥188
            </p>
            <p className="text-[10px] text-muted-foreground">智能节省</p>
          </div>
        </div>

        {/* Records */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">加油明细</p>
        <div className="space-y-2">
          {fuelRecords.map((record, i) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-3 rounded-xl bg-secondary border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-cyber-green" />
                  <p className="text-sm font-semibold">{record.station}</p>
                </div>
                <p className="text-sm font-bold" style={{ fontFamily: "Orbitron, monospace" }}>¥{record.totalCNY}</p>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{record.location}</span>
                <span className="flex items-center gap-0.5"><Calendar className="w-3 h-3" />{record.date}</span>
                <span>{record.liters}L</span>
                <span>{record.price}{record.currency}/L</span>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => toast("加油记录已上传至车队成本台账")}
          className="w-full mt-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm glow-teal"
        >
          同步至车队台账
        </button>
      </div>
    </div>
  );
}
