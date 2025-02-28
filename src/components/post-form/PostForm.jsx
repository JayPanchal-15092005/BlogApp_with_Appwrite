import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Progress } from "@material-tailwind/react";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        // slug: post?.$id || "",
        slug: post?.$id ?? "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0], (event) => {
            setProgress(Math.floor((event.loaded / event.total) * 100));
          })
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // const file = await appwriteService.uploadFile(data.image[0], (event) => {
      //   setProgress(Math.floor(event.loaded / event.total) * 100);
      // });

      // const file = data.image?.[0]
      const file = data.image && data.image[0] 
        ? await appwriteService.uploadFile(data.image[0], (event) => {
            setProgress(Math.floor((event.loaded / event.total) * 100));
          })
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          // userId: userData.$id,
          userId: userData?.$id ?? "",
        });

        // if (dbPost) {
        //   navigate(`/post/${dbPost.$id}`);
        // }
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
      } else {
          alert("Failed to create post. Please try again.");
          setLoading(false);
      }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  if (loading) {
    return (
      <div>
        <Progress value={progress} color="blue" />
      </div>
    );
  } else {
    return (
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap gap-6 p-6 bg-white shadow-md rounded-lg border border-gray-200"
      >
        {/* Left Section */}
        <div className="w-full md:w-2/3 space-y-4">
          <Input
            label="Title :"
            placeholder="Enter post title"
            className="w-full"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug :"
            placeholder="Enter post slug"
            className="w-full"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <div className="w-full">
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/3 space-y-4">
          <Input
            label="Featured Image :"
            type="file"
            className="w-full"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          {post && (
            <div className="w-full flex justify-center">
              <img
                // src={appwriteService.getFilePreview(post.featuredImage)}
                src={post.featuredImage ? appwriteService.getFilePreview(post.featuredImage) : ""}
                alt={post.title}
                className="rounded-lg shadow-md w-full object-cover"
              />
            </div>
          )}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="w-full"
            {...register("status", { required: true })}
          />
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : "bg-blue-600"} // undefined
            className="w-full py-3 text-white rounded-lg hover:opacity-90 transition"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    );
  }
}
