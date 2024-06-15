/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from "@/lib/utils";
import ReportCard from "@/components/Report/Card/ReportCard";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_REPORT_BY_ID } from "@/services/graphql/queries";
import LargeSpinner from "@/components/LargeSpinner";
import { ArrowBigLeftDash } from "lucide-react";

const ReportDetails = () => {
  const navigate = useNavigate();
  const { reportId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [report, setReport] = useState<ReportDetail | null>(null);
  const [getReportDetails] = useLazyQuery(GET_REPORT_BY_ID);

  const handleGetReportDetails = async () => {
    setIsLoading(true);
    await getReportDetails({
      variables: {
        id: Number(reportId),
      },
      fetchPolicy: "network-only",
    })
      .then((result) => {
        const resultData = result.data.getPostReportById.data;
        const rData: ReportDetail = {
          id: resultData.id,
          reportContent: resultData.reportContent,
          handled: resultData.handled,
          postId: resultData.postId,
          senderId: resultData.senderId,
          createdDate: resultData.createdDate,
          updatedDate: resultData.updatedDate,
        };

        setReport(rData);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (reportId) {
      handleGetReportDetails();
    }
  }, [reportId, isReset]);

  function handleBackToList() {
    navigate("/dashboard/report");
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-start items-start">
        <button
          className="bg-transparent p-3 flex justify-center items-center"
          onClick={handleBackToList}
        >
          <ArrowBigLeftDash className="w-10 h-10 " />
          <p className="font-bold">Quay lại</p>
        </button>
      </div>

      {isLoading === true || !report ? (
        <div className="w-full flex justify-center items-center">
          <LargeSpinner />
        </div>
      ) : (
        <ReportCard report={report} isReset={isReset} setIsReset={setIsReset} />
      )}
    </div>
  );
};

export default ReportDetails;
