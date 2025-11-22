import { Button } from "./ui/button";

type Plan = {
  name: string;
  price: string;
  features: string[];
  priceID: string;
};

type PriceCardProps = {
  plan: Plan;
  onSelect: (priceID: string) => void;
};

const PriceCard = ({ plan, onSelect }: PriceCardProps) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md border border-border flex flex-col justify-between">
      <div>
        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
          {plan.name}
        </h3>

        <p className="text-xl md:text-2xl font-extrabold text-foreground mb-4">
          {plan.price}
        </p>

        <ul className="mb-4 space-y-1">
          {plan.features.map((f, i) => (
            <li key={i} className="text-muted-foreground text-sm md:text-md">
              {f}
            </li>
          ))}
        </ul>
      </div>

      <Button onClick={() => onSelect(plan?.priceID)} className="w-full mt-4">
        Get Started
      </Button>
    </div>
  );
};

export default PriceCard;
