import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ChevronRight, FileText, Car, DollarSign, Bell,
  Users, LogOut, Wrench, CheckCircle, AlertTriangle, Shield
} from "lucide-react";
import { driverInfo, documents, vehicleInfo, expenses } from "@/lib/mockData";
import { toast } from "sonner";

export default function ProfilePage() {
  const [, setLocation] = useLocation();

  const statusColor: Record<string, string> = {
    valid: "badge-valid",
    expiring: "badge-warning",
    expired: "badge-danger",
  };
  const statusLabel: Record<string, string> = {
    valid: "有效",
    expiring: "临期",
    expired: "过期",
  };

  const docIcons: Record<string, typeof FileText> = {
    passport: FileText,
    license: Shield,
    tir: CheckCircle,
    insurance: FileText,
  };

  return (
    <div className="px-4 pt-4 pb-4">
      {/* Driver Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary rounded-2xl p-4 mb-4 border border-border"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-xl bg-cyber-blue/20 flex items-center justify-center border border-cyber-blue/30">
            <span className="text-lg font-bold text-cyber-blue">{driverInfo.avatar}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold">{driverInfo.name}</h2>
            <p className="text-xs text-muted-foreground">{driverInfo.plate} · {driverInfo.route}</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-cyber-green/20 border border-cyber-green/30 text-[10px] font-medium text-cyber-green">
            {driverInfo.status}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: driverInfo.totalTrips, label: "总行程次" },
            { value: `${driverInfo.complianceRate}%`, label: "合规通过率" },
            { value: "3.2万", label: "累计公里" },
          ].map((stat, i) => (
            <div key={i} className="bg-muted/50 rounded-xl py-2.5 text-center border border-border">
              <p className="text-lg font-bold" style={{ fontFamily: "Orbitron, monospace" }}>{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Documents Section */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-medium">证件管理 · ДОКУМЕНТЫ</p>
        <div className="space-y-2">
          {documents.map((doc, i) => {
            const Icon = docIcons[doc.icon] || FileText;
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setLocation("/documents")}
                className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-primary/20 transition-all cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{doc.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {doc.expiry ? `有效期至 ${doc.expiry}` : doc.number}
                  </p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColor[doc.status]}`}>
                  {statusLabel[doc.status]}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Vehicle Section */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-medium">车辆档案 · ТРАНСПОРТ</p>
        <div className="space-y-2">
          <div
            onClick={() => setLocation("/vehicle")}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-cyber-blue/10 flex items-center justify-center">
              <Car className="w-4 h-4 text-cyber-blue" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{vehicleInfo.plate}</p>
              <p className="text-[10px] text-muted-foreground">{vehicleInfo.brand} · {vehicleInfo.axles}轴 · {vehicleInfo.weight}吨</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            onClick={() => setLocation("/maintenance")}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-cyber-amber/10 flex items-center justify-center">
              <Wrench className="w-4 h-4 text-cyber-amber" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">维修记录</p>
              <p className="text-[10px] text-muted-foreground">上次保养 {vehicleInfo.lastMaintenance} · {vehicleInfo.mileage}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Expenses Section */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-medium">费用记录 · РАСХОДЫ</p>
        <div className="space-y-2">
          <div
            onClick={() => setLocation("/expenses")}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-cyber-green/10 flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-cyber-green" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">本次行程费用</p>
              <p className="text-[10px] text-muted-foreground">油费 ¥{expenses.currentTrip.fuel} · 过路费 ¥{expenses.currentTrip.toll}</p>
            </div>
            <span className="text-sm font-bold" style={{ fontFamily: "Orbitron, monospace" }}>¥{expenses.currentTrip.total.toLocaleString()}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            onClick={() => setLocation("/expenses")}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-cyber-amber/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-cyber-amber" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">待审批费用</p>
              <p className="text-[10px] text-muted-foreground">{expenses.pendingApproval.type} ¥{expenses.pendingApproval.amount} · 待车队确认</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full badge-warning">待审批</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2 font-medium">设置 · НАСТРОЙКИ</p>
        <div className="space-y-2">
          <div
            onClick={() => setLocation("/settings")}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold flex-1">通知与告警偏好</p>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <div
            onClick={() => setLocation("/fleet")}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-primary/20 transition-all cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">车队信息</p>
              <p className="text-[10px] text-muted-foreground">{driverInfo.company} · 联系调度</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </div>
          <button
            onClick={() => {
              toast("已退出登录");
              setLocation("/login");
            }}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-cyber-red/20 transition-all w-full"
          >
            <div className="w-9 h-9 rounded-lg bg-cyber-red/10 flex items-center justify-center">
              <LogOut className="w-4 h-4 text-cyber-red" />
            </div>
            <p className="text-sm font-semibold text-cyber-red">退出登录</p>
          </button>
        </div>
      </div>
    </div>
  );
}
