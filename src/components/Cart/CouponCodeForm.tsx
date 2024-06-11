import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function CouponCodeForm() {
  return (
    <div className="flex items-center w-full space-x-3 m-1">
      <Input placeholder="Coupon code" className="w-52" />
      <Button>Apply Coupon</Button>
    </div>
  );
}
