import ScrollToTop from "@/components/shared/scroll-to-top";
import Header from "./_components/header";
import MarketplaceSidebar from "./_components/marketplace-sidebar";

async function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar - Fixed Left */}
      <MarketplaceSidebar />
      
      {/* Main Content Area */}      <div className="lg:pl-60 flex flex-col min-h-screen">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
        
        {/* Scroll to Top */}
        <ScrollToTop />
      </div>
    </div>
  );
}

export default layout;
