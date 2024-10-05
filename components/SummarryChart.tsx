import { Icon } from "./ui/icon";
import { SegmentControl } from "./ui/segmentcontrol";
import { TiposDeTransacciones } from "@/Types/types";
import { LOCAL_DB_TRANSACCIONES_NAME } from "@/lib/configs/config";
import { useSQLiteContext } from "expo-sqlite/next";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react-native";
import * as React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BarChart, barDataItem } from "react-native-gifted-charts";

enum Period {
  week = "week",
  month = "month",
  year = "year",
}

export default function SummaryChart() {
  const db = useSQLiteContext();
  const [chartPeriod, setChartPeriod] = React.useState<Period>(Period.week);
  const [barData, setBarData] = React.useState<barDataItem[]>([]);
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());
  const [currentEndDate, setCurrentEndDate] = React.useState<Date>(new Date());
  const [chartKey, setChartKey] = React.useState(0);
  const [transactionType, setTransactionType] = React.useState<TiposDeTransacciones>("Gasto");

  React.useEffect(() => {
    const fetchData = async () => {
      if (chartPeriod === Period.week) {
        const { truestar, startDate, endDate } = getWeekRange(currentDate);

        setCurrentEndDate(() => new Date(truestar));
        const data = await fetchWeeklyData(startDate, endDate, transactionType);
        setBarData(processWeeklyData(data, transactionType));
        setChartKey((prev) => prev + 1);
      }
      //   } else if (chartPeriod === Period.month) {
      //     const { startDate, endDate } = getMonthRange(currentDate);
      //     setCurrentEndDate(() => new Date(startDate));
      //     const data = await fetchWeeklyData(startDate, endDate, transactionType);
      //     setBarData(processWeeklyData(data, transactionType));
      //     setChartKey((prev) => prev + 1);
      //   }
    };
    fetchData();
  }, [chartPeriod, currentDate, transactionType]);

  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const endOfWeek = new Date(date.setDate(startOfWeek.getDate() + 6));

    return {
      truestar: Math.floor(startOfWeek.getTime()),
      startDate: Math.floor(startOfWeek.getTime() / 1000),
      endDate: Math.floor(endOfWeek.getTime() / 1000),
    };
  };

  //   const getMonthRange = (date: Date) => {
  //     const startOfMonth = new Date(date.setDate(1));
  //     const endOfMonth = new Date(startOfMonth.setMonth(startOfMonth.getMonth() + 1));
  //     return {
  //       startDate: Math.floor(startOfMonth.getTime()),
  //       endDate: Math.floor(endOfMonth.getTime()),
  //     };
  //   };

  const handlePreviousWeek = () => {
    setCurrentDate(() => new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(() => new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  // Fetch transactions for a specific week
  const fetchWeeklyData = async (
    startDate: number,
    endDate: number,
    type: TiposDeTransacciones,
  ) => {
    try {
      const query = `
      SELECT
        strftime('%w', date / 1000, 'unixepoch') AS day_of_week, -- convert date to day of week
        SUM(balance) as total -- sum balance by day of week
        FROM ${LOCAL_DB_TRANSACCIONES_NAME}
        WHERE date >= ? AND date <= ? AND type = ?
        GROUP BY day_of_week
        ORDER BY day_of_week ASC
        
    `;

      const result = await db.getAllAsync<{
        day_of_week: number;
        total: number;
      }>(query, [startDate, endDate, type]);
      console.log(" result ", result, "props " + [startDate, endDate, type]);

      // Convert day_of_week (0-6) to match days array index (1-7)
      const formattedResult = result.map((item) => {
        const number = Number(item.day_of_week);
        return {
          dayOfWeek: (number + 1) % 7, // Adjust index to match days array
          total: item.total,
        };
      });

      console.log(
        " startOfWeek " +
          new Date(startDate).toLocaleDateString() +
          " endOfWeek " +
          new Date(endDate).toLocaleDateString(),
      );
      return formattedResult;
    } catch (e) {
      console.error("Error fetching weekly data:", e);
      return [];
    }
  };

  return (
    <View>
      {/* <SegmentedControl
        values={["Week", "Month", "Year"]}
        style={{ marginBottom: 16 }}
        selectedIndex={currentTab}
        onChange={(event) => {
          const index = event.nativeEvent.selectedSegmentIndex;
          if (index === 0) {
            setChartPeriod(Period.week);
          } else if (index === 1) {
            setChartPeriod(Period.month);
          } else {
            setChartPeriod(Period.year);
          }
        }}
      /> */}
      <Text style={{ fontWeight: "700", fontSize: 18, marginBottom: 8 }}>
        {currentEndDate.toLocaleDateString("en-US", { month: "short" })} {currentEndDate.getDate()}{" "}
        - {currentDate.toLocaleDateString("en-US", { month: "short" })} {currentDate.getDate()}
      </Text>
      <Text style={{ color: "gray" }}>
        Total {transactionType === "Gasto" ? "Gasto" : "Ingreso"}{" "}
      </Text>

      <Text style={{ fontWeight: "700", fontSize: 32, marginBottom: 16 }}>
        ${barData.reduce((total, item) => total + item.value, 0).toFixed(2)}
      </Text>
      <BarChart
        key={chartKey}
        data={barData}
        barWidth={18}
        height={200}
        width={290}
        minHeight={3}
        barBorderRadius={3}
        showGradient
        // frontColor={transactionType === "Expense" ? "#dc2626" : "#4f46e5"}
        // gradientColor={transactionType === "Expense" ? "#ea580c" : "#7c3aed"}
        spacing={20}
        noOfSections={4}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelsVerticalShift={2}
        xAxisLabelTextStyle={{ color: "gray" }}
        yAxisTextStyle={{ color: "gray" }}
        isAnimated
        animationDuration={300}
        // rulesColor={"#00000020"}
        // backgroundColor={"white"}
        // showGradient
        // gradientColor={"blue"}
        // barInnerComponent={() => (
        //   <View style={{ backgroundColor: "pink", height: "100%" }} />
        // )}
        // showLine
        // dashGap={0}
        // dashWidth={0}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: 16,
        }}>
        <TouchableOpacity onPress={handlePreviousWeek} style={{ alignItems: "center" }}>
          <Icon as={ChevronLeftCircle} size="sm" color="gray" />
          <Text style={{ fontSize: 11, color: "gray" }}>Prev week</Text>
        </TouchableOpacity>
        <SegmentControl
          values={["Gasto", "Ingreso", "Transferencia", "Préstamo"]}
          clasName="w-[200px]"
          selectedIndex={transactionType === "Gasto" ? 0 : 1}
          onChange={(event) => {
            const index = event;
            if (index === 0) {
              setTransactionType("Gasto");
            } else if (index === 1) {
              setTransactionType("Ingreso");
            } else if (index === 2) {
              setTransactionType("Transferencia");
            } else if (index === 3) {
              setTransactionType("Préstamo");
            }
          }}
        />
        <TouchableOpacity onPress={handleNextWeek} style={{ alignItems: "center" }}>
          <Icon as={ChevronRightCircle} size="sm" color="gray" />
          <Text style={{ fontSize: 11, color: "gray" }}>Next week</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const processWeeklyData = (
  data: { dayOfWeek: number; total: number }[],
  transactionsType: TiposDeTransacciones,
) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const frontColor =
    transactionsType === "Ingreso"
      ? "#d3ff00"
      : transactionsType === "Transferencia"
        ? "#00c8ff"
        : transactionsType === "Préstamo"
          ? "#f700ff"
          : "#ffaa00"; // default income/expense colors
  const gradientColor =
    transactionsType === "Ingreso"
      ? "#12ff00"
      : transactionsType === "Transferencia"
        ? "#001aff"
        : transactionsType === "Préstamo"
          ? "#5d00ff"
          : "#ff0037"; // default income/expense colorsgradients

  let barData = days.map(
    (label) =>
      ({
        label,
        value: 0,
        frontColor: "#d1d5db", // default gray color for zero values
        gradientColor: "#d1d5db", // default gray color for zero values
      }) as any,
  );

  data.forEach((item) => {
    // Assuming item.dayOfWeek is in the range 0-6 (matching SQLite %w output)
    const dayIndex = item.dayOfWeek;

    if (dayIndex >= 0 && dayIndex < 7) {
      barData[dayIndex].value = item.total;
      if (item.total < 100) {
        barData[dayIndex].frontColor = "#d1d5db"; // gray for zero values
        barData[dayIndex].gradientColor = "#d1d5db"; // gray for zero values
      } else {
        barData[dayIndex].frontColor = frontColor; // default income/expense colors
        barData[dayIndex].gradientColor = gradientColor; // default income/expense gradients
      }
    } else {
      console.error(`Invalid day of week index: ${item.dayOfWeek}`);
    }
  });

  return barData;
};
