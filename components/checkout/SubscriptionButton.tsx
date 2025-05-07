"use client";

import { Button } from "@/components/ui/button";

const SubscriptionButton = ({ planId }: { planId: string }) => {
  const processSubscription = async () => {
    const response = await fetch(
      `http://localhost:3000/api/subscription/${planId}`
    );
  };

  return (
    <Button onClick={async () => processSubscription()}>
      サブスクリプション契約する
    </Button>
  );
};

export default SubscriptionButton;
