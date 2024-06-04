/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from "@/lib/utils";
import PostCard from "../components/Post/Card/PostCard";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_POST_BY_ID } from "@/services/graphql/queries";
import LargeSpinner from "../components/LargeSpinner";
import { ArrowBigLeftDash } from "lucide-react";

const PostDetails = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [post, setPost] = useState<PostDetail | null>(null);
  const [getPostDetails] = useLazyQuery(GET_POST_BY_ID);

  const handleGetPostDetails = async () => {
    setIsLoading(true);
    await getPostDetails({
      variables: {
        id: Number(postId)
      }
    })
      .then((result) => {
        const resultData = result.data.getPostById.data;

        const pData: PostDetail = {
          id: resultData.id,
          title: resultData.title,
          location: resultData.location,
          postType: resultData.postType,
          description: resultData.description,
          contactPhone: resultData.contactPhone,
          locationDetail: resultData.locationDetail,
          authorId: resultData.authorId,
          authorAvatar: resultData.authorAvatar,
          authorDisplayName: resultData.authorDisplayName,
          images: resultData.images,
          itemTypes: resultData.itemTypes,
          createdDate: new Date(resultData.createdDate),
          updatedDate: new Date(resultData.updatedDate),
          viewCount: resultData.viewCount,
          totalComments: resultData.totalComments,
          approved: resultData.approved
        };

        setPost(pData);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (postId) {
      handleGetPostDetails();
    }
  }, [postId, isReset]);

  function handleBackToList() {
    navigate("/dashboard/posts");
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

      {isLoading ? (
        <div className="w-full flex justify-center items-center">
          <LargeSpinner />
        </div>
      ) : (
        <PostCard post={post} isReset={isReset} setIsReset={setIsReset} />
      )}
    </div>
  );
};

export default PostDetails;
