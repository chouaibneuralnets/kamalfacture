import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { numberToFrenchWords } from "@/lib/numberToWords";

export interface InvoiceItem {
  id: string;
  designation: string;
  quantity: number;
  prixUnitaireTTC: number;
}

interface InvoiceTableProps {
  items: InvoiceItem[];
  tvaRate: number;
  onItemChange: (id: string, field: keyof InvoiceItem, value: string | number) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onTvaChange: (value: number) => void;
  exportMode?: boolean;
}

const InvoiceTable = ({
  items,
  tvaRate,
  onItemChange,
  onAddItem,
  onRemoveItem,
  onTvaChange,
  exportMode = false,
}: InvoiceTableProps) => {
  const calculateTotalTTC = (item: InvoiceItem) => {
    return item.quantity * item.prixUnitaireTTC;
  };

  const totalTTC = items.reduce((sum, item) => sum + calculateTotalTTC(item), 0);
  const totalHT = totalTTC / (1 + tvaRate / 100);
  const totalTVA = totalTTC - totalHT;

  const formatNumber = (num: number) => {
    return num.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const displayText = (value: string) => (value?.trim() ? value : "\u00A0");
  const displayNumber = (value: number) => (value ? formatNumber(value) : "\u00A0");

  return (
    <div className="mt-6">
      <table className="w-full border-collapse border border-foreground">
        <thead>
          <tr className="bg-muted">
            <th className="border border-foreground p-2 text-left align-middle">Désignation</th>
            <th className="border border-foreground p-2 text-center w-24 align-middle">Quantité</th>
            <th className="border border-foreground p-2 text-right w-32 align-middle">P.U TTC</th>
            <th className="border border-foreground p-2 text-right w-32 align-middle">Total</th>
            <th className="border border-foreground p-2 w-12 no-print align-middle"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border border-foreground p-2 align-middle">
                {exportMode ? (
                  <div className="invoice-field invoice-field-display justify-start px-2 text-foreground font-medium">
                    {displayText(item.designation)}
                  </div>
                ) : (
                  <Input
                    value={item.designation}
                    onChange={(e) => onItemChange(item.id, "designation", e.target.value)}
                    className="invoice-field border-0 h-10 text-foreground font-medium px-2 placeholder:text-muted-foreground/50"
                    placeholder="Description du produit"
                  />
                )}
              </td>
              <td className="border border-foreground p-2 align-middle">
                {exportMode ? (
                  <div className="invoice-field invoice-field-display justify-center px-2 text-center tabular-nums text-foreground font-medium">
                    {item.quantity}
                  </div>
                ) : (
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onItemChange(item.id, "quantity", parseInt(e.target.value) || 0)}
                    className="invoice-field border-0 h-10 text-center tabular-nums text-foreground font-medium px-2"
                    min="1"
                  />
                )}
              </td>
              <td className="border border-foreground p-2 align-middle">
                {exportMode ? (
                  <div className="invoice-field invoice-field-display justify-end px-2 text-right tabular-nums text-foreground font-medium">
                    {displayNumber(item.prixUnitaireTTC)}
                  </div>
                ) : (
                  <Input
                    type="number"
                    value={item.prixUnitaireTTC}
                    onChange={(e) => onItemChange(item.id, "prixUnitaireTTC", parseFloat(e.target.value) || 0)}
                    className="invoice-field border-0 h-10 text-right tabular-nums text-foreground font-medium px-2"
                    step="0.01"
                  />
                )}
              </td>
              <td className="border border-foreground p-3 text-right font-semibold text-foreground align-middle">
                {formatNumber(calculateTotalTTC(item))}
              </td>
              <td className="border border-foreground p-1 no-print align-middle">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        variant="outline"
        size="sm"
        onClick={onAddItem}
        className="mt-2 no-print"
      >
        <Plus className="h-4 w-4 mr-1" /> Ajouter une ligne
      </Button>

      {/* Totaux */}
      <div className="mt-6 flex justify-end">
        <div className="w-72 border border-foreground">
          <div className="flex justify-between p-2 border-b border-foreground">
            <span>Total H.T.:</span>
            <span className="font-medium">{formatNumber(totalHT)} DH</span>
          </div>
          <div className="flex justify-between p-2 border-b border-foreground items-center">
            <span className="flex items-center gap-2">
              TVA
              {exportMode ? (
                <span className="invoice-field invoice-field-display justify-center w-16 rounded-md border border-input bg-background text-center tabular-nums text-foreground font-semibold">
                  {tvaRate}
                </span>
              ) : (
                <Input
                  type="number"
                  value={tvaRate}
                  onChange={(e) => onTvaChange(parseFloat(e.target.value) || 0)}
                  className="w-16 h-7 py-0 leading-none text-center tabular-nums border-foreground text-foreground font-semibold"
                  step="1"
                />
              )}
              %:
            </span>
            <span className="font-medium">{formatNumber(totalTVA)} DH</span>
          </div>
          <div className="flex justify-between p-2 bg-muted font-bold">
            <span>Total TTC:</span>
            <span>{formatNumber(totalTTC)} DH</span>
          </div>
        </div>
      </div>

      {/* Phrase d'arrêté */}
      <div className="mt-6 p-4 border border-foreground bg-muted/50">
        <p className="text-sm">
          <span className="font-semibold">Arrêté la présente facture à la somme de :</span>
        </p>
        <p className="mt-1 font-bold text-base">
          {numberToFrenchWords(totalTTC)}
        </p>
      </div>
    </div>
  );
};

export default InvoiceTable;
