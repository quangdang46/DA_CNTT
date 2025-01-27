import Feature from "@/shared/components/ui/Feature";
import {
  HandCoins,
  MessageCircleQuestion,
  Repeat2,
  Tag,
  Truck,
} from "lucide-react";
import React from "react";

export default function FeaturesList() {
  return (
    <div className="features-list">
      <div className="features">
        <Feature
          icon={<Truck strokeWidth={1} size={48} />}
          title="Free Delivery"
          subtitle="from $50"
        />
        <Feature
          icon={<MessageCircleQuestion strokeWidth={1} size={48} />}
          title="99% Customer"
          subtitle="Feedbacks"
        />
        <Feature
          icon={<Repeat2 strokeWidth={1} size={48} />}
          title="365 Days"
          subtitle="for free return"
        />
        <Feature
          icon={<HandCoins strokeWidth={1} size={48} />}
          title="Payment"
          subtitle="Secure System"
        />
        <Feature
          icon={<Tag strokeWidth={1} size={48} />}
          title="Only Best"
          subtitle="Brands"
        />
      </div>
    </div>
  );
}
