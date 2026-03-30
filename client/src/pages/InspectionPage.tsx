import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, FileText, Volume2, Phone, CheckCircle } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { toast } from "sonner";

const steps = [
  { id: 1, title: "风险识别", desc: "基于检查站类型+车辆货物信息，输出违规风险等级", status: "completed" },
  { id: 2, title: "决策建议", desc: "是否配合检查 / 是否有争议空间", status: "active" },
  { id: 3, title: "话术生成", desc: "生成当前场景对应的俄语应答话术", status: "pending" },
  { id: 4, title: "证件调取", desc: "快速调出所需证件的数字版本", status: "pending" },
  { id: 5, title: "通知车队", desc: "推送检查站位置、检查类型、当前状态", status: "pending" },
  { id: 6, title: "罚单处理", desc: "如被开罚单，进入罚款处理流程", status: "pending" },
];

export default function InspectionPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="路检处理" titleRu="Проверка на дороге" backPath="/events" />

      <div className="px-4 py-4">
        {/* Risk Level */}
        <div className="p-4 rounded-xl bg-cyber-amber/5 border border-cyber-amber/20 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-cyber-amber" />
            <span className="text-sm font-bold text-cyber-amber">中等风险 · Средний риск</span>
          </div>
          <p className="text-xs text-muted-foreground">前方23km处路检站，建议配合检查。当前证件齐全，货物合规。</p>
          <div className="flex gap-2 mt-3">
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-green/20 text-cyber-green">证件齐全</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-green/20 text-cyber-green">货物合规</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-amber/20 text-cyber-amber">超重临界</span>
          </div>
        </div>

        {/* Process Steps */}
        <p className="text-xs text-muted-foreground mb-3 font-medium">处理流程</p>
        <div className="space-y-3 mb-4">
          {steps.map((step, i) => {
            const isActive = i <= currentStep;
            const isCurrent = i === currentStep;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex gap-3 p-3 rounded-xl border transition-all ${
                  isCurrent ? "bg-primary/5 border-primary/30" : isActive ? "bg-secondary border-border" : "bg-secondary/50 border-border/50 opacity-50"
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  i < currentStep ? "bg-cyber-green/20 text-cyber-green" : isCurrent ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {i < currentStep ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <div>
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="text-[10px] text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => toast("正在生成俄语应答话术...")}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium"
          >
            <Volume2 className="w-4 h-4" />
            播报话术
          </button>
          <button
            onClick={() => toast("正在调取证件...")}
            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary border border-border text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            一键调取证件
          </button>
        </div>

        <button
          onClick={() => toast("已通知车队调度")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary border border-border text-sm font-medium mb-3"
        >
          <Phone className="w-4 h-4 text-cyber-blue" />
          通知车队
        </button>

        <button
          onClick={() => {
            if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
            else toast.success("路检处理完成");
          }}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm glow-teal"
        >
          {currentStep < steps.length - 1 ? "下一步" : "完成处理"}
        </button>
      </div>
    </div>
  );
}
