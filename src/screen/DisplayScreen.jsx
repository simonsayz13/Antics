import "../index.css";
import Simulation from "../components/Simulation";

const DisplayScreen = () => {
  return (
    <div className="flex flex-col justify-center">
      <p className="mb-2 text-center text-2xl">Langton's Ant Simulation</p>
      <Simulation />
    </div>
  );
};

export { DisplayScreen };
