"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldAlert, UserMinus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { demoteTrainer } from "@/lib/api/trainerApplication";
import { AlertDialog, Button } from "@heroui/react";

export default function TrainersTable({ initialTrainers }) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState(null);

  const handleDemote = async (id) => {
    setProcessingId(id);
    try {
      const res = await demoteTrainer(id);
      if (res?.success) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to execute demotion:", error);
    } finally {
      setProcessingId(null);
    }
  };

  if (!initialTrainers || initialTrainers.length === 0) {
    return (
      <div className="w-full text-center py-12 border-2 border-dashed border-border rounded-2xl bg-card">
        <p className="text-sm text-foreground/50 font-medium">
          No verified trainers found.
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
              <th className="p-4 pl-6">Trainer</th>
              <th className="p-4">Experience</th>
              <th className="p-4">Specialties</th>
              <th className="p-4">Role</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {initialTrainers.map((trainer) => {
              const details = trainer.trainerApplicationDetails;
              const isWorking = processingId === trainer._id;

              return (
                <tr
                  key={trainer._id}
                  className="hover:bg-foreground/1 transition-colors"
                >
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      {trainer.image ? (
                        <div className="relative size-9 overflow-hidden rounded-xl bg-border">
                          <Image
                            src={trainer.image}
                            alt={trainer.name || "Trainer"}
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="size-9 bg-brand/10 text-brand rounded-xl flex items-center justify-center font-bold font-heading">
                          {trainer.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-foreground">
                          {trainer.name}
                        </div>
                        <div className="text-xs text-foreground/50">
                          {trainer.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-medium text-foreground">
                    {details?.experience
                      ? `${details.experience} Years`
                      : "0 Years"}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {details?.specialties?.map((spec, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold bg-brand/5 border border-brand/10 px-2 py-0.5 rounded-md text-brand uppercase tracking-wide"
                        >
                          {spec}
                        </span>
                      )) || (
                        <span className="text-foreground/40 text-xs">None</span>
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">
                      <ShieldAlert className="size-3" /> {trainer.role}
                    </span>
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <AlertDialog>
                      {/* Trigger Button */}
                      <Button 
                        disabled={isWorking}
                        className="px-3 py-1.5 bg-destructive/5 hover:bg-destructive text-destructive border border-destructive/10 hover:text-white rounded-lg transition-all text-xs font-bold font-heading inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
                      >
                        {isWorking ? (
                          <Loader2 className="size-3.5 animate-spin" />
                        ) : (
                          <>
                            <UserMinus className="size-3.5" /> Demote to User
                          </>
                        )}
                      </Button>

                      {/* Modal Overlay Markup */}
                      <AlertDialog.Backdrop>
                        <AlertDialog.Container>
                          <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                              <AlertDialog.Icon status="danger" />
                              <AlertDialog.Heading>Demote Trainer Privilege?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                              <p>
                                Are you sure you want to strip trainer privileges from <strong>{trainer.name}</strong>? 
                                This will immediately revert their access level back to a standard platform user.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                              <Button slot="close" variant="tertiary">
                                Cancel
                              </Button>
                              <Button 
                                slot="close" 
                                variant="danger"
                                onClick={() => handleDemote(trainer._id)}
                              >
                                Demote Privileges
                              </Button>
                            </AlertDialog.Footer>
                          </AlertDialog.Dialog>
                        </AlertDialog.Container>
                      </AlertDialog.Backdrop>
                    </AlertDialog>
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