import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";

type Props = {
    page: number;
    pages: number;
    onChangePage: (page: number) => void;
};

const PaginationSelector = ({ page, pages, onChangePage }: Props) => {
    const pageNumber = [];
    for (let i = 1; i <= pages; i++) {
        pageNumber.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                {page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => {
                                onChangePage(page - 1);
                            }}
                        />
                    </PaginationItem>
                )}
                {pageNumber.map((number) => {
                    return (
                        <PaginationItem key={number}>
                            <PaginationLink
                                onClick={() => {
                                    onChangePage(number);
                                }}
                                isActive={number === page}
                            >
                                {number}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                {page < pages && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => {
                                onChangePage(page + 1);
                            }}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationSelector;
