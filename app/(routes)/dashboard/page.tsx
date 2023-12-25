import { Suspense } from "react";
import dashboard from "./dashboard.module.css";
import Test from "@/app/_components/test/Test";
const Dashboard = async () => {
  return (
    <div>
      <div className={dashboard.comments}></div>
      <div className={dashboard.posts}></div>
      <Suspense fallback={<div>Fallback</div>}>
        <Test />
      </Suspense>
    </div>
  );
};

export default Dashboard;
