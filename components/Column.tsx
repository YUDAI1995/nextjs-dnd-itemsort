import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";
import { DragResult } from "../model/Drag.model";
import { RootState } from "../store";
import PetCard from "./PetCard";

const Column: React.FC<DragResult> = ({ columnNum, bgColor }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "pet",

    // drop時
    drop: () => ({ columnNum }),

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const pets = useSelector((state: RootState) => state.petsState.pets);
  const index = pets.findIndex(({ num }) => num === columnNum);

  return (
    <>
      {isOver ? (
        <div
          ref={dropRef}
          className={`flex justify-center items-center h-60 w-full bg-${bgColor}-200 bg-${bgColor}-400`}
        >
          <PetCard
            id={`${pets[index].id}`}
            name={pets[index].name}
            num={columnNum}
          />
        </div>
      ) : (
        <div
          ref={dropRef}
          className={`flex justify-center items-center h-60 w-full bg-${bgColor}-200`}
        >
          <PetCard
            id={`${pets[index].id}`}
            name={pets[index].name}
            num={columnNum}
          />
        </div>
      )}

      <div className="invisible bg-blue-200 bg-yellow-200 bg-green-200 bg-red-200 bg-blue-400 bg-yellow-400 bg-green-400 bg-red-400"></div>
    </>
  );
};

export default Column;
