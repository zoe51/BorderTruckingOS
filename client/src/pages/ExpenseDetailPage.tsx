import { motion } from "framer-motion";
import { DollarSign, Fuel, Route, ParkingCircle, AlertTriangle, Wrench, Send } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { expenses } from "@/lib/mockData";
import { toast } from "sonner";

export default function ExpenseDetailPage() {
  const items = [
    { icon: Fuel, label: "燃油费", value: expenses.currentTrip.fuel, color: "text-cyber-green" },
    { icon: Route, label: "过路费", value: expenses.currentTrip.toll, color: "text-cyber-blue" },
    { icon: ParkingCircle, label: "停车费", value: expenses.currentTrip.parking, color: "text-muted-foreground" },
    { icon: AlertTriangle, label: "罚款", value: expenses.currentTrip.fine, color: "text-cyber-amber" },
    { icon: Wrench, label: "维修费", value: expenses.currentTrip.repair, color: "text-cyber-red" },
  ];

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="费用记录" titleRu="Расходы" backPath="/profile" />
      <div className="px-4 py-4">
        {/* Total */}
        <div className="p-5 rounded-xl bg-secondary border border-border mb-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">本次行程总费用</p>
          <p className="text-3xl font-bold text-primary" style={{ fontFamily: "Orbitron, monospace" }}>
            ¥{expenses.currentTrip.total.toLocaleString()}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1">莫斯科线 · 2024.03.28</p>
        </div>

        {/* Breakdown */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">费用明细</p>
        <div className="space-y-2 mb-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border"
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-sm flex-1">{item.label}</span>
              <span className="text-sm font-semibold" style={{ fontFamily: "Orbitron, monospace" }}>
                ¥{item.value.toLocaleString()}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Pending Approval */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">待审批费用</p>
        <div className="p-3 rounded-xl bg-cyber-amber/5 border border-cyber-amber/20 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{expenses.pendingApproval.type}</p>
              <p className="text-[10px] text-muted-foreground">待车队确认</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-cyber-amber" style={{ fontFamily: "Orbitron, monospace" }}>
                ¥{expenses.pendingApproval.amount}
              </p>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full badge-warning">{expenses.pendingApproval.status}</span>
            </div>
          </div>
        </div>

        {/* Multi-currency */}
        <div className="p-3 rounded-xl bg-secondary border border-border mb-4">
          <p className="text-xs text-muted-foreground mb-2">多币种换算</p>
          <div className="flex justify-between text-xs">
            <span>人民币 (CNY)</span>
            <span className="font-medium">¥{expenses.currentTrip.total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>俄罗斯卢布 (RUB)</span>
            <span className="font-medium text-muted-foreground">₽{(expenses.currentTrip.total * 12.8).toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => toast.success("费用明细已提交车队财务")}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm glow-teal"
        >
          <Send className="w-4 h-4" />
          一键提交车队财务
        </button>
      </div>
    </div>
  );
}
