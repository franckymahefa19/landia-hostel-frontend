import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  
  // Génère la liste des pages avec un bloc central de 3 pages
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    
    // Si le total est faible, on affiche tout sans ellipse
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    // Toujours afficher la première page
    pages.push(1)

    // Déterminer le début et la fin du bloc central (3 pages max)
    let startPage = Math.max(2, currentPage - 1)
    let endPage = Math.min(totalPages - 1, currentPage + 1)

    // Ajustement aux extrémités pour garder 3 pages centrales si possible
    if (currentPage <= 3) {
      endPage = 4
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 3
    }

    // Ajouter la première ellipse si nécessaire
    if (startPage > 2) {
      pages.push("ellipsis")
    }

    // Ajouter le bloc central de pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Ajouter la seconde ellipse si nécessaire
    if (endPage < totalPages - 1) {
      pages.push("ellipsis")
    }

    // Toujours afficher la dernière page
    pages.push(totalPages)

    return pages
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault()
    onPageChange(page)
  }

  return (
    <ShadcnPagination>
      <PaginationContent>
        {/* Bouton Précédent */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrev}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {/* Liste dynamique des pages */}
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                onClick={(e) => handlePageClick(e, page)}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Bouton Suivant */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  )
}
