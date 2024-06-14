import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "@/components/tableItemType/data-table";
import { columns } from "@/components/tableItemType/columns";
import { userInformations } from "@/components/data/userInformations";
import { useLazyQuery } from "@apollo/client";
import { GET_LIST_ITEMTYPE } from "@/services/graphql/queries";
import { LoaderCircle } from "lucide-react";
import { ItemType } from "@/components/data/schema";
import { ReloadContext } from "@/contexts/reloadContext";

const ManageItemTypePage = () => {
  const [getListItemType, { loading, error }] = useLazyQuery(GET_LIST_ITEMTYPE);
  const [itemTypeList, setItemTypeList] = useState<ItemType[]>();
  const [isLoading, setIsLoading] = useState(false);
  const reloadCt = useContext(ReloadContext);
  const { reloadState } = reloadCt || {};

  async function handleGetItemTypeList() {
    const variables = {
      filters: {
        pageSize: 100,
        page: 1
      }
    };
    try {
      const result = await getListItemType({
        variables,
        fetchPolicy: "network-only"
      });
      const resultData = result.data?.getItemTypeWithFilter?.data;
      setItemTypeList(
        resultData.listData.map((itemType: any) => ({
          id: itemType.id,
          name: itemType.name,
          updatedDate: itemType.updatedDate
        }))
      );
    } catch (error) {
      console.error("manage item type page:", error);
    }
  }

  useEffect(() => {
    handleGetItemTypeList();
  }, [isLoading, reloadState]);

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-start">
        <h1 className="py-4 font-bold text-2xl">Danh sách loại bài đăng</h1>
      </div>
      {loading && (
        <div className="w-full flex justify-center items-center animate-spin">
          <LoaderCircle />
        </div>
      )}
      {!loading && itemTypeList && (
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={itemTypeList} columns={columns} />
        </div>
      )}
      {!loading && !itemTypeList && <></>}
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

export default ManageItemTypePage;
