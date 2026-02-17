"use client";

import Image from "next/image";
import { useState } from "react";

const photos = [
  { src: "/images/Me-1.png", caption: "Formal portrait" },
  { src: "/images/Me-2.jpg", caption: "Casual portrait" },
];

export default function ProfilePhoto() {
  const [index, setIndex] = useState(0);
  const photo = photos[index];

  return (
    <figure
      className="profile-photo"
      onClick={() => setIndex((i) => (i + 1) % photos.length)}
      style={{ cursor: "pointer" }}
      title="Click to switch photo"
    >
      {photos.map((p, i) => (
        <Image
          key={p.src}
          src={p.src}
          alt="Hasbi Hassadiqin"
          width={900}
          height={1200}
          priority
          style={{
            position: i === 0 ? "relative" : "absolute",
            inset: i === 0 ? undefined : 0,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}
