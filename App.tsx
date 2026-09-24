import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BuyerApp } from './components/buyer/BuyerApp';
import { SellerDashboard } from './components/seller/SellerDashboard';
import { CourierDashboard } from './components/courier/CourierDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Wifi, Battery, Signal } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeRole } = useApp();
  const [isMobileFrame, setIsMobileFrame] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Barre de navigation universelle et sélecteur de rôles */}
      <Header
        isMobileFrame={isMobileFrame}
        onToggleMobileFrame={() => setIsMobileFrame(!isMobileFrame)}
      />

      {/* Zone centrale d'affichage */}
      <main className="flex-1 flex justify-center items-start p-0 sm:p-4 overflow-y-auto">
        {isMobileFrame && activeRole !== 'admin' ? (
          /* Cadre Simulateur Mobile Android */
          <div className="w-full max-w-[430px] my-0 sm:my-3 bg-slate-950 rounded-none sm:rounded-[44px] p-0 sm:p-3 shadow-2xl border-0 sm:border-[5px] sm:border-slate-800 relative transition-all">
            {/* Encoche & barre d'état du smartphone */}
            <div className="hidden sm:flex justify-between items-center px-6 py-2 text-white text-[11px] font-semibold">
              <span>09:41</span>
              <div className="w-16 h-3.5 bg-slate-900 rounded-full mx-auto" />
              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Écran applicatif */}
            <div className="bg-slate-50 rounded-none sm:rounded-[36px] overflow-hidden min-h-screen sm:min-h-[780px] sm:max-h-[840px] flex flex-col relative overflow-y-auto scrollbar-none">
              {activeRole === 'buyer' && <BuyerApp />}
              {activeRole === 'seller' && <SellerDashboard />}
              {activeRole === 'courier' && <CourierDashboard />}
            </div>

            <div className="hidden sm:flex justify-center py-2">
              <div className="w-32 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        ) : (
          /* Vue Web Responsive Plein Écran */
          <div className="w-full max-w-6xl bg-white sm:rounded-3xl shadow-xl overflow-hidden min-h-[calc-100vh-80px)] my-0 sm:my-2">
            {activeRole === 'buyer' && <BuyerApp />}
            {activeRole === 'seller' && <SellerDashboard />}
            {activeRole === 'courier' && <CourierDashboard />}
            {activeRole === 'admin' && <AdminDashboard />}
          </div>
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
