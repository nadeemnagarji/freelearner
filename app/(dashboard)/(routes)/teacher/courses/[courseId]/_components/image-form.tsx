"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  const router = useRouter();
  console.log(initialData);

  const onSubmitBackend = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(`/api/courses/${courseId}`, values);
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course Updated");
      router.refresh();
      setIsEditing(false);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex justify-between items-center">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className=" flex items-center justify-center h-60 bg-slate-200">
            <ImageIcon className="h-10 w-10 to-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
              alt="Upload"
            />
          </div>
        ))}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmitBackend({ imageUrl: url });
              }
            }}
          />
          <div className=" text-xs to-muted-foreground mt-4">
            16:4 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * the <FileUpload /> component handles the upload property
 * i.e. as soon as user clicks on the upload icon and the uploads the image
 * it will show an icon of upload and when we click on that it will take the image
 * and show us upload file button
 * as soon as we click on that button it willl trigger the
 * onChange()=> function of FileUpload component in which the file gets uploaded
 * in the uploadthing and give back a url
 *
 * and using that url the onSubmitBackend function is triggered which will upload that
 * url in the database and refresh the page
 *
 */
