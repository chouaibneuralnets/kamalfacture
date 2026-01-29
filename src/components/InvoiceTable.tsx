import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

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
}

const InvoiceTable = ({
  items,
  tvaRate,
  onItemChange,
  onAddItem,
  onRemoveItem,
  onTvaChange,
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

  return (
    <div className="mt-6">
      <table className="w-full border-collapse border border-foreground">
        <thead>
          <tr className="bg-muted">
            <th className="border border-foreground p-2 text-left">Désignation</th>
            <th className="border border-foreground p-2 text-center w-24">Quantité</th>
            <th className="border border-foreground p-2 text-right w-32">P.U TTC</th>
            <th className="border border-foreground p-2 text-right w-32">Total</th>
            <th className="border border-foreground p-2 w-12 no-print"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="border border-foreground p-1">
                <Input
                  value={item.designation}
                  onChange={(e) => onItemChange(item.id, "designation", e.target.value)}
                  className="border-0 h-8"
                  placeholder="Description du produit"
                />
              </td>
              <td className="border border-foreground p-1">
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onItemChange(item.id, "quantity", parseInt(e.target.value) || 0)}
                  className="border-0 h-8 text-center"
                  min="1"
                />
              </td>
              <td className="border border-foreground p-1">
                <Input
                  type="number"
                  value={item.prixUnitaireTTC}
                  onChange={(e) => onItemChange(item.id, "prixUnitaireTTC", parseFloat(e.target.value) || 0)}
                  className="border-0 h-8 text-right"
                  step="0.01"
                />
              </td>
              <td className="border border-foreground p-2 text-right font-medium">
                {formatNumber(calculateTotalTTC(item))}
              </td>
              <td className="border border-foreground p-1 no-print">
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
              <Input
                type="number"
                value={tvaRate}
                onChange={(e) => onTvaChange(parseFloat(e.target.value) || 0)}
                className="w-16 h-6 text-center border-foreground"
                step="1"
              />
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
    </div>
  );
};

export default InvoiceTable;
