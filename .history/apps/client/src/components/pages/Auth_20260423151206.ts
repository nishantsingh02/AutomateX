import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { authApi } from "@/lib/apiClient";
import {api}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, ShieldCheck, Lock, Mail } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await authApi.signIn({ email, password });
        if (error) {
          setError(error);
          return;
        }
        navigate("/dashboard");
      } else {
        const { error } = await authApi.signUp({ email, password });
        if (error) {
          setError(error);
          return;
        }
        setIsLogin(true);
        setError("Account created! Please log in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden font-sans">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />

      <div className="w-full max-w-[440px] px-6 py-12 relative z-10">
        <div className="mb-10 flex flex-col items-center text-center">
          <Link to="/" className="mb-8 flex items-center gap-2 group transition-all">
            <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <ShieldCheck className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">TradingBot</span>
          </Link>

          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
            {isLogin ? "Sign in to Dashboard" : "Create your account"}
          </h1>
          <p className="text-slate-500 text-lg">
            {isLogin
              ? "Welcome back! Please enter your details."
              : "Get started with the most powerful trading automation."}
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-white/20 rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-14 pl-12 rounded-2xl border-slate-200 bg-white/50 focus:bg-white focus:ring-slate-900 transition-all text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700 ml-1">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-14 pl-12 rounded-2xl border-slate-200 bg-white/50 focus:bg-white focus:ring-slate-900 transition-all text-base"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div
                className={`p-4 rounded-2xl text-sm font-medium text-center animate-in fade-in zoom-in duration-300 ${
                  error.includes("created")
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-destructive/5 border border-destructive/10 text-destructive"
                }`}
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-14 rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-xl hover:shadow-2xl transition-all text-lg font-bold"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
              className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
            >
              {isLogin ? (
                <span>
                  Don't have an account?{" "}
                  <span className="text-slate-900 font-bold underline-offset-4 hover:underline">
                    Sign up for free
                  </span>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <span className="text-slate-900 font-bold underline-offset-4 hover:underline">
                    Log in here
                  </span>
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;