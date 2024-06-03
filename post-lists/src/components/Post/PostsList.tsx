/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import PostItemCard from "@/components/Post/Card/PostItemCard";
import { GET_POST_WITH_FILTER } from "@/services/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import ImageCard from "../ImageCard";
import Spinner from "../Spinner";
import ReactPagination from "../ReactPagination";
import EmptyImage from "@/assets/empty.png";
import LoadingCard from "../LoadingCard";
import { set } from "date-fns";

enum EnumApprove {
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  NOT_YET = "NOT_YET"
}

const EmptyPostsList = () => {
  return (
    <div className="w-full h-max flex flex-col justify-center items-center gap-4 col-span-full">
      <img src={EmptyImage} alt="empty" className="lg:w-[30%] w-[50%] h-auto" />

      <p className="text-center font-bold">Không có tin nào được đăng</p>
    </div>
  );
};

function PostsList(
  props: {
    approvedState: EnumApprove;
    searchString?: string;
    type?: string;
    category?: string;
    city?: string;
  } = {
    approvedState: EnumApprove.NOT_YET,
    searchString: "",
    type: "",
    category: "",
    city: ""
  }
) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [getAllPosts, { loading, error }] = useLazyQuery(GET_POST_WITH_FILTER);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value));
    setPage(1);
  };

  const handleGetAllPosts = async (
    p: number,
    pSize: number,
    approvedState: EnumApprove,
    searchKey: string | undefined,
    postType: string | undefined,
    location: string | undefined
  ) => {
    setIsLoading(true);

    const variables = {
      filters: {
        page: p,
        pageSize: pSize,
        approved: approvedState,
        postType: postType || undefined,
        location: location || undefined,
        searchKey: searchKey || undefined
      }
    };

    if (postType) {
      variables.filters.postType = postType;
    }

    if (location) {
      variables.filters.location = location;
    }

    if (searchKey) {
      variables.filters.searchKey = searchKey;
    }

    await getAllPosts({
      variables
    })
      .then((result) => {
        const resultData = result?.data?.adminGetPostWithFilter.data;
        console.log("resultData:", resultData);

        const pList: Post[] = resultData?.listData.map((post: any) => {
          return {
            id: post.id,
            title: post.title,
            postType: post.postType,
            location: post.location,
            locationDetail: post.locationDetail,
            description: post.description,
            approved: post.approved,
            viewCount: post.viewCount,
            totalComments: post.totalComments,
            fileName: post.fileName,
            filePath: post.filePath,
            createDate: new Date(post.createDate),
            updatedDate: new Date(post.updatedDate)
          };
        });

        setPosts(pList);
        setTotalPosts(resultData?.totalCount);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  useEffect(() => {
    setPage(1);
  }, [
    pageSize,
    props.approvedState,
    props.searchString,
    props.type,
    props.city
  ]);

  useEffect(() => {
    handleGetAllPosts(
      page,
      pageSize,
      props.approvedState,
      props.searchString,
      props.type,
      props.city == "all" ? "" : props.city
    );
  }, [
    page,
    pageSize,
    props.approvedState,
    props.searchString,
    props.type,
    props.city
  ]);

  if (loading) return <LoadingCard />;
  if (error) return <div>{`Có lỗi xuất hiện! ${error}`}</div>;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 md:py-8 py-4 justify-center w-full">
        {posts?.length > 0 &&
          !isLoading &&
          posts.map((post: Post, index) => (
            <ImageCard key={index} post={post} />
          ))}

        {isLoading && (
          <div className="w-screen">
            <div className="md:w-[70%] w-[90%] h-max flex justify-center items-center">
              <Spinner />
            </div>
          </div>
        )}

        {posts?.length === 0 && !isLoading && <EmptyPostsList />}
      </div>

      {posts?.length > 0 && !isLoading && (
        <div className="w-full flex md:flex-row flex-col-reverse justify-between md:items-center items-end md:gap-2 gap-4">
          <ReactPagination
            currentPage={page}
            pageSize={pageSize}
            totalPosts={totalPosts}
            onPageChange={handlePageChange}
          />

          <div className="w-[150px] flex flex-col justify-center items-start gap-2">
            <label className="block text-sm font-semibold">
              Số tin mỗi trang
            </label>

            <Select
              value={pageSize.toString()}
              onValueChange={(value: string) => handlePageSizeChange(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Số tin mỗi trang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostsList;
