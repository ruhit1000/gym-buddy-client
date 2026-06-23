"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShieldCheck, UserX, UserCheck, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AlertDialog, Button } from "@heroui/react";
import { manageUserAction } from "@/lib/action/users";

export default function UsersTable({ initialUsers }) {
  const router = useRouter();
  const [processingId, setProcessingId] = useState(null);

  const handleActionExecution = async (id, action) => {
    setProcessingId(id);
    try {
      const res = await manageUserAction(id, action);
      if (res?.success) {
        router.refresh();
      }
    } catch (error) {
      console.error(`Failed execution rule over ${action}:`, error);
    } finally {
      setProcessingId(null);
    }
  };

  if (!initialUsers || initialUsers.length === 0) {
    return (
      <div className="w-full text-center py-12 border-2 border-dashed border-border rounded-2xl bg-card">
        <p className="text-sm text-foreground/50 font-medium">No registered users found.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="border-b border-border bg-foreground/2 text-xs font-bold uppercase tracking-wider text-foreground/70 font-heading">
              <th className="p-4 pl-6">Profile Info</th>
              <th className="p-4">Authorization</th>
              <th className="p-4">Operational Status</th>
              <th className="p-4 pr-6 text-right">Access Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {initialUsers.map((user) => {
              const isWorking = processingId === user._id;
              const isBlocked = user.status === "blocked";
              const isAdmin = user.role === "admin";

              return (
                <tr key={user._id} className="hover:bg-foreground/1 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        <div className="relative size-9 overflow-hidden rounded-xl bg-border">
                          <Image src={user.image} alt={user.name} fill sizes="36px" className="object-cover" />
                        </div>
                      ) : (
                        <div className="size-9 bg-brand/10 text-brand rounded-xl flex items-center justify-center font-bold">
                          {user.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-foreground">{user.name}</div>
                        <div className="text-xs text-foreground/50">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  {/* Authorization Role */}
                  <td className="p-4 font-medium uppercase tracking-wider text-xs text-foreground/70">
                    <span className={`px-2 py-0.5 rounded-md font-bold ${isAdmin ? 'bg-brand/10 text-brand' : 'bg-foreground/5 text-foreground/60'}`}>
                      {user.role}
                    </span>
                  </td>

                  {/* Operational Status badge */}
                  <td className="p-4">
                    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        isBlocked ? "bg-destructive/10 text-destructive border border-destructive/10" : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10"
                    }`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <div className="flex justify-end gap-2">
                      {/* PROMOTE ADMIN BUTTON */}
                      {!isAdmin && (
                        <AlertDialog>
                          <Button disabled={isWorking} className="px-3 py-1.5 bg-brand/10 hover:bg-brand text-brand hover:text-background text-xs font-bold font-heading inline-flex items-center gap-1">
                            <ShieldCheck className="size-3.5" /> Make Admin
                          </Button>
                          <AlertDialog.Backdrop>
                            <AlertDialog.Container>
                              <AlertDialog.Dialog className="sm:max-w-100">
                                <AlertDialog.Header>
                                  <AlertDialog.Heading>Promote to Admin?</AlertDialog.Heading>
                                </AlertDialog.Header>
                                <AlertDialog.Body>
                                  Are you sure you want to grant structural Admin rights to <strong>{user.name}</strong>?
                                </AlertDialog.Body>
                                <AlertDialog.Footer>
                                  <Button slot="close" variant="tertiary">Cancel</Button>
                                  <Button slot="close" className="bg-brand text-background font-bold" onClick={() => handleActionExecution(user._id, "make-admin")}>Confirm Promotion</Button>
                                </AlertDialog.Footer>
                              </AlertDialog.Dialog>
                            </AlertDialog.Container>
                          </AlertDialog.Backdrop>
                        </AlertDialog>
                      )}

                      <AlertDialog>
                        <Button disabled={isWorking} className={`px-3 py-1.5 text-xs font-bold font-heading inline-flex items-center gap-1 ${
                            isBlocked ? "bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white" : "bg-destructive/5 hover:bg-destructive text-destructive hover:text-white"
                        }`}>
                          {isWorking ? <Loader2 className="size-3.5 animate-spin" /> : isBlocked ? <UserCheck className="size-3.5" /> : <UserX className="size-3.5" />}
                          {isBlocked ? "Unblock" : "Block User"}
                        </Button>
                        <AlertDialog.Backdrop>
                          <AlertDialog.Container>
                            <AlertDialog.Dialog className="sm:max-w-100">
                              <AlertDialog.Header>
                                <AlertDialog.Icon status={isBlocked ? "success" : "danger"} />
                                <AlertDialog.Heading>{isBlocked ? "Unblock Access Profile?" : "Apply Access Soft-Block?"}</AlertDialog.Heading>
                              </AlertDialog.Header>
                              <AlertDialog.Body>
                                {isBlocked 
                                  ? `This restores state mutations capabilities immediately for ${user.name}.`
                                  : `This applies a soft-block to ${user.name}. They can browse materials, but will be restricted from booking, application form processes, and forum postings.`}
                              </AlertDialog.Body>
                              <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">Cancel</Button>
                                <Button slot="close" variant={isBlocked ? "success" : "danger"} onClick={() => handleActionExecution(user._id, isBlocked ? "unblock" : "block")}>
                                  Confirm Changes
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