import { useState } from "react";
import { motion } from "framer-motion";
import { Receipt, Camera, Mic, MapPin, CreditCard, Scale, CheckCircle } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { toast } from "sonner";

export default function FinePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"self" | "company" | null>(null);

  const steps = [
    { id: 1, title: "罚单录入", desc: "拍照识别罚单内容" },
    { id: 2, title: "场景描述", desc: "语音描述事发经过+GPS定位" },
    { id: 3, title: "合规评估", desc: "AI判断罚款是否合理" },
    { id: 4, title: "缴费方式", desc: "选择支付方式" },
    { id: 5, title: "凭证归档", desc: "缴费凭证自动关联运单" },
  ];

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="罚款处理" titleRu="Обработка штрафа" backPath="/events" />

      <div className="px-4 py-4">
        {/* Fine Info Card */}
        <div className="p-4 rounded-xl bg-secondary border border-border mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">罚单信息</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full badge-warning">待缴费</span>
          </div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold">M7公路超速</p>
              <p className="text-[10px] text-muted-foreground">2024.03.28 · Нижний Новгород</p>
            </div>
            <p className="text-xl font-bold text-cyber-amber" style={{ fontFamily: "Orbitron, monospace" }}>₽3,000</p>
          </div>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyber-amber/20 text-cyber-amber">超速20%</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground">截止 04-04</span>
          </div>
        </div>

        {/* AI Assessment */}
        <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary">AI合规评估</span>
          </div>
          <p className="text-xs text-muted-foreground">该罚款合理，建议按时缴纳。超速20%属于轻微违规，无申诉空间。</p>
        </div>

        {/* Input Actions */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button onClick={() => toast("拍照识别罚单")} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary border border-border">
            <Camera className="w-5 h-5 text-primary" />
            <span className="text-[10px]">拍照录入</span>
          </button>
          <button onClick={() => toast("语音描述功能")} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary border border-border">
            <Mic className="w-5 h-5 text-cyber-blue" />
            <span className="text-[10px]">语音描述</span>
          </button>
          <button onClick={() => toast("GPS位置已附加")} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary border border-border">
            <MapPin className="w-5 h-5 text-cyber-green" />
            <span className="text-[10px]">GPS定位</span>
          </button>
        </div>

        {/* Payment Method */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">缴费方式选择</p>
        <div className="space-y-2 mb-4">
          <button
            onClick={() => setPaymentMethod("self")}
            className={`w-full p-3 rounded-xl border flex items-center gap-3 transition-all ${
              paymentMethod === "self" ? "bg-primary/5 border-primary/30" : "bg-secondary border-border"
            }`}
          >
            <CreditCard className={`w-5 h-5 ${paymentMethod === "self" ? "text-primary" : "text-muted-foreground"}`} />
            <div className="text-left">
              <p className="text-sm font-medium">司机自行支付</p>
              <p className="text-[10px] text-muted-foreground">CHINAPAY 境外支付</p>
            </div>
          </button>
          <button
            onClick={() => setPaymentMethod("company")}
            className={`w-full p-3 rounded-xl border flex items-center gap-3 transition-all ${
              paymentMethod === "company" ? "bg-primary/5 border-primary/30" : "bg-secondary border-border"
            }`}
          >
            <Receipt className={`w-5 h-5 ${paymentMethod === "company" ? "text-primary" : "text-muted-foreground"}`} />
            <div className="text-left">
              <p className="text-sm font-medium">提交车队审批支付</p>
              <p className="text-[10px] text-muted-foreground">走公司费用报销流程</p>
            </div>
          </button>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center gap-1 mb-4">
          {steps.map((_, i) => (
            <div key={i} className={`flex-1 h-1.5 rounded-full ${i <= currentStep ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        <button
          onClick={() => {
            if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
            else toast.success("罚款处理完成，凭证已归档");
          }}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm glow-teal"
        >
          {currentStep < steps.length - 1 ? "下一步" : "确认缴费并归档"}
        </button>
      </div>
    </div>
  );
}
