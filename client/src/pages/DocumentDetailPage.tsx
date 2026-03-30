import { motion } from "framer-motion";
import { FileText, Shield, CheckCircle, AlertTriangle, Upload, Eye } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { documents } from "@/lib/mockData";
import { toast } from "sonner";

export default function DocumentDetailPage() {
  const statusConfig: Record<string, { color: string; badge: string; label: string }> = {
    valid: { color: "text-cyber-green", badge: "badge-valid", label: "有效" },
    expiring: { color: "text-cyber-amber", badge: "badge-warning", label: "临期" },
    expired: { color: "text-cyber-red", badge: "badge-danger", label: "过期" },
  };

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="证件管理" titleRu="Управление документами" backPath="/profile" />

      <div className="px-4 py-4 space-y-3">
        {documents.map((doc, i) => {
          const config = statusConfig[doc.status];
          return (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-secondary border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold">{doc.name}</p>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${config.badge}`}>{config.label}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{doc.nameRu}</p>
                </div>
              </div>

              <div className="space-y-1.5 mb-3">
                {doc.expiry && (
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">有效期至</span>
                    <span className={config.color}>{doc.expiry}</span>
                  </div>
                )}
                {doc.number && (
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">编号</span>
                    <span>{doc.number}</span>
                  </div>
                )}
                {doc.issuer && (
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">签发机构</span>
                    <span>{doc.issuer}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => toast("查看证件电子版")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs text-primary"
                >
                  <Eye className="w-3.5 h-3.5" />
                  查看
                </button>
                <button
                  onClick={() => toast("上传更新证件")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-secondary border border-border text-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  更新
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
