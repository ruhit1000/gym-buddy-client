"use client";

import React, { useState } from "react";
import { Check, X, Trash2, Loader2, Dumbbell } from "lucide-react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import { handleClassStatusAction } from "@/lib/action/classes";

export default function ManageClassesTable({ initialClasses }) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState(null);

  const executeAction = async (id, actionType) => {
    setProcessingId(id);
    try {
      const res = await handleClassStatusAction(id, actionType);
      if (res?.success) {
        router.refresh();
      }
    } catch (error) {
      console.error(`Error running ${actionType} on class:`, error);
    } finally {
      setProcessingId(null);
    }
  };

  if (!initialClasses || initialClasses.length === 0) {
    return (
      <div className="w-full text-center py-12 border-2 border-dashed border-border rounded-2xl bg-card">
        <p className="text-sm text-foreground/50 font-medium">
          No class submissions found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="border-b border-border bg-foreground/2 text-xs font-bold uppercase tracking-wider text-foreground/70 font-heading">
              <th className="p-4 pl-6">Class Title / Details</th>
              <th className="p-4">Trainer Identity</th>
              <th className="p-4">Current Status</th>
              <th className="p-4 pr-6 text-right">Moderation Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {initialClasses.map((item) => {
              const isWorking = processingId === item._id;
              const isApproved = item.status === "Approved";

              return (
                <tr
                  key={item._id}
                  className="hover:bg-foreground/1 transition-colors"
                >
                  {/* Class Info */}
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="size-9 bg-brand/10 text-brand rounded-xl flex items-center justify-center">
                        <Dumbbell className="size-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {item.title}
                        </div>
                        <div className="text-xs text-foreground/50 line-clamp-1 max-w-xs">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Instructor Info */}
                  <td className="p-4 font-medium text-foreground">
                    {item.trainerName || "Platform Trainer"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        isApproved
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10"
                          : "bg-amber-500/10 text-amber-500 border border-amber-500/10"
                      }`}
                    >
                      {item.status || "Pending"}
                    </span>
                  </td>

                  {/* Actions Processing Box */}
                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end gap-2">
                      {/* APPROVE ACTION */}
                      {!isApproved && (
                        <Button
                          disabled={isWorking}
                          onClick={() => executeAction(item._id, "approve")}
                          className="p-2 bg-brand/10 hover:bg-brand text-brand hover:text-background rounded-lg cursor-pointer"
                          title="Approve Class"
                        >
                          {isWorking ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Check className="size-4" />
                          )}
                        </Button>
                      )}

                      {/* REJECT/PENDING RESET ACTION */}
                      {isApproved && (
                        <Button
                          disabled={isWorking}
                          onClick={() => executeAction(item._id, "reject")}
                          className="p-2 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-background rounded-lg cursor-pointer"
                          title="Move back to Pending / Reject"
                        >
                          {isWorking ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <X className="size-4" />
                          )}
                        </Button>
                      )}

                      <AlertDialog>
                        <Button
                          disabled={isWorking}
                          className="p-2 bg-destructive/5 hover:bg-destructive text-destructive hover:text-white rounded-lg cursor-pointer border border-destructive/10"
                          title="Delete Submission"
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
                                  Delete Class Entry?
                                </AlertDialog.Heading>
                              </AlertDialog.Header>
                              <AlertDialog.Body>
                                Are you sure you want to permanently delete{" "}
                                <strong>{item.title}</strong>? This will
                                completely remove it from the application
                                workspace.
                              </AlertDialog.Body>
                              <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                  Cancel
                                </Button>
                                <Button
                                  slot="close"
                                  variant="danger"
                                  onClick={() =>
                                    executeAction(item._id, "delete")
                                  }
                                >
                                  Delete Permanently
                                </Button>
                              </AlertDialog.Footer>
                            </AlertDialog.Dialog>
                          </AlertDialog.Container>
                        </AlertDialog.Backdrop>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
