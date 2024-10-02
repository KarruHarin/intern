import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const chartConfig = {
  stress_level: {
    label: "Stress level",
    color: "#3788E5",
  },
  pulse: {
    label: "Pulse",
    color: "#EC594D",
  },
  temperature: {
    label: "Temperature",
    color: "#F79500",
  },
  calories_burned: {
    label: "Calories burned",
    color: "#3B0058",
  },
};

type ChartField = keyof typeof chartConfig;

export function HealthMonitoring({ data }: any) {
  const [selected, setSelected] = useState<{
    field: ChartField;
    color: string;
  }>({
    field: "stress_level",
    color: chartConfig.stress_level.color,
  });

  const [timeframe, setTimeframe] = useState("monthly");

  const handleTabChange = (value: string) => {
    const field = value as ChartField;
    setSelected({
      field,
      color: chartConfig[field].color,
    });
  };

  // Filter data based on timeframe
  const filteredData = () => {
    if (timeframe === "monthly") {
      return data?.monthly_monitoring.slice(-4); // last 4 months
    } else if (timeframe === "weekly") {
      return data.weekly_monitoring; // weekly data for current month
    } else if (timeframe === "daily") {
      return data.daily_monitoring; // daily data for current week
    }
  };

  return (
    <Card className="col-span-6">
      <CardHeader className="md:p-4 p-2">
        <div className="flex justify-between">
          <CardTitle>Health Monitoring</CardTitle>
          <Selection setTimeframe={setTimeframe} />
        </div>
        <Tabs defaultValue="stress_level" onValueChange={handleTabChange}>
          <div className="flex items-center md:px-4 md:py-2">
            <TabsList className="m-auto h-12 w-full justify-between">
              {Object.keys(chartConfig).map((key) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={`md:text-base text-[12px] p-2 w-1/4 data-[state=active]:bg-white data-[state=active]:text-primary`}
                >
                  {chartConfig[key as ChartField].label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </CardHeader>
      <CardContent className="md:p-4 p-2">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={filteredData()} 
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={timeframe === "monthly" ? "month" : timeframe === "weekly" ? "week" : "day"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                timeframe === "monthly" ? value.slice(0, 3) : value
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey={selected.field}
              type="linear"
              fill={selected.color}
              fillOpacity={0.4}
              stroke={selected.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function Selection({ setTimeframe }: { setTimeframe: (value: string) => void }) {
  return (
    <Select onValueChange={(value) => setTimeframe(value)}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder="Monthly" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
