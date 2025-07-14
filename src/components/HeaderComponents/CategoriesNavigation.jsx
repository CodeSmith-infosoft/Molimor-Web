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
        { id: "cleaning", name: "Cleaning Supplies", icon: "/images/dummy/khichadi.png", },
        { id: "laundry", name: "Laundry", icon: "/images/dummy/khichadi.png", },
      ],
    },
    {
      id: "food",
      name: "Food",
      subcategories: [
        {
          id: "peanut-butter",
          name: "Peanut Butter",
          icon: "/images/dummy/khichadi.png",
        },
        {
          id: "honey",
          name: "Honey",
          icon: "/images/dummy/khichadi.png",
        },
        {
          id: "tea",
          name: "Tea",
          icon: "/images/dummy/khichadi.png",
        },
        {
          id: "green-tea",
          name: "Green Tea",
          icon: "/images/dummy/khichadi.png",
        },
        {
          id: "groundnut-oil",
          name: "Groundnut Oil",
          icon: "/images/dummy/khichadi.png",
        },
        {
          id: "cottonseed-oil",
          name: "Cottonseed Oil",
          icon: "/images/dummy/khichadi.png",
        },
        {
          id: "ghee",
          name: "Ghee",
          icon: "/images/dummy/khichadi.png",
        },
        {
          id: "masala-khichdi",
          name: "Masala Khichdi",
          icon: "/images/dummy/khichadi.png",
        },
        {
          id: "sunflower",
          name: "Sunflower",
          icon: "/images/dummy/khichadi.png",
        },
        {
          id: "gujarati-kadhi",
          name: "Gujarati Kadhi",
          icon: "/images/dummy/khichadi.png",
        },
      ],
    },
  ];

  const navigationItems = [
    "Home",
    "Popular Products",
    "Home & Kitchen",
    "Home & Care",
    "Food",
    "Combo",
    "Deals",
  ];

  return (
    <nav className="bg-white">
      <div className="max-w-[1536px] mx-auto mt-[30px]">
        <div className="flex items-center gap-[32px]">
          <CategoryDropdown categoriesData={categoriesData} /> 

          <div className="flex items-center gap-[30px]">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="px-2 py-3 text-gray-700 hover:text-green font-semibold text-[15px] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
