import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import InvoiceHeader from "@/components/InvoiceHeader";
import ClientInfo from "@/components/ClientInfo";
import InvoiceTable, { InvoiceItem } from "@/components/InvoiceTable";

const Index = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("FA2500001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [clientName, setClientName] = useState("");
  const [ice, setIce] = useState("");
  const [address, setAddress] = useState("");
  const [tvaRate, setTvaRate] = useState(20);
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", designation: "", quantity: 1, prixUnitaireTTC: 0 },
  ]);

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), designation: "", quantity: 1, prixUnitaireTTC: 0 },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8">
      {/* Bouton imprimer */}
      <div className="max-w-4xl mx-auto mb-4 no-print">
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" />
          Imprimer la facture
        </Button>
      </div>

      {/* Facture */}
      <div className="max-w-4xl mx-auto bg-card p-6 md:p-10 shadow-lg">
        <InvoiceHeader
          invoiceNumber={invoiceNumber}
          date={date}
          onInvoiceNumberChange={setInvoiceNumber}
          onDateChange={setDate}
        />

        <ClientInfo
          clientName={clientName}
          ice={ice}
          address={address}
          onClientNameChange={setClientName}
          onIceChange={setIce}
          onAddressChange={setAddress}
        />

        <InvoiceTable
          items={items}
          tvaRate={tvaRate}
          onItemChange={handleItemChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onTvaChange={setTvaRate}
        />

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-foreground text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">PRIME STAR TIRE</p>
          <p>Tél: +212 661 888 114 / +212 626 672 019</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
