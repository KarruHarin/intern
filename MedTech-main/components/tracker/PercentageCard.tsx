"use client";

import * as React from "react";
import { useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PercentageCardProps {
  progress: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  color: string;
  title: string;
}

export function PercentageCard({ progress, color, title }: PercentageCardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
 if(!progress) {
  return (<></>)
 }
  const chartData = [
    { browser: "completed", visitors: progress[selectedPeriod]||0, fill: color },
    { browser: "remaining", visitors: 100 - progress[selectedPeriod]||0, fill: "#E0E0E0" },
  ];

  const chartConfig = {
    completed: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex md:col-span-2 col-span-6 flex-col">
      <CardHeader className=" flex-row justify-between items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <Selection selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={65}
              strokeWidth={3}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {progress[selectedPeriod].toLocaleString()}%
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface SelectionProps {
  selectedPeriod: "daily" | "weekly" | "monthly";
  setSelectedPeriod: React.Dispatch<React.SetStateAction<"daily" | "weekly" | "monthly">>;
}

function Selection({ selectedPeriod, setSelectedPeriod }: SelectionProps) {
  return (
    <Select
      onValueChange={(value) => setSelectedPeriod(value as "daily" | "weekly" | "monthly")}
      value={selectedPeriod}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Period</SelectLabel>
          <SelectItem value="daily">Daily</SelectItem>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
