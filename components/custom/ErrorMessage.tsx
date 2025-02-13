import { MdHeartBroken } from "react-icons/md";

export default function ErrorMessage({
  message = "Something went wrong. Please try again later.",
}) {
  return (
    <div className="flex flex-col gap-6 justify-center items-center bg-amber-50 dark:bg-stone-800 h-screen">
      <p className="text-lg font-semibold text-amber-600">{message}</p>
      <MdHeartBroken className="text-amber-600 text-9xl" />
    </div>
  );
}
