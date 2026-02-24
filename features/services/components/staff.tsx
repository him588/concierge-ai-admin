"use client";
import EmptyState from "@/components/common/empty-state";
import { useGetStaff } from "@/components/hooks/use-api";
import { useServiceContext } from "@/context/service-context";
import React, { useState } from "react";

function Staff() {
  const [staff, setStaff] = useState([]);
  const { setServiceModal } = useServiceContext();
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
          onButtonClick={() => setServiceModal("Staff")}
        />
      ) : (
        ""
      )}
    </section>
  );
}

export default Staff;
