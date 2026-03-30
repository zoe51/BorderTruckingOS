import { useState } from "react";
import { motion } from "framer-motion";
import { Fuel, Coffee, Wrench, Star, Navigation, Heart } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import { nearbyServices } from "@/lib/mockData";
import { toast } from "sonner";

const typeConfig: Record<string, { icon: typeof Fuel; color: string; label: string }> = {
  gas: { icon: Fuel, color: "text-cyber-green", label: "加油站" },
  rest: { icon: Coffee, color: "text-cyber-blue", label: "休息区" },
  repair: { icon: Wrench, color: "text-cyber-amber", label: "维修站" },
};

const filterTabs = [
  { key: "all", label: "全部" },
  { key: "gas", label: "加油站" },
  { key: "rest", label: "休息区" },
  { key: "repair", label: "维修站" },
];

export default function NearbyServicesPage() {
  const [filter, setFilter] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filtered = nearbyServices.filter((s) => filter === "all" || s.type === filter);

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background">
      <SubPageHeader title="沿途服务" titleRu="Сервисы на маршруте" backPath="/" />
      <div className="px-4 py-4">
        {/* Filter */}
        <div className="flex gap-2 mb-4">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === tab.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Service List */}
        <div className="space-y-2">
          {filtered.map((service, i) => {
            const config = typeConfig[service.type];
            const Icon = config.icon;
            const isFav = favorites.includes(service.id);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-xl bg-secondary border border-border"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-${service.type === "gas" ? "cyber-green" : service.type === "rest" ? "cyber-blue" : "cyber-amber"}/10 flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate">{service.name}</p>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded bg-${service.type === "gas" ? "cyber-green" : service.type === "rest" ? "cyber-blue" : "cyber-amber"}/10 ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                      <span>{service.distance}km</span>
                      <span className="flex items-center gap-0.5">
                        <Star className="w-3 h-3 text-cyber-amber" fill="currentColor" />
                        {service.rating}
                      </span>
                      {"price" in service && <span>{service.price}</span>}
                      {"facilities" in service && <span>{service.facilities}</span>}
                      {"speciality" in service && <span>{service.speciality}</span>}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (isFav) setFavorites(favorites.filter((id) => id !== service.id));
                      else setFavorites([...favorites, service.id]);
                      toast(isFav ? "已取消收藏" : "已收藏");
                    }}
                    className="flex-shrink-0"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? "text-cyber-red fill-cyber-red" : "text-muted-foreground"}`} />
                  </button>
                </div>
                <button
                  onClick={() => toast(`正在导航至 ${service.name}`)}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/10 border border-primary/30 text-xs text-primary font-medium"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  导航前往
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
