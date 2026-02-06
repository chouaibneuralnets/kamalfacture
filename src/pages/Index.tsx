import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import InvoiceHeader from "@/components/InvoiceHeader";
import ClientInfo from "@/components/ClientInfo";
import InvoiceTable, { InvoiceItem } from "@/components/InvoiceTable";
import { toast } from "sonner";

const Index = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [invoiceNumber, setInvoiceNumber] = useState("FA2500001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [clientName, setClientName] = useState("");
  const [ice, setIce] = useState("");
  const [address, setAddress] = useState("");
  const [tvaRate, setTvaRate] = useState(20);
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", designation: "", quantity: 1, prixUnitaireTTC: 0 },
  ]);
  const [isDownloading, setIsDownloading] = useState(false);

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

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    // IMPORTANT: React state updates are async. We must ensure the UI has
    // re-rendered in Export Mode (static fields) BEFORE html2canvas takes a snapshot.
    flushSync(() => setIsDownloading(true));
    toast.info("Génération du PDF en cours...");
    
    try {
      // Wait for the export UI to paint (and for fonts to be ready) to avoid misalignment in the PDF.
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      // Ensure webfonts are fully loaded before rendering to canvas.
      if ("fonts" in document) {
        await document.fonts.ready;
      }

      // Masquer les boutons de suppression temporairement
      const noPrintElements = document.querySelectorAll('.no-print');
      noPrintElements.forEach((el) => ((el as HTMLElement).style.display = "none"));
      
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 3, // Augmenter la résolution pour une meilleure qualité
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: invoiceRef.current.scrollWidth,
        windowHeight: invoiceRef.current.scrollHeight,
      });
      
      // Restaurer les éléments
      noPrintElements.forEach((el) => ((el as HTMLElement).style.display = ""));
      
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculer les dimensions avec des marges
      const marginX = 10;
      const marginY = 10;
      const availableWidth = pdfWidth - (marginX * 2);
      const availableHeight = pdfHeight - (marginY * 2);
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(availableWidth / imgWidth, availableHeight / imgHeight);
      
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      
      // Centrer l'image sur la page
      const imgX = (pdfWidth - finalWidth) / 2;
      const imgY = marginY;
      
      pdf.addImage(imgData, "PNG", imgX, imgY, finalWidth, finalHeight, undefined, 'FAST');
      
      const fileName = `Facture_${invoiceNumber}_${clientName || "client"}.pdf`;
      pdf.save(fileName);
      
      toast.success("Facture téléchargée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast.error("Erreur lors de la génération du PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted p-4 md:p-8">
      {/* Boutons d'action */}
      <div className="max-w-4xl mx-auto mb-4 no-print flex gap-2 flex-wrap">
        <Button onClick={handleDownloadPDF} disabled={isDownloading} className="gap-2">
          <Download className="h-4 w-4" />
          {isDownloading ? "Téléchargement..." : "Télécharger PDF"}
        </Button>
        <Button onClick={handlePrint} variant="outline" className="gap-2">
          <Printer className="h-4 w-4" />
          Imprimer
        </Button>
      </div>

      {/* Facture */}
      <div ref={invoiceRef} className="invoice-surface max-w-4xl mx-auto bg-card p-6 md:p-10 shadow-lg">
        <InvoiceHeader
          invoiceNumber={invoiceNumber}
          date={date}
          onInvoiceNumberChange={setInvoiceNumber}
          onDateChange={setDate}
          exportMode={isDownloading}
        />

        <ClientInfo
          clientName={clientName}
          ice={ice}
          address={address}
          onClientNameChange={setClientName}
          onIceChange={setIce}
          onAddressChange={setAddress}
          exportMode={isDownloading}
        />

        <InvoiceTable
          items={items}
          tvaRate={tvaRate}
          onItemChange={handleItemChange}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
          onTvaChange={setTvaRate}
          exportMode={isDownloading}
        />

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-foreground text-center text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">PRIME STAR TIRE</p>
          <p>RC: 118530 | IF: 96361034 | Patente: 77331275</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
