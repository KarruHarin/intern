"use client";

import { AlignEndHorizontal, FolderUp, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "../ui/button";


const chartConfig = {
  last: {
    label: "This month",
    color: "#009DFF",
  },
  current: {
    label: "Last month",
    color: "#07E098",
  },
} satisfies ChartConfig;

export function OverViewReport({data}:any) {
  return (
    <Card className=" col-span-2">
      <CardHeader className="flex-row items-center">
        <CardTitle>Overview Report</CardTitle>
        <Button variant="outline" className="ml-auto flex gap-2">
          <FolderUp size={18} />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="this_month"
              type="natural"
              fill="var(--color-current)"
              fillOpacity={0.2}
              stroke="var(--color-current)"
              stackId="a"
            />
            <Area
              dataKey="prev_month"
              type="natural"
              fill="var(--color-last)"
              fillOpacity={0.2}
              stroke="var(--color-last)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="  flex text-[#07E098] items-center gap-1">
            <AlignEndHorizontal size={15} /> This month
          </div>
          <div className="flex  text-[#009DFF] items-center gap-1">
            <AlignEndHorizontal size={15} />
            Last month
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
