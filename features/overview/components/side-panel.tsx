import Image from "next/image";

const bookings = [
  {
    id: 1,
    name: "Wade Warren",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "#SGL",
    guests: 0,
    date: "01.12–01.14",
    status: "Paid",
  },
  {
    id: 2,
    name: "Jacob Jones",
    avatar:
      "https://images.unsplash.com/photo-1742518424517-ca7890ff9510?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQxfHx8ZW58MHx8fHx8",
    tag: "#DPL",
    guests: 3,
    date: "01.12–01.13",
    status: "Pending",
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    tag: "#DBL",
    guests: 1,
    date: "01.12–01.15",
    status: "Paid",
  },
];

const statusStyles: Record<string, string> = {
  Paid: "bg-purple-100 text-purple-600",
  Pending: "bg-orange-100 text-orange-600",
};

export default function BookingListCard() {
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden">
      {/* Cover Image */}
      <div className="relative h-[160px]">
        <Image
          src="https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // gradient or abstract image
          alt="cover"
          fill
          className="object-cover rounded-[1rem]"
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-sm font-semibold text-gray-900">Booking list</p>
        <span className="cursor-pointer text-gray-500">•••</span>
      </div>

      {/* List */}
      <div className="px-4 space-y-4">
        {bookings.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-3">
              <Image
                src={item.avatar}
                alt={item.name}
                width={36}
                height={36}
                className="rounded-full object-fit"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.tag} · {item.guests} guests
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="text-xs text-gray-400">{item.date}</p>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  statusStyles[item.status]
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 flex items-center justify-center">
        <span className="text-sm text-center text-blue-600 cursor-pointer hover:underline">
          View all
        </span>
      </div>
    </div>
  );
}
