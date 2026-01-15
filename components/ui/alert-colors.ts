export type AlertColor = "green" | "blue" | "red" | "yellow" | "purple" | "orange";

export interface AlertColorClasses {
  bg: string;
  border: string;
  text: string;
  title: string;
  description: string;
  hover: string;
}

export const getColorClasses = (color: AlertColor = "green"): AlertColorClasses => {
  const colorMap: Record<AlertColor, AlertColorClasses> = {
    green: {
      bg: "bg-green-500/20",
      border: "border-green-500/30",
      text: "text-green-200",
      title: "text-green-100",
      description: "text-green-200/90",
      hover: "hover:bg-green-500/30",
    },
    blue: {
      bg: "bg-blue-500/20",
      border: "border-blue-500/30",
      text: "text-blue-200",
      title: "text-blue-100",
      description: "text-blue-200/90",
      hover: "hover:bg-blue-500/30",
    },
    red: {
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      text: "text-red-200",
      title: "text-red-100",
      description: "text-red-200/90",
      hover: "hover:bg-red-500/30",
    },
    yellow: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/30",
      text: "text-yellow-200",
      title: "text-yellow-100",
      description: "text-yellow-200/90",
      hover: "hover:bg-yellow-500/30",
    },
    purple: {
      bg: "bg-purple-500/20",
      border: "border-purple-500/30",
      text: "text-purple-200",
      title: "text-purple-100",
      description: "text-purple-200/90",
      hover: "hover:bg-purple-500/30",
    },
    orange: {
      bg: "bg-orange-500/20",
      border: "border-orange-500/30",
      text: "text-orange-200",
      title: "text-orange-100",
      description: "text-orange-200/90",
      hover: "hover:bg-orange-500/30",
    },
  };

  return colorMap[color];
};
