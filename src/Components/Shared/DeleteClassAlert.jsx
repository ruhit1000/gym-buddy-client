"use client";

import { deleteClass } from "@/lib/action/classes";
import { AlertDialog, Button, toast } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteClassAlert({classId, className}) {
    const router = useRouter();

    const handleDelete = async (classId) => {
        try {
            const response = await deleteClass(classId);
            toast.success(response.message || "Class deleted successfully");
            router.refresh();
        } catch (error) {
            console.error("Error deleting class:", error);
            toast.error("Failed to delete class");
        }
    }

  return (
    <AlertDialog>
      <Button
        isIconOnly
        aria-label="Delete class catalog"
        size="sm"
        variant="ghost"
        className="hover:bg-rose-500/10 hover:text-rose-500 border border-border/80 text-foreground/60 rounded-xl cursor-pointer"
      >
        <Trash2 className="size-4" />
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete class permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{className}</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" variant="danger" onClick={() => handleDelete(classId)}>
                Delete Class
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
