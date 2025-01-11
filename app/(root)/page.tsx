import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <NewArrivals />
    </div>
  );
}
