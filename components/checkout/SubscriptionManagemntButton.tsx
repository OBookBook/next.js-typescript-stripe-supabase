"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SubscriptionManagemntButton = () => {
  const router = useRouter();

  const loadPortal = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/portal`);

    if (!response.ok) {
      console.error("Error fetching portal URL:", response.statusText);
      return;
    }

    const data = await response.json();

    router.push(data.url);
  };
  return (
    <div>
      <Button onClick={loadPortal}>サブスクリプション管理</Button>
    </div>
  );
};

export default SubscriptionManagemntButton;
