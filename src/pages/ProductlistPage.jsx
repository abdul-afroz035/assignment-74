import { useEffect, useState, useMemo , useCallback} from 'react';
import Productlist from '../components/Productlist';
import { getProductsList } from '../api';
import NoMatching from '../components/NoMatching'; 
import Loading from '../components/Loading';


function ProductlistPage() {
  const [ProductsList, setProductsList] = useState([]);
  const [LoadingData, setLoading] = useState(true)


  useEffect(() => {
    const xyz = getProductsList();  //token store from axios
    xyz.then(function (products) {
      setProductsList(products)
      setLoading(false)
    });
  }, []);

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");


  const filteredProducts = useMemo(() => {
    return ProductsList.filter(function (item) {

      const lowerCaseTitle = item.title.toLowerCase();
      const lowerCaseQuery = query.toLowerCase();
      return lowerCaseTitle.indexOf(lowerCaseQuery) != -1
    })
  }, [query, ProductsList]);    //Dependencies

  const productsData = useMemo(() => {
    let sortedData = [...filteredProducts]    //copying filterData for sorting

    if (sort == "title") {
      sortedData.sort(function (x, y) {
        return (x.title < y.title) ? -1 : 1;  // return -ve if x should come first and viseversa
      });
    }
    else if (sort == "price-low") {
      sortedData.sort(function (x, y) {
        return x.price - y.price
      });
    }
    else if (sort == "price-high") {
      sortedData.sort(function (x, y) {
        return y.price - x.price
      });
    }
    return sortedData;
  }, [sort, filteredProducts, ProductsList] );  //Dependencies


    const handleSearchChange = useCallback((event) => {
      const newquery = event.target.value;
      setQuery(newquery);
    }, []);

    const handleSort = useCallback((event) => {
      const newsort = event.target.value;
      setSort(newsort);
    }, []);

    if (LoadingData) {
      return <Loading />
    }

    return (
      

        <div className=" bg-white max-w-6xl mx-auto my-16 py-6 px-6 ">
          <div class="flex justify-end my-4">
            <input value={query}
              class="border border-gray-400 px-2 mr-2 rounded-sm"
              placeholder="search"
              onChange={handleSearchChange} />

            <select
              value={sort}
              onChange={handleSort}
              class="text-xs bg-gray-200 px-2 py-1">
              <option value="default">default sorting</option>
              <option value="title">Sort by title</option>
              <option value="price-low">Sort by price : low-high</option>
              <option value="price-high">Sort by price : high-low</option>

            </select>
          </div>


          {productsData.length > 0 && <Productlist Products={productsData} />}
          {productsData.length == 0 && <NoMatching />}

          <button class="text-[10px] text-white bg-primary-default border-2 border-primarbg-primary-default py-1 px-2 mt-8 mr-1"> 1 </button>
          <button class="text-[10px] text-primary-default bg-white border-2 border-primary-default py-1 px-2 mt-8 mr-1"> 2 </button>
          <button class="text-[10px] text-primary-default bg-white border-2 border-primary-default py-1 px-1 mt-8 mr-1"> --- </button>
        </div>
     

    );
  }

export default ProductlistPage;