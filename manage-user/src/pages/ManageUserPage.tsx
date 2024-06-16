import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "@/components/table/columns";
import { userInformations } from "@/components/data/userInformations";
import { useLazyQuery } from "@apollo/client";
import { GET_LIST_USER } from "@/services/graphql/queries";
import { LoaderCircle } from "lucide-react";
import { UserInfo } from "@/components/data/schema";
import { ReloadContext } from "@/contexts/reloadContext";

const ManageUserPage = () => {
  const [getListUser, { loading, error }] = useLazyQuery(GET_LIST_USER);
  const [userList, setUserList] = useState<UserInfo[]>();
  const [isLoading, setIsLoading] = useState(false);
  const reloadCt = useContext(ReloadContext);
  const { reloadState } = reloadCt || {};

  async function handleGetUserList() {
    const variables = {
      filters: {
        pageSize: 10,
        page: 1
      }
    };
    try {
      const result = await getListUser({
        variables,
        fetchPolicy: "network-only"
      });
      const resultData = result.data?.getListUser?.data;
      setUserList(
        resultData.listData.map((user: any) => ({
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          lastLogin: user.lastLogin,
          avatar: user.avatar,
          activate: user.activate
        }))
      );
    } catch (error) {
      console.error("manage user page:", error);
    }
  }

  useEffect(() => {
    handleGetUserList();
  }, [isLoading, reloadState]);

  useEffect(() => {
    console.log("🚀 ~ userList:", userList);
  }, [userList]);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-start">
        <h1 className="py-4 font-bold text-2xl">Danh sách thành viên</h1>
      </div>
      {loading && (
        <div className="w-full flex justify-center items-center animate-spin">
          <LoaderCircle />
        </div>
      )}
      {!loading && userList && (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={userList} columns={columns} />
        </div>
      )}
      {!loading && !userList && <></>}
      {error && (
        <div className="w-full flex justify-center items-center">
          <h3>Có lỗi xảy ra: </h3>
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
      {/* <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable data={userInformations} columns={columns} />
      </div> */}
    </div>
  );
};

export default ManageUserPage;
