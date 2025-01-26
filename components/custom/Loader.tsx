import { PacmanLoader } from "react-spinners";

export default function Loader({ size = 30, color = "#ff6f00" }) {
  return (
    <div className="flex justify-center items-center bg-amber-50 h-screen">
      <PacmanLoader size={size} color={color} />
    </div>
  );
}
