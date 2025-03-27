export default function generatePagination(
  currentPage: number,
  totalPages: number,
) {
  const pagination: Array<number> = [];
  const maxVisiblePages = 4;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pagination.push(i);
    }
  } else {
    // Always show the first two pages
    pagination.push(1);
    pagination.push(2);

    // show compact page number
    if (currentPage < 4) {
      pagination.push(3);
      pagination.push(4);
      pagination.push(-1);
      pagination.push(totalPages - 1);
      pagination.push(totalPages);
    } else if (currentPage <= maxVisiblePages) {
      // Show first few pages
      for (let i = 3; i <= maxVisiblePages + 1; i++) {
        pagination.push(i);
      }
      pagination.push(-1);
      pagination.push(totalPages - 1);
      pagination.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      // Show last few pages
      pagination.push(-1);
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pagination.push(i);
      }
    } else {
      // Show pages around the current page
      if (currentPage - 2 > 3) {
        pagination.push(-1);
      } else {
        pagination.push(currentPage - 2);
      }

      for (let i = currentPage - 1; i <= Number(currentPage + 1); i++) {
        pagination.push(i);
      }

      if (totalPages - 2 === currentPage + 2) {
        pagination.push(totalPages - 2);
      } else {
        pagination.push(-1);
      }

      pagination.push(totalPages - 1);
      pagination.push(totalPages);
    }

    // Always show the last page if it's not already included
    if (!pagination.includes(totalPages)) {
      pagination.push(totalPages);
    }
  }
  return pagination;
}
