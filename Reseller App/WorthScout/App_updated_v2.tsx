import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BadgePoundSterling,
  Barcode,
  Bell,
  BellOff,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Database,
  Download,
  Eye,
  EyeOff,
  Filter,
  Flame,
  Gem,
  History,
  Image as ImageIcon,
  Info,
  Layers3,
  LineChart,
  LogIn,
  LogOut,
  Menu,
  MousePointerClick,
  Package,
  PenLine,
  Plus,
  RefreshCw,
  ScanLine,
  ScanSearch,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Tag,
  TrendingUp,
  Trophy,
  Upload,
  User,
  UserPlus,
  Users,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

// ─── Design tokens ────────────────────────────────────────────────────────────
const shellPanel =
  "rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl";
const subtlePanel =
  "rounded-[1.3rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl";
const inputClass =
  "h-12 rounded-[1rem] border-white/10 bg-black/30 text-white placeholder:text-white/35 focus:border-white/25 focus:ring-0 transition-colors";
const btnPrimary =
  "rounded-[1rem] bg-white text-slate-950 hover:bg-white/90 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(255,255,255,0.06)]";
const btnSecondary =
  "rounded-[1rem] border-white/10 bg-white/5 text-white hover:bg-white/10 active:scale-[0.98] transition-all";
const springConfig = { type: "spring", damping: 25, stiffness: 200 } as const;

// ─── Data ─────────────────────────────────────────────────────────────────────
const starterScans = [
  {
    id: "scan_1",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
    title: "Reformation Linen Midi Dress",
    brand: "Reformation",
    category: "Women's Clothing",
    subcategory: "Dress",
    condition: "Used - Very Good",
    confidence: 92,
    demandScore: 78,
    activeListings: 38,
    soldListings: 24,
    materials: ["Linen", "Viscose"],
    buyPrice: 22,
    buyerFee: 0,
    marketplaceFeePercent: 13,
    shippingFee: 5,
    sellerFee: 0,
    quick: 44,
    fair: 58,
    ambitious: 69,
    createdAt: "Today, 13:42",
    notes: "Strong clothing match based on silhouette, likely brand tag match, and premium material signal.",
    sourceMarket: "Marketplace blend",
    scanType: "image",
    matchedBarcode: "5012345678900",
    comps: [
      { id: 1, title: "Reformation linen midi dress size 10", price: 55, market: "Marketplace", status: "Sold", score: 95 },
      { id: 2, title: "Reformation summer linen dress UK 10", price: 62, market: "Marketplace", status: "Active", score: 91 },
      { id: 3, title: "Reformation midi dress beige linen blend", price: 59, market: "eBay", status: "Sold", score: 86 },
    ],
  },
  {
    id: "scan_2",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1400&auto=format&fit=crop",
    title: "Stüssy Graphic T-Shirt",
    brand: "Stüssy",
    category: "Streetwear",
    subcategory: "T-Shirt",
    condition: "Used - Good",
    confidence: 88,
    demandScore: 66,
    activeListings: 47,
    soldListings: 21,
    materials: ["Cotton"],
    buyPrice: 8,
    buyerFee: 0,
    marketplaceFeePercent: 13,
    shippingFee: 5,
    sellerFee: 0,
    quick: 18,
    fair: 26,
    ambitious: 34,
    createdAt: "Yesterday, 17:08",
    notes: "Brand-led item with decent flip potential. Lower premium material signal, but healthy resale velocity for the right graphic.",
    sourceMarket: "Marketplace blend",
    scanType: "image",
    matchedBarcode: "7700012312345",
    comps: [
      { id: 1, title: "Stüssy tee black logo size M", price: 24, market: "Marketplace", status: "Sold", score: 91 },
      { id: 2, title: "Vintage Stüssy graphic tee", price: 31, market: "Marketplace", status: "Active", score: 82 },
      { id: 3, title: "Stüssy short sleeve logo tee", price: 27, market: "Depop", status: "Active", score: 74 },
    ],
  },
  {
    id: "scan_3",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1400&auto=format&fit=crop",
    title: "COS Wool Blend Overshirt",
    brand: "COS",
    category: "Menswear",
    subcategory: "Overshirt",
    condition: "Used - Good",
    confidence: 84,
    demandScore: 51,
    activeListings: 42,
    soldListings: 12,
    materials: ["Wool", "Polyamide"],
    buyPrice: 14,
    buyerFee: 0,
    marketplaceFeePercent: 13,
    shippingFee: 5,
    sellerFee: 0,
    quick: 26,
    fair: 34,
    ambitious: 44,
    createdAt: "Apr 18, 10:11",
    notes: "Brand and cut are plausible. Demand is steadier than explosive, but buy cost leaves room for a sensible margin.",
    sourceMarket: "Marketplace blend",
    scanType: "barcode",
    matchedBarcode: "9988776655443",
    comps: [
      { id: 1, title: "COS wool overshirt charcoal size L", price: 35, market: "Marketplace", status: "Sold", score: 88 },
      { id: 2, title: "COS grey wool blend overshirt", price: 39, market: "eBay", status: "Active", score: 80 },
      { id: 3, title: "COS overshirt jacket men large", price: 29, market: "Marketplace", status: "Active", score: 73 },
    ],
  },
];

const opportunityItems = [
  { id: "opp_1", title: "AllSaints Leather Biker Jacket", brand: "AllSaints", category: "Outerwear", size: "M", ask: 48, fair: 95, demandScore: 84, image: "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "8m ago", alertTag: "AllSaints" },
  { id: "opp_2", title: "Stüssy Zip Hoodie", brand: "Stüssy", category: "Streetwear", size: "L", ask: 22, fair: 44, demandScore: 79, image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "12m ago", alertTag: "Stüssy" },
  { id: "opp_3", title: "COS Wool Blend Coat", brand: "COS", category: "Outerwear", size: "S", ask: 28, fair: 54, demandScore: 67, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "15m ago", alertTag: "COS" },
  { id: "opp_4", title: "Patagonia Synchilla Fleece", brand: "Patagonia", category: "Fleece", size: "M", ask: 19, fair: 47, demandScore: 88, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "19m ago", alertTag: "Patagonia" },
  { id: "opp_5", title: "Carhartt Detroit Style Jacket", brand: "Carhartt", category: "Workwear", size: "XL", ask: 35, fair: 73, demandScore: 82, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "23m ago", alertTag: "Carhartt" },
  { id: "opp_6", title: "Ralph Lauren Cable Knit", brand: "Ralph Lauren", category: "Knitwear", size: "M", ask: 14, fair: 31, demandScore: 58, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "28m ago", alertTag: "Ralph Lauren" },
  { id: "opp_7", title: "Arc'teryx Softshell Jacket", brand: "Arc'teryx", category: "Technical Outerwear", size: "M", ask: 55, fair: 118, demandScore: 91, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "31m ago", alertTag: "Arc'teryx" },
  { id: "opp_8", title: "Levi's Sherpa Trucker", brand: "Levi's", category: "Denim", size: "L", ask: 18, fair: 39, demandScore: 63, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "36m ago", alertTag: "Levi's" },
  { id: "opp_9", title: "The North Face Nuptse Gilet", brand: "The North Face", category: "Outerwear", size: "M", ask: 42, fair: 81, demandScore: 86, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "39m ago", alertTag: "The North Face" },
  { id: "opp_10", title: "Nike ACG Hiking Pants", brand: "Nike ACG", category: "Trousers", size: "M", ask: 24, fair: 52, demandScore: 77, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "42m ago", alertTag: "Nike ACG" },
  { id: "opp_11", title: "Barbour Wax Jacket", brand: "Barbour", category: "Outerwear", size: "L", ask: 40, fair: 78, demandScore: 73, image: "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "44m ago", alertTag: "Barbour" },
  { id: "opp_12", title: "Vivienne Westwood Graphic Tee", brand: "Vivienne Westwood", category: "T-Shirt", size: "S", ask: 16, fair: 37, demandScore: 69, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "47m ago", alertTag: "Vivienne Westwood" },
  { id: "opp_13", title: "Stone Island Quarter Zip", brand: "Stone Island", category: "Knitwear", size: "M", ask: 58, fair: 122, demandScore: 89, image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "49m ago", alertTag: "Stone Island" },
  { id: "opp_14", title: "Ami Paris Wool Overshirt", brand: "Ami Paris", category: "Overshirt", size: "M", ask: 46, fair: 88, demandScore: 71, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "53m ago", alertTag: "Ami Paris" },
  { id: "opp_15", title: "CP Company Lens Hoodie", brand: "CP Company", category: "Hoodie", size: "L", ask: 34, fair: 72, demandScore: 75, image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1400&auto=format&fit=crop", source: "Shared hourly board", refreshed: "57m ago", alertTag: "CP Company" },
];

const sampleLibrary = starterScans.map((item, index) => ({
  key: `sample_${index}`,
  label: item.title,
  image: item.image,
  result: item,
}));

const navItems = [
  { id: "dashboard", label: "Overview", icon: Sparkles },
  { id: "board", label: "Board", icon: Search },
  { id: "scan", label: "Scanner", icon: Camera },
  { id: "history", label: "Scan Vault", icon: History },
  { id: "analytics", label: "Demand", icon: LineChart },
  { id: "watchlist", label: "Watchlist", icon: Star },
  { id: "account", label: "Account", icon: User },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "admin", label: "Control Room", icon: Database },
];

const navGroups = [
  { title: "Workspace", ids: ["dashboard", "board", "scan", "history", "analytics"] },
  { title: "Manage", ids: ["watchlist", "account", "subscription"] },
  { title: "Admin", ids: ["admin"] },
] as const;

// ─── Utilities ────────────────────────────────────────────────────────────────
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
function pound(value: number) {
  return `£${Number(value).toFixed(0)}`;
}
function confidenceMeta(score: number) {
  if (score >= 88) return { label: "High", tone: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" };
  if (score >= 72) return { label: "Medium", tone: "border-amber-400/30 bg-amber-400/10 text-amber-200" };
  return { label: "Low", tone: "border-rose-400/30 bg-rose-400/10 text-rose-200" };
}
function demandMeta(score: number) {
  if (score >= 72) return { label: "High Demand", tone: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200", meter: 88 };
  if (score >= 50) return { label: "Steady", tone: "border-sky-400/30 bg-sky-400/10 text-sky-200", meter: 62 };
  return { label: "Slow", tone: "border-slate-400/20 bg-slate-400/10 text-slate-200", meter: 34 };
}
function hasPremiumMaterial(materials: string[]) {
  return materials.some((m) => ["Cashmere", "Silk", "Linen", "Leather", "Wool", "Mohair", "Alpaca"].includes(m));
}
function computeProfit(scan: any) {
  const allInBuy = (scan.buyPrice ?? 0) + (scan.buyerFee ?? 0);
  const fees = (scan.fair ?? 0) * ((scan.marketplaceFeePercent ?? 13) / 100) + (scan.sellerFee ?? 0);
  const shipping = scan.shippingFee ?? 5;
  const net = (scan.fair ?? 0) - fees - shipping - allInBuy;
  return { allInBuy, fees, shipping, net };
}
function estimateBoardNet(item: any) {
  return Math.round(item.fair - item.ask * 1.13 - 5);
}
function detectBarcodeResult(barcodeValue: string) {
  if (!barcodeValue) return starterScans[0];
  if (barcodeValue.includes("8900")) return starterScans[0];
  if (barcodeValue.includes("123") || barcodeValue.includes("777")) return starterScans[1];
  return starterScans[2];
}
function detectImageResult(uploadPreview: string | null, manualHint: string) {
  const hint = String(manualHint || "").toLowerCase();
  if (hint.includes("stussy") || hint.includes("tee")) return starterScans[1];
  if (hint.includes("cos") || hint.includes("overshirt") || hint.includes("wool")) return starterScans[2];
  return starterScans[0];
}

// ─── Shared motion components ─────────────────────────────────────────────────
function SectionReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" animate={{ x: [0, 50, 0], y: [0, -20, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-1/3 bottom-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" animate={{ x: [0, 28, 0], y: [0, -30, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, accent = "text-fuchsia-200", delay = 0 }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ...springConfig }}
      className={cn(shellPanel, "p-5")}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-white/45">{label}</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
        </div>
        <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem] bg-white/[0.08]", accent)}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton shimmer component
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-[1rem] bg-white/5", className)} />
  );
}

// ─── Error Boundary ──────────────────────────────────────────────────────────
class ViewErrorBoundary extends React.Component<
  { children: React.ReactNode; viewName: string },
  { hasError: boolean; error: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: "" };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[WorthScout] ${this.props.viewName} crashed:`, error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-[1.8rem] border border-rose-400/20 bg-rose-400/[0.04] p-8 text-center">
          <AlertCircle className="h-8 w-8 text-rose-400/60" />
          <div>
            <div className="text-base font-semibold text-white">{this.props.viewName} failed to render</div>
            <div className="mt-1 text-sm text-white/40">{this.state.error}</div>
            <button
              onClick={() => this.setState({ hasError: false, error: "" })}
              className="mt-4 rounded-[0.8rem] border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Auth Modal ───────────────────────────────────────────────────────────────
type AuthMode = "signin" | "register" | "forgot";

function AuthModal({
  open,
  onClose,
  onSignIn,
  defaultMode = "signin",
}: {
  open: boolean;
  onClose: () => void;
  onSignIn: () => void;
  defaultMode?: AuthMode;
}) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (mode !== "forgot") {
      if (!password) e.password = "Password is required";
      else if (password.length < 8) e.password = "At least 8 characters";
    }
    if (mode === "register" && password !== confirmPassword) e.confirmPassword = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "forgot") { setSent(true); return; }
      onSignIn();
      onClose();
    }, 1200);
  };

  useEffect(() => {
    if (!open) {
      setEmail(""); setPassword(""); setConfirmPassword("");
      setErrors({}); setSent(false); setLoading(false); setMode(defaultMode);
    }
  }, [open, defaultMode]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className={cn(shellPanel, "relative z-10 w-full max-w-md p-7")}
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ ...springConfig, duration: 0.3 }}
          >
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                    <Tag className="h-4 w-4 text-fuchsia-200" />
                  </div>
                  <span className="font-semibold text-white">WorthScout</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  {mode === "signin" && "Sign in to your account"}
                  {mode === "register" && "Create your account"}
                  {mode === "forgot" && "Reset your password"}
                </h2>
                <p className="mt-1 text-sm text-white/50">
                  {mode === "signin" && "Welcome back. Your board awaits."}
                  {mode === "register" && "Start scanning smarter today."}
                  {mode === "forgot" && "We'll send you a reset link."}
                </p>
              </div>
              <button onClick={onClose} className="rounded-xl p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Forgot - sent state */}
            {mode === "forgot" && sent ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center rounded-[1.3rem] border border-emerald-400/20 bg-emerald-400/10 p-6 text-center">
                  <CheckCircle2 className="mb-3 h-8 w-8 text-emerald-300" />
                  <div className="font-medium text-white">Check your inbox</div>
                  <p className="mt-1 text-sm text-white/60">We sent a reset link to <span className="text-white">{email}</span></p>
                </div>
                <Button className={cn(btnSecondary, "w-full")} variant="outline" onClick={() => setMode("signin")}>
                  Back to sign in
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/50">Email</label>
                  <Input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: "" })); }}
                    placeholder="you@example.com"
                    type="email"
                    className={cn(inputClass, errors.email && "border-rose-400/50")}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                  {errors.email && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
                      <AlertCircle className="h-3 w-3" />{errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                {mode !== "forgot" && (
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/50">Password</label>
                    <div className="relative">
                      <Input
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: "" })); }}
                        placeholder="Min. 8 characters"
                        type={showPw ? "text" : "password"}
                        className={cn(inputClass, "pr-11", errors.password && "border-rose-400/50")}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      />
                      <button
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                      >
                        {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
                        <AlertCircle className="h-3 w-3" />{errors.password}
                      </p>
                    )}
                  </div>
                )}

                {/* Confirm password */}
                {mode === "register" && (
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/50">Confirm password</label>
                    <Input
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setErrors((prev) => ({ ...prev, confirmPassword: "" })); }}
                      placeholder="Repeat password"
                      type={showPw ? "text" : "password"}
                      className={cn(inputClass, errors.confirmPassword && "border-rose-400/50")}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-rose-400">
                        <AlertCircle className="h-3 w-3" />{errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {/* Forgot link */}
                {mode === "signin" && (
                  <div className="text-right">
                    <button onClick={() => setMode("forgot")} className="text-xs text-white/45 transition hover:text-white">
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit */}
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={cn(btnPrimary, "h-12 w-full")}
                >
                  {loading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : mode === "signin" ? (
                    <LogIn className="mr-2 h-4 w-4" />
                  ) : mode === "register" ? (
                    <UserPlus className="mr-2 h-4 w-4" />
                  ) : null}
                  {mode === "signin" && "Sign in"}
                  {mode === "register" && "Create account"}
                  {mode === "forgot" && "Send reset link"}
                </Button>

                {/* Toggle */}
                <div className="text-center text-sm text-white/45">
                  {mode === "signin" ? (
                    <>Don't have an account?{" "}
                      <button onClick={() => setMode("register")} className="font-medium text-white/80 transition hover:text-white">Register</button>
                    </>
                  ) : mode === "register" ? (
                    <>Already have an account?{" "}
                      <button onClick={() => setMode("signin")} className="font-medium text-white/80 transition hover:text-white">Sign in</button>
                    </>
                  ) : (
                    <button onClick={() => setMode("signin")} className="font-medium text-white/80 transition hover:text-white">Back to sign in</button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Opportunity Card Quick-View Drawer ───────────────────────────────────────
function OpportunityDrawer({
  item,
  onClose,
  onOpenFull,
  watchedItems,
  toggleWatchItem,
  watchBrands,
}: {
  item: any;
  onClose: () => void;
  onOpenFull: (item: any) => void;
  watchedItems: string[];
  toggleWatchItem: (id: string) => void;
  watchBrands: string[];
}) {
  const estimatedNet = estimateBoardNet(item);
  const demand = demandMeta(item.demandScore);
  const confidence = Math.min(94, Math.max(73, item.demandScore + 6));
  const watchingItem = watchedItems.includes(item.id);
  const alertMatch = watchBrands.includes(item.alertTag);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-40 flex items-end justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <motion.div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className={cn(shellPanel, "relative z-10 flex h-full w-full max-w-md flex-col overflow-hidden")}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ...springConfig, stiffness: 220 }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/40">Quick view</div>
                <div className="mt-0.5 font-semibold text-white">{item.brand}</div>
              </div>
              <button onClick={onClose} className="rounded-xl p-2 text-white/40 transition hover:bg-white/10 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-5 space-y-4">
                {/* Image */}
                <div className="relative overflow-hidden rounded-[1.4rem]">
                  <img src={item.image} alt={item.title} className="h-64 w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07040b]/60 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 flex gap-2">
                    <Badge className={cn("border", demand.tone)}>{demand.label}</Badge>
                    {alertMatch && <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">Alert Match</Badge>}
                  </div>
                  <button
                    onClick={() => toggleWatchItem(item.id)}
                    className={cn("absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-xl transition", watchingItem ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-white/20 bg-black/30 text-white/70 hover:text-white")}
                  >
                    <Star className={cn("h-4 w-4", watchingItem && "fill-current")} />
                  </button>
                </div>

                {/* Title & meta */}
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-white/10 text-white/60">{item.category}</Badge>
                    <Badge variant="outline" className="border-white/10 text-white/60">Size {item.size}</Badge>
                    <Badge variant="outline" className="border-white/10 text-white/60">Refreshed {item.refreshed}</Badge>
                  </div>
                </div>

                {/* Pricing grid */}
                <div className="grid grid-cols-3 overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/20">
                  {[["Ask", item.ask, ""], ["Fair", item.fair, ""], ["Est. Net", estimatedNet, estimatedNet >= 0 ? "bg-emerald-400/10" : "bg-rose-400/10"]].map(([label, value, bg]) => (
                    <div key={label as string} className={cn("p-4", bg)}>
                      <div className="text-[10px] uppercase tracking-[0.18em] text-white/35">{label as string}</div>
                      <div className={cn("mt-1 text-2xl font-semibold", label === "Est. Net" ? (estimatedNet >= 0 ? "text-emerald-200" : "text-rose-200") : "text-white")}>
                        {(label === "Est. Net" && estimatedNet >= 0) ? "+" : ""}{pound(value as number)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Confidence & demand */}
                <div className={cn(subtlePanel, "p-4 space-y-3")}>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                      <span>AI confidence</span><span>{confidence}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-emerald-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${confidence}%` }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                      <span>Demand score</span><span>{demand.label}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-fuchsia-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.demandScore}%` }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                </div>

                {/* Source */}
                <div className={cn(subtlePanel, "flex items-center gap-3 p-4")}>
                  <Store className="h-4 w-4 text-sky-300" />
                  <div>
                    <div className="text-sm font-medium text-white">{item.source}</div>
                    <div className="text-xs text-white/45">Board refreshed {item.refreshed}</div>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Actions */}
            <div className="border-t border-white/10 p-5 space-y-3">
              <Button onClick={() => { onOpenFull(item); onClose(); }} className={cn(btnPrimary, "h-12 w-full")}>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Open full analysis
              </Button>
              <Button
                variant="outline"
                onClick={() => toggleWatchItem(item.id)}
                className={cn("h-11 w-full", watchingItem ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15" : btnSecondary)}
              >
                {watchingItem ? <><BellOff className="mr-2 h-4 w-4" />Remove from watchlist</> : <><Bell className="mr-2 h-4 w-4" />Add to watchlist</>}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroSnapshotPlaceholder() {
  const statCards = [
    {
      label: "Net profit",
      value: "+£28.15",
      tone: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    },
    {
      label: "Demand",
      value: "High",
      tone: "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200",
    },
    {
      label: "Confidence",
      value: "94%",
      tone: "border-sky-400/20 bg-sky-400/10 text-sky-200",
    },
  ];

  const recentCards = [
    { image: starterScans[2].image, title: "COS overshirt", net: "+£11" },
    { image: opportunityItems[3].image, title: "Synchilla fleece", net: "+£23" },
    { image: opportunityItems[1].image, title: "Stüssy hoodie", net: "+£17" },
    { image: opportunityItems[7].image, title: "Levi's sherpa", net: "+£10" },
    { image: opportunityItems[8].image, title: "Nuptse gilet", net: "+£29" },
    { image: opportunityItems[0].image, title: "Leather jacket", net: "+£36" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[650px] xl:max-w-[620px]">
      <motion.div
        className="absolute -left-2 top-5 hidden rounded-[1.2rem] border border-emerald-400/20 bg-black/45 px-4 py-3 shadow-[0_0_50px_rgba(52,211,153,0.12)] backdrop-blur-xl md:block"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-100/60">
          Live margin
        </div>
        <div className="mt-1 text-sm font-medium text-emerald-200">
          Profit estimate updates instantly
        </div>
      </motion.div>

      <div className="relative rounded-[2.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-3 sm:p-4 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {statCards.map((item) => (
            <div key={item.label} className={cn("rounded-[1.2rem] border p-4", item.tone)}>
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                {item.label}
              </div>
              <div className="mt-2 text-2xl font-semibold text-white">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="relative rounded-[1.8rem] border border-white/10 bg-[#091018] p-3 sm:p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-white/40">Product preview</div>
              <div className="mt-1 text-base font-semibold text-white">WorthScout dashboard</div>
            </div>
            <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">
              Release preview
            </Badge>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070b12] p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs text-white/40">Recently surfaced</div>
                <div className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/45">
                  Shared board
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {recentCards.map((card) => (
                  <div
                    key={card.title}
                    className="overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.04]"
                  >
                    <img src={card.image} alt={card.title} className="h-16 sm:h-20 w-full object-cover" />
                    <div className="p-2">
                      <div className="truncate text-[10px] font-medium text-white/75">
                        {card.title}
                      </div>
                      <div className="mt-1 text-[10px] text-emerald-300">{card.net}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-[1rem] border border-white/10 bg-white/[0.04] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="text-xs text-white/45">Shared opportunity board</div>
                  <div className="rounded-full bg-fuchsia-400/10 px-2 py-0.5 text-[10px] text-fuchsia-200">
                    15 cached
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-[0.9rem] bg-black/20 p-2.5">
                    <div className="text-[9px] uppercase tracking-[0.15em] text-white/30">Ask</div>
                    <div className="mt-1 text-sm font-semibold text-white">£48</div>
                  </div>
                  <div className="rounded-[0.9rem] bg-black/20 p-2.5">
                    <div className="text-[9px] uppercase tracking-[0.15em] text-white/30">Fair</div>
                    <div className="mt-1 text-sm font-semibold text-white">£95</div>
                  </div>
                  <div className="rounded-[0.9rem] bg-emerald-400/10 p-2.5">
                    <div className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                      Est. net
                    </div>
                    <div className="mt-1 text-sm font-semibold text-emerald-200">+£36</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex items-end justify-center">
              <div className="absolute inset-x-6 top-8 hidden rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl lg:block">
                <div className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                  Potential bad buy
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-[10px] text-white/35">Net</div>
                    <div className="mt-1 text-lg font-semibold text-rose-300">£0</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/35">Fair</div>
                    <div className="mt-1 text-lg font-semibold text-white">£53</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/35">Conf.</div>
                    <div className="mt-1 text-lg font-semibold text-white">90%</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 w-full max-w-[190px] sm:max-w-[205px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#06090f] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-white/35">WorthScout</div>
                    <div className="text-xs font-medium text-white">Mobile scan</div>
                  </div>
                  <div className="h-2.5 w-12 rounded-full bg-white/10" />
                </div>

                <div className="overflow-hidden rounded-[1.4rem] border border-white/10">
                  <img
                    src={opportunityItems[3].image}
                    alt="Mobile preview"
                    className="h-44 sm:h-52 w-full object-cover"
                  />
                </div>

                <div className="mt-3 rounded-[1.1rem] border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                    Synchilla fleece
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="rounded-[0.8rem] bg-black/20 p-2">
                      <div className="text-[9px] text-white/30">Buy</div>
                      <div className="mt-1 text-sm font-semibold text-white">£21</div>
                    </div>
                    <div className="rounded-[0.8rem] bg-black/20 p-2">
                      <div className="text-[9px] text-white/30">Fair</div>
                      <div className="mt-1 text-sm font-semibold text-white">£58</div>
                    </div>
                    <div className="rounded-[0.8rem] bg-emerald-400/10 p-2">
                      <div className="text-[9px] text-white/30">Net</div>
                      <div className="mt-1 text-sm font-semibold text-emerald-200">+£21</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-10 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent xl:block" />
        </div>
      </div>
    </div>
  );
}

// ─── Public Homepage ──────────────────────────────────────────────────────────
function PublicHome({
  onEnterApp,
  onSignIn = onEnterApp,
}: {
  onEnterApp: () => void;
  onSignIn?: () => void;
}) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tickerItems = [
    "Patagonia fleece → est. net updated live",
    "Barcode lookup → store decision in seconds",
    "Shared opportunity board → refreshed hourly",
    "Demand signals → dead stock flagged earlier",
    "Desktop sourcing → screenshot to margin math",
    "Margin-first buying → less guesswork, fewer misses",
  ];

  useEffect(() => {
    const interval = setInterval(
      () => setTickerIndex((prev) => (prev + 1) % tickerItems.length),
      2400
    );
    return () => clearInterval(interval);
  }, [tickerItems.length]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const featureCards = [
    {
      icon: ScanLine,
      title: "Scan anything",
      text: "Barcode, garment, care label, or listing screenshot. Built for real sourcing behaviour, not idealised inputs.",
      accent: "text-emerald-300",
    },
    {
      icon: Barcode,
      title: "Barcode-first speed",
      text: "Use barcode mode for fast in-store triage when time matters and hesitation costs money.",
      accent: "text-sky-300",
    },
    {
      icon: SlidersHorizontal,
      title: "Profit math that fits your costs",
      text: "Editable fees make the margin estimate match how you actually buy, ship, and resell.",
      accent: "text-fuchsia-300",
    },
    {
      icon: TrendingUp,
      title: "Demand-aware decisions",
      text: "Spot what is likely to move, avoid dead stock, and stop mistaking high asking prices for real opportunity.",
      accent: "text-amber-300",
    },
    {
      icon: Search,
      title: "Shared opportunity board",
      text: "See pre-vetted opportunities faster with a board designed to surface likely wins before they disappear.",
      accent: "text-violet-300",
    },
    {
      icon: ImageIcon,
      title: "Desktop sourcing workflow",
      text: "Drag screenshots, compare listings, and run quick margin checks without leaving your desk.",
      accent: "text-rose-300",
    },
  ];

  const useCases = [
    {
      title: "TK Maxx runs",
      text: "Scan fast, price fast, skip weak stock before you burn time in the aisle.",
    },
    {
      title: "Thrift stores",
      text: "Use image and material signals when labels are inconsistent and barcodes are useless.",
    },
    {
      title: "Outlet hunts",
      text: "Compare expected resale margin against real buying cost before you commit.",
    },
    {
      title: "Desktop sourcing",
      text: "Work from screenshots and shared board candidates when you're not in-store.",
    },
  ];

  const navLinkClass =
    "cursor-pointer text-sm text-white/60 transition-colors hover:text-white";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05030a] font-sans text-white antialiased">
      <FloatingOrbs />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:44px_44px] opacity-[0.05]" />

      <div className="relative mx-auto max-w-[1500px] px-4 pb-24 pt-4 md:px-6 lg:px-8">
        <nav className="mb-6 flex items-center justify-between rounded-[1.6rem] border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-2xl md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-fuchsia-100">
              <Tag className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold tracking-tight text-white">WorthScout</div>
              <div className="text-xs text-white/45">AI resale scanner</div>
            </div>
          </div>

          <div className="hidden items-center gap-7 md:flex">
            <span onClick={() => scrollTo("features")} className={navLinkClass}>
              Features
            </span>
            <span onClick={() => scrollTo("how-it-works")} className={navLinkClass}>
              How it works
            </span>
            <span onClick={() => scrollTo("use-cases")} className={navLinkClass}>
              Use cases
            </span>
            <span onClick={() => scrollTo("pricing")} className={navLinkClass}>
              Pricing
            </span>
            <span onClick={() => scrollTo("faq")} className={navLinkClass}>
              FAQ
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={onSignIn}
              className="hidden rounded-[1rem] border-white/10 bg-white/5 text-white hover:bg-white/10 sm:flex"
            >
              Sign in
            </Button>
            <Button
              onClick={onEnterApp}
              className="rounded-[1rem] bg-white text-slate-950 hover:bg-white/90"
            >
              Open app
            </Button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white md:hidden"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.96 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.96 }}
              transition={{ duration: 0.2 }}
              className={cn(shellPanel, "mb-4 overflow-hidden p-3 md:hidden")}
              style={{ transformOrigin: "top" }}
            >
              {[
                ["features", "Features"],
                ["how-it-works", "How it works"],
                ["use-cases", "Use cases"],
                ["pricing", "Pricing"],
                ["faq", "FAQ"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="flex w-full items-center gap-3 rounded-[1rem] px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4 text-white/30" />
                  {label}
                </button>
              ))}

              <div className="mt-2 border-t border-white/10 pt-2">
                <button
                  onClick={onSignIn}
                  className="flex w-full items-center gap-3 rounded-[1rem] px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  <LogIn className="h-4 w-4" />
                  Sign in
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="relative overflow-hidden rounded-[2.7rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_24%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.10),transparent_28%),linear-gradient(135deg,#0c1118_0%,#05030a_58%,#12081a_100%)] px-6 py-10 shadow-[0_30px_120px_rgba(0,0,0,0.5)] md:px-10 md:py-14 xl:px-14 xl:py-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.42]">
            <img
              src="/worthscout_hero_radar_bg.svg"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-left"
            />
          </div>

          <div className="relative grid gap-12 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-5 rounded-full border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-emerald-200 hover:bg-emerald-400/10">
                Barcode-first retail arbitrage
              </Badge>

              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] text-white md:text-6xl xl:text-7xl">
                Scan. Price. Decide.{" "}
                <span className="text-emerald-300">Before</span> you waste money on bad stock.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/68 md:text-lg">
                Built for thrift stores, outlet hunts, and desktop sourcing.
                WorthScout helps you scan items, estimate resale margin, and avoid weak
                buys before you spend.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  onClick={onEnterApp}
                  className="rounded-[1.1rem] bg-emerald-400 px-6 text-slate-950 hover:bg-emerald-300 shadow-[0_18px_45px_rgba(52,211,153,0.18)]"
                >
                  Start scanning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  onClick={onSignIn}
                  className="rounded-[1.1rem] border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  Create free account
                </Button>
              </div>

              <div className="mt-8 overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/25 backdrop-blur-xl">
                <motion.div
                  key={tickerIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-white/70"
                >
                  <div className="h-2 w-2 rounded-full bg-emerald-300" />
                  <span>{tickerItems[tickerIndex]}</span>
                </motion.div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                {[
                  ["Barcode-first", "Fast store triage"],
                  ["Editable fees", "Profit math that fits"],
                  ["Demand-aware", "Avoid dead stock"],
                  ["Shared board", "Surface likely wins"],
                ].map(([value, label], idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + idx * 0.05 }}
                    className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
                  >
                    <div className="text-base font-semibold text-white">{value}</div>
                    <div className="mt-1 text-sm text-white/48">{label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="xl:flex xl:justify-center xl:pr-3"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <HeroSnapshotPlaceholder />
            </motion.div>
          </div>
        </section>

        <SectionReveal>
          <section id="features" className="mt-16 scroll-mt-24">
            <div className="mb-8 max-w-3xl">
              <Badge className="mb-4 rounded-full border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-1.5 text-fuchsia-200 hover:bg-fuchsia-400/10">
                Features
              </Badge>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                Everything you need to flip smarter.{" "}
                <span className="text-emerald-300">Nothing you don’t.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
                Every part of WorthScout is built to reduce hesitation, cut bad buys,
                and help you make stronger sourcing decisions faster.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {featureCards.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    whileHover={{ y: -6 }}
                  >
                    <div
                      className={cn(
                        shellPanel,
                        "h-full p-6 transition hover:border-white/20 hover:bg-white/[0.08]"
                      )}
                    >
                      <div
                        className={cn(
                          "mb-5 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white/10",
                          feature.accent
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-xl font-semibold tracking-tight text-white">
                        {feature.title}
                      </div>
                      <p className="mt-3 text-sm leading-7 text-white/60">{feature.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section id="use-cases" className="mt-14 scroll-mt-24">
            <div className="mb-8 max-w-3xl">
              <Badge className="mb-4 rounded-full border-white/10 bg-white/5 px-4 py-1.5 text-white/70 hover:bg-white/5">
                Use cases
              </Badge>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                Built for the way people actually source.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
                In-store, second-hand, or desktop-first. The workflow stays fast, clear,
                and margin-led.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {useCases.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className={cn(shellPanel, "p-6")}
                >
                  <div className="text-lg font-semibold text-white">{item.title}</div>
                  <p className="mt-3 text-sm leading-7 text-white/58">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section
            id="how-it-works"
            className="mt-14 grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch scroll-mt-24"
          >
            <div className={cn(shellPanel, "p-8 text-white")}>
              <Badge className="mb-4 rounded-full border-white/10 bg-white/5 px-4 py-1.5 text-white/70 hover:bg-white/5">
                How it works
              </Badge>

              <div className="space-y-4">
                {[
                  [
                    MousePointerClick,
                    "1. Scan or drop",
                    "Use a barcode, snap a garment, or drag in a screenshot from desktop.",
                  ],
                  [
                    Search,
                    "2. Match market context",
                    "See likely comps, demand signals, and whether the item is worth serious attention.",
                  ],
                  [
                    SlidersHorizontal,
                    "3. Tune your costs",
                    "Adjust fees, shipping, and assumptions so the estimate reflects your real workflow.",
                  ],
                  [
                    TrendingUp,
                    "4. Decide fast",
                    "Buy, skip, or save the result without losing momentum.",
                  ],
                ].map(([Icon, title, text]) => (
                  <div key={title as string} className={cn(subtlePanel, "flex gap-4 p-4")}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] bg-white/10 text-emerald-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{title as string}</div>
                      <div className="mt-1 text-sm leading-6 text-white/55">
                        {text as string}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="pricing" className={cn(shellPanel, "p-8 text-white scroll-mt-24")}>
              <Badge className="mb-4 rounded-full border-white/10 bg-white/5 px-4 py-1.5 text-white/70 hover:bg-white/5">
                Pricing
              </Badge>

              <h3 className="text-3xl font-semibold tracking-tight text-white">
                Start free. Upgrade when it’s earning its place.
              </h3>

              <div className="mt-6 space-y-4">
                {[
                  [
                    "Free",
                    "Start with the scanner, basic profit checks, and core history.",
                    "£0",
                  ],
                  [
                    "Hustler",
                    "More scans, barcode priority, board alerts, and deeper demand tools.",
                    "£9/mo",
                  ],
                  [
                    "Pro",
                    "Advanced analytics, stronger watchlists, and future marketplace modules.",
                    "£19/mo",
                  ],
                ].map(([tier, text, price], idx) => (
                  <div
                    key={tier as string}
                    className={cn(
                      subtlePanel,
                      "flex items-start justify-between gap-3 p-4",
                      idx === 1 && "border-emerald-400/20 bg-emerald-400/[0.04]"
                    )}
                  >
                    <div>
                      <div className="font-medium text-white">{tier as string}</div>
                      <div className="mt-1 text-sm leading-6 text-white/55">
                        {text as string}
                      </div>
                    </div>
                    <div className="shrink-0 text-lg font-semibold text-white">{price as string}</div>
                  </div>
                ))}
              </div>

              <Button
                onClick={onEnterApp}
                className="mt-6 rounded-[1rem] bg-white text-slate-950 hover:bg-white/90"
              >
                Try the concept
              </Button>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mt-14 grid gap-4 lg:grid-cols-3">
            {[
              {
                icon: Trophy,
                title: "Built for decisive buying",
                text: "This is not for admiring dashboards. It is for buying faster, skipping faster, and making cleaner calls.",
              },
              {
                icon: Shield,
                title: "Confidence without fake certainty",
                text: "WorthScout shows confidence, demand, and margin signal without pretending every estimate is gospel.",
              },
              {
                icon: Star,
                title: "Modular from day one",
                text: "Barcode, board, alerts, and future marketplace modules can grow without breaking the core product.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title} whileHover={{ y: -6 }}>
                  <div className={cn(shellPanel, "p-6 text-white")}>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-white/10 text-fuchsia-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-semibold tracking-tight text-white">
                      {item.title}
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/60">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </section>
        </SectionReveal>

        <SectionReveal>
          <section id="faq" className="mt-14 scroll-mt-24">
            <div className="mb-8 max-w-3xl">
              <Badge className="mb-4 rounded-full border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-sky-200 hover:bg-sky-400/10">
                FAQ
              </Badge>
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                Answers to the obvious questions.
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {[
                [
                  "Does it only work for clothing?",
                  "Clothing is the strongest current use case, but the scanner is designed to expand into other resale-friendly categories over time.",
                ],
                [
                  "Is the opportunity board live?",
                  "It refreshes hourly to keep the board useful without turning server cost into a joke.",
                ],
                [
                  "Can I change fees and assumptions?",
                  "Yes. Margin estimates should fit your workflow, not some fake generic reseller profile.",
                ],
                [
                  "Will there be a Vinted-specific workflow?",
                  "Yes, as a separate module later. The core product stays focused on scanner speed and decision quality first.",
                ],
              ].map(([question, answer]) => (
                <div key={question as string} className={cn(shellPanel, "p-6 text-white")}>
                  <div className="text-lg font-semibold text-white">{question as string}</div>
                  <p className="mt-3 text-sm leading-7 text-white/60">{answer as string}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <section className="mt-14">
            <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.10),transparent_30%),linear-gradient(135deg,#0a0f16,#07040b)] p-10 text-center shadow-[0_20px_80px_rgba(0,0,0,0.4)] md:p-16">
              <Badge className="mb-5 rounded-full border-emerald-400/20 bg-emerald-400/10 px-4 py-1.5 text-emerald-200 hover:bg-emerald-400/10">
                Ready to scout
              </Badge>
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                Stop guessing. Start scanning.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/60">
                WorthScout helps you price faster, cut weak buys earlier, and source with
                a margin-first mindset from the very first scan.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  onClick={onEnterApp}
                  className="rounded-[1.1rem] bg-emerald-400 px-8 text-slate-950 hover:bg-emerald-300 shadow-[0_18px_45px_rgba(52,211,153,0.18)]"
                >
                  Open the scanner
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={onSignIn}
                  className="rounded-[1.1rem] border-white/10 bg-white/5 text-white hover:bg-white/10"
                >
                  Create free account
                </Button>
              </div>
            </div>
          </section>
        </SectionReveal>
      </div>
    </div>
  );
}
// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  currentView,
  setCurrentView,
  onSignOut,
}: {
  currentView: string;
  setCurrentView: (v: string) => void;
  onSignOut: () => void;
}) {
  const primaryNav = navItems.slice(0, 6);
  const secondaryNav = navItems.slice(6);

  return (
    <div className="hidden w-72 shrink-0 flex-col border-r border-white/10 bg-black/30 backdrop-blur-2xl lg:flex">
      <div className="flex flex-1 flex-col p-4 overflow-y-auto">
        {/* Brand */}
        <div className="mb-5 rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/15 via-rose-500/[0.08] to-orange-400/[0.08] p-4 shadow-[0_0_60px_rgba(217,70,239,0.06)]">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white/10 text-fuchsia-100 backdrop-blur-xl">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-white">WorthScout</div>
              <div className="text-xs text-white/50">AI resale intelligence</div>
            </div>
          </div>
          <p className="text-xs leading-5 text-white/60">Scan labels, care tags, silhouettes, or barcodes. Price faster, tweak fees, kill bad buys.</p>
        </div>

        {/* Primary nav */}
        <div className="space-y-1">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-[1.2rem] px-3.5 py-3 text-left text-sm transition-all duration-150",
                  active ? "bg-white text-slate-950 shadow-[0_8px_30px_rgba(255,255,255,0.10)]" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Section divider */}
        <div className="my-4 border-t border-white/[0.08]" />
        <div className="mb-2 px-3 text-[10px] uppercase tracking-[0.18em] text-white/25">Account</div>
        <div className="space-y-1">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-[1.2rem] px-3.5 py-3 text-left text-sm transition-all duration-150",
                  active ? "bg-white text-slate-950 shadow-[0_8px_30px_rgba(255,255,255,0.10)]" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Upgrade nudge */}
        <div className="mt-5 rounded-[1.4rem] border border-fuchsia-400/15 bg-gradient-to-br from-fuchsia-500/[0.08] to-transparent p-4">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-fuchsia-300" />
            <span className="text-xs font-semibold text-white">On Free plan</span>
          </div>
          <p className="text-xs leading-5 text-white/50">Upgrade to Hustler for barcode priority, more scans, and deeper demand tools.</p>
          <button
            onClick={() => setCurrentView("subscription")}
            className="mt-3 text-xs font-medium text-fuchsia-300 transition hover:text-fuchsia-200"
          >
            View plans →
          </button>
        </div>

        {/* User */}
        <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-white/4 p-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-fuchsia-500/20 text-sm font-medium text-fuchsia-200">DR</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-white">Daniel Rea</div>
              <div className="truncate text-xs text-white/45">Free plan</div>
            </div>
            <button
              onClick={onSignOut}
              className="rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
              title="Sign out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Mobile nav ───────────────────────────────────────────────────────────────
function MobileNav({
  currentView,
  setCurrentView,
  onSignOut,
}: {
  currentView: string;
  setCurrentView: (v: string) => void;
  onSignOut: () => void;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-[0.9rem] border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden">
          <Menu className="h-4 w-4" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 border-white/10 bg-[#09060f] p-4 text-white">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
              <Tag className="h-4 w-4 text-fuchsia-200" />
            </div>
            WorthScout
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[1.2rem] px-3.5 py-3 text-left text-sm transition",
                  active ? "bg-white text-slate-950" : "text-white/65 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="mt-5 border-t border-white/10 pt-4">
          <button
            onClick={onSignOut}
            className="flex w-full items-center gap-3 rounded-[1.2rem] px-3.5 py-3 text-sm text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Overview ─────────────────────────────────────────────────────────────────
function OverviewView({ scans, setCurrentView, setSelectedScan }: any) {
  const totalFair = scans.reduce((acc: number, scan: any) => acc + scan.fair, 0);
  const totalNet = scans.reduce((acc: number, scan: any) => acc + computeProfit(scan).net, 0);
  const avgDemand = Math.round(scans.reduce((acc: number, scan: any) => acc + scan.demandScore, 0) / scans.length);

  return (
    <div className="space-y-5">
      {/* Hero banner */}
      <div className={cn(shellPanel, "relative overflow-hidden p-7 md:p-9")}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,70,239,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_30%)]" />
        <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-center">
          <div>
            <Badge className="mb-4 rounded-full border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-sky-200 hover:bg-sky-400/10">Overview</Badge>
            <h2 className="max-w-2xl text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
              Your scanner. Your board. Your edge.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/60">
              Use barcode mode for fast in-store triage. Switch to image mode when there's no usable code. Check the board for pre-vetted candidates.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => setCurrentView("scan")} className={cn(btnPrimary, "h-11")}>
                <Camera className="mr-2 h-4 w-4" />
                Open scanner
              </Button>
              <Button onClick={() => setCurrentView("board")} variant="outline" className={cn(btnSecondary, "h-11")}>
                <Search className="mr-2 h-4 w-4" />
                Open board
              </Button>
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className={cn(subtlePanel, "p-4")}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs text-white/40">Scan priority order</div>
                <div className="mt-0.5 text-base font-semibold text-white">How the tool works best</div>
              </div>
              <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200 text-xs">Recommended</Badge>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {[["Barcode", "1st"], ["Image", "Fallback"], ["Board", "Discovery"]].map(([label, value]) => (
                <div key={label} className={cn(subtlePanel, "p-3 text-center")}>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">{label}</div>
                  <div className="mt-1.5 text-lg font-semibold text-white">{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Saved scans" value={String(scans.length).padStart(2, "0")} icon={Layers3} accent="text-fuchsia-200" delay={0} />
        <StatCard label="Potential fair value" value={pound(totalFair)} icon={BadgePoundSterling} accent="text-sky-200" delay={0.04} />
        <StatCard label="Potential net profit" value={pound(totalNet)} icon={TrendingUp} accent="text-emerald-200" delay={0.08} />
        <StatCard label="Avg demand score" value={`${avgDemand}%`} icon={Flame} accent="text-amber-200" delay={0.12} />
      </div>

      {/* Recent flips + priorities */}
      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <div className={cn(shellPanel, "p-6")}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-white">Recent scans</div>
              <div className="mt-0.5 text-xs text-white/45">Click any result to open the full profit view</div>
            </div>
            <Button onClick={() => setCurrentView("history")} variant="outline" className={cn(btnSecondary, "h-9 text-sm")}>View all</Button>
          </div>
          <div className="space-y-3">
            {scans.map((scan: any) => {
              const meta = confidenceMeta(scan.confidence);
              const demand = demandMeta(scan.demandScore);
              const profit = computeProfit(scan);
              return (
                <motion.button
                  key={scan.id}
                  whileHover={{ x: 3, transition: { duration: 0.15 } }}
                  onClick={() => { setSelectedScan(scan); setCurrentView("history"); }}
                  className={cn(subtlePanel, "flex w-full items-center gap-4 p-4 text-left transition-[border-color] hover:border-white/20")}
                >
                  <img src={scan.image} alt={scan.title} className="h-16 w-16 shrink-0 rounded-[1rem] object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{scan.title}</div>
                    <div className="mt-0.5 text-xs text-white/40">{scan.createdAt}</div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge className={cn("border text-[10px]", meta.tone)}>{meta.label}</Badge>
                      <Badge className={cn("border text-[10px]", demand.tone)}>{demand.label}</Badge>
                      <Badge variant="outline" className="border-white/10 text-[10px] text-white/60">Net {pound(profit.net)}</Badge>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white/25" />
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className={cn(shellPanel, "p-6")}>
          <div className="mb-5">
            <div className="text-base font-semibold text-white">Scanner priorities</div>
            <div className="mt-0.5 text-xs text-white/45">The best approach for each situation</div>
          </div>
          <div className="space-y-3">
            {[
              [Barcode, "1. Barcode mode", "Fastest, cleanest identification. Use when any barcode is visible on the item or packaging.", "text-sky-200", "bg-sky-500/10"],
              [Camera, "2. Image fallback", "For garments without usable codes. Snap the brand tag, care label, or front silhouette.", "text-fuchsia-200", "bg-fuchsia-500/10"],
              [Search, "3. Opportunity board", "Pre-scanned candidates refreshed hourly. Filters, alerts, and fast open-analysis.", "text-emerald-200", "bg-emerald-500/10"],
            ].map(([Icon, title, text, accent, bg], idx) => (
              <motion.div
                key={title as string}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.07, ...springConfig }}
                className={cn(subtlePanel, "flex gap-4 p-4")}
              >
                <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.9rem]", bg, accent)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{title as string}</div>
                  <div className="mt-0.5 text-xs leading-5 text-white/50">{text as string}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mt-5 grid gap-2">
            <Button onClick={() => setCurrentView("watchlist")} variant="outline" className={cn(btnSecondary, "h-10 w-full justify-start text-sm")}>
              <Bell className="mr-2 h-4 w-4" />
              View watchlist
            </Button>
            <Button onClick={() => setCurrentView("analytics")} variant="outline" className={cn(btnSecondary, "h-10 w-full justify-start text-sm")}>
              <LineChart className="mr-2 h-4 w-4" />
              Demand analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scanner ──────────────────────────────────────────────────────────────────
function ScannerView({ onGenerate, loading, uploadPreview, setUploadPreview, manualHint, setManualHint, scanMode, setScanMode, barcodeValue, setBarcodeValue }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const localUrl = URL.createObjectURL(file);
      setUploadPreview(localUrl);
      if (!manualHint) setManualHint(file.name.replace(/\.[^.]+$/, ""));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const localUrl = URL.createObjectURL(file);
      setUploadPreview(localUrl);
      if (!manualHint) setManualHint(file.name.replace(/\.[^.]+$/, ""));
    }
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
      <div className={cn(shellPanel, "p-6")}>
        {/* Mode switcher */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-base font-semibold text-white">Scanner</div>
            <div className="mt-0.5 text-xs text-white/45">Barcode is the fastest path. Image scan is the fallback.</div>
          </div>
          <div className="flex rounded-[1rem] border border-white/10 bg-black/30 p-1">
            {[["barcode", "Barcode", Barcode], ["image", "Image", Camera]].map(([mode, label, Icon]) => (
              <button
                key={mode as string}
                onClick={() => setScanMode(mode as string)}
                className={cn(
                  "flex items-center gap-2 rounded-[0.8rem] px-4 py-2 text-sm font-medium transition-all",
                  scanMode === mode ? "bg-white text-slate-950 shadow-sm" : "text-white/55 hover:text-white"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {label as string}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {scanMode === "barcode" ? (
            <motion.div key="barcode" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} className="space-y-4">
              <div className={cn(subtlePanel, "p-5")}>
                <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[1.3rem] bg-white/[0.025] p-8 text-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-emerald-400/10 text-emerald-300"
                  >
                    <Barcode className="h-6 w-6" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-white">Barcode mode</h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-white/50">
                    Aim at the barcode for the fastest identification. On desktop, paste or type the barcode below.
                  </p>
                  <div className="mt-6 grid w-full max-w-lg gap-3 sm:grid-cols-[1fr_auto]">
                    <Input
                      value={barcodeValue}
                      onChange={(e) => setBarcodeValue(e.target.value)}
                      placeholder="Enter barcode manually..."
                      className={inputClass}
                      onKeyDown={(e) => e.key === "Enter" && !loading && barcodeValue.trim() && onGenerate()}
                    />
                    <Button
                      onClick={onGenerate}
                      disabled={loading || !barcodeValue.trim()}
                      className={cn(btnPrimary, "h-12 px-5")}
                    >
                      {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <ScanLine className="h-4 w-4" />}
                      <span className="ml-2 hidden sm:inline">Scan</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[["Fastest path", "Use barcode first when visible"], ["Best for", "TK Maxx, outlets, shelf scanning"], ["Fallback", "Switch to image if no usable code"]].map(([title, text]) => (
                  <div key={title} className={cn(subtlePanel, "p-4")}>
                    <div className="text-sm font-medium text-white">{title}</div>
                    <div className="mt-1 text-xs leading-5 text-white/50">{text}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="image" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} className="space-y-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={cn(subtlePanel, "p-4 transition-[border-color,background-color]", dragActive && "border-fuchsia-400/40 bg-fuchsia-400/[0.08]")}
              >
                {uploadPreview ? (
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-[1.3rem]">
                      <img src={uploadPreview} alt="Upload preview" className="h-72 w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">Image loaded</Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" className={cn(btnSecondary, "h-10 text-sm")} onClick={() => setUploadPreview(null)}>
                        <X className="mr-1.5 h-3.5 w-3.5" />Remove
                      </Button>
                      <Button variant="outline" className={cn(btnSecondary, "h-10 text-sm")} onClick={() => fileInputRef.current?.click()}>
                        <RefreshCw className="mr-1.5 h-3.5 w-3.5" />Replace
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[1.3rem] bg-white/[0.025] p-8 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-fuchsia-400/10 text-fuchsia-200">
                      <Upload className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium text-white">Drop an image or browse</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/50">
                      Brand tag, care label, composition tag, front silhouette, or a listing screenshot from desktop.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <Button onClick={() => fileInputRef.current?.click()} className={cn(btnPrimary, "h-10 text-sm")}>
                        Choose image
                      </Button>
                    </div>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/45">Manual hint (optional)</label>
                  <Input value={manualHint} onChange={(e) => setManualHint(e.target.value)} placeholder="Brand, item type, product title..." className={inputClass} />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/45">Scan mode</label>
                  <div className="flex h-12 items-center rounded-[1rem] border border-white/10 bg-black/25 px-4 text-sm text-white/50">Camera · Drag image · No-barcode fallback</div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button className={cn(btnPrimary, "h-12")} onClick={onGenerate} disabled={loading || !uploadPreview}>
                  {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <ScanSearch className="mr-2 h-4 w-4" />}
                  Run image scan
                </Button>
                <Button variant="outline" className={cn(btnSecondary, "h-12")} onClick={() => fileInputRef.current?.click()}>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload image
                </Button>
              </div>

              {/* Sample library */}
              <div>
                <div className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-white/40">Sample items — tap to load</div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {sampleLibrary.map((sample) => (
                    <motion.button
                      key={sample.key}
                      whileHover={{ y: -4, transition: { duration: 0.18 } }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setUploadPreview(sample.image); setManualHint(sample.result.title); }}
                      className={cn(subtlePanel, "overflow-hidden text-left transition-[border-color] hover:border-white/20")}
                    >
                      <img src={sample.image} alt={sample.label} className="h-36 w-full object-cover" />
                      <div className="p-3">
                        <div className="text-sm font-medium text-white">{sample.label}</div>
                        <div className="mt-0.5 text-xs text-white/40">Tap to load</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right panel: logic breakdown */}
      <div className={cn(shellPanel, "p-6")}>
        <div className="mb-5">
          <div className="text-base font-semibold text-white">Barcode-first product logic</div>
          <div className="mt-0.5 text-xs text-white/45">How the scanner is designed to work in practice</div>
        </div>
        <div className="space-y-3">
          {[
            [CheckCircle2, "Barcode is the primary scan mode — not an afterthought.", "text-emerald-300"],
            [CheckCircle2, "Manual entry exists for desktop or when camera is unavailable.", "text-emerald-300"],
            [CheckCircle2, "Image scan handles garments with no readable barcode.", "text-sky-300"],
            [CheckCircle2, "Editable fees recalculate profit live on the result panel.", "text-fuchsia-300"],
            [CheckCircle2, "The right MVP order: barcode → recognition → opportunity board.", "text-amber-300"],
          ].map(([Icon, text, accent], idx) => (
            <motion.div
              key={text as string}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.06, ...springConfig }}
              className={cn(subtlePanel, "flex items-start gap-3 p-4")}
            >
              <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", accent as string)} />
              <span className="text-sm leading-6 text-white/70">{text as string}</span>
            </motion.div>
          ))}
        </div>

        {/* Quick stats */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[["< 2s", "Median barcode lookup"], ["3 modes", "Barcode, image, board"], ["Live fees", "Editable at scan time"], ["No limits", "On Free scan count"]].map(([value, label]) => (
            <div key={label} className={cn(subtlePanel, "p-4")}>
              <div className="text-lg font-semibold text-white">{value}</div>
              <div className="mt-0.5 text-xs text-white/45">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Result Panel ─────────────────────────────────────────────────────────────
function ResultPanel({ scan, onDelete, onRescan, onUpdateSetting, onWatch }: any) {
  const [saved, setSaved] = useState(false);

  if (!scan) {
    return (
      <div className={cn(shellPanel, "flex min-h-[460px] flex-col items-center justify-center p-8 text-center")}>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-white/[0.08] text-white/30"
        >
          <Eye className="h-6 w-6" />
        </motion.div>
        <h3 className="text-lg font-medium text-white">No scan selected yet</h3>
        <p className="mt-2 max-w-xs text-sm leading-6 text-white/45">Run a scan or click a saved result. This panel makes profit and demand obvious fast.</p>
      </div>
    );
  }

  const confidence = confidenceMeta(scan.confidence);
  const demand = demandMeta(scan.demandScore);
  const profit = computeProfit(scan);
  const str = Math.round((scan.soldListings / Math.max(scan.activeListings, 1)) * 100);
  const premium = hasPremiumMaterial(scan.materials);

  return (
    <div className="space-y-5">
      {/* Main result card */}
      <div className={cn(shellPanel, "overflow-hidden p-0")}>
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Image */}
          <div className="relative border-b border-white/10 lg:border-b-0 lg:border-r lg:border-r-white/10">
            <img src={scan.image} alt={scan.title} className="h-full min-h-[300px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>

          {/* Info */}
          <div className="p-6 md:p-7">
            <div className="flex flex-wrap items-center gap-1.5">
              {scan.scanType === "barcode" && <Badge className="border-sky-400/20 bg-sky-400/10 text-sky-200 text-xs">Barcode lookup</Badge>}
              {scan.scanType === "board" && <Badge className="border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200 text-xs">Board candidate</Badge>}
              {scan.scanType === "image" && <Badge className="border-violet-400/20 bg-violet-400/10 text-violet-200 text-xs">Image scan</Badge>}
              <Badge variant="outline" className="border-white/10 text-white/60 text-xs">{scan.category}</Badge>
              <Badge className={cn("border text-xs", confidence.tone)}>{confidence.label} confidence</Badge>
              <Badge className={cn("border text-xs", demand.tone)}>{demand.label}</Badge>
              {premium && <Badge className="border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200 text-xs">Premium material</Badge>}
            </div>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl">{scan.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/55">
              {scan.scanType === "barcode"
                ? `Matched via barcode ${scan.matchedBarcode || "lookup"} with product metadata and marketplace comps.`
                : scan.notes}
            </p>

            {scan.materials?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {scan.materials.map((material: string) => (
                  <Badge key={material} variant="outline" className="border-white/10 text-white/60 text-xs">{material}</Badge>
                ))}
              </div>
            )}

            {/* Price tiers */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[["Quick sale", scan.quick], ["Fair market", scan.fair], ["Ambitious", scan.ambitious]].map(([label, value]) => (
                <div key={label as string} className={cn(subtlePanel, "p-4")}>
                  <div className="text-xs text-white/45">{label as string}</div>
                  <div className="mt-1.5 text-2xl font-semibold text-white">{pound(value as number)}</div>
                </div>
              ))}
            </div>

            {/* Profit + Fee editor */}
            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              <div className={cn(subtlePanel, "p-4")}>
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-fuchsia-300" />Profit settings
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[["buyPrice", "Buy price"], ["buyerFee", "Buyer fee"], ["marketplaceFeePercent", "Marketplace fee %"], ["shippingFee", "Shipping"]].map(([field, label]) => (
                    <div key={field as string}>
                      <label className="mb-1.5 block text-[10px] uppercase tracking-[0.15em] text-white/35">{label as string}</label>
                      <Input
                        type="number"
                        value={scan[field as string]}
                        onChange={(e) => onUpdateSetting(scan.id, field as string, Number(e.target.value || 0))}
                        className="h-10 rounded-[0.9rem] border-white/10 bg-white/5 text-sm text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={cn("rounded-[1.3rem] border p-4", profit.net >= 0 ? "border-emerald-400/20 bg-emerald-400/10" : "border-rose-400/20 bg-rose-400/10")}>
                <div className="text-xs text-white/50">Potential net profit</div>
                <div className={cn("mt-2 text-4xl font-semibold tracking-tight", profit.net >= 0 ? "text-emerald-200" : "text-rose-200")}>
                  {profit.net >= 0 ? "+" : ""}{pound(profit.net)}
                </div>
                <div className={cn("mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium", profit.net >= 0 ? "bg-emerald-300/12 text-emerald-100" : "bg-rose-300/12 text-rose-100")}>
                  {profit.net >= 0 ? "Worth considering" : "Likely weak flip"}
                </div>
                <div className="mt-4 grid gap-2 text-xs text-white/50 sm:grid-cols-3">
                  <div className="rounded-xl bg-black/15 px-3 py-2">Buy {pound(profit.allInBuy)}</div>
                  <div className="rounded-xl bg-black/15 px-3 py-2">Fees {pound(profit.fees)}</div>
                  <div className="rounded-xl bg-black/15 px-3 py-2">Ship {pound(profit.shipping)}</div>
                </div>
              </div>
            </div>

            {/* Demand + market */}
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <div className={cn(subtlePanel, "p-4")}>
                <div className="mb-2 flex items-center justify-between text-xs text-white/50">
                  <span>STR meter</span><span>{demand.label}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-fuchsia-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${demand.meter}%` }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <div className="mt-2 text-xs text-white/40">{scan.soldListings} sold · {scan.activeListings} active · ~{str}% STR</div>
              </div>
              <div className={cn(subtlePanel, "p-4")}>
                <div className="mb-1 flex items-center gap-2 text-xs text-white/50"><Store className="h-3.5 w-3.5 text-fuchsia-200" />Comp source</div>
                <div className="text-sm font-medium text-white">{scan.sourceMarket}</div>
                <div className="mt-1 text-xs text-white/40">Marketplace blend · General retail arbitrage priority</div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex flex-wrap gap-2">
              <Button className={cn(btnPrimary, "h-10 text-sm")} onClick={onRescan}>
                <Camera className="mr-1.5 h-3.5 w-3.5" />Scan another
              </Button>
              <Button
                variant="outline"
                className={cn("h-10 text-sm", saved ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/15" : btnSecondary)}
                onClick={() => setSaved(true)}
              >
                {saved ? <><CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />Saved</> : "Save result"}
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-[1rem] border-rose-400/20 bg-rose-400/10 text-rose-200 text-sm hover:bg-rose-400/20 active:scale-[0.98] transition-all"
                onClick={() => onDelete(scan.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Matched comps */}
      {scan.comps?.length > 0 && (
        <div className={cn(shellPanel, "p-6")}>
          <div className="mb-4">
            <div className="text-base font-semibold text-white">Matched comps</div>
            <div className="mt-0.5 text-xs text-white/45">Recent solds and actives — realistic comp engine simulation</div>
          </div>
          <div className="space-y-3">
            {scan.comps.map((comp: any) => (
              <div key={comp.id} className={cn(subtlePanel, "flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap")}>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-white">{comp.title}</div>
                  <div className="mt-0.5 text-xs text-white/40">{comp.market}</div>
                </div>
                <Badge variant="outline" className="border-white/10 text-white/60 text-xs">{comp.status}</Badge>
                <Badge variant="outline" className="border-white/10 text-white/60 text-xs">{comp.score}% relevant</Badge>
                <div className="text-base font-semibold text-white">{pound(comp.price)}</div>
                <Button variant="outline" className={cn(btnSecondary, "h-9 text-xs")}>
                  <ArrowUpRight className="mr-1 h-3.5 w-3.5" />Open
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── History / Scan Vault ─────────────────────────────────────────────────────
function HistoryView({ scans, selectedScan, setSelectedScan, deleteScan, setCurrentView, onUpdateSetting }: any) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    if (!query.trim()) return scans;
    return scans.filter((scan: any) =>
      [scan.title, scan.brand, scan.category, scan.subcategory].join(" ").toLowerCase().includes(query.toLowerCase())
    );
  }, [query, scans]);

  return (
    <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
      {/* Scan list */}
      <div className={cn(shellPanel, "p-6")}>
        <div className="mb-5">
          <div className="text-base font-semibold text-white">Scan vault</div>
          <div className="mt-0.5 text-xs text-white/45">{filtered.length} result{filtered.length !== 1 && "s"} · click to view</div>
        </div>
        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Brand, item, category..."
              className={cn(inputClass, "pl-10")}
            />
          </div>
          <Button variant="outline" className={cn(btnSecondary, "h-12 px-3")}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[580px] pr-1">
          <div className="space-y-2">
            {filtered.length === 0 && (
              <div className="flex flex-col items-center py-16 text-center">
                <Search className="mb-3 h-8 w-8 text-white/20" />
                <div className="text-sm font-medium text-white/50">No scans match "{query}"</div>
                <button onClick={() => setQuery("")} className="mt-2 text-xs text-white/30 transition hover:text-white/60">Clear search</button>
              </div>
            )}
            {filtered.map((scan: any) => {
              const active = selectedScan?.id === scan.id;
              const demand = demandMeta(scan.demandScore);
              const profit = computeProfit(scan);
              return (
                <motion.button
                  key={scan.id}
                  onClick={() => setSelectedScan(scan)}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[1.3rem] border p-3 text-left transition-all",
                    active ? "border-fuchsia-400/40 bg-fuchsia-500/10" : "border-white/10 bg-black/15 hover:border-white/18 hover:bg-white/[0.04]"
                  )}
                >
                  <img src={scan.image} alt={scan.title} className="h-14 w-14 shrink-0 rounded-[0.9rem] object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{scan.title}</div>
                    <div className="mt-0.5 text-xs text-white/40">{scan.createdAt}</div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {scan.scanType === "barcode" && <Badge className="border-sky-400/20 bg-sky-400/10 text-sky-200 text-[9px]">Barcode</Badge>}
                      {scan.scanType === "board" && <Badge className="border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200 text-[9px]">Board</Badge>}
                      <Badge className={cn("border text-[9px]", demand.tone)}>{demand.label}</Badge>
                      <Badge variant="outline" className="border-white/10 text-[9px] text-white/55">Net {pound(profit.net)}</Badge>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </ScrollArea>
        <Button onClick={() => setCurrentView("scan")} className={cn(btnPrimary, "mt-4 h-11 w-full text-sm")}>
          <Plus className="mr-1.5 h-4 w-4" />Scan new item
        </Button>
      </div>

      {/* Result panel */}
      <ResultPanel
        scan={selectedScan}
        onDelete={deleteScan}
        onRescan={() => setCurrentView("scan")}
        onUpdateSetting={onUpdateSetting}
      />
    </div>
  );
}

// ─── Opportunity Board ────────────────────────────────────────────────────────
function OpportunityBoardView({ setCurrentView, setSelectedScan }: any) {
  const [brandQuery, setBrandQuery] = useState("");
  const [minNet, setMinNet] = useState(15);
  const [alertsOnly, setAlertsOnly] = useState(false);
  const [compactMode, setCompactMode] = useState(false);
  const [quickFilter, setQuickFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [demandFilter, setDemandFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Best");
  const [watchBrands, setWatchBrands] = useState(["AllSaints", "Stüssy", "Arc'teryx"]);
  const [watchedItems, setWatchedItems] = useState(["opp_1", "opp_4", "opp_7"]);
  const [secondsToRefresh, setSecondsToRefresh] = useState(12 * 60 + 45);
  const [drawerItem, setDrawerItem] = useState<any>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsToRefresh((prev) => (prev <= 0 ? 59 * 60 + 59 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredItems = useMemo(() => {
    let items = opportunityItems.filter((item) => {
      const estimatedNet = estimateBoardNet(item);
      const brandMatch = !brandQuery.trim() || item.brand.toLowerCase().includes(brandQuery.toLowerCase()) || item.category.toLowerCase().includes(brandQuery.toLowerCase()) || item.title.toLowerCase().includes(brandQuery.toLowerCase());
      const netMatch = estimatedNet >= Number(minNet || 0);
      const alertMatch = !alertsOnly || watchBrands.includes(item.alertTag) || watchedItems.includes(item.id);
      const categoryMatch = categoryFilter === "All" || item.category === categoryFilter;
      const demandMatch = demandFilter === "All" || (demandFilter === "High" && item.demandScore >= 72) || (demandFilter === "Steady" && item.demandScore >= 50 && item.demandScore < 72) || (demandFilter === "Slow" && item.demandScore < 50);
      const quickMatch = quickFilter === "all" || (quickFilter === "highNet" && estimatedNet >= 25) || (quickFilter === "highDemand" && item.demandScore >= 72) || (quickFilter === "alerts" && (watchBrands.includes(item.alertTag) || watchedItems.includes(item.id)));
      return brandMatch && netMatch && alertMatch && categoryMatch && demandMatch && quickMatch;
    });
    items = [...items].sort((a, b) => {
      if (sortBy === "Net") return estimateBoardNet(b) - estimateBoardNet(a);
      if (sortBy === "Demand") return b.demandScore - a.demandScore;
      if (sortBy === "Newest") return a.refreshed.localeCompare(b.refreshed);
      return (b.demandScore + estimateBoardNet(b)) - (a.demandScore + estimateBoardNet(a));
    });
    return items;
  }, [brandQuery, minNet, alertsOnly, quickFilter, categoryFilter, demandFilter, sortBy, watchBrands, watchedItems]);

  const toggleBrandAlert = (brand: string) => {
    setWatchBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  };
  const toggleWatchItem = (id: string) => {
    setWatchedItems((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };
  const clearFilters = () => {
    setBrandQuery(""); setMinNet(15); setAlertsOnly(false); setQuickFilter("all"); setCategoryFilter("All"); setDemandFilter("All"); setSortBy("Best");
  };
  const openCandidate = (item: any) => {
    const mapped = { ...starterScans[0], id: `board_${item.id}`, title: item.title, brand: item.brand, category: item.category, subcategory: item.category, image: item.image, demandScore: item.demandScore, buyPrice: item.ask, fair: item.fair, quick: Math.max(8, Math.round(item.fair * 0.78)), ambitious: Math.round(item.fair * 1.14), createdAt: "From opportunity board", sourceMarket: item.source, notes: `Surfaced on the shared hourly board. Refreshed ${item.refreshed}.`, scanType: "board", matchedBarcode: "", materials: ["Unknown"] };
    setSelectedScan(mapped);
    setCurrentView("history");
  };

  const avgNet = Math.round(filteredItems.reduce((acc, item) => acc + estimateBoardNet(item), 0) / Math.max(filteredItems.length, 1));
  const appliedFilterCount = [brandQuery.trim(), minNet !== 15, alertsOnly, quickFilter !== "all", categoryFilter !== "All", demandFilter !== "All", sortBy !== "Best"].filter(Boolean).length;
  const minutes = String(Math.floor(secondsToRefresh / 60)).padStart(2, "0");
  const seconds = String(secondsToRefresh % 60).padStart(2, "0");

  const categories = ["All", ...Array.from(new Set(opportunityItems.map((i) => i.category)))];
  const demands = ["All", "High", "Steady", "Slow"];
  const sorts = ["Best", "Net", "Demand", "Newest"];

  return (
    <>
      {drawerItem && (
        <OpportunityDrawer
          item={drawerItem}
          onClose={() => setDrawerItem(null)}
          onOpenFull={openCandidate}
          watchedItems={watchedItems}
          toggleWatchItem={toggleWatchItem}
          watchBrands={watchBrands}
        />
      )}

      <div className="space-y-4">
        {/* Header stats */}
        <div className={cn(shellPanel, "p-5 lg:p-6")}>
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="text-2xl font-semibold tracking-tight text-white">Opportunity Board</div>
              <div className="mt-0.5 text-sm text-white/50">Shared hourly feed · pre-vetted flip candidates</div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                [Layers3, `${filteredItems.length}`, "items shown", "text-emerald-300"],
                [TrendingUp, `£${avgNet}`, "avg est. net", "text-sky-300"],
                [Bell, `${watchBrands.length}`, "watch brands", "text-fuchsia-300"],
                [RefreshCw, `${minutes}:${seconds}`, "next refresh", "text-violet-300"],
              ].map(([Icon, value, label, accent], idx) => (
                <motion.div
                  key={label as string}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, ...springConfig }}
                  className={cn(subtlePanel, "px-4 py-3")}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-[0.9rem] bg-white/[0.08]", accent as string)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-white">{value as string}</div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-white/35">{label as string}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={cn(shellPanel, "p-4 lg:p-5")}>
          {/* Quick filters */}
          <div className="mb-3 flex flex-wrap gap-2">
            {[["all", "All"], ["highNet", "High Net"], ["highDemand", "High Demand"], ["alerts", "Alerts Only"]].map(([key, label]) => (
              <button
                key={key as string}
                onClick={() => { setQuickFilter(key as string); if (key === "alerts") setAlertsOnly(true); else if (quickFilter === "alerts") setAlertsOnly(false); }}
                className={cn(
                  "rounded-[1rem] border px-3.5 py-2 text-xs font-medium transition-all",
                  quickFilter === key
                    ? key === "highNet" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                    : key === "highDemand" ? "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200"
                    : key === "alerts" ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
                    : "border-white/20 bg-white/10 text-white"
                    : "border-white/10 bg-black/25 text-white/60 hover:text-white"
                )}
              >
                {label as string}
              </button>
            ))}
            <button
              onClick={() => setCompactMode((prev) => !prev)}
              className={cn("ml-auto rounded-[1rem] border px-3.5 py-2 text-xs font-medium transition-all", compactMode ? "border-sky-400/30 bg-sky-400/10 text-sky-200" : "border-white/10 bg-black/25 text-white/60 hover:text-white")}
            >
              {compactMode ? "Compact" : "Expanded"}
            </button>
          </div>

          {/* Filter row */}
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/25" />
              <Input value={brandQuery} onChange={(e) => setBrandQuery(e.target.value)} placeholder="Brand or keyword..." className="h-10 rounded-[1rem] border-white/10 bg-black/25 pl-9 text-sm text-white placeholder:text-white/35 w-44" />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-[1rem] border border-white/10 bg-black/25 px-3 text-sm text-white/70 focus:outline-none focus:border-white/20"
            >
              {categories.map((c) => <option key={c} value={c} className="bg-[#09060f]">{c}</option>)}
            </select>

            <select
              value={demandFilter}
              onChange={(e) => setDemandFilter(e.target.value)}
              className="h-10 rounded-[1rem] border border-white/10 bg-black/25 px-3 text-sm text-white/70 focus:outline-none focus:border-white/20"
            >
              {demands.map((d) => <option key={d} value={d} className="bg-[#09060f]">{d === "All" ? "All demand" : d}</option>)}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 rounded-[1rem] border border-white/10 bg-black/25 px-3 text-sm text-white/70 focus:outline-none focus:border-white/20"
            >
              {sorts.map((s) => <option key={s} value={s} className="bg-[#09060f]">Sort: {s}</option>)}
            </select>

            <div className="flex items-center gap-2 rounded-[1rem] border border-white/10 bg-black/25 px-3 text-sm text-white/60">
              Min £
              <input
                type="number"
                value={minNet}
                onChange={(e) => setMinNet(Number(e.target.value || 0))}
                className="w-14 bg-transparent text-white outline-none"
              />
            </div>

            {appliedFilterCount > 0 && (
              <button onClick={clearFilters} className="rounded-[1rem] border border-white/10 bg-black/25 px-3.5 py-2 text-xs text-white/45 transition hover:text-white">
                Clear {appliedFilterCount}
              </button>
            )}
          </div>

          {/* Brand watch chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 flex items-center">Watch brands:</div>
            {["AllSaints", "Stüssy", "Arc'teryx", "Stone Island", "Patagonia", "COS", "Carhartt"].map((brand) => {
              const active = watchBrands.includes(brand);
              return (
                <button
                  key={brand}
                  onClick={() => toggleBrandAlert(brand)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition-all",
                    active ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-white/10 bg-white/5 text-white/50 hover:text-white/80"
                  )}
                >
                  {active && <span className="mr-1">✓</span>}{brand}
                </button>
              );
            })}
          </div>
        </div>

        {/* Card grid */}
        <div className={cn(shellPanel, "p-4 lg:p-5")}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-white">Opportunity feed</div>
              <div className="mt-0.5 text-xs text-white/45">Refreshed hourly · frozen between cycles</div>
            </div>
            <Badge className="border-sky-400/20 bg-sky-400/10 text-sky-200 text-xs">{filteredItems.length} shown</Badge>
          </div>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center py-20 text-center">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="mb-4 flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-white/[0.08] text-white/25">
                <Filter className="h-6 w-6" />
              </motion.div>
              <div className="text-base font-medium text-white/50">No items match these filters</div>
              <p className="mt-1 text-sm text-white/30">Try removing a filter or lowering the minimum net.</p>
              <button onClick={clearFilters} className="mt-4 text-sm text-white/50 transition hover:text-white">Clear all filters</button>
            </div>
          )}

          <div className={cn("grid gap-4", compactMode ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 xl:grid-cols-3")}>
            {filteredItems.map((item, idx) => {
              const estimatedNet = estimateBoardNet(item);
              const demand = demandMeta(item.demandScore);
              const watchingBrand = watchBrands.includes(item.alertTag);
              const watchingItem = watchedItems.includes(item.id);
              const confidence = Math.min(94, Math.max(73, item.demandScore + 6));

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.025, ...springConfig }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={cn(subtlePanel, "overflow-hidden p-0 transition-[border-color] hover:border-white/22 cursor-pointer")}
                  onClick={() => setDrawerItem(item)}
                >
                  <div className="relative">
                    <img src={item.image} alt={item.title} className={cn("w-full object-cover", compactMode ? "h-48" : "h-60")} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07040b]/80 via-[#07040b]/15 to-transparent" />
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      <Badge className={cn("border text-[10px]", demand.tone)}>{demand.label}</Badge>
                      {watchingBrand && <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200 text-[10px]">Alert</Badge>}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWatchItem(item.id); }}
                      className={cn("absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-xl transition", watchingItem ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" : "border-white/15 bg-black/30 text-white/60 hover:text-white")}
                    >
                      <Star className={cn("h-3.5 w-3.5", watchingItem && "fill-current")} />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="text-base font-semibold tracking-tight text-white">{item.title}</div>
                    <div className="mt-0.5 text-xs text-white/45">{item.category} · Size {item.size} · {item.refreshed}</div>

                    <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-[0.9rem] border border-white/10 bg-black/20">
                      <div className="border-r border-white/10 p-2.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-white/30">Ask</div>
                        <div className="mt-0.5 text-lg font-semibold text-white">{pound(item.ask)}</div>
                      </div>
                      <div className="border-r border-white/10 p-2.5">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-white/30">Fair</div>
                        <div className="mt-0.5 text-lg font-semibold text-white">{pound(item.fair)}</div>
                      </div>
                      <div className={cn("p-2.5", estimatedNet >= 0 ? "bg-emerald-400/10" : "bg-rose-400/10")}>
                        <div className="text-[9px] uppercase tracking-[0.15em] text-white/30">Net</div>
                        <div className={cn("mt-0.5 text-lg font-semibold", estimatedNet >= 0 ? "text-emerald-200" : "text-rose-200")}>
                          {estimatedNet >= 0 ? "+" : ""}{pound(estimatedNet)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-emerald-300" style={{ width: `${confidence}%` }} />
                      </div>
                      <span className="text-[10px] text-white/40">{confidence}%</span>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Button
                        onClick={(e) => { e.stopPropagation(); openCandidate(item); }}
                        className={cn(btnPrimary, "h-9 text-xs")}
                      >
                        Full analysis
                      </Button>
                      <Button
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); setDrawerItem(item); }}
                        className={cn(btnSecondary, "h-9 text-xs")}
                      >
                        Quick view
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Watchlist ─────────────────────────────────────────────────────────────────
function WatchlistView({ setCurrentView }: any) {
  const [watchedBrands, setWatchedBrands] = useState(["AllSaints", "Arc'teryx", "Stone Island", "Patagonia"]);
  const [alerts, setAlerts] = useState([
    { id: "a1", brand: "AllSaints", type: "brand", lastMatch: "8m ago", matches: 3, active: true },
    { id: "a2", brand: "Arc'teryx", type: "brand", lastMatch: "31m ago", matches: 1, active: true },
    { id: "a3", brand: "Stone Island", type: "brand", lastMatch: "49m ago", matches: 2, active: true },
    { id: "a4", brand: "Patagonia", type: "brand", lastMatch: "19m ago", matches: 1, active: false },
  ]);
  const [newBrand, setNewBrand] = useState("");

  const addBrand = () => {
    if (!newBrand.trim()) return;
    const brand = newBrand.trim();
    if (!watchedBrands.includes(brand)) {
      setWatchedBrands((prev) => [...prev, brand]);
      setAlerts((prev) => [...prev, { id: `a${Date.now()}`, brand, type: "brand", lastMatch: "never", matches: 0, active: true }]);
    }
    setNewBrand("");
  };
  const removeBrand = (brand: string) => {
    setWatchedBrands((prev) => prev.filter((b) => b !== brand));
    setAlerts((prev) => prev.filter((a) => a.brand !== brand));
  };
  const toggleAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a));
  };

  const activeAlerts = alerts.filter((a) => a.active);
  const recentMatches = opportunityItems.filter((item) => watchedBrands.includes(item.alertTag)).slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className={cn(shellPanel, "p-6")}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-base font-semibold text-white">Watchlist & Alerts</div>
            <div className="mt-0.5 text-sm text-white/45">Get notified when watched brands appear on the board</div>
          </div>
          <div className="flex gap-3">
            <StatCard label="Active alerts" value={String(activeAlerts.length)} icon={Bell} accent="text-fuchsia-200" />
            <StatCard label="Brands watched" value={String(watchedBrands.length)} icon={Tag} accent="text-emerald-200" />
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Brand alerts list */}
        <div className={cn(shellPanel, "p-6")}>
          <div className="mb-5">
            <div className="text-base font-semibold text-white">Brand alerts</div>
            <div className="mt-0.5 text-xs text-white/40">Trigger when matching brands appear on the hourly board</div>
          </div>

          {/* Add brand */}
          <div className="mb-4 flex gap-2">
            <Input
              value={newBrand}
              onChange={(e) => setNewBrand(e.target.value)}
              placeholder="Add brand to watch..."
              className={inputClass}
              onKeyDown={(e) => e.key === "Enter" && addBrand()}
            />
            <Button onClick={addBrand} className={cn(btnPrimary, "h-12 px-4 shrink-0")}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {alerts.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Bell className="mb-3 h-8 w-8 text-white/20" />
              <div className="text-sm font-medium text-white/50">No alerts set up yet</div>
              <p className="mt-1 text-xs text-white/30">Add a brand above to get started</p>
            </div>
          ) : (
            <div className="space-y-2">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(subtlePanel, "flex items-center gap-3 p-4")}
                >
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.9rem]", alert.active ? "bg-fuchsia-400/10 text-fuchsia-300" : "bg-white/[0.08] text-white/30")}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white">{alert.brand}</div>
                    <div className="mt-0.5 text-xs text-white/40">
                      {alert.matches > 0 ? `${alert.matches} match${alert.matches !== 1 ? "es" : ""} · last ${alert.lastMatch}` : "No matches yet"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {alert.matches > 0 && (
                      <Badge className="border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200 text-[10px]">{alert.matches}</Badge>
                    )}
                    <Switch checked={alert.active} onCheckedChange={() => toggleAlert(alert.id)} />
                    <button onClick={() => removeBrand(alert.brand)} className="rounded-lg p-1 text-white/25 transition hover:text-rose-300">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Recent board matches */}
        <div className={cn(shellPanel, "p-6")}>
          <div className="mb-5">
            <div className="text-base font-semibold text-white">Board matches</div>
            <div className="mt-0.5 text-xs text-white/40">Items from watched brands currently on the board</div>
          </div>

          {recentMatches.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Search className="mb-3 h-8 w-8 text-white/20" />
              <div className="text-sm font-medium text-white/50">No matches right now</div>
              <p className="mt-1 text-xs text-white/30">Your watched brands haven't appeared on the board this cycle</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentMatches.map((item) => {
                const estimatedNet = estimateBoardNet(item);
                const demand = demandMeta(item.demandScore);
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView("board")}
                    className={cn(subtlePanel, "flex w-full items-center gap-3 p-3 text-left transition-[border-color] hover:border-white/20")}
                  >
                    <img src={item.image} alt={item.title} className="h-14 w-14 shrink-0 rounded-[0.9rem] object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-white">{item.title}</div>
                      <div className="mt-0.5 text-xs text-white/40">{item.brand} · {item.refreshed}</div>
                      <div className="mt-1.5 flex gap-1.5">
                        <Badge className={cn("border text-[10px]", demand.tone)}>{demand.label}</Badge>
                        <Badge variant="outline" className="border-white/10 text-[10px] text-white/55">Net {estimatedNet >= 0 ? "+" : ""}{pound(estimatedNet)}</Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white/25" />
                  </button>
                );
              })}
            </div>
          )}

          <Button onClick={() => setCurrentView("board")} variant="outline" className={cn(btnSecondary, "mt-4 h-10 w-full text-sm")}>
            <Search className="mr-1.5 h-3.5 w-3.5" />
            View full board
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Demand Analytics ─────────────────────────────────────────────────────────
function DemandView({ scans }: any) {
  const [timeframe, setTimeframe] = useState("7d");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Demand");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(scans.map((scan: any) => scan.category)))],
    [scans]
  );

  const filteredScans = useMemo(() => {
    let next =
      categoryFilter === "All"
        ? scans
        : scans.filter((scan: any) => scan.category === categoryFilter);

    next = [...next].sort((a: any, b: any) => {
      const sellThroughA = Math.round(
        (a.soldListings / Math.max(a.activeListings, 1)) * 100
      );
      const sellThroughB = Math.round(
        (b.soldListings / Math.max(b.activeListings, 1)) * 100
      );
      const netA = computeProfit(a).net;
      const netB = computeProfit(b).net;

      if (sortBy === "Sell-through") return sellThroughB - sellThroughA;
      if (sortBy === "Avg Net") return netB - netA;
      if (sortBy === "Confidence") return b.confidence - a.confidence;
      return b.demandScore - a.demandScore;
    });

    return next;
  }, [categoryFilter, scans, sortBy]);

  const leaderboard = filteredScans.map((scan: any, index: number) => {
    const sellThrough = Math.round(
      (scan.soldListings / Math.max(scan.activeListings, 1)) * 100
    );
    const net = computeProfit(scan).net;
    const trendValue = Math.round((sellThrough - 42) / 3) + (index === 0 ? 2 : 0);
    const trendTone =
      trendValue > 0
        ? "text-emerald-300"
        : trendValue < 0
        ? "text-rose-300"
        : "text-white/45";
    const trendLabel =
      trendValue > 0 ? `+${trendValue}%` : trendValue < 0 ? `${trendValue}%` : "Flat";

    const status =
      scan.demandScore >= 72
        ? {
            label: "Hot",
            tone: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200",
          }
        : scan.demandScore >= 50
        ? {
            label: "Steady",
            tone: "border-sky-400/30 bg-sky-400/10 text-sky-200",
          }
        : {
            label: "Slow",
            tone: "border-slate-400/20 bg-slate-400/10 text-slate-200",
          };

    const confidence =
      scan.confidence >= 90
        ? { label: "High", tone: "text-emerald-200" }
        : scan.confidence >= 82
        ? { label: "Med", tone: "text-amber-200" }
        : { label: "Low", tone: "text-white/45" };

    return {
      ...scan,
      sellThrough,
      net,
      trendValue,
      trendLabel,
      trendTone,
      status,
      confidence,
    };
  });

  const highDemandCount = leaderboard.filter(
    (item: any) => item.demandScore >= 72
  ).length;

  const avgSellThrough = Math.round(
    leaderboard.reduce((acc: number, item: any) => acc + item.sellThrough, 0) /
      Math.max(leaderboard.length, 1)
  );

  const avgNet = Number(
    (
      leaderboard.reduce((acc: number, item: any) => acc + item.net, 0) /
      Math.max(leaderboard.length, 1)
    ).toFixed(2)
  );

  const bestCategory = useMemo(() => {
    const grouped = scans.reduce(
      (acc: Record<string, { total: number; count: number }>, scan: any) => {
        acc[scan.subcategory] ??= { total: 0, count: 0 };
        acc[scan.subcategory].total += scan.demandScore;
        acc[scan.subcategory].count += 1;
        return acc;
      },
      {}
    );

    const entries = Object.entries(grouped).map(([name, stats]) => ({
      name,
      avg: Math.round(stats.total / Math.max(stats.count, 1)),
    }));

    return entries.sort((a, b) => b.avg - a.avg)[0] ?? { name: "—", avg: 0 };
  }, [scans]);

  const bestWatchedBrand = useMemo(() => {
    const ranked = [...scans].sort(
      (a: any, b: any) =>
        b.demandScore - a.demandScore || computeProfit(b).net - computeProfit(a).net
    );
    const top = ranked[0];
    return top
      ? { brand: top.brand, delta: Math.max(4, Math.round((top.demandScore - 60) / 2)) }
      : { brand: "—", delta: 0 };
  }, [scans]);

  const mostConsistentBand = useMemo(() => {
    if (!leaderboard.length) return { label: "—", delta: 0 };
    const nets = leaderboard.map((item: any) => item.net);
    const avg = nets.reduce((acc: number, value: number) => acc + value, 0) / nets.length;

    if (avg >= 25) return { label: "£25+", delta: 7 };
    if (avg >= 20) return { label: "£20 – £25", delta: 5 };
    if (avg >= 15) return { label: "£15 – £20", delta: 4 };
    return { label: "Under £15", delta: 2 };
  }, [leaderboard]);

  const slowMovers = leaderboard
    .filter((item: any) => item.status.label === "Slow" || item.sellThrough < 35)
    .slice(0, 3);

  const watchedBrandPerformance = [...leaderboard]
    .sort((a: any, b: any) => b.trendValue - a.trendValue)
    .slice(0, 3)
    .map((item: any) => ({ label: item.brand, delta: item.trendValue }));

  const topNetItem = [...leaderboard].sort((a: any, b: any) => b.net - a.net)[0];

  return (
    <div className="space-y-5">
      <div className={cn(shellPanel, "p-5 lg:p-6")}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="text-2xl font-semibold tracking-tight text-white">
              Demand intelligence
            </div>
            <div className="mt-1 text-sm text-white/45">
              Understand what moves, why, and what is worth chasing.
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="h-10 rounded-[1rem] border border-white/10 bg-black/25 px-3 text-sm text-white/70 focus:border-white/20 focus:outline-none"
            >
              <option value="24h" className="bg-[#09060f]">
                Last 24 Hours
              </option>
              <option value="7d" className="bg-[#09060f]">
                Last 7 Days
              </option>
              <option value="30d" className="bg-[#09060f]">
                Last 30 Days
              </option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-[1rem] border border-white/10 bg-black/25 px-3 text-sm text-white/70 focus:border-white/20 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-[#09060f]">
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 rounded-[1rem] border border-white/10 bg-black/25 px-3 text-sm text-white/70 focus:border-white/20 focus:outline-none"
            >
              {["Demand", "Sell-through", "Avg Net", "Confidence"].map((option) => (
                <option key={option} value={option} className="bg-[#09060f]">
                  Sort: {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="High-demand items"
          value={String(highDemandCount)}
          icon={Flame}
          accent="text-fuchsia-200"
          delay={0}
        />
        <StatCard
          label="Average sell-through"
          value={`${avgSellThrough}%`}
          icon={LineChart}
          accent="text-sky-200"
          delay={0.04}
        />
        <StatCard
          label="Average net profit"
          value={`£${avgNet.toFixed(2)}`}
          icon={TrendingUp}
          accent="text-emerald-200"
          delay={0.08}
        />
        <StatCard
          label="Best performing category"
          value={bestCategory.name}
          icon={Gem}
          accent="text-violet-200"
          delay={0.12}
        />
      </div>

      <div className={cn(shellPanel, "overflow-hidden p-0")}>
        <div className="border-b border-white/10 px-5 py-4 lg:px-6">
          <div className="text-base font-semibold text-white">Demand leaderboard</div>
          <div className="mt-0.5 text-xs text-white/40">
            Ranked by movement strength, sell-through, and realistic take-home value.
          </div>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-[minmax(0,2.1fr)_0.7fr_0.8fr_0.7fr_0.7fr_0.7fr_0.7fr] gap-3 border-b border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-white/30 lg:px-6">
            <div>Title & thumbnail</div>
            <div>Demand</div>
            <div>Sell-through</div>
            <div>Avg Net</div>
            <div>Confidence</div>
            <div>Trend</div>
            <div>Status</div>
          </div>

          <div className="divide-y divide-white/10">
            {leaderboard.map((item: any) => (
              <motion.div
                key={item.id}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                className="grid grid-cols-[minmax(0,2.1fr)_0.7fr_0.8fr_0.7fr_0.7fr_0.7fr_0.7fr] items-center gap-3 px-5 py-3 transition-colors lg:px-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-11 w-11 shrink-0 rounded-[0.9rem] object-cover"
                  />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-white">
                      {item.title}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-white/40">
                      {item.brand} · {item.subcategory}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="inline-flex rounded-full border border-fuchsia-400/25 bg-fuchsia-400/10 px-2.5 py-1 text-xs font-medium text-fuchsia-200">
                    {item.demandScore}
                  </span>
                </div>

                <div className="text-sm font-medium text-white">{item.sellThrough}%</div>
                <div className="text-sm font-medium text-white">£{Math.round(item.net)}</div>
                <div className={cn("text-sm font-medium", item.confidence.tone)}>
                  {item.confidence.label}
                </div>

                <div className={cn("flex items-center gap-1 text-sm font-medium", item.trendTone)}>
                  <TrendingUp
                    className={cn(
                      "h-3.5 w-3.5",
                      item.trendValue < 0 && "rotate-180",
                      item.trendValue === 0 && "rotate-90 text-white/35"
                    )}
                  />
                  <span>{item.trendLabel}</span>
                </div>

                <div>
                  <Badge className={cn("border text-[10px]", item.status.tone)}>
                    {item.status.label}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {leaderboard.map((item: any) => (
            <div key={item.id} className={cn(subtlePanel, "p-4")}>
              <div className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-14 w-14 shrink-0 rounded-[0.9rem] object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-white">{item.title}</div>
                  <div className="mt-0.5 text-xs text-white/40">
                    {item.brand} · {item.subcategory}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge className="border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-200 text-[10px]">
                      Demand {item.demandScore}
                    </Badge>
                    <Badge className={cn("border text-[10px]", item.status.tone)}>
                      {item.status.label}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className={cn(subtlePanel, "p-3")}>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                    Sell-through
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {item.sellThrough}%
                  </div>
                </div>

                <div className={cn(subtlePanel, "p-3")}>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                    Avg Net
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    £{Math.round(item.net)}
                  </div>
                </div>

                <div className={cn(subtlePanel, "p-3")}>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                    Confidence
                  </div>
                  <div className={cn("mt-1 text-sm font-semibold", item.confidence.tone)}>
                    {item.confidence.label}
                  </div>
                </div>

                <div className={cn(subtlePanel, "p-3")}>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                    Trend
                  </div>
                  <div className={cn("mt-1 flex items-center gap-1 text-sm font-semibold", item.trendTone)}>
                    <TrendingUp
                      className={cn(
                        "h-3.5 w-3.5",
                        item.trendValue < 0 && "rotate-180",
                        item.trendValue === 0 && "rotate-90 text-white/35"
                      )}
                    />
                    {item.trendLabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className={cn(shellPanel, "p-5")}>
          <div className="text-sm font-medium text-white">Best category this week</div>
          <div className="mt-2 text-xl font-semibold text-white">{bestCategory.name}</div>
          <div className="mt-1 text-xs text-emerald-300">
            ↑ {Math.max(5, Math.round((bestCategory.avg - 65) / 2))}% this week
          </div>
        </div>

        <div className={cn(shellPanel, "p-5")}>
          <div className="text-sm font-medium text-white">Best watched brand</div>
          <div className="mt-2 text-xl font-semibold text-white">
            {bestWatchedBrand.brand}
          </div>
          <div className="mt-1 text-xs text-emerald-300">
            ↑ {bestWatchedBrand.delta}% this week
          </div>
        </div>

        <div className={cn(shellPanel, "p-5")}>
          <div className="text-sm font-medium text-white">Most consistent profit band</div>
          <div className="mt-2 text-xl font-semibold text-white">
            {mostConsistentBand.label}
          </div>
          <div className="mt-1 text-xs text-emerald-300">
            ↑ {mostConsistentBand.delta}% stability
          </div>
        </div>

        <div className={cn(shellPanel, "p-5")}>
          <div className="text-sm font-medium text-white">Top single opportunity</div>
          <div className="mt-2 text-xl font-semibold text-white">
            {topNetItem?.brand ?? "—"}
          </div>
          <div className="mt-1 text-xs text-white/45">
            {topNetItem
              ? `${topNetItem.title} · Net £${Math.round(topNetItem.net)}`
              : "No signal yet"}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[0.9fr_0.9fr_1.1fr_1.1fr]">
        <div className={cn(shellPanel, "p-5")}>
          <div className="mb-3 text-sm font-medium text-white">Opportunities</div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between text-white/70">
              <span>Best category</span>
              <span className="text-white">{bestCategory.name}</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span>Best watched brand</span>
              <span className="text-white">{bestWatchedBrand.brand}</span>
            </div>
            <div className="flex items-center justify-between text-white/70">
              <span>Best profit band</span>
              <span className="text-white">{mostConsistentBand.label}</span>
            </div>
          </div>
        </div>

        <div className={cn(shellPanel, "p-5")}>
          <div className="mb-3 text-sm font-medium text-white">Warnings</div>
          <div className="space-y-2 text-sm text-white/70">
            {slowMovers.length ? (
              slowMovers.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between gap-3">
                  <span className="truncate">{item.title}</span>
                  <span className="shrink-0 text-rose-300">{item.status.label}</span>
                </div>
              ))
            ) : (
              <div className="text-white/40">No slow movers flagged</div>
            )}
          </div>
        </div>

        <div className={cn(shellPanel, "p-5")}>
          <div className="mb-3 text-sm font-medium text-white">
            Watched brands performance
          </div>
          <div className="space-y-2.5">
            {watchedBrandPerformance.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-white/70">{item.label}</span>
                <span
                  className={cn(
                    "font-medium",
                    item.delta >= 0 ? "text-emerald-300" : "text-rose-300"
                  )}
                >
                  {item.delta >= 0 ? `+${item.delta}%` : `${item.delta}%`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={cn(shellPanel, "p-5")}>
          <div className="mb-3 text-sm font-medium text-white">Why this page matters</div>
          <p className="text-sm leading-6 text-white/55">
            Demand should help users decide faster, not stare at vague bars. This view
            ranks what is moving, shows realistic sell-through, and makes weak
            inventory obvious before money gets trapped.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Account ──────────────────────────────────────────────────────────────────
function AccountView({ scans, setCurrentView }: any) {
  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState("Daniel Rea");
  const [nameInput, setNameInput] = useState("Daniel Rea");
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);

  const totalNet = scans.reduce((acc: number, s: any) => acc + computeProfit(s).net, 0);
  const avgDemand = Math.round(scans.reduce((acc: number, s: any) => acc + s.demandScore, 0) / scans.length);

  const saveDisplayName = () => {
    if (nameInput.trim()) setDisplayName(nameInput.trim());
    setEditingName(false);
  };

  return (
    <div className="space-y-5">
      {/* Profile card */}
      <div className={cn(shellPanel, "p-7")}>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-fuchsia-500/30 to-violet-500/20 text-2xl font-bold text-white">
              {displayName.split(" ").map((n) => n[0]).join("").toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#07040b] bg-emerald-400">
              <Check className="h-3 w-3 text-slate-950" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="h-9 rounded-[0.9rem] border-white/10 bg-white/5 text-white w-48"
                    onKeyDown={(e) => e.key === "Enter" && saveDisplayName()}
                    autoFocus
                  />
                  <Button onClick={saveDisplayName} className={cn(btnPrimary, "h-9 text-xs")}>Save</Button>
                  <button onClick={() => setEditingName(false)} className="text-white/40 transition hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold text-white">{displayName}</h2>
                  <button onClick={() => { setNameInput(displayName); setEditingName(true); }} className="text-white/30 transition hover:text-white/70">
                    <PenLine className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
            </div>
            <div className="mt-1 text-sm text-white/45">danielrea050@gmail.com</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge className="border-white/10 bg-white/5 text-white/60">Free plan</Badge>
              <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200">Active</Badge>
              <Badge variant="outline" className="border-white/10 text-white/50">Member since Apr 2026</Badge>
            </div>
          </div>

          <Button onClick={() => setCurrentView("subscription")} className={cn(btnPrimary, "h-10 shrink-0 text-sm")}>
            <Zap className="mr-1.5 h-3.5 w-3.5" />Upgrade
          </Button>
        </div>
      </div>

      {/* Usage stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total scans" value={String(scans.length)} icon={Camera} accent="text-sky-200" delay={0} />
        <StatCard label="Scan vault items" value={String(scans.length)} icon={History} accent="text-fuchsia-200" delay={0.04} />
        <StatCard label="Est. net profit" value={pound(totalNet)} icon={TrendingUp} accent="text-emerald-200" delay={0.08} />
        <StatCard label="Avg demand score" value={`${avgDemand}%`} icon={Flame} accent="text-amber-200" delay={0.12} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Scan activity */}
        <div className={cn(shellPanel, "p-6")}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-white">Recent scan activity</div>
              <div className="mt-0.5 text-xs text-white/40">Your most recent scanned items</div>
            </div>
            <Button variant="outline" onClick={() => setCurrentView("history")} className={cn(btnSecondary, "h-9 text-xs")}>
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {scans.map((scan: any) => {
              const profit = computeProfit(scan);
              return (
                <div key={scan.id} className={cn(subtlePanel, "flex items-center gap-3 p-3")}>
                  <img src={scan.image} alt={scan.title} className="h-12 w-12 shrink-0 rounded-[0.9rem] object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{scan.title}</div>
                    <div className="mt-0.5 text-xs text-white/40">{scan.createdAt}</div>
                  </div>
                  <div className="text-sm font-semibold text-emerald-300 shrink-0">+{pound(profit.net)}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className={cn(shellPanel, "p-6")}>
          <div className="mb-5">
            <div className="text-base font-semibold text-white">Settings</div>
            <div className="mt-0.5 text-xs text-white/40">Notifications, preferences, and account options</div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Board match notifications", desc: "Alert when watched brands appear on the board", value: notificationsOn, setter: setNotificationsOn },
              { label: "Weekly email digest", desc: "Summary of your scans and board activity each week", value: emailDigest, setter: setEmailDigest },
            ].map(({ label, desc, value, setter }) => (
              <div key={label} className={cn(subtlePanel, "flex items-center justify-between gap-4 p-4")}>
                <div>
                  <div className="text-sm font-medium text-white">{label}</div>
                  <div className="mt-0.5 text-xs text-white/45">{desc}</div>
                </div>
                <Switch checked={value} onCheckedChange={setter} />
              </div>
            ))}

            <div className="pt-2 space-y-2">
              <button className={cn(subtlePanel, "flex w-full items-center gap-3 p-4 text-sm text-white/60 transition hover:text-white")}>
                <Shield className="h-4 w-4" />
                <span>Privacy settings</span>
                <ChevronRight className="ml-auto h-4 w-4 text-white/25" />
              </button>
              <button className={cn(subtlePanel, "flex w-full items-center gap-3 p-4 text-sm text-white/60 transition hover:text-white")}>
                <Download className="h-4 w-4" />
                <span>Export my data</span>
                <ChevronRight className="ml-auto h-4 w-4 text-white/25" />
              </button>
              <button className={cn(subtlePanel, "flex w-full items-center gap-3 p-4 text-sm text-rose-400/80 transition hover:text-rose-300")}>
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
                <ChevronRight className="ml-auto h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── SubscriptionView ─────────────────────────────────────────────────────────
function SubscriptionView() {
  const [currentPlan] = useState("free");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const plans = [
    {
      id: "free",
      name: "Free",
      monthly: 0,
      annual: 0,
      desc: "Try the core scanner loop",
      features: ["5 scans per day", "Scan vault (up to 10)", "Basic profit calculator", "Board view (read-only)", "Manual fee edits"],
      limits: ["No barcode priority", "No alert notifications", "No demand depth"],
      cta: "Current plan",
      disabled: true,
    },
    {
      id: "hustler",
      name: "Hustler",
      monthly: 9,
      annual: 79,
      desc: "For serious sourcing",
      features: ["Unlimited scans", "Full scan vault", "Barcode priority mode", "Board alerts & notifications", "Deeper demand signals", "Watchlist management"],
      limits: [],
      cta: "Upgrade to Hustler",
      highlight: true,
      badge: "Most popular",
    },
    {
      id: "pro",
      name: "Pro",
      monthly: 19,
      annual: 159,
      desc: "For power users",
      features: ["Everything in Hustler", "Advanced analytics", "Brand heatmaps", "CSV export", "Early marketplace modules", "API access (beta)", "Priority support"],
      limits: [],
      cta: "Upgrade to Pro",
    },
  ];

  return (
    <div className="space-y-5">
      <div className={cn(shellPanel, "p-6")}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Badge className="mb-3 rounded-full border-white/10 bg-white/5 px-3.5 py-1.5 text-white/60 text-xs">Subscription</Badge>
            <h2 className="text-xl font-semibold text-white">Your plan & billing</h2>
            <p className="mt-1 text-sm text-white/45">Currently on <span className="font-medium text-white">Free</span> · upgrade any time, cancel any time</p>
          </div>
          <div className="flex rounded-[1rem] border border-white/10 bg-black/30 p-1 w-fit">
            {(["monthly", "annual"] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                className={cn(
                  "rounded-[0.8rem] px-4 py-2 text-sm font-medium transition-all",
                  billingCycle === cycle ? "bg-white text-slate-950" : "text-white/55 hover:text-white"
                )}
              >
                {cycle === "monthly" ? "Monthly" : "Annual"}
                {cycle === "annual" && <span className="ml-1.5 text-[10px] text-emerald-400">Save 30%</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan: any) => (
          <motion.div
            key={plan.id}
            whileHover={!plan.disabled ? { y: -4, transition: { duration: 0.2 } } : undefined}
            className={cn(
              shellPanel,
              "flex flex-col p-6 transition-[border-color]",
              plan.highlight && "border-emerald-400/25 bg-emerald-400/[0.02]",
              currentPlan === plan.id && "border-white/20"
            )}
          >
            <div className="mb-5">
              <div className="flex items-center justify-between gap-2">
                <div className="text-base font-semibold text-white">{plan.name}</div>
                {plan.badge && (
                  <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.12em] text-emerald-200">{plan.badge}</span>
                )}
                {currentPlan === plan.id && (
                  <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] text-white/50">Current</span>
                )}
              </div>
              <div className="mt-3">
                <span className="text-3xl font-semibold text-white">
                  {plan.id === "free" ? "£0" : `£${billingCycle === "monthly" ? plan.monthly : Math.round(plan.annual / 12)}`}
                </span>
                {plan.id !== "free" && (
                  <span className="ml-1 text-sm text-white/40">/mo{billingCycle === "annual" && " · billed annually"}</span>
                )}
              </div>
              <div className="mt-1 text-xs text-white/40">{plan.desc}</div>
            </div>

            <div className="mb-5 flex-1 space-y-2">
              {plan.features.map((feature: string) => (
                <div key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span className="text-xs text-white/65">{feature}</span>
                </div>
              ))}
              {plan.limits.map((limit: string) => (
                <div key={limit} className="flex items-start gap-2">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/20" />
                  <span className="text-xs text-white/35">{limit}</span>
                </div>
              ))}
            </div>

            <Button
              disabled={plan.disabled}
              className={cn(
                "h-11 w-full text-sm",
                plan.highlight
                  ? btnPrimary
                  : plan.disabled
                  ? "cursor-default rounded-[1rem] border border-white/10 bg-white/5 text-white/40"
                  : btnSecondary
              )}
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.3fr]">
        <div className={cn(shellPanel, "p-6")}>
          <div className="mb-5">
            <div className="text-base font-semibold text-white">Payment method</div>
            <div className="mt-0.5 text-xs text-white/40">Manage your saved payment details</div>
          </div>
          <div className={cn(subtlePanel, "p-5")}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-16 items-center justify-center rounded-[0.9rem] border border-white/10 bg-white/5">
                <CreditCard className="h-5 w-5 text-white/40" />
              </div>
              <div>
                <div className="text-sm font-medium text-white/60">No payment method</div>
                <div className="mt-0.5 text-xs text-white/35">Add one when you upgrade</div>
              </div>
            </div>
          </div>
          <Button variant="outline" className={cn(btnSecondary, "mt-4 h-10 w-full text-sm")}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />Add payment method
          </Button>
        </div>

        <div className={cn(shellPanel, "p-6")}>
          <div className="mb-5">
            <div className="text-base font-semibold text-white">Billing history</div>
            <div className="mt-0.5 text-xs text-white/40">Your past invoices and payments</div>
          </div>
          <div className="space-y-2">
            {[
              { date: "Apr 1, 2026", amount: "£0.00", plan: "Free", status: "Active" },
              { date: "Mar 1, 2026", amount: "£0.00", plan: "Free", status: "Paid" },
              { date: "Feb 1, 2026", amount: "£0.00", plan: "Free", status: "Paid" },
            ].map((row) => (
              <div key={row.date} className={cn(subtlePanel, "flex items-center justify-between gap-3 px-4 py-3")}>
                <div className="flex items-center gap-3">
                  <div className="text-xs text-white/40 w-20">{row.date}</div>
                  <div className="text-sm text-white/65">{row.plan}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white">{row.amount}</span>
                  <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200 text-xs">{row.status}</Badge>
                </div>
              </div>
            ))}
            <div className={cn(subtlePanel, "flex items-center justify-center gap-2 px-4 py-4 text-xs text-white/30")}>
              <Info className="h-3.5 w-3.5" />
              <span>Full billing history available on paid plans</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BusinessView ─────────────────────────────────────────────────────────────
function BusinessView({ scans, setCurrentView, setSelectedScan }: any) {
  const [safeMode, setSafeMode] = useState(false);
  const [materialBoost, setMaterialBoost] = useState(true);
  const [tokenBillingBeta, setTokenBillingBeta] = useState(true);
  const [boardAutoRefresh, setBoardAutoRefresh] = useState(true);

  const topBrands = [
    { name: "AllSaints", saves: 28, conversion: "24%", net: "£31", demand: "High" },
    { name: "Arc'teryx", saves: 24, conversion: "31%", net: "£42", demand: "High" },
    { name: "Stone Island", saves: 19, conversion: "22%", net: "£36", demand: "High" },
    { name: "Patagonia", saves: 18, conversion: "29%", net: "£27", demand: "Steady" },
  ];

  const providerHealth = [
    { name: "Generic marketplace ingest", status: "Healthy", detail: "Board feed refreshed 8m ago", tone: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" },
    { name: "Barcode lookup", status: "Healthy", detail: "Median lookup 1.2s", tone: "border-sky-400/20 bg-sky-400/10 text-sky-200" },
    { name: "Image scan sandbox", status: "Monitoring", detail: "Concept-only mode enabled", tone: "border-amber-400/20 bg-amber-400/10 text-amber-200" },
    { name: "Dedicated Vinted scanner", status: "Planned", detail: "Module isolated from core flow", tone: "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200" },
  ];

  const recentEvents = [
    { title: "WorthScout Opportunity Board refresh completed", meta: "15 candidates cached · 99.2% success rate", badge: "Success", tone: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" },
    { title: "14 new brand alerts created", meta: "Most-added: Arc'teryx, AllSaints, Patagonia", badge: "Growth", tone: "border-sky-400/20 bg-sky-400/10 text-sky-200" },
    { title: "Token billing beta enabled", meta: "Deep scans now tracked behind internal flag", badge: "Beta", tone: "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200" },
    { title: "3 low-confidence scans flagged", meta: "Likely due to weak product imagery / missing tags", badge: "Review", tone: "border-amber-400/20 bg-amber-400/10 text-amber-200" },
  ];

  const queueItems = scans.slice(0, 4);

  return (
    <div className="space-y-5">
      <div className={cn(shellPanel, "p-5 lg:p-6")}>
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="max-w-3xl">
            <Badge className="mb-3 rounded-full border-sky-400/20 bg-sky-400/10 px-4 py-1.5 text-sky-200 text-xs hover:bg-sky-400/10">Control Room</Badge>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">Scanner, board, alerts, revenue.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">Operator view for membership health, board performance, feature flags, and queue review.</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Button onClick={() => setCurrentView("board")} className={cn(btnPrimary, "h-10 text-sm")}>Open board</Button>
              <Button onClick={() => setCurrentView("history")} variant="outline" className={cn(btnSecondary, "h-10 text-sm")}>Review queue</Button>
              <Button onClick={() => setCurrentView("scan")} variant="outline" className={cn(btnSecondary, "h-10 text-sm")}>New scan</Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [Users, "128", "Total users", "text-sky-300"],
              [CreditCard, "£6.9k", "MRR", "text-fuchsia-300"],
              [Package, "42", "Scans today", "text-emerald-300"],
              [Bell, "67", "Live alerts", "text-amber-300"],
            ].map(([Icon, value, label, tone]: any, idx: number) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-white/10", tone)}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-white">{value}</div>
                    <div className="text-xs uppercase tracking-[0.15em] text-white/40">{label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <div className={cn(shellPanel, "p-5 lg:p-6")}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-white">Revenue & memberships</div>
              <div className="mt-0.5 text-xs text-white/40">Commercial signal, not vanity metrics</div>
            </div>
            <Badge className="border-emerald-400/20 bg-emerald-400/10 text-emerald-200 text-xs">Paid conv. 42.2%</Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {[["£6.9k", "MRR"], ["£182", "Token rev. today"], ["13.4", "Avg scans/user"], ["31%", "Best brand conv."]].map(([value, label]) => (
              <div key={label} className={cn(subtlePanel, "p-4")}>
                <div className="text-xl font-semibold text-white">{value}</div>
                <div className="mt-1 text-xs text-white/45">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Free", "74 active", "Starter scans, board access, watchlist basics"],
              ["Hustler", "39 active", "Barcode priority, alerts, deeper demand tools"],
              ["Pro", "15 active", "Advanced analytics and future marketplace modules"],
            ].map(([name, count, desc]) => (
              <div key={name} className={cn(subtlePanel, "p-4")}>
                <div className="text-xs text-white/40">{name}</div>
                <div className="mt-1 text-xl font-semibold text-white">{count}</div>
                <div className="mt-2 text-xs leading-5 text-white/45">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={cn(shellPanel, "p-5 lg:p-6")}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-white">Platform health</div>
              <div className="mt-0.5 text-xs text-white/40">Board refreshes, provider status, queue stability</div>
            </div>
            <Badge className="border-sky-400/20 bg-sky-400/10 text-sky-200 text-xs">99.2% success</Badge>
          </div>
          <div className="space-y-2.5">
            {providerHealth.map((item) => (
              <div key={item.name} className={cn(subtlePanel, "flex items-start justify-between gap-4 p-4")}>
                <div>
                  <div className="text-sm font-medium text-white">{item.name}</div>
                  <div className="mt-0.5 text-xs text-white/40">{item.detail}</div>
                </div>
                <Badge className={cn("border shrink-0 text-xs", item.tone)}>{item.status}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className={cn(subtlePanel, "p-4")}>
              <div className="mb-2 flex items-center gap-2 text-xs text-white/55">
                <RefreshCw className="h-3.5 w-3.5 text-emerald-300" />Board job runtime
              </div>
              <div className="text-2xl font-semibold text-white">18s</div>
              <div className="mt-1 text-xs text-white/40">Median across last 10 refreshes</div>
            </div>
            <div className={cn(subtlePanel, "p-4")}>
              <div className="mb-2 flex items-center gap-2 text-xs text-white/55">
                <Database className="h-3.5 w-3.5 text-sky-300" />Queue failures
              </div>
              <div className="text-2xl font-semibold text-white">2</div>
              <div className="mt-1 text-xs text-white/40">Both tied to low-confidence image scans</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.98fr_1.02fr]">
        <div className={cn(shellPanel, "p-5 lg:p-6")}>
          <div className="mb-4">
            <div className="text-base font-semibold text-white">Feature flags & controls</div>
            <div className="mt-0.5 text-xs text-white/40">Levers for pricing logic, monetisation, and board behaviour</div>
          </div>
          <div className="space-y-2.5">
            {[
              [safeMode, setSafeMode, "Safe mode net estimates", "Bias toward caution when confidence is weak."],
              [materialBoost, setMaterialBoost, "Material-based ambitious boost", "Reward premium fabrics when detected clearly."],
              [tokenBillingBeta, setTokenBillingBeta, "Token billing beta", "Track deep scans behind internal monetisation logic."],
              [boardAutoRefresh, setBoardAutoRefresh, "Board auto refresh", "Allow the hourly board cycle to repopulate automatically."],
            ].map(([value, setter, title, desc]: any) => (
              <div key={title} className={cn(subtlePanel, "flex items-center justify-between gap-4 p-4")}>
                <div>
                  <div className="text-sm font-medium text-white">{title}</div>
                  <div className="mt-0.5 text-xs text-white/40">{desc}</div>
                </div>
                <Switch checked={value} onCheckedChange={setter} />
              </div>
            ))}
          </div>
        </div>

        <div className={cn(shellPanel, "p-5 lg:p-6")}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-white">Recent activity</div>
              <div className="mt-0.5 text-xs text-white/40">Latest changes across jobs, users, and monetisation</div>
            </div>
            <Badge className="border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200 text-xs">Live feed</Badge>
          </div>
          <div className="space-y-2.5">
            {recentEvents.map((event) => (
              <div key={event.title} className={cn(subtlePanel, "flex items-start justify-between gap-4 p-4")}>
                <div>
                  <div className="text-sm font-medium text-white">{event.title}</div>
                  <div className="mt-0.5 text-xs text-white/40">{event.meta}</div>
                </div>
                <Badge className={cn("border shrink-0 text-xs", event.tone)}>{event.badge}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className={cn(shellPanel, "p-5 lg:p-6")}>
          <div className="mb-4">
            <div className="text-base font-semibold text-white">Top brands by operator value</div>
            <div className="mt-0.5 text-xs text-white/40">Which brands deserve the most board space and alert attention</div>
          </div>
          <div className="space-y-2.5">
            {topBrands.map((brand) => (
              <div key={brand.name} className={cn(subtlePanel, "p-4")}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-medium text-white">{brand.name}</div>
                  <Badge variant="outline" className="border-white/10 text-white/55 text-xs">Net avg {brand.net}</Badge>
                </div>
                <div className="grid gap-3 grid-cols-3">
                  <div>
                    <div className="text-xs text-white/40">Watch saves</div>
                    <div className="mt-1 text-lg font-semibold text-white">{brand.saves}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40">Open → scan</div>
                    <div className="mt-1 text-lg font-semibold text-white">{brand.conversion}</div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40">Demand</div>
                    <div className="mt-1 text-lg font-semibold text-white">{brand.demand}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cn(shellPanel, "p-5 lg:p-6")}>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-white">Review queue</div>
              <div className="mt-0.5 text-xs text-white/40">Jump from operator review into live user-facing analysis</div>
            </div>
            <Button variant="outline" className={cn(btnSecondary, "h-9 text-xs")}>
              <Download className="mr-1.5 h-3.5 w-3.5" />Export CSV
            </Button>
          </div>
          <div className="space-y-2.5">
            {queueItems.map((scan: any) => {
              const profit = computeProfit(scan);
              const demand = demandMeta(scan.demandScore);
              return (
                <div key={scan.id} className={cn(subtlePanel, "grid gap-3 p-4 md:grid-cols-[1.2fr_auto_auto_auto] md:items-center")}>
                  <div>
                    <div className="text-sm font-medium text-white">{scan.title}</div>
                    <div className="mt-0.5 text-xs text-white/40">{scan.createdAt} · {scan.brand}</div>
                  </div>
                  <Badge className={cn("border text-xs", demand.tone)}>{demand.label}</Badge>
                  <div className="text-sm font-medium text-white">Net {pound(profit.net)}</div>
                  <Button
                    variant="outline"
                    className={cn(btnSecondary, "h-9 text-xs")}
                    onClick={() => { setSelectedScan(scan); setCurrentView("history"); }}
                  >
                    Inspect
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function WorthScoutApp() {
  const [mode, setMode] = useState<"public" | "app">("public");
  const [currentView, setCurrentView] = useState("dashboard");
  const [scans, setScans] = useState<any[]>(starterScans);
  const [selectedScan, setSelectedScan] = useState<any>(starterScans[0]);
  const [loading, setLoading] = useState(false);
  const [scanMode, setScanMode] = useState("barcode");
  const [barcodeValue, setBarcodeValue] = useState("5012345678900");
  const [manualHint, setManualHint] = useState(starterScans[0].title);
  const [uploadPreview, setUploadPreview] = useState<string | null>(starterScans[0].image);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signin");

  // Uses top-level navItems constant

  const deleteScan = (id: string) => {
    const next = scans.filter((scan) => scan.id !== id);
    setScans(next);
    if (selectedScan?.id === id) setSelectedScan(next[0] || null);
  };

  const updateSetting = (id: string, field: string, value: number) => {
    setScans((prev) => prev.map((scan) => (scan.id === id ? { ...scan, [field]: value } : scan)));
    setSelectedScan((prev: any) => (prev?.id === id ? { ...prev, [field]: value } : prev));
  };

  const onGenerate = () => {
    setLoading(true);
    setSelectedScan(null);
    setCurrentView("history");
    setTimeout(() => {
      const result =
        scanMode === "barcode"
          ? detectBarcodeResult(barcodeValue)
          : detectImageResult(uploadPreview, manualHint);
      const newScan = {
        ...result,
        id: `scan_${Date.now()}`,
        createdAt: "Just now",
        scanType: scanMode,
        matchedBarcode: scanMode === "barcode" ? barcodeValue : result.matchedBarcode,
      };
      const next = [newScan, ...scans];
      setScans(next);
      setSelectedScan(newScan);
      setLoading(false);
    }, 1600);
  };

  const handleAuthSuccess = () => {
    setAuthOpen(false);
    setMode("app");
  };

  if (mode === "public") {
    return (
      <>
        <PublicHome
          onEnterApp={() => setMode("app")}
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setAuthOpen(true);
          }}
        />
        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onSignIn={handleAuthSuccess}
          defaultMode={authMode}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#07040b] font-sans text-white antialiased">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.09),transparent_24%),radial-gradient(circle_at_top_right,rgba(251,146,60,0.06),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent_26%)]" />

      <div className="relative flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-72 xl:w-80 shrink-0 border-r border-white/10 bg-black/30 backdrop-blur-2xl flex-col">
          <div className="flex flex-col p-5 h-full">
            <div className="mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/20 via-rose-500/10 to-orange-400/10 p-4 shadow-[0_0_80px_rgba(217,70,239,0.08)]">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[1.3rem] bg-white/10 text-fuchsia-100 backdrop-blur-xl">
                  <Tag className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-lg font-semibold tracking-tight text-white">WorthScout</div>
                  <div className="text-xs text-white/50">AI resale intelligence</div>
                </div>
              </div>
              <p className="text-xs leading-5 text-white/60">Scan labels, barcodes, silhouettes. Price faster. Kill bad buys before checkout.</p>
            </div>

            <nav className="flex-1 overflow-y-auto">
              {navGroups.map((group, groupIndex) => (
                <div key={group.title} className={cn(groupIndex > 0 && "mt-4 border-t border-white/[0.08] pt-4")}>
                  <div className="mb-2 px-4 text-[10px] uppercase tracking-[0.18em] text-white/25">{group.title}</div>
                  <div className="space-y-1">
                    {group.ids.map((id) => {
                      const item = navItems.find((entry) => entry.id === id)!;
                      const Icon = item.icon;
                      const active = currentView === item.id;
                      return (
                        <motion.button
                          key={item.id}
                          onClick={() => setCurrentView(item.id)}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-[1.25rem] px-4 py-3 text-left text-sm transition-all duration-200",
                            active
                              ? "bg-white text-slate-950 shadow-[0_8px_30px_rgba(255,255,255,0.10)]"
                              : "text-white/60 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="font-medium">{item.label}</span>
                          {item.id === "board" && (
                            <span className="ml-auto rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">Live</span>
                          )}
                          {item.id === "watchlist" && (
                            <span className="ml-auto rounded-full bg-fuchsia-400/15 px-2 py-0.5 text-[10px] text-fuchsia-300">3</span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            <div className="mt-4 pb-4">
              <Button
                onClick={() => setCurrentView("scan")}
                className={cn(btnPrimary, "w-full h-11 text-sm mb-3")}
              >
                <Camera className="mr-2 h-4 w-4" />New scan
              </Button>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-fuchsia-500/30 to-violet-500/30 text-white text-sm font-medium">DR</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">Daniel Rea</div>
                    <div className="truncate text-xs text-white/40">Free plan · 3 scans today</div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setCurrentView("account")}
                      className="h-8 w-8 rounded-xl text-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <Settings className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setMode("public")}
                      className="h-8 w-8 rounded-xl text-white/40 hover:bg-white/10 hover:text-white"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="min-w-0 flex-1 flex flex-col">
          {/* Top bar */}
          <div className="sticky top-0 z-30 border-b border-white/10 bg-[#07040b]/80 px-4 py-3.5 backdrop-blur-2xl md:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="lg:hidden rounded-[1rem] border-white/10 bg-white/5 text-white hover:bg-white/10 h-9 w-9">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="border-white/10 bg-[#09060f] text-white w-[280px] p-0">
                    <div className="flex flex-col h-full p-5">
                      <SheetHeader className="mb-5">
                        <SheetTitle className="flex items-center gap-3 text-white">
                          <div className="flex h-9 w-9 items-center justify-center rounded-[1rem] bg-white/10 text-fuchsia-200">
                            <Tag className="h-4 w-4" />
                          </div>
                          WorthScout
                        </SheetTitle>
                      </SheetHeader>
                      <nav className="flex-1 overflow-y-auto">
                        {navGroups.map((group, groupIndex) => (
                          <div key={group.title} className={cn(groupIndex > 0 && "mt-4 border-t border-white/[0.08] pt-4")}>
                            <div className="mb-2 px-4 text-[10px] uppercase tracking-[0.18em] text-white/25">{group.title}</div>
                            <div className="space-y-1">
                              {group.ids.map((id) => {
                                const item = navItems.find((entry) => entry.id === id)!;
                                const Icon = item.icon;
                                const active = currentView === item.id;
                                return (
                                  <SheetTrigger key={item.id} asChild>
                                    <button
                                      onClick={() => setCurrentView(item.id)}
                                      className={cn(
                                        "flex w-full items-center gap-3 rounded-[1.25rem] px-4 py-3 text-left text-sm transition",
                                        active ? "bg-white text-slate-950" : "text-white/65 hover:bg-white/5 hover:text-white"
                                      )}
                                    >
                                      <Icon className="h-4 w-4" />
                                      {item.label}
                                      {item.id === "board" && (
                                        <span className="ml-auto rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] text-emerald-300">Live</span>
                                      )}
                                      {item.id === "watchlist" && (
                                        <span className="ml-auto rounded-full bg-fuchsia-400/15 px-2 py-0.5 text-[10px] text-fuchsia-300">3</span>
                                      )}
                                    </button>
                                  </SheetTrigger>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </nav>
                      <SheetTrigger asChild>
                        <Button onClick={() => setCurrentView("scan")} className={cn(btnPrimary, "mt-4 w-full h-11 text-sm")}>
                          <Camera className="mr-2 h-4 w-4" />New scan
                        </Button>
                      </SheetTrigger>
                    </div>
                  </SheetContent>
                </Sheet>

                <div>
                  <div className="text-sm font-semibold tracking-tight text-white">
                    {navItems.find((n) => n.id === currentView)?.label ?? "WorthScout"}
                  </div>
                  <div className="text-xs text-white/40">WorthScout · AI resale scanner</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className={cn(btnSecondary, "hidden sm:flex h-9 text-xs")}
                  onClick={() => setMode("public")}
                >
                  Homepage
                </Button>
                <Button
                  variant="outline"
                  className={cn(btnSecondary, "hidden sm:flex h-9 text-xs")}
                  onClick={() => setCurrentView("scan")}
                >
                  <Camera className="mr-1.5 h-3.5 w-3.5" />Scan
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(btnSecondary, "h-9 w-9")}
                  onClick={() => setCurrentView("watchlist")}
                >
                  <Bell className="h-4 w-4" />
                </Button>
                <button
                  onClick={() => setCurrentView("account")}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/15 transition-colors"
                >
                  <User className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* View content */}
          <div className="flex-1 p-4 md:p-6 lg:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", damping: 30, stiffness: 280 }}
              >
                {currentView === "dashboard" && (
                  <OverviewView scans={scans} setCurrentView={setCurrentView} setSelectedScan={setSelectedScan} />
                )}
                {currentView === "board" && (
                  <OpportunityBoardView setCurrentView={setCurrentView} setSelectedScan={setSelectedScan} />
                )}
                {currentView === "scan" && (
                  <ScannerView
                    onGenerate={onGenerate}
                    loading={loading}
                    uploadPreview={uploadPreview}
                    setUploadPreview={setUploadPreview}
                    manualHint={manualHint}
                    setManualHint={setManualHint}
                    scanMode={scanMode}
                    setScanMode={setScanMode}
                    barcodeValue={barcodeValue}
                    setBarcodeValue={setBarcodeValue}
                  />
                )}
                {currentView === "history" && (
                  <div className="space-y-4">
                    {loading && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(shellPanel, "p-5")}
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-[1rem] bg-fuchsia-400/10">
                            <RefreshCw className="h-5 w-5 animate-spin text-fuchsia-200" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">Simulating {scanMode} scan analysis…</div>
                            <div className="mt-0.5 text-xs text-white/50">Running product matching, marketplace comp search, demand scoring, and editable-profit logic.</div>
                          </div>
                        </div>
                        <div className="mt-5 space-y-2">
                          {[80, 65, 50].map((w) => (
                            <div key={w} className="h-3 rounded-full bg-white/5 animate-pulse" style={{ width: `${w}%` }} />
                          ))}
                        </div>
                      </motion.div>
                    )}
                    <HistoryView
                      scans={scans}
                      selectedScan={selectedScan}
                      setSelectedScan={setSelectedScan}
                      deleteScan={deleteScan}
                      setCurrentView={setCurrentView}
                      onUpdateSetting={updateSetting}
                    />
                  </div>
                )}
                {currentView === "analytics" && <DemandView scans={scans} />}
                {currentView === "watchlist" && <WatchlistView setCurrentView={setCurrentView} />}
                {currentView === "account" && (
                  <ViewErrorBoundary viewName="Account">
                    <AccountView scans={scans} setCurrentView={setCurrentView} />
                  </ViewErrorBoundary>
                )}
                {currentView === "subscription" && (
                  <ViewErrorBoundary viewName="Subscription">
                    <SubscriptionView />
                  </ViewErrorBoundary>
                )}
                {currentView === "admin" && (
                  <BusinessView scans={scans} setCurrentView={setCurrentView} setSelectedScan={setSelectedScan} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

    </div>
  );
}

