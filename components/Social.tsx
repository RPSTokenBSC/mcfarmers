import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Social({
  icon,
  link,
  name,
  smol,
}: {
  icon: IconDefinition;
  link: string;
  name: string;
  smol?: boolean;
}) {
  return (
    <a href={link} target="_blank" aria-label={name}>
      <FontAwesomeIcon
        icon={icon}
        className={
          (smol ? "h-8 mt-1 ml-2" : "h-10") +
          " hover:brightness-150 hover:saturate-200"
        }
      />
    </a>
  );
}
