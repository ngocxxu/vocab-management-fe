import { useToast } from "@/components/ui/use-toast";
import ChartTable from "../../components/charts";
import { ToastAction } from "@/components/ui/toast";
import Button from "@/components/button";

const Dashboard = () => {
  const { toast } = useToast();
  const showToastMessage = () =>
    toast({
      title: "Success",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });

  return (
    <>
      <div className="container mx-auto">
        <Button onClick={showToastMessage}>Notify!</Button>
        <div className="shadow-md">
          <ChartTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
