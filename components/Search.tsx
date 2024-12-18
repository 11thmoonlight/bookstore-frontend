import { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { getBooksBySearch } from "@/data/services/get-books";
import Image from "next/image";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as Node)
    ) {
      setSearchQuery("");
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (documentId: string) => {
    setSearchQuery("");
    setSuggestions([]);
    router.push(`/book/${documentId}`);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const data = await getBooksBySearch(searchQuery);
        setSuggestions(data?.data || []);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <div ref={searchBoxRef} className="relative w-full max-w-md mx-auto">
      <div className="flex justify-between relative">
        <input
          type="text"
          placeholder="Search by Title, Author or Publisher"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-1 right-1 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
          <IoSearchOutline size={20} />
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute top-full max-h-[400px] left-0 w-full bg-white border rounded shadow mt-1 z-10 overflow-y-auto">
            {suggestions.map((book: any) => (
              <li
                key={book.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectSuggestion(book.documentId)}
              >
                <div className="flex gap-4">
                  <Image
                    src={`http://localhost:1337${book.image[0].url}`}
                    width={60}
                    height={10}
                    alt="book's cover"
                  />
                  <div className="flex flex-col gap-1">
                    <p>{book.name}</p>
                    <p className="text-gray-600 text-sm">By {book.author}</p>
                    <p className="text-gray-600 text-sm">{book.publisher}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
