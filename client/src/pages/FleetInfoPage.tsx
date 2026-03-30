import { Phone, Users, MapPin, Mail, Building } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { toast } from "sonner";

export default function FleetInfoPage() {
  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="车队信息" titleRu="Информация о автопарке" backPath="/profile" />
      <div className="px-4 py-4">
        {/* Fleet Card */}
        <div className="p-4 rounded-xl bg-secondary border border-border mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Building className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold">河南跨欧物流</p>
              <p className="text-xs text-muted-foreground">Хэнань Транс-Европа Логистика</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { icon: MapPin, label: "公司地址", value: "河南省郑州市金水区经三路28号" },
              { icon: Users, label: "车队规模", value: "48辆 · 52名司机" },
              { icon: Phone, label: "调度电话", value: "+86 371-6688-8888" },
              { icon: Mail, label: "邮箱", value: "dispatch@hnce-logistics.com" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <item.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-muted-foreground">{item.label}</p>
                  <p className="text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contacts */}
        <p className="text-xs text-muted-foreground mb-2 font-medium">紧急联系人</p>
        <div className="space-y-2">
          {[
            { name: "张调度", role: "主调度", phone: "+86 138****1234" },
            { name: "李经理", role: "车队经理", phone: "+86 139****5678" },
            { name: "王师傅", role: "技术顾问", phone: "+86 137****9012" },
          ].map((contact, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border">
              <div className="w-9 h-9 rounded-full bg-cyber-blue/10 flex items-center justify-center">
                <span className="text-xs font-bold text-cyber-blue">{contact.name[0]}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{contact.name}</p>
                <p className="text-[10px] text-muted-foreground">{contact.role} · {contact.phone}</p>
              </div>
              <button
                onClick={() => toast(`正在拨打 ${contact.name}`)}
                className="w-8 h-8 rounded-full bg-cyber-green/10 flex items-center justify-center"
              >
                <Phone className="w-4 h-4 text-cyber-green" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
