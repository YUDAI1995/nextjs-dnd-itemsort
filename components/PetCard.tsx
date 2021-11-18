import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { DragResult } from "../model/Drag.model";
import { Pet } from "../model/Pet.model";
import { setPetNum } from "../store/petSlice";

const PetCard: React.FC<Pet> = ({ id, name, num }) => {
  const dispatch = useDispatch();
  const [{ isDragging }, dragRef] = useDrag({
    type: "pet",
    item: { id, name },

    end: (_, monitor) => {
      const result = monitor.getDropResult() as DragResult;
      if (result) {
        dispatch(
          setPetNum({ columnNum: result.columnNum, prevColumnNum: num })
        );
      }
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <>
      {isDragging ? (
        <div
          className={`flex justify-center items-center rounded-md bg-white opacity-30 w-28 h-28`}
          ref={dragRef}
        >
          {name}
        </div>
      ) : (
        <div
          className={`flex justify-center items-center rounded-md bg-white opacity-100 w-28 h-28`}
          ref={dragRef}
        >
          {name}
        </div>
      )}
    </>
  );
};

export default PetCard;
