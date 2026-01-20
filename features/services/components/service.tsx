import { Section } from "lucide-react";
import React, { useEffect, useState } from "react";
import EmptyState from "@/components/common/empty-state";
import { useGetServices } from "@/components/hooks/use-api";
import ActiveService from "./active-service";

function Service() {
  const [service, setServices] = useState([]);
  const { data } = useGetServices();
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <section className=" h-[100%]">
      {data?.data.services.length === 0 ? (
        <EmptyState
          imageSrc="/empty.svg"
          title="No Services Found"
          description="This property doesn’t have any services yet. Start by adding one."
          buttonText="+ Add Service"
          className=""
          onButtonClick={() => console.log("Add Service")}
        />
      ) : (
        <ActiveService />
      )}
    </section>
  );
}

export default Service;
