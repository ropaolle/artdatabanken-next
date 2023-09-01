"use client";

// Example: https://codesandbox.io/s/wonderful-pine-i7fs3?file=/src/Demo.tsx:173-286
// Repo: https://github.com/DominicTobias/react-image-crop#example
// Demo: https://codesandbox.io/s/react-image-crop-demo-with-react-hooks-y831o

import { useState, type ChangeEvent } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "../ui/input";

const defaultSrc = "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export default function CropImageForm(/* { images }: { images: ImagesType } */) {
  const supabase = createClientComponentClient();
  const { toast } = useToast();
  const [image, setImage] = useState(defaultSrc);
  const [crop, setCrop] = useState<Crop>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('e', e);
    e.preventDefault();
    const { files } = e.target;
    if (!files) return;
    

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  console.count("asd");

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
        <div className="space-y-8">
          <div className="flex justify-end gap-2 ">
            <Input name="image" accept=".jpg" type="file" onChange={handleChange} />
            <Button type="submit" /* disabled={!image} */>Crop and upload image</Button>
          </div>

          <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
            <img src={image} />
          </ReactCrop>
        </div>
      </div>

      {/* <div className="space-y-8">
        <div></div>
        <div className="flex justify-end ">
          <Button type="submit" disabled={!image}>
            Crop and upload image
          </Button>
        </div>
      </div> */}
    </>
  );
}
