import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PricingPage = () => {
  return (
    <div className="w-full max-w-3xl mx-auto py-16 flex justify-around ">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>月額プラン</CardTitle>
          <CardDescription>Month</CardDescription>
        </CardHeader>
        <CardContent>
          <p>2,500円 / 月</p>
        </CardContent>
        <CardFooter>
          <Button>サブスクリプション契約する</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>年額プラン</CardTitle>
          <CardDescription>Year</CardDescription>
        </CardHeader>
        <CardContent>
          <p>20,000円 / 年</p>
        </CardContent>
        <CardFooter>
          <Button>サブスクリプション契約する</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PricingPage;
