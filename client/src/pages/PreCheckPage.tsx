import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Navigation, Shield, Package, Truck } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { preCheckItems } from "@/lib/mockData";
import { toast } from "sonner";

const statusIcon: Record<string, { icon: typeof CheckCircle; color: string }> = {
  valid: { icon: CheckCircle, color: "text-cyber-green" },
  expiring: { icon: AlertTriangle, color: "text-cyber-amber" },
  expired: { icon: XCircle, color: "text-cyber-red" },
  not_applicable: { icon: CheckCircle, color: "text-muted-foreground" },
};

export default function PreCheckPage() {
  const [, setLocation] = useLocation();
  const [allChecked, setAllChecked] = useState(false);

  const hasIssue = preCheckItems.documents.some((d) => d.status === "expiring" || (d.status as string) === "expired");

  const sections = [
    { title: "证件合规性核验", titleRu: "Проверка документов", icon: Shield, items: preCheckItems.documents },
    { title: "货物合规性核验", titleRu: "Проверка груза", icon: Package, items: preCheckItems.cargo },
    { title: "车辆信息确认", titleRu: "Проверка транспорта", icon: Truck, items: preCheckItems.vehicle },
  ];

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="行前检查" titleRu="Предрейсовая проверка" backPath="/" />

      <div className="px-4 py-4 space-y-4">
        {/* Overall Status */}
        <div className={`p-4 rounded-xl border ${hasIssue ? "bg-cyber-amber/5 border-cyber-amber/20" : "bg-cyber-green/5 border-cyber-green/20"}`}>
          <div className="flex items-center gap-2 mb-1">
            {hasIssue ? (
              <AlertTriangle className="w-5 h-5 text-cyber-amber" />
            ) : (
              <CheckCircle className="w-5 h-5 text-cyber-green" />
            )}
            <span className="text-sm font-bold">
              {hasIssue ? "存在需要注意的项目" : "所有检查项目通过"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground ml-7">
            {hasIssue ? "国际驾照即将到期，请尽快续期" : "可以安全出发"}
          </p>
        </div>

        {/* Check Sections */}
        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <section.icon className="w-4 h-4 text-primary" />
              <p className="text-xs font-medium text-muted-foreground">{section.title} · {section.titleRu}</p>
            </div>
            <div className="space-y-1.5">
              {section.items.map((item, ii) => {
                const si2 = statusIcon[item.status];
                const Icon = si2.icon;
                return (
                  <div key={ii} className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border">
                    <Icon className={`w-4 h-4 ${si2.color}`} />
                    <span className="text-sm flex-1">{item.name}</span>
                    <span className={`text-[10px] ${si2.color}`}>
                      {item.status === "valid" ? "通过" : item.status === "expiring" ? "临期" : (item.status as string) === "expired" ? "过期" : "不适用"}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Start Navigation Button */}
        <button
          onClick={() => {
            if (hasIssue && !allChecked) {
              setAllChecked(true);
              toast("存在临期证件，请确认后再出发");
            } else {
              toast.success("开始导航");
              setLocation("/");
            }
          }}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
            hasIssue && !allChecked
              ? "bg-cyber-amber text-primary-foreground glow-amber"
              : "bg-primary text-primary-foreground glow-teal"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <Navigation className="w-4 h-4" />
            {hasIssue && !allChecked ? "确认风险并继续" : "开始导航"}
          </span>
        </button>
      </div>
    </div>
  );
}
