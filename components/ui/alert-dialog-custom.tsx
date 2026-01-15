import { FiCheckCircle } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { AlertColor, getColorClasses } from "./alert-colors";

interface AlertDialogCustomProps {
  handleClosePremiumAlert: () => void;
  alertTitle: string;
  alertDescription: string;
  color?: AlertColor;
}

export default function AlertDialogCustom({ 
  handleClosePremiumAlert,
  alertTitle,
  alertDescription,
  color = "green"
}: AlertDialogCustomProps) {
  const colors = getColorClasses(color);

  return (
    <Alert 
      className={`${colors.bg} ${colors.border} ${colors.text} cursor-pointer ${colors.hover} transition-colors`}
      onClick={handleClosePremiumAlert}
    >
      <FiCheckCircle className="w-4 h-4" />
      <AlertTitle className={`${colors.title} font-semibold`}>
        {alertTitle}
      </AlertTitle>
      <AlertDescription className={colors.description}>
        {alertDescription}
      </AlertDescription>
    </Alert>
  );
}
