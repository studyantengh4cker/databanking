import { Pagination } from "@/lib/types";

interface PaginationProps {
  pagination: Pagination | undefined;
  setCurrentPage: (page: number) => void;
}
export default function PaginationComponent({
  pagination,
  setCurrentPage,
}: PaginationProps) {
  return (
    <div>
      {" "}
      {pagination && pagination.total_pages > 1 ? (
        <div className="pagination flex gap-3 ">
          {Array.from({ length: pagination.total_pages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`pagination-button p-3 bg-[#e9e9e9e9] ${
                pagination?.current_page === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
