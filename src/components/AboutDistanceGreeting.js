"use client";

import { useEffect, useState } from "react";

const JAKARTA_COORDS = {
  latitude: -6.1919,
  longitude: 106.8897,
};

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function distanceFromJakarta({ latitude, longitude }) {
  const earthRadiusKm = 6371;
  const deltaLatitude = toRadians(latitude - JAKARTA_COORDS.latitude);
  const deltaLongitude = toRadians(longitude - JAKARTA_COORDS.longitude);
  const originLatitude = toRadians(JAKARTA_COORDS.latitude);
  const targetLatitude = toRadians(latitude);

  const haversine =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(originLatitude) *
      Math.cos(targetLatitude) *
      Math.sin(deltaLongitude / 2) ** 2;

  return Math.round(
    earthRadiusKm * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine))
  );
}

export default function AboutDistanceGreeting() {
  const [distance, setDistance] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setStatus("unavailable");
      return undefined;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDistance(
          distanceFromJakarta({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
        setStatus("ready");
      },
      () => {
        setStatus("denied");
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000 * 60 * 30,
        timeout: 10000,
      }
    );
    return undefined;
  }, []);

  return (
    <span className="grid gap-1">
      {distance === null ? (
        <>
          <span>Hi!</span>
          <span>I am from Jakarta, Indonesia.</span>
        </>
      ) : (
        <>
          <span>Hi! We are {distance.toLocaleString()} km apart.</span>
          <span>I am from Jakarta, Indonesia.</span>
        </>
      )}
      {status === "denied" || status === "unavailable" ? (
        <span className="text-gray-400">Location unavailable</span>
      ) : null}
    </span>
  );
}
