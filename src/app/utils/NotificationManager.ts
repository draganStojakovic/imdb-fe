import { toast } from "react-toastify";

class NotficationManager {

  public success(message: string) {
    toast.success(message);
  }

  public error(message: string) {
    toast.error(message);
  }

}

export const notficationManager = new NotficationManager()