import React from 'react';
import { memo } from "react";


function Footer() {
  return (
    <div className="flex bg-gray-700 py-5 px-16 justify-between  my-auto">
      <p className="text-white text-xs"> copyright ©️ 2022|CodeYogi </p>
      <p className="text-white text-xs"> Powered By CodeYogi </p>
    </div>
  );
}

export default memo(Footer);