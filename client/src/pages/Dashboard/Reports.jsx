import { useContext, useMemo } from "react";
import { CasesContext } from "../../context/CasesContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";

const Reports = () => {
  const { cases = [] } = useContext(CasesContext);
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  // --- Theme Styles ---
  const bgMain = isDark
    ? "bg-[#1E1E1E] text-[#FAFAFA]"
    : "bg-[#ECF0FF] text-[#312F2C]";
  const bgCard = isDark
    ? "bg-[#2D2D2D] border-[#3D3D3D]"
    : "bg-white border-gray-100";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";
  const chartLabelColor = isDark ? "#FAFAFA" : "#312F2C";

  // --- 1. DATA CALCULATION ---
  const stats = useMemo(() => {
    const total = cases.length;
    const closedCases = cases.filter(
      (c) => c.status === "closed" || c.status === "resolved",
    ).length;
    const openCases = total - closedCases;
    const highPrio = cases.filter(
      (c) => c.priority === "high" || c.priority === "urgent",
    ).length;

    return {
      total,
      closedCases,
      openCases,
      highPrio,
      closedPercentage:
        total > 0 ? ((closedCases / total) * 100).toFixed(1) : 0,
      highPrioPercentage: total > 0 ? ((highPrio / total) * 100).toFixed(1) : 0,
      statusData: [
        { name: "Open", value: openCases },
        { name: "Closed/Resolved", value: closedCases },
      ],
      priorityData: [
        { name: "High", count: highPrio },
        {
          name: "Medium",
          count: cases.filter((c) => c.priority === "medium").length,
        },
        {
          name: "Low",
          count: cases.filter((c) => c.priority === "low").length,
        },
      ],
    };
  }, [cases]);

  const COLORS = isDark
    ? ["#60a5fa", "#34d399", "#fbbf24", "#f87171"] // Brighter for dark mode
    : ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]; // Standard for light mode

  return (
    <div
      className={`p-4 md:p-6 min-h-screen transition-colors duration-300 ${bgMain}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className={`text-sm ${textMuted}`}>
          Track performance and case trends
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Cases",
            value: stats.total,
            color: isDark ? "text-white" : "text-gray-900",
          },
          {
            label: "Closed %",
            value: `${stats.closedPercentage}%`,
            color: "text-green-500",
          },
          {
            label: "High Priority",
            value: stats.highPrio,
            color: "text-red-400",
          },
          {
            label: "Urgency Rate",
            value: `${stats.highPrioPercentage}%`,
            color: "text-amber-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`${bgCard} p-5 rounded-2xl shadow-sm border transition-all hover:scale-[1.02]`}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart: Status */}
        <div className={`${bgCard} p-6 rounded-2xl shadow-sm border`}>
          <h3 className="font-bold mb-4">Case Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.statusData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none">
                  {stats.statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#2D2D2D" : "#FFF",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                  itemStyle={{ color: chartLabelColor }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Priority */}
        <div className={`${bgCard} p-6 rounded-2xl shadow-sm border`}>
          <h3 className="font-bold mb-4">Priority Volume</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.priorityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={isDark ? "#3D3D3D" : "#F3F4F6"}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: chartLabelColor,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{
                    fill: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.02)",
                  }}
                  contentStyle={{
                    backgroundColor: isDark ? "#2D2D2D" : "#FFF",
                    borderRadius: "12px",
                    border: "none",
                  }}
                  itemStyle={{ color: chartLabelColor }}
                />
                <Bar
                  dataKey="count"
                  fill={isDark ? "#60a5fa" : "#3b82f6"}
                  radius={[8, 8, 0, 0]}
                  barSize={45}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
