import React from "react";

interface ItemNavigationCardProps {

  index: number;
}

export default function ItemNavigationCard({

  index,
}: ItemNavigationCardProps) {
  
  const status:string = "not_answered"
  const isFlagged:boolean = false

  const borderColor = isFlagged ? "#FEAA01" : "#152259";
  const backgroundColor = isFlagged ? "#FEAA01" : status === "answered" ? "#152259" : "transparent";

  return (
    <div
      className={`w-[40px] h-[55px] border-solid ${status === "answered" || isFlagged ? 'border-4'  :'border-2'} rounded-xl flex flex-col items-center cursor-pointer`}
      style={{ borderColor: borderColor }}
    >
      <p className="flex-1">{index + 1}</p>
      <div
        className="bottom-container flex-1 w-full rounded-b-lg"
        style={{ backgroundColor: backgroundColor }}
      ></div>
    </div>
  );
}
