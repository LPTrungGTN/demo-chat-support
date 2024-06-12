import React from "react";
import { Pagination } from "react-headless-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  handleChangePageClick: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  handleChangePageClick,
}) => {
  return (
    <>
      <div className="hidden lg:block  pt-12">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={handleChangePageClick}
          totalPages={totalPages}
          edgePageCount={1}
          middlePagesSiblingCount={2}
          className=" text-black "
          truncableText="..."
          truncableClassName="text-black mx-3 list-none"
        >
          <div className="flex justify-center ">
            <Pagination.PrevButton className="text-gray-500 hover:text-black mr-2  ">
              Previous
            </Pagination.PrevButton>
            <div className="flex list-none">
              <Pagination.PageButton
                activeClassName="bg-blue-500 text-white hover:bg-blue-300 focus:bg-blue-600 focus:text-white"
                inactiveClassName="bg-blue-100   "
                className=" mx-1 px-3  py-1 rounded-lg hover:bg-blue-400  text-gray-800 cursor-pointer"
              />
            </div>
            <Pagination.NextButton className="text-gray-500 hover:text-black ml-2 list-none">
              Next
            </Pagination.NextButton>
          </div>
        </Pagination>
      </div>

      <div className="  pt-12 block lg:hidden">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={handleChangePageClick}
          totalPages={totalPages}
          edgePageCount={1}
          middlePagesSiblingCount={1}
          className=" text-black"
          truncableText="..."
          truncableClassName="text-black mx-3 list-none"
        >
          <div className="flex justify-center ">
            <Pagination.PrevButton className="text-black hover:text-blue-300 mr-2">
              <FontAwesomeIcon icon={faChevronLeft} />
            </Pagination.PrevButton>

            <div className="flex list-none">
              <Pagination.PageButton
                activeClassName="bg-blue-500 text-white hover:bg-blue-300 focus:bg-blue-600 focus:text-white"
                inactiveClassName="bg-blue-100   "
                className=" mx-1 px-3  py-1 rounded-lg hover:bg-blue-400  text-gray-800 cursor-pointer"
              />
            </div>
            <Pagination.NextButton className="text-black hover:text-blue-300 ml-2">
              <FontAwesomeIcon icon={faChevronRight} />
            </Pagination.NextButton>
          </div>
        </Pagination>
      </div>
    </>
  );
};

export default CustomPagination;
