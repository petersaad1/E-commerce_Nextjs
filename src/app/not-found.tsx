import React from "react";
import img from "@/assets/images/error.svg";
import Image from "next/image";

function notfoundPage() {
  return (
    <div className="w-full h-[80vh] px-5 md:px-0 flex items-center justify-center">
      <Image src={img} alt="Not-Found Page" />
    </div>
  );
}

export default notfoundPage;
