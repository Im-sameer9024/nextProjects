"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  
} from "./ui/pagination";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const PaginationComponent = ({
  page,
  count,
}: {
  page: number;
  count: number;
}) => {

  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page-1) + ITEM_PER_PAGE < count;

  const router = useRouter();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className=" mt-6">
      <Pagination>
        <PaginationContent className=" flex gap-4">
          <PaginationItem>
            <Button disabled={!hasPrev} onClick={() => changePage(page - 1)}>
              <ArrowBigLeft/>
              Prev
            </Button>
          </PaginationItem>
          {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, i) => {
            const pageIndex = i + 1;
            return (
              <PaginationItem key={i}>
                <PaginationLink
                  className={` hover:cursor-pointer ${page === pageIndex ? "bg-gray-200" : ""}`}
                  onClick={() => changePage(pageIndex)}
                >
                  {pageIndex}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <Button disabled={!hasNext} onClick={() => changePage(page + 1)}>
              Next
              <ArrowBigRight/>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
