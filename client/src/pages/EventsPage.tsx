import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  AlertTriangle, Shield, Car, Wrench, Receipt, CheckCircle,
  ChevronRight, Clock
} from "lucide-react";
import { events } from "@/lib/mockData";

const filterTabs = [
  { key: "all", label: "全部" },
  { key: "emergency", label: "紧急" },
  { key: "inspection", label: "路检" },
  { key: "breakdown", label: "故障" },
  { key: "completed", label: "已完成" },
];

const quickActions = [
  { icon: Shield, label: "路检应对", labelSub: "话术", labelRu: "Проверка", path: "/inspection", color: "cyber-amber" },
  { icon: Car, label: "交通事故", labelSub: "处理", labelRu: "ДТП", path: "/accident", color: "cyber-red" },
  { icon: Wrench, label: "车辆故障", labelSub: "报修", labelRu: "Поломка", path: "/breakdown", color: "cyber-blue" },
  { icon: Receipt, label: "罚款处理", labelSub: "缴费", labelRu: "Штраф", path: "/fine", color: "cyber-amber" },
];

const typeIconMap: Record<string, typeof AlertTriangle> = {
  inspection: Shield,
  emergency: AlertTriangle,
  fine: Receipt,
  breakdown: Wrench,
  accident: Car,
};

const priorityColorMap: Record<string, string> = {
  high: "text-cyber-red",
  medium: "text-cyber-amber",
  low: "text-muted-foreground",
};

const statusLabelMap: Record<string, { label: string; color: string }> = {
  pending: { label: "待处理", color: "badge-warning" },
  processing: { label: "处理中", color: "badge-info" },
  completed: { label: "已完成", color: "badge-valid" },
};

export default function EventsPage() {
  const [, setLocation] = useLocation();
  const [activeFilter, setActiveFilter] = useState("all");

  const pendingCount = events.filter((e) => e.status !== "completed").length;

  const filteredEvents = events.filter((e) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "completed") return e.status === "completed";
    if (activeFilter === "emergency") return e.priority === "high";
    if (activeFilter === "inspection") return e.type === "inspection";
    if (activeFilter === "breakdown") return e.type === "breakdown";
    return true;
  });

  return (
    <div className="px-4 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div>
          <h1 className="text-xl font-bold">事件中心</h1>
          <p className="text-xs text-muted-foreground">Центр событий · {pendingCount} 待处理</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-cyber-red/20 border border-cyber-red/30">
          <span className="text-xs font-bold text-cyber-red">{pendingCount} 待处理</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mt-3 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              activeFilter === tab.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Quick Access */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">突发场景入口 · БЫСТРЫЙ ДОСТУП</p>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => setLocation(action.path)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary border border-border hover:border-${action.color}/30 transition-all active:scale-95`}
            >
              <action.icon className={`w-7 h-7 text-${action.color}`} />
              <span className="text-xs font-semibold text-center leading-tight">{action.label}</span>
              <span className="text-[10px] text-muted-foreground">{action.labelSub}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2">
        {filteredEvents.map((event, index) => {
          const Icon = typeIconMap[event.type] || AlertTriangle;
          const statusInfo = statusLabelMap[event.status];
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                if (event.type === "inspection") setLocation("/inspection");
                else if (event.type === "accident") setLocation("/accident");
                else if (event.type === "breakdown") setLocation("/breakdown");
                else if (event.type === "fine") setLocation("/fine");
                else setLocation("/inspection");
              }}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border hover:border-primary/20 transition-all cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${
                event.priority === "high" ? "cyber-red" : event.priority === "medium" ? "cyber-amber" : "cyber-blue"
              }/10`}>
                <Icon className={`w-5 h-5 ${priorityColorMap[event.priority]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold truncate">{event.title}</p>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{event.description}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">{event.time}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
