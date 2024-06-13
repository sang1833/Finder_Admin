import React from "react";
import { Skeleton } from "./ui/skeleton";

const LoadingCard = () => {
  return (
    <div className="w-full">
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
    </div>
  );
};

export default LoadingCard;
