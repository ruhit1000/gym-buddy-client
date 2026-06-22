"use client";

import React, { useState } from 'react';
import { Button, Modal } from "@heroui/react";
import { ShieldAlert, Eye, Loader2 } from "lucide-react";

export default function ApplicationDetailModal({ application, onSubmitReview }) {
  const [feedback, setFeedback] = useState(application.trainerApplicationDetails?.feedback || "");
  const [submitting, setSubmitting] = useState(false);

  const details = application.trainerApplicationDetails;

  const handleAction = async (actionType) => {
    if (submitting) return;
    setSubmitting(true);
    await onSubmitReview(application._id, actionType, feedback);
    setSubmitting(false);
  };

  return (
    <Modal>
      <Button className="px-3 py-1.5 bg-foreground/5 border border-border hover:bg-foreground/10 text-foreground rounded-lg text-xs font-bold font-heading flex items-center gap-1.5 ml-auto">
        <Eye className="size-3.5" /> Details
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-110">
            <Modal.CloseTrigger />
            
            <Modal.Header>
              <Modal.Icon className="bg-brand/10 text-brand">
                <ShieldAlert className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Application Details</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <div className="space-y-4 text-sm mb-4">
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-foreground/60">Applicant Name</span>
                  <span className="font-semibold text-foreground">{application.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-foreground/60">Email Address</span>
                  <span className="font-medium text-foreground">{application.email}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border">
                  <span className="text-foreground/60">Years Experience</span>
                  <span className="font-semibold text-foreground">{details?.experience || 0} Years</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-foreground/60">Core Specialties</span>
                  <div className="flex flex-wrap gap-1.5">
                    {details?.specialties?.map((spec, idx) => (
                      <span key={idx} className="text-xs font-bold bg-brand/10 text-brand px-2.5 py-0.5 rounded-md">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <label className="text-xs font-bold font-heading uppercase text-foreground/70 tracking-wider">
                  Administrative Feedback (Required for Rejection)
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  disabled={submitting}
                  placeholder="Write comments or grounds for adjustments here..."
                  className="w-full h-24 px-3 py-2 bg-foreground/2 border border-border rounded-xl text-sm focus:outline-none focus:border-brand transition-colors resize-none disabled:opacity-50"
                />
              </div>
            </Modal.Body>

            <Modal.Footer className="flex justify-end gap-2">
              <Button
                disabled={submitting || !feedback.trim()}
                onClick={() => handleAction('reject')}
                className="bg-destructive text-destructive-foreground font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 disabled:opacity-40"
              >
                {submitting ? <Loader2 className="size-3.5 animate-spin" /> : "Reject"}
              </Button>
              <Button
                disabled={submitting}
                onClick={() => handleAction('approve')}
                className="bg-brand text-background font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 disabled:opacity-40"
              >
                {submitting ? <Loader2 className="size-3.5 animate-spin" /> : "Approve"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}