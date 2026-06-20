"use client";

import React from "react";
import { Pagination } from "@heroui/react";

export function AppPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (currentPage > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="w-full overflow-x-auto flex justify-center mt-12 mb-6">
      <Pagination className="justify-center">
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous 
              isDisabled={currentPage === 1} 
              onPress={() => onPageChange(currentPage - 1)}
              className="text-foreground/70 hover:text-brand cursor-pointer"
            >
              <Pagination.PreviousIcon />
              <span className="font-heading text-xs uppercase font-bold tracking-wider">Previous</span>
            </Pagination.Previous>
          </Pagination.Item>

          {getPageNumbers().map((p, i) =>
            p === "ellipsis" ? (
              <Pagination.Item key={`ellipsis-${i}`}>
                <Pagination.Ellipsis className="text-foreground/40" />
              </Pagination.Item>
            ) : (
              <Pagination.Item key={p}>
                <Pagination.Link 
                  isActive={p === currentPage} 
                  onPress={() => onPageChange(p)}
                  className={`cursor-pointer rounded-lg font-heading font-bold text-xs ${
                    p === currentPage 
                      ? "bg-brand text-background shadow-md" 
                      : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ),
          )}

          <Pagination.Item>
            <Pagination.Next 
              isDisabled={currentPage === totalPages} 
              onPress={() => onPageChange(currentPage + 1)}
              className="text-foreground/70 hover:text-brand cursor-pointer"
            >
              <span className="font-heading text-xs uppercase font-bold tracking-wider">Next</span>
              <Pagination.NextIcon />
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </div>
  );
}