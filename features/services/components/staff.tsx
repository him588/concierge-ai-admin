"use client";
import EmptyState from "@/components/common/empty-state";
import { useGetStaff } from "@/components/hooks/use-api";
import React, { useState } from "react";

function Staff() {
  const [staff, setStaff] = useState([]);
  const { data } = useGetStaff();
  return (
    <section className=" h-[100%]">
      {data?.data.staff.length === 0 ? (
        <EmptyState
          imageSrc="/empty.svg"
          title="Don't have any staff "
          description="This property doesn’t have any Staff yet. Start by adding one."
          buttonText="+ Add Staff"
          className=""
          onButtonClick={() => console.log("Add Service")}
        />
      ) : (
        ""
      )}
    </section>
  );
}

export default Staff;
