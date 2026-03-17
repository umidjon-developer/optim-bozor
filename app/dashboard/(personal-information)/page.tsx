import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingBag, TrendingUp, Wallet } from "lucide-react";
import EditInformation from "../_components/edit-information";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { getStatistics } from "@/actions/user.action";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const res = await getStatistics();
  const statistics = res?.data?.statistics;

  const statsCards = [
    {
      title: "Total Orders",
      value: statistics?.totalOrders || 0,
      icon: ShoppingBag,
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-500/10 to-violet-500/10",
    },
    {
      title: "Favorites",
      value: statistics?.totalFavourites || 0,
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      bgGradient: "from-pink-500/10 to-rose-500/10",
    },
    {
      title: "Total Spent",
      value: "$0",
      icon: Wallet,
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-500/10 to-teal-500/10",
    },
    {
      title: "Growth",
      value: "+12%",
      icon: TrendingUp,
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Personal Information
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <Separator />

      {/* Profile Card */}
      <EditInformation
        user={JSON.parse(JSON.stringify(session?.user))}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Background gradient on hover */}
              <div className={"absolute inset-0 bg-gradient-to-br " + stat.bgGradient + " opacity-0 group-hover:opacity-100 transition-opacity duration-300"} />
                    
              <div className="relative flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className={"w-10 h-10 rounded-xl bg-gradient-to-br " + stat.gradient + " flex items-center justify-center shadow-lg"}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                      
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </h3>
                      
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
