import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ChildrenWrapper({
  title,
  description,
  LeftComponent,
  children,
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            <div>{LeftComponent && <LeftComponent />}</div>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
