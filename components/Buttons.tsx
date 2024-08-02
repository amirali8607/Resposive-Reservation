"use client";
import { deleteDoctor, deleteSickness, deleteUser } from "@/app/actions/Dashboard/delete";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const ReserveButton = () => {
   return (
      <Button
         onClick={() =>
            toast("Reserveation has been made!", {
               description: new Date().toString(),
            })
         }
         className="w-full"
         type="submit"
      >
         Reserve
      </Button>
   );
};
export const CancelReserve = () => {
   return (
      <Button
         variant="destructive"
         onClick={() =>
            toast("Reserveation has been cancel!", {
               description: new Date().toString(),
            })
         }
         type="submit"
         className="w-full"
      >
         Cancel
      </Button>
   );
};
export const EditProfileButton = () => {
   return (
      <Button
         onClick={() =>
            toast("Your profile has been updated!", {
               description: new Date().toString(),
            })
         }
         type="submit"
      >
         Update
      </Button>
   );
};
export const ChangeTimeButton = () => {
   return (
      <Button
         onClick={() =>
            toast("Your trick time has been changed!", {
               description: new Date().toString(),
            })
         }
         type="submit"
      >
         Save
      </Button>
   );
};
export const UploadButton = () => {
   return (
      <button
         onClick={() =>
            toast("Your picture profile has been uploaded!", {
               description: new Date().toString(),
            })
         }
         type="submit"
         className="border-dashed border-2 rounded-full px-2 w-20 mx-auto border-gray-300 font-semibold text-gray-600"
      >
         Upload
      </button>
   );
};
export const DeleteTrick = () => {
   return (
      <button
         type="submit"
         onClick={() =>
            toast("Trick has been Deleted!", {
               description: new Date().toString(),
            })
         }
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 mx-auto"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
         </svg>
      </button>
   );
};
export const AcceptTrick = () => {
   return (
      <button
         type="submit"
         onClick={() =>
            toast("Trick has been Accepted!", {
               description: new Date().toString(),
            })
         }
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
         </svg>
      </button>
   );
};
export const CancelTrick = () => {
   return (
      <button
         type="submit"
         onClick={() =>
            toast("Trick has been Canceld!", {
               description: new Date().toString(),
            })
         }
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
         </svg>
      </button>
   );
};
export const DeleteUserButton = ({ id }: { id: string }) => {
   return (
      <button onClick={
         () => {
            deleteUser(id)
            toast("Delete doctor profile in doctors page!", {
               description: new Date().toString(),
            })
         }
      } className="bg-red-600 font-semibold text-white rounded-md p-1">Delete</button>
   )
}
export const DeleteSicknessButton = ({ id }: { id: number }) => {
   return (
      <button onClick={
         () => {
            deleteSickness(id)
            toast("This Sickness has been Deleted!", {
               description: new Date().toString(),
               className: "dark:bg-red-700 dark:text-white"
            })
         }
      } className="bg-red-600 font-semibold text-white rounded-md p-1">Delete</button>
   )
}
export const DeleteDoctorButton = ({ id }: { id: string }) => {
   return (
      <button onClick={
         () => {
            deleteDoctor(id)
            toast("This Sickness has been Deleted!", {
               description: new Date().toString(),
            })
         }
      } className="bg-red-600 font-semibold text-white rounded-md p-1">Delete</button>
   )
}
interface LikeButtonProps {
   postId: number;
   isLiked: boolean;
}
export const LikeButton = ({ postId, isLiked }: LikeButtonProps) => {
   const [like, setLike] = useState(isLiked)
   const handleLike = async () => {
      try {
         const res = await fetch('/api/like', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId })
         })
         if (res.ok)
            setLike(true)
         else
            console.error("error liking post")
      } catch (error) {
         console.error('Error:', error);
      }
   }
   const handleUnlike = async () => {
      try {
         const res = await fetch('/api/unlike', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId })
         })
         if (res.ok)
            setLike(false)
         else
            console.error("error liking post")
      } catch (error) {
         console.error('Error:', error);
      }
   }
   return (
      <button onClick={like ? handleUnlike : handleLike}>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-8 cursor-pointer ${like && "fill-black"}`}
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
         </svg>
      </button>
   )
}