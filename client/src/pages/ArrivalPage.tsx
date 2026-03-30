import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, FileText, Upload, Camera, CheckCircle, DollarSign, Send } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { expenses } from "@/lib/mockData";
import { toast } from "sonner";

export default function ArrivalPage() {
  const [confirmed, setConfirmed] = useState(false);
  const [docsUploaded, setDocsUploaded] = useState({ cmr: false, delivery: false, receipt: false });

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="到达确认" titleRu="Подтверждение прибытия" backPath="/" />
      <div className="px-4 py-4">
        {/* Arrival Status */}
        <div className={`p-4 rounded-xl border mb-4 ${confirmed ? "bg-cyber-green/5 border-cyber-green/20" : "bg-primary/5 border-primary/20"}`}>
          <div className="flex items-center gap-2 mb-1">
            {confirmed ? <CheckCircle className="w-5 h-5 text-cyber-green" /> : <MapPin className="w-5 h-5 text-primary" />}
            <span className="text-sm font-bold">{confirmed ? "已确认到达" : "GPS检测到已到达目的地"}</span>
          </div>
          <p className="text-xs text-muted-foreground ml-7">莫斯科 · Москва · {new Date().toLocaleString("zh-CN")}</p>
          {!confirmed && (
            <button
              onClick={() => { setConfirmed(true); toast.success("到达已确认"); }}
              className="mt-3 w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold"
            >
              确认到达
            </button>
          )}
        </div>

        {/* Document Upload */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">单据确认</p>
        <div className="space-y-2 mb-4">
          {[
            { key: "cmr" as const, label: "CMR 运单", desc: "国际公路货物运输合同" },
            { key: "delivery" as const, label: "提货单", desc: "货物交付凭证" },
            { key: "receipt" as const, label: "签收单", desc: "收货方签收确认" },
          ].map((doc) => (
            <div key={doc.key} className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border">
              <FileText className={`w-4 h-4 ${docsUploaded[doc.key] ? "text-cyber-green" : "text-muted-foreground"}`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{doc.label}</p>
                <p className="text-[10px] text-muted-foreground">{doc.desc}</p>
              </div>
              {docsUploaded[doc.key] ? (
                <CheckCircle className="w-4 h-4 text-cyber-green" />
              ) : (
                <button
                  onClick={() => {
                    setDocsUploaded({ ...docsUploaded, [doc.key]: true });
                    toast.success(`${doc.label} 已上传`);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/30 text-[10px] text-primary"
                >
                  <Upload className="w-3 h-3" />
                  上传
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Exception Report */}
        <div className="p-3 rounded-xl bg-secondary border border-border mb-4">
          <p className="text-xs text-muted-foreground mb-2">异常情况记录</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => toast("货物短缺上报")} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-cyber-amber/10 border border-cyber-amber/30 text-xs text-cyber-amber">
              <Camera className="w-3.5 h-3.5" />
              货物短缺
            </button>
            <button onClick={() => toast("货物损毁上报")} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-cyber-red/10 border border-cyber-red/30 text-xs text-cyber-red">
              <Camera className="w-3.5 h-3.5" />
              货物损毁
            </button>
          </div>
        </div>

        {/* Expense Summary */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">费用结算</p>
        <div className="p-3 rounded-xl bg-secondary border border-border mb-4">
          <div className="space-y-1.5">
            {[
              { label: "燃油费", value: expenses.currentTrip.fuel },
              { label: "过路费", value: expenses.currentTrip.toll },
            ].map((item, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-muted-foreground">{item.label}</span>
                <span>¥{item.value.toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t border-border pt-1.5 mt-1.5 flex justify-between text-sm font-bold">
              <span>合计</span>
              <span className="text-primary" style={{ fontFamily: "Orbitron, monospace" }}>¥{expenses.currentTrip.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => toast.success("运单已结算并归档")}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm glow-teal"
        >
          <Send className="w-4 h-4" />
          确认结单
        </button>
      </div>
    </div>
  );
}
