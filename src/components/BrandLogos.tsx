import michelin from "@/assets/brands/michelin.jpeg";
import bridgestone from "@/assets/brands/bridgestone.jpeg";
import goodyear from "@/assets/brands/goodyear.jpeg";
import continental from "@/assets/brands/continental.jpg";
import hankook from "@/assets/brands/hankook.jpeg";
import pirelli from "@/assets/brands/pirelli.jpg";
import falken from "@/assets/brands/falken.jpeg";
import yokohama from "@/assets/brands/yokohama.jpeg";
import giti from "@/assets/brands/giti.jpg";

const BrandLogos = () => {
  const brands = [
    { name: "Michelin", logo: michelin },
    { name: "Bridgestone", logo: bridgestone },
    { name: "Goodyear", logo: goodyear },
    { name: "Continental", logo: continental },
    { name: "Hankook", logo: hankook },
    { name: "Pirelli", logo: pirelli },
    { name: "Falken", logo: falken },
    { name: "Yokohama", logo: yokohama },
    { name: "Giti", logo: giti },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 py-2">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className="bg-white rounded-sm overflow-hidden flex items-center justify-center h-10"
        >
          <img 
            src={brand.logo} 
            alt={brand.name} 
            className="h-full w-full object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default BrandLogos;
