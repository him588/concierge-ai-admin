"use client";

import Header from "@/components/common/header";
import CreateCard from "./components/create-card";
import { BedDouble, BookKey, Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/common/modal";
import CreateRoom from "./components/create-room";
import CreateCategory from "./components/create-category";
import BookRoom from "./components/book-room";
import RoomAvailabilityGrid from "./components/room-availabilty";
import RoomCategory from "./components/room-category";
import RoomList from "./components/room-list";

function Room() {
  const [currentModal, setCurrentModal] = useState<
    null | "createCategory" | "createRoom" | "BookRoom"
  >(null);

  return (
    <section className="w-full h-full outline-none p-6">
      <Header />

      {/* Create Cards */}
      <div className="mt-[1rem] flex  gap-[1rem]">
        <CreateCard
          title="Create room type"
          description="Add a new room category"
          icon={Plus}
          accentColor="#16a34a"
          backgroundColor="#ecfdf5"
          onClick={() => setCurrentModal("createCategory")}
        />

        <CreateCard
          title="Create room"
          description="Add a new room"
          icon={BedDouble}
          accentColor="#6b5c85"
          backgroundColor="#f6ecff"
          onClick={() => setCurrentModal("createRoom")}
        />

        <CreateCard
          title="Book room"
          description="Add a new room"
          icon={BookKey}
          accentColor="#6b4b5c"
          backgroundColor="#ffe6f7"
          onClick={() => setCurrentModal("BookRoom")}
        />
      </div>

      {/* Room Categories */}
      <div className="mt-[3rem]">
        <RoomCategory />
      </div>

      {/* Rooms */}
      <div className="mt-[3rem] overflow-hidden">
        <RoomList />
      </div>

      {/* <RoomAvailabilityTimeline /> */}
      <div className="mt-[3rem] ">
        <RoomAvailabilityGrid setCurrentModal={setCurrentModal} />
      </div>

      {currentModal && (
        <Modal
          isOpen={currentModal !== null}
          onClose={() => setCurrentModal(null)}
          modalBoxClassName=" rounded-[25px] w-[100%] "
        >
          {currentModal === "createCategory" && (
            <CreateCategory
              accentColor=""
              onCancel={() => setCurrentModal(null)}
            />
          )}
          {currentModal === "createRoom" && (
            <CreateRoom accentColor="" onCancel={() => setCurrentModal(null)} />
          )}
          {currentModal === "BookRoom" && (
            <BookRoom accentColor="" onCancel={() => setCurrentModal(null)} />
          )}
        </Modal>
      )}
    </section>
  );
}

export default Room;
