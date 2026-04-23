import React, { useMemo, useCallback } from "react";
import { RxCrossCircled } from "react-icons/rx";

function CartRow({ product, quantity, onProductRemove, onQuantityChange,  }) {


  const subTotal = useMemo(() => {
     return (product.price * quantity);
  }, [quantity]);

   const handleChange = useCallback((event) => {
         onQuantityChange(+event.target.value, product.id);

    }, [event,product.id ]);

   const handleRemove = useCallback(() => {
       onProductRemove(product.id);
   }, [product.id]);
 

  return (
    <div className="flex flex-row justify-center  items-center border-b border-gray-100 py-2 ">
      <span className="mx-4 ">
        <RxCrossCircled className="text-primary-default cursor-pointer size-5"
        productid={product.id}
        onClick={handleRemove}/>
      </span>

      <div className="h-15 w-15 mx-4">
        <img className="object-cover h-full w-full bg-gray-300" src={product.thumbnail} />
      </div>
      <h3 className="grow mx-4 text-primary-default font-semibold"> {product.title}</h3>

      <span className=" w-20 mx-15 font-semibold text-slate-700">${product.price}</span>
      <input
        type="number"
        className="py-1 pl-1 w-10 mr-15  border border-gray-300 rounded-md text-gray-500"
        value={quantity}
        onChange={handleChange}
      />

      <span className=" w-23 font-semibold text-slate-700 " >
        ${subTotal}
      </span>

    </div>
  );
}

export default CartRow;