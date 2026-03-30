import { useState } from "react";
import { motion } from "framer-motion";
import { AlertOctagon, Camera, Phone, FileText, Shield, CheckCircle, MapPin } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { toast } from "sonner";

const steps = [
  { id: 1, title: "事故确认", desc: "确认事故类型和人员伤亡情况" },
  { id: 2, title: "现场取证", desc: "拍照记录车辆损伤、对方信息、现场环境" },
  { id: 3, title: "GPS上传", desc: "自动上传事故位置信息" },
  { id: 4, title: "保险报案", desc: "一键触发保险公司报案流程" },
  { id: 5, title: "车队通知", desc: "通知调度，车队实时查看现场情况" },
  { id: 6, title: "事故归档", desc: "生成事故档案，纳入理赔流程" },
];

export default function AccidentPage() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="交通事故处理" titleRu="Обработка ДТП" backPath="/events" />

      <div className="px-4 py-4">
        {/* Critical Warning */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-4 rounded-xl bg-cyber-red/10 border border-cyber-red/30 mb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="w-5 h-5 text-cyber-red animate-pulse" />
            <span className="text-sm font-bold text-cyber-red">重要提醒</span>
          </div>
          <div className="space-y-1 ml-7">
            <p className="text-xs text-cyber-red font-medium">禁止在现场承认任何责任</p>
            <p className="text-xs text-cyber-red font-medium">禁止签署任何文件</p>
            <p className="text-[10px] text-muted-foreground mt-1">НЕ ПРИЗНАВАЙТЕ ВИНУ · НЕ ПОДПИСЫВАЙТЕ ДОКУМЕНТЫ</p>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-2.5 mb-4">
          {steps.map((step, i) => {
            const isCompleted = i < currentStep;
            const isCurrent = i === currentStep;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex gap-3 p-3 rounded-xl border ${
                  isCurrent ? "bg-primary/5 border-primary/30" : isCompleted ? "bg-secondary border-border" : "bg-secondary/50 border-border/50 opacity-50"
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isCompleted ? "bg-cyber-green/20 text-cyber-green" : isCurrent ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : step.id}
                </div>
                <div>
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="text-[10px] text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button onClick={() => toast("拍照取证功能演示")} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary border border-border">
            <Camera className="w-5 h-5 text-primary" />
            <span className="text-[10px]">拍照取证</span>
          </button>
          <button onClick={() => toast("GPS位置已上传")} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary border border-border">
            <MapPin className="w-5 h-5 text-cyber-green" />
            <span className="text-[10px]">上传位置</span>
          </button>
          <button onClick={() => toast("正在联系保险公司...")} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary border border-border">
            <Shield className="w-5 h-5 text-cyber-blue" />
            <span className="text-[10px]">保险报案</span>
          </button>
        </div>

        <button
          onClick={() => toast("已通知车队调度")}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary border border-border text-sm font-medium mb-3"
        >
          <Phone className="w-4 h-4 text-cyber-blue" />
          紧急联系车队
        </button>

        <button
          onClick={() => {
            if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
            else toast.success("事故处理流程完成");
          }}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm glow-teal"
        >
          {currentStep < steps.length - 1 ? "下一步" : "完成处理"}
        </button>
      </div>
    </div>
  );
}
