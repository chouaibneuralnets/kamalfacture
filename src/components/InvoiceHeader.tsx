import logo from "@/assets/logo.jpeg";
import BrandLogos from "./BrandLogos";

interface InvoiceHeaderProps {
  invoiceNumber: string;
  date: string;
  onInvoiceNumberChange: (value: string) => void;
  onDateChange: (value: string) => void;
  exportMode?: boolean;
}

const InvoiceHeader = ({
  invoiceNumber,
  date,
  onInvoiceNumberChange,
  onDateChange,
  exportMode = false,
}: InvoiceHeaderProps) => {
  return (
    <div className="border-b-2 border-foreground pb-4">
      <div className="flex justify-between items-start">
        {/* Logo et nom entreprise */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Prime Star Tire Logo" className="w-20 h-20 object-contain" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">PRIME STAR TIRE</h1>
            <p className="text-sm text-muted-foreground">Importation & distribution des pneus</p>
            <div className="mt-1 text-sm">
              <p>Tél: +212 661 888 114</p>
              <p>Tél: +212 626 672 019</p>
            </div>
          </div>
        </div>

        {/* Logos marques */}
        <div className="max-w-md">
          <BrandLogos />
        </div>
      </div>

      {/* Numéro facture et date */}
      <div className="mt-4 flex gap-8">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold whitespace-nowrap">FACTURE N°:</span>
          {exportMode ? (
            <div className="invoice-field invoice-field-display w-32 border-b-2 border-foreground bg-transparent px-2 font-semibold text-foreground">
              {invoiceNumber || "\u00A0"}
            </div>
          ) : (
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => onInvoiceNumberChange(e.target.value)}
              className="invoice-field border-b-2 border-foreground bg-transparent px-2 py-1 w-32 focus:outline-none focus:border-primary text-foreground font-semibold leading-normal"
            />
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold whitespace-nowrap">Date:</span>
          {exportMode ? (
            <div className="invoice-field invoice-field-display border-b-2 border-foreground bg-transparent px-2 font-semibold text-foreground">
              {date || "\u00A0"}
            </div>
          ) : (
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="invoice-field border-b-2 border-foreground bg-transparent px-2 py-1 focus:outline-none focus:border-primary text-foreground font-semibold leading-normal"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceHeader;
