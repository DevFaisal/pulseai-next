import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TopCard({
  title,
  header,
  description,
  icon,
  color = "#ffffff",
}) {
  return (
    <Card
      className="flex flex-col justify-between rounded-none"
      style={{ backgroundColor: color }}
    >
      <CardHeader className="flex flex-row items-between justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div>
          <h1 className="text-2xl font-bold">{header}</h1>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
