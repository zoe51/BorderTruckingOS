import { useState } from "react";
import { X, Mic, Camera, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { translationScenes } from "@/lib/mockData";
import { toast } from "sonner";

interface TranslateFABProps {
  open: boolean;
  onToggle: () => void;
}

export default function TranslateFAB({ open, onToggle }: TranslateFABProps) {
  const [isListening, setIsListening] = useState(false);

  return (
    <>
      {/* Single FAB Entry Button */}
      {!open && (
        <button
          onClick={onToggle}
          className="fixed bottom-20 right-4 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ boxShadow: "0 0 16px oklch(0.82 0.15 180 / 0.4)" }}
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}

      {/* Backdrop + Translation Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Black overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60"
              onClick={onToggle}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 max-w-[480px] mx-auto"
            >
              <div className="bg-card/98 backdrop-blur-xl border-t border-border rounded-t-2xl p-5 pb-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-card-foreground">翻译助手 · <span className="text-primary">Переводчик</span></h3>
                      <p className="text-[10px] text-muted-foreground">随时可用</p>
                    </div>
                  </div>
                  <button onClick={onToggle} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <X className="w-4 h-4 text-secondary-foreground" />
                  </button>
                </div>

                {/* Main Actions */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => {
                      setIsListening(!isListening);
                      toast(isListening ? "语音翻译已停止" : "正在聆听...");
                    }}
                    className={`p-4 rounded-xl border transition-all ${
                      isListening
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary hover:border-primary/50"
                    }`}
                    style={isListening ? { boxShadow: "0 0 12px oklch(0.82 0.15 180 / 0.3)" } : {}}
                  >
                    <Mic className={`w-8 h-8 mx-auto mb-2 ${isListening ? "text-primary animate-pulse" : "text-card-foreground"}`} />
                    <p className="text-sm font-semibold text-card-foreground">语音翻译</p>
                    <p className="text-[10px] text-muted-foreground">说中文 → 俄语</p>
                    <p className="text-[10px] text-primary mt-0.5">Речевой перевод</p>
                  </button>
                  <button
                    onClick={() => toast("拍照翻译功能演示")}
                    className="p-4 rounded-xl border border-border bg-secondary hover:border-primary/50 transition-all"
                  >
                    <Camera className="w-8 h-8 mx-auto mb-2 text-card-foreground" />
                    <p className="text-sm font-semibold text-card-foreground">拍照翻译</p>
                    <p className="text-[10px] text-muted-foreground">路牌 罚单 文件</p>
                    <p className="text-[10px] text-primary mt-0.5">Фото перевод</p>
                  </button>
                </div>

                {/* Quick Phrases */}
                <div className="border border-border rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-2">常用场景快捷 · Быстрые фразы</p>
                  <div className="space-y-2">
                    {translationScenes.slice(0, 3).map((scene) => (
                      <div key={scene.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-sm text-card-foreground">{scene.name}</span>
                        </div>
                        <button
                          onClick={() => toast(`已加载「${scene.name}」话术模板`)}
                          className="text-xs text-primary font-medium hover:underline"
                        >
                          使用
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
