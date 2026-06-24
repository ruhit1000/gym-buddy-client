"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

export default function DeleteForumDialog({ postTitle, onConfirm, isDeleting }) {
  return (
    <AlertDialog>
      <Button 
        variant="danger" 
        size="sm"
        className="px-3 min-w-0 h-8 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1"
      >
        <Trash2 className="size-3.5" />
      </Button>
      
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100 bg-card border border-border text-foreground rounded-2xl shadow-xl">
            <AlertDialog.CloseTrigger className="text-foreground/40 hover:text-foreground transition-colors" />
            
            <AlertDialog.Header className="flex gap-3 items-center">
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="font-heading font-black uppercase text-lg tracking-tight">
                Delete Thread Permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            
            <AlertDialog.Body className="py-2">
              <p className="text-sm text-foreground/70 leading-relaxed font-sans">
                This will permanently remove <strong className="text-foreground font-semibold">"{postTitle}"</strong> along with all of its associated discussion comments from the system. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            
            <AlertDialog.Footer className="gap-2">
              <Button slot="close" variant="tertiary" className="rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer">
                Cancel
              </Button>
              <Button 
                slot={isDeleting ? "" : "close"} 
                variant="danger" 
                onClick={onConfirm}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}