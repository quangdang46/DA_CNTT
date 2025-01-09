import Car from "@/shared/components/icons/Car";
import CompareIcon from "@/shared/components/icons/CompareIcon";
import PaymentIcon from "@/shared/components/icons/PaymentIcon";
import RocketChatIcon from "@/shared/components/icons/RocketChatIcon";
import Feature from "@/shared/components/ui/Feature";
import React from "react";

export default function FeaturesList() {
  return (
    <div className="features-list">
      <div className="features">
        <Feature icon={<Car></Car>} title="Free Delivery" subtitle="from $50" />
        <Feature
          icon={<RocketChatIcon></RocketChatIcon>}
          title="99% Customer"
          subtitle="Feedbacks"
        />
        <Feature
          icon={<CompareIcon></CompareIcon>}
          title="365 Days"
          subtitle="for free return"
        />
        <Feature
          icon={<PaymentIcon></PaymentIcon>}
          title="Payment"
          subtitle="Secure System"
        />
        <Feature
          icon={<PaymentIcon></PaymentIcon>}
          title="Only Best"
          subtitle="Brands"
        />
      </div>
    </div>
  );
}
