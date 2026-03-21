import { Heart, ShoppingBag, TrendingUp, Wallet, User } from "lucide-react";
import EditInformation from "../_components/edit-information";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getStatistics } from "@/actions/user.action";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const res = await getStatistics();
  const statistics = res?.data?.statistics;

  const statsCards = [
    { title: "Jami buyurtmalar", value: statistics?.totalOrders || 0, icon: ShoppingBag, color: "#6366f1", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.18)" },
    { title: "Sevimlilar", value: statistics?.totalFavourites || 0, icon: Heart, color: "#ec4899", bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.18)" },
    { title: "Umumiy xarajat", value: "0 UZS", icon: Wallet, color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.18)" },
    { title: "O'sish", value: "+12%", icon: TrendingUp, color: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.18)" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))", border: "1px solid rgba(99,102,241,0.2)" }}>
          <User className="w-5 h-5" style={{ color: "#6366f1" }} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">Shaxsiy ma'lumotlar</h1>
          <p className="text-sm text-muted-foreground">Hisob sozlamalarini boshqaring</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statsCards.map(({ title, value, icon: Icon, color, bg, border }) => (
          <div key={title} className="rounded-2xl bg-card border border-border p-4 shadow-premium">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg, border: `1px solid ${border}` }}>
                <Icon className="w-4.5 h-4.5" style={{ color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
          </div>
        ))}
      </div>

      {/* Edit form */}
      <EditInformation user={JSON.parse(JSON.stringify(session?.user))} />
    </div>
  );
};

export default Page;
