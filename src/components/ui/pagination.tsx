import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  resultsLength: number;
  pageSize: number;
  onChangePage?: (currentPage: number) => void;
}

//CurrentPage i pageCount
const PaginationSection = ({
  pageCount,
  currentPage,
  onChangePage,
}: PaginationProps) => {
  const handlePreviousPage = () => {
    if (onChangePage && currentPage > 1) {
      onChangePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (onChangePage && currentPage < pageCount) {
      onChangePage(currentPage + 1);
    }
  };

  return (
    <div className="flex mt-5 justify-between items-center">
      {pageCount >= 2 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePreviousPage()} />
            </PaginationItem>
            {pageCount > 5 && (
              <PaginationItem key={1}>
                {pageCount < 7 || currentPage < 4 ? (
                  <PaginationLink
                    className={
                      currentPage === 1 ? 'bg-neutral-300' : 'bg-neutral-200'
                    }
                    onClick={() => onChangePage && onChangePage(1)}
                  >
                    1
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis
                    onClick={() => onChangePage && onChangePage(1)}
                  ></PaginationEllipsis>
                )}
              </PaginationItem>
            )}

            {Array.from({ length: pageCount > 5 ? 5 : pageCount }, (_, i) => {
              let page: number;
              if (pageCount <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 2;
              } else if (currentPage > pageCount - 3) {
                page = pageCount - 5 + i;
              } else {
                page = currentPage - 2 + i;
              }

              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    className={
                      currentPage === page ? 'bg-neutral-300' : 'bg-neutral-200'
                    }
                    onClick={() => onChangePage && onChangePage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            {pageCount > 5 && (
              <PaginationItem key={7}>
                {pageCount < 7 || currentPage + 3 >= pageCount ? (
                  <PaginationLink
                    className={
                      (pageCount < 7 && currentPage === pageCount) ||
                      (pageCount >= 7 && currentPage === pageCount)
                        ? 'bg-neutral-300'
                        : 'bg-neutral-200'
                    }
                    onClick={() => onChangePage && onChangePage(pageCount)}
                  >
                    {pageCount}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis
                    onClick={() => onChangePage && onChangePage(pageCount)}
                  ></PaginationEllipsis>
                )}
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handleNextPage()}
                className="bg-black text-white"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationSection,
};
