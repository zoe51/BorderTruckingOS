import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Truck, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!phone || !password) {
      toast.error("请输入手机号和密码");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("登录成功");
      setLocation("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen max-w-[480px] mx-auto bg-background flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-cyber-blue/5 blur-3xl" />
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          opacity: 0.5,
        }} />
      </div>

      <div className="relative flex-1 flex flex-col justify-center px-6 py-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 glow-teal">
            <Truck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">跨境卡车运营系统</h1>
          <p className="text-xs text-muted-foreground">Cross-Border Trucking OS · 司机端</p>
          <p className="text-[10px] text-primary mt-1">让中国卡车在境外跑得安心、合规、省钱</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">手机号</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+86 请输入手机号"
              className="w-full h-12 px-4 rounded-xl bg-card border border-border text-sm text-foreground focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">密码</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full h-12 px-4 pr-12 rounded-xl bg-card border border-border text-sm text-foreground focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
              />
              <button
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-all hover:opacity-90 disabled:opacity-50 glow-teal"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="30 70" />
                </svg>
                登录中...
              </span>
            ) : "登 录"}
          </button>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <button onClick={() => toast("忘记密码功能演示")} className="hover:text-primary transition-colors">忘记密码？</button>
            <button onClick={() => toast("注册功能演示")} className="hover:text-primary transition-colors">新司机注册</button>
          </div>
        </motion.div>

        {/* Demo Login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <button
            onClick={() => {
              setPhone("138****5678");
              setPassword("demo123");
              setTimeout(handleLogin, 300);
            }}
            className="text-xs text-primary/70 hover:text-primary transition-colors underline underline-offset-2"
          >
            使用演示账号快速登录
          </button>
        </motion.div>
      </div>
    </div>
  );
}
