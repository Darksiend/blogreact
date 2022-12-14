import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { fetchPosts, fetchTags, sortByViews } from "../redux/slices/posts";
import { useParams } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";
export const SelectByTag = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const { tag } = useParams();

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);
  const sortByViews = () => {};
  return (
    <>
      <div>
        <h1>All posts with #{tag}</h1>
      </div>

      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading
            ? [...Array(5)]
            : posts.items.filter((item) => item.tags.includes(tag))
          ).map((post, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={post._id}
                title={post.title}
                user={{
                  avatarUrl:
                    "https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png",
                  fullName: post.user.fullName,
                }}
                createdAt={post.createdAt}
                viewsCount={post.viewCount}
                commentsCount={3}
                tags={post.tags}
                isEditable={userData?._id === post.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
