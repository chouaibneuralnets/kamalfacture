const BrandLogos = () => {
  const brands = [
    { name: "MICHELIN", bg: "bg-yellow-400", text: "text-blue-900", className: "font-bold" },
    { name: "BRIDGESTONE", bg: "bg-red-600", text: "text-white", className: "font-bold tracking-tight" },
    { name: "GOODYEAR", bg: "bg-blue-800", text: "text-yellow-400", className: "font-bold" },
    { name: "Continental", bg: "bg-orange-500", text: "text-black", className: "font-bold italic" },
    { name: "DUNLOP", bg: "bg-black", text: "text-yellow-400", className: "font-bold" },
    { name: "HANKOOK", bg: "bg-orange-600", text: "text-black", className: "font-bold" },
    { name: "PIRELLI", bg: "bg-yellow-400", text: "text-black", className: "font-bold italic" },
    { name: "TAURUS", bg: "bg-blue-700", text: "text-white", className: "font-bold" },
    { name: "Barum", bg: "bg-orange-500", text: "text-white", className: "font-bold" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 py-2">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className={`${brand.bg} ${brand.text} ${brand.className} px-3 py-1 text-xs rounded-sm`}
        >
          {brand.name}
        </div>
      ))}
    </div>
  );
};

export default BrandLogos;
