import { toast } from "react-toastify";

export const notify = (message: string, type: "error" | "success") => {
  if (type === "error") {
    toast.error(message);
  } else if (type === "success") {
    toast.success(message);
  }
};
