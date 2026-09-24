export type AppViewMode = 'buyer' | 'seller' | 'courier' | 'admin';

export type CurrencyMode = 'USD' | 'CDF' | 'BOTH';

export type MobileMoneyOperator = 'vodacom_mpesa' | 'orange_money' | 'airtel_money' | 'afrimoney' | 'card';

export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'preparing'
  | 'in_delivery'
  | 'delivered'
  | 'completed'
  | 'disputed'
  | 'cancelled';

export interface TrustScoreBreakdown {
  identityScore: number;     // Vérification RCCM, Id.Nat, Boutique physique
  deliveryScore: number;     // Taux de réussite des livraisons sans incident
  reviewsScore: number;      // Notes moyennes des acheteurs vérifiés
  disputeScore: number;      // Absence de litiges résolus contre le vendeur
  seniorityScore: number;    // Ancienneté et régularité sur C'ECO
}

export interface Seller {
  id: string;
  businessName: string;
  rccmNumber: string;
  idNatNumber: string;
  physicalAddress: string;
  city: 'Kinshasa' | 'Lubumbashi' | 'Goma' | 'Kolwezi';
  isVerified: boolean;
  trustScore: number;        // 0 à 100
  scoreBreakdown: TrustScoreBreakdown;
  phone: string;
  logoUrl: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  items: { product: any; quantity: number; selectedColor?: string; selectedStorage?: string }[];
  subtotalUSD: number;
  deliveryFeeUSD: number;
  totalUSD: number;
  paymentMethod: MobileMoneyOperator;
  paymentPhoneNumber: string;
  orderStatus: OrderStatus;
  deliveryOtp: string;       // Code secret OTP à 6 chiffres pour déblocage des fonds
  shippingAddress: {
    fullName: string;
    phone: string;
    city: string;
    commune: string;
    quartier: string;
    avenue: string;
    numero: string;
    repere: string;          // Point de repère congolais indispensable
  };
}
