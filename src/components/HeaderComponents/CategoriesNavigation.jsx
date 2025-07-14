import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

export default function CategoriesNavigation() {
  const categoriesData = [
    {
      id: "home-kitchen",
      name: "Home & Kitchen",
      subcategories: [
        { id: "cookware", name: "Cookware" },
        { id: "appliances", name: "Small Appliances" },
        { id: "dinnerware", name: "Dinnerware" },
      ],
    },
    {
      id: "home-care",
      name: "Home & Care",
      subcategories: [
        { id: "cleaning", name: "Cleaning Supplies" },
        { id: "laundry", name: "Laundry" },
      ],
    },
    {
      id: "food",
      name: "Food",
      subcategories: [
        {
          id: "peanut-butter",
          name: "Peanut Butter",
          icon: "/placeholder.svg?height=20&width=20",
        },
        {
          id: "honey",
          name: "Honey",
          icon: "/placeholder.svg?height=20&width=20",
        },
        {
          id: "tea",
          name: "Tea",
          icon: "/placeholder.svg?height=20&width=20",
        },
        {
          id: "green-tea",
          name: "Green Tea",
          icon: "/placeholder.svg?height=20&width=20",
        },
        {
          id: "groundnut-oil",
          name: "Groundnut Oil",
          icon: "/placeholder.svg?height=20&width=20",
        },
        {
          id: "cottonseed-oil",
          name: "Cottonseed Oil",
          icon: "/placeholder.svg?height=20&width=20",
        },
        {
          id: "ghee",
          name: "Ghee",
          icon: "/placeholder.svg?height=20&width=20",
        },
        {
          id: "masala-khichdi",
          name: "Masala Khichdi",
          icon: "/placeholder.svg?height=20&width=20",
        },
        {
          id: "sunflower",
          name: "Sunflower",
          icon: "/placeholder.svg?height=20&width=20",
        },
        {
          id: "gujarati-kadhi",
          name: "Gujarati Kadhi",
          icon: "/placeholder.svg?height=20&width=20",
        },
      ],
    },
  ];

  const navigationItems = [
    { label: "Home", link: "" },
    { label: "Popular Products", link: "/products" },
    { label: "Home & Kitchen", link: "" },
    { label: "Home & Care", link: "" },
    { label: "Food", link: "" },
    { label: "Combo", link: "" },
    { label: "Deals", link: "" },
  ];

  return (
    <nav className="bg-white">
      <div className="max-w-[1576px] px-10 mx-auto mt-[30px]">
        <div className="flex items-center gap-[32px]">
          <CategoryDropdown categoriesData={categoriesData} />

          <div className="flex items-center gap-[30px]">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="px-2 py-3 text-gray-700 hover:text-green font-semibold text-[15px] transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
