import React, { useState } from "react";
import { Link } from "react-router-dom";
type linkProps = {
  text: string;
  icon: React.ReactElement;
  isActive: boolean;
  link: string;
  i: number;
};

const LinkItem = ({ text, icon, isActive, link, i }: linkProps) => {
  const [isHover, setIsHover] = useState<number | null>(null);
  return (
    <Link
      to={link}
      className="icon text-white link-content"
      onMouseEnter={() => setIsHover(i)}
      onMouseLeave={() => setIsHover(null)}
    >
      <li>{icon}</li>
      <span className={isHover === i || isActive ? "extended-text" : "slide-text"}>{text} </span>
    </Link>
  );
};

export default LinkItem;
