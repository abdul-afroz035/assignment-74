import { useEffect, useState, useMemo, useCallback } from 'react';
import { getProductsList, searchProducts } from '../api';
import { Link, useSearchParams } from 'react-router-dom';
import Productlist from '../components/Productlist';
import NoMatching from '../components/NoMatching';
import Loading from '../components/Loading';
import { range } from 'lodash';


function ProductlistPage() {
  const [LoadingData, setLoading] = useState(true)
  const [pages, setPages] = useState([]);

  const [productData, setProductData] = useState({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);
  let currentPage = +params.page || 1;
  let query = params.query || "";
  let sort = params.sort || "default"


  const totalPages = Math.ceil(productData.total / 12);
  let keyss = 1;


  useEffect(() => {
    let sortBy;
    let order;

    if (sort === "title") {
      sortBy = "title";
      order = "asc";
    } else if (sort === "price-asc") {
      sortBy = "price";
      order = "asc";
    } else if (sort === "price-desc") {
      sortBy = "price";
      order = "desc";
    }

    const promise = query ? searchProducts(query, sortBy, order, currentPage) :
      getProductsList(sortBy, order, currentPage);

    promise.then(function (data) {
      setProductData(data);
      setLoading(false);
    })
      .catch(function (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [query, sort, currentPage]);



  const handleSearchChange = useCallback((event) => {
    const newquery = event.target.value;
    const newParams = { query: newquery, page: 1 };
    setSearchParams((newParams), { replace: false });
  }, [query, sort]);

  const handleSort = useCallback((event) => {
    const newsort = event.target.value;
    const newParams = { ...params, sort: newsort, page: 1 };
    setSearchParams((newParams), { replace: false });
  }, [query, sort]);

  const handlePageChange = useCallback((newPage) => {
    const newParams = { ...params, page: newPage };
    setSearchParams((newParams), { replace: false });
  }, [query, sort]);

  useEffect(() => {
    const getPagination = () => {
      const myPages = [];

      myPages.push(1);

      if (currentPage > 3) {
        myPages.push("...")
      }

      for (let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 2); i++) {
        myPages.push(i);
      }

      if (currentPage < (totalPages - 2)) {
        myPages.push("...");
      }

      if (totalPages > 1) {
        myPages.push(totalPages);
      }

      return [...new Set(myPages)];       // this will remove repeated numbers and covert them into array
    };

    const getPages = getPagination();
    setPages(getPages);

  }, [query, sort, currentPage, totalPages])


  if (LoadingData) {
    return <Loading />
  }

  return (


    <div className=" bg-white max-w-6xl mx-auto my-16 py-6 px-6 ">
      <div className="flex justify-end my-4">
        <input value={query}
          className="border border-gray-400 px-2 mr-2 rounded-sm"
          placeholder="search"
          onChange={handleSearchChange} />

        <select
          value={sort}
          onChange={handleSort}
          className="text-xs bg-gray-200 px-2 py-1">
          <option value="default">default sorting</option>
          <option value="title">Sort by title</option>
          <option value="price-asc">Sort by price : low-high</option>
          <option value="price-desc">Sort by price : high-low</option>

        </select>
      </div>


      {productData.products.length > 0 && <Productlist Products={productData.products} />}
      {productData.products.length == 0 && <NoMatching />}

      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="disabled:hidden text-primary-default font-serif mr-2"
      > prev
      </button>
      {pages.map((pageNo, index) => (
        pageNo === "..." ? (
          <span key={index + 100}> ... </span>    //here index and pageNo is might be same thatswhy i have used (ind+100)
        ) : (
          <Link
            key={pageNo}
            to={"?" + new URLSearchParams({ ...params, page: pageNo })}
            className={"text- text-primary-default  border-2  bg-primary-default cursor-pointer px-2 py-1 m-1 hover:border-blue-900  "
              + (pageNo === currentPage ? "bg-primary-default border-white text-white" : "bg-white border-primary-default")
            }>
            {pageNo}
          </Link>
        )
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="disabled:hidden text-primary-default font-serif ml-2"
      > next
      </button>

    </div>


  );
}

export default ProductlistPage;