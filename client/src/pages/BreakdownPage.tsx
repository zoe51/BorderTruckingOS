import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Camera, Mic, MapPin, DollarSign, Shield, CheckCircle, AlertTriangle } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { toast } from "sonner";

const repairShops = [
  { name: "ТрансСервис", distance: 35, rating: 4.5, wait: "~2h", cost: "¥500-1200", supports: "中国卡车" },
  { name: "АвтоМастер", distance: 52, rating: 4.2, wait: "~3h", cost: "¥400-900", supports: "通用" },
  { name: "Грузовик Сервис", distance: 68, rating: 4.7, wait: "~1h", cost: "¥600-1500", supports: "中国卡车" },
];

export default function BreakdownPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [riskLevel, setRiskLevel] = useState<"high" | "medium" | "low">("medium");

  const steps = [
    { id: 1, title: "故障描述", desc: "语音/拍照描述故障现象" },
    { id: 2, title: "风险评估", desc: "当前故障是否允许继续行驶" },
    { id: 3, title: "维修商推荐", desc: "支持中国卡车车型的维修商" },
    { id: 4, title: "费用审批", desc: "发起维修费用申请" },
    { id: 5, title: "保险申报", desc: "判断是否属于保险理赔范围" },
  ];

  const riskColors = {
    high: { bg: "bg-cyber-red/10", border: "border-cyber-red/30", text: "text-cyber-red", label: "高危 · 禁止行驶" },
    medium: { bg: "bg-cyber-amber/10", border: "border-cyber-amber/30", text: "text-cyber-amber", label: "可低速行驶" },
    low: { bg: "bg-cyber-green/10", border: "border-cyber-green/30", text: "text-cyber-green", label: "可正常行驶" },
  };
  const risk = riskColors[riskLevel];

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="车辆故障" titleRu="Поломка транспорта" backPath="/events" />

      <div className="px-4 py-4">
        {/* Fault Description */}
        <div className="p-4 rounded-xl bg-secondary border border-border mb-4">
          <p className="text-xs text-muted-foreground mb-2">故障描述</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button onClick={() => toast("语音描述功能演示")} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 border border-primary/30 text-sm">
              <Mic className="w-4 h-4 text-primary" />
              <span className="text-primary">语音描述</span>
            </button>
            <button onClick={() => toast("拍照功能演示")} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary border border-border text-sm">
              <Camera className="w-4 h-4" />
              拍照上传
            </button>
          </div>
          <p className="text-xs text-muted-foreground italic">AI识别结果：右后轮气压偏低，可能为慢漏气</p>
        </div>

        {/* Risk Assessment */}
        <div className={`p-4 rounded-xl ${risk.bg} border ${risk.border} mb-4`}>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className={`w-5 h-5 ${risk.text}`} />
            <span className={`text-sm font-bold ${risk.text}`}>行驶风险评估：{risk.label}</span>
          </div>
          <div className="flex gap-2 mt-2">
            {(["low", "medium", "high"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setRiskLevel(level)}
                className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
                  riskLevel === level ? `${riskColors[level].bg} ${riskColors[level].text} border ${riskColors[level].border}` : "bg-secondary text-muted-foreground"
                }`}
              >
                {level === "low" ? "低" : level === "medium" ? "中" : "高"}
              </button>
            ))}
          </div>
        </div>

        {/* Nearby Repair Shops */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">就近维修商推荐</p>
        <div className="space-y-2 mb-4">
          {repairShops.map((shop, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-3 rounded-xl bg-secondary border border-border"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold">{shop.name}</p>
                {shop.supports === "中国卡车" && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/20 text-primary">中国卡车</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <span>{shop.distance}km</span>
                <span>★ {shop.rating}</span>
                <span>等待{shop.wait}</span>
                <span>{shop.cost}</span>
              </div>
              <button
                onClick={() => toast(`正在导航至 ${shop.name}`)}
                className="mt-2 w-full py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs text-primary font-medium"
              >
                导航前往
              </button>
            </motion.div>
          ))}
        </div>

        {/* Cost Approval */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button onClick={() => toast("维修费用申请已提交")} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary border border-border text-sm">
            <DollarSign className="w-4 h-4 text-cyber-amber" />
            <span className="text-xs">费用审批</span>
          </button>
          <button onClick={() => toast("保险申报建议：属于保险理赔范围")} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary border border-border text-sm">
            <Shield className="w-4 h-4 text-cyber-blue" />
            <span className="text-xs">保险申报</span>
          </button>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center gap-1 mb-4">
          {steps.map((step, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= currentStep ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        <button
          onClick={() => {
            if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
            else toast.success("故障处理流程完成");
          }}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm glow-teal"
        >
          {currentStep < steps.length - 1 ? "下一步" : "完成处理"}
        </button>
      </div>
    </div>
  );
}
