/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton } from "@/components/ui/skeleton";
import ReportItemCard from "@/components/Report/Card/ReportItemCard";
import React from "react";
import EmptyImage from "@/assets/empty.png";

const EmptyReportsList = () => {
  return (
    <div className="w-full h-max flex flex-col justify-center items-center gap-4">
      <img src={EmptyImage} alt="empty" className="lg:w-[30%] w-[50%] h-auto" />

      <p className="text-center font-bold">Không có báo cáo nào cả</p>
    </div>
  );
};

const ReportsList = ({ isLoading, reports }: ReportListProps) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {reports.length > 0 &&
        !isLoading &&
        reports.map((item, index) => (
          <ReportItemCard key={index} report={item} />
        ))}

      {reports.length === 0 && !isLoading && <EmptyReportsList />}

      {isLoading && (
        <div className="w-full flex flex-col justify-center items-center space-y-3">
          <div className="w-full flex flex-col justify-center items-center space-y-3">
            <Skeleton className="h-[100px] lg:w-[80%] w-full rounded-xl bg-slate-200" />
            <div className="space-y-2 lg:w-[80%] w-full">
              <Skeleton className="h-8 w-[80%] rounded-xl bg-slate-200" />
              <Skeleton className="h-4 w-[70%] rounded-xl bg-slate-200" />
              <Skeleton className="h-6 w-[90%] rounded-xl bg-slate-200" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center space-y-3">
            <Skeleton className="h-[100px] lg:w-[80%] w-full rounded-xl bg-slate-200" />
            <div className="space-y-2 lg:w-[80%] w-full">
              <Skeleton className="h-8 w-[80%] rounded-xl bg-slate-200" />
              <Skeleton className="h-4 w-[70%] rounded-xl bg-slate-200" />
              <Skeleton className="h-6 w-[90%] rounded-xl bg-slate-200" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center space-y-3">
            <Skeleton className="h-[100px] lg:w-[80%] w-full rounded-xl bg-slate-200" />
            <div className="space-y-2 lg:w-[80%] w-full">
              <Skeleton className="h-8 w-[80%] rounded-xl bg-slate-200" />
              <Skeleton className="h-4 w-[70%] rounded-xl bg-slate-200" />
              <Skeleton className="h-6 w-[90%] rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsList;
