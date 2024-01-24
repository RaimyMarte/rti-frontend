import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';

interface PaginationComponentProps {
    totalItemsCount: number
}

export const PaginationComponent = ({ totalItemsCount, }: PaginationComponentProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const activePage = Number(searchParams.get("page")) || 1
    const pageSize = Number(searchParams.get("pageSize")) || 10

    const handlePageChange = (pageNumber: number) => {
        setSearchParams({
            page: String(pageNumber),
            pageSize: String(pageSize),
        })
    }

    return (
        <Pagination
            activePage={activePage}
            itemsCountPerPage={pageSize}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            hideDisabled
            prevPageText='Previous'
            nextPageText="Next"
            firstPageText="First"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
        />
    )
}