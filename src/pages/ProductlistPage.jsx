import { useEffect, useState, useMemo, useCallback } from 'react';
import { getProductsList, searchProducts } from '../api';
import { Link, useSearchParams } from 'react-router-dom';
import Productlist from '../components/Productlist';
import NoMatching from '../components/NoMatching';
import Loading from '../components/Loading';
import { range } from 'lodash';


function ProductlistPage() {
  const [LoadingData, setLoading] = useState(true)


  const [productData, setProductData] = useState({
    products: [],
    total: 0,
    skip: 0,
    limit: 0,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);
  let page = +params.page || 1;                          
  let query = params.query || "";  
  let sort = params.sort || "default"   

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

    const promise = query ? searchProducts(query, sortBy, order, page) :
      getProductsList(sortBy, order, page);

    promise.then(function (data) {
      setProductData(data);
      setLoading(false);
    })
      .catch(function (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  },[query, sort, page] );


  const handleSearchChange = useCallback((event) => {
    const newquery = event.target.value;
    const newParams = {query: newquery, page: 1 };
    setSearchParams((newParams), { replace: false });
  }, [query,sort]);

  const handleSort = useCallback((event) => {
    const newsort = event.target.value;
    const newParams = { ...params, sort: newsort, page: 1 };
    setSearchParams((newParams), { replace: false });
  }, [query,sort]);

  const lastPage = Math.ceil(productData.total / 12);

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
       
      {range(1, lastPage + 1).map((pageNo) => (
        <Link
           key = {pageNo}
           to={"?" + new URLSearchParams ({...params, page: pageNo })}
           className = {"text-shadow-mauve-50 text-primary-default  border-2  bg-primary-default cursor-pointer px-2 py-1 m-1 "
               + (pageNo === page ? "bg-primary-default border-white text-white" : "bg-white border-primary-default")
           }>
           {pageNo}
        </Link>
      ))}

    </div>


  );
}

export default ProductlistPage;