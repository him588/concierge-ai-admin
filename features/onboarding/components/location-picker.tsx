import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Pin } from "lucide-react";
import React, { useRef } from "react";
import AppConfig from "@/components/lib/app-config";
import { address, coordinates } from "../types/type";

type LatLng = {
  lat: number;
  lng: number;
};

type locationProps = {
  setTempAddress: React.Dispatch<React.SetStateAction<address>>;
  setTempCoordinates: React.Dispatch<React.SetStateAction<coordinates>>;
};

const DEFAULT_CENTER: LatLng = {
  lat: 28.6139,
  lng: 77.209,
};

function LocationPicker(location: locationProps) {
  const { setTempCoordinates, setTempAddress } = location;
  const mapRef = useRef<google.maps.Map | null>(null);
  const getAddressFromLatLng = async (lat: number, lng: number) => {
    if (!window.google) return null;

    const geocoder = new google.maps.Geocoder();

    const result = await geocoder.geocode({
      location: { lat, lng },
    });

    if (!result.results[0]) return null;

    const mainResult = result.results[0];
    const components = mainResult.address_components;

    const getComponent = (type: string) =>
      components.find((c) => c.types.includes(type))?.long_name || "";

    const streetAddress =
      `${getComponent("street_number")} ${getComponent("route")}`.trim() ||
      getComponent("premise") ||
      getComponent("sublocality") ||
      mainResult.formatted_address ||
      "";

    const address = {
      streetAddress,
      city:
        getComponent("locality") ||
        getComponent("administrative_area_level_2") ||
        "",
      state: getComponent("administrative_area_level_1") || "",
      country: getComponent("country") || "",
      pincode: getComponent("postal_code") || "",
    };

    const coordinates = { latitude: lat, longitude: lng };
    setTempAddress(address);
    setTempCoordinates(coordinates);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: AppConfig.env.GoogleMapKey!,
    libraries: ["places"],
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <GoogleMap
        center={DEFAULT_CENTER}
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onIdle={async () => {
          if (!mapRef.current) return;

          const center = mapRef.current.getCenter();
          if (!center) return;

          await getAddressFromLatLng(center.lat(), center.lng());
        }}
        options={{
          disableDefaultUI: true,
          clickableIcons: false,
        }}
      />

      {/* Fixed center pin */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* <Pin size={36} className="text-blue-600" /> */}
        <img src="/location.png" alt="" className=" h-[40] object-cover" />
      </div>
    </div>
  );
}

export default LocationPicker;
