import Chart from "@/components/dashboard/Chart";
import Information from "@/components/dashboard/Information";
import LatestActivities from "@/components/dashboard/LatestActivities";

export default function DashboardPage() {
   return (
      <div className="flex flex-col gap-4">
         <Information />
         <LatestActivities />
         <Chart />
      </div>
   )
}