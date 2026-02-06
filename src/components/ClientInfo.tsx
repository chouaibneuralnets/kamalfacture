import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClientInfoProps {
  clientName: string;
  ice: string;
  onClientNameChange: (value: string) => void;
  onIceChange: (value: string) => void;
  exportMode?: boolean;
}

const ClientInfo = ({
  clientName,
  ice,
  onClientNameChange,
  onIceChange,
  exportMode = false,
}: ClientInfoProps) => {
  return (
    <div className="border border-foreground p-4 mt-4">
      <h3 className="font-semibold mb-3 border-b border-foreground pb-2">INFORMATIONS CLIENT</h3>
      <div className="grid gap-3">
        <div className="flex items-center gap-3">
          <Label className="w-32 font-semibold text-foreground">Nom Client:</Label>
          {exportMode ? (
            <div className="flex-1 invoice-field invoice-field-display rounded-md border border-input bg-background px-3 font-medium text-foreground">
              {clientName || "\u00A0"}
            </div>
          ) : (
            <Input
              value={clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              className="flex-1 invoice-field border-foreground text-foreground font-medium h-10 px-3 placeholder:text-muted-foreground/50"
              placeholder="Nom du client"
            />
          )}
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-32 font-semibold text-foreground">ICE:</Label>
          {exportMode ? (
            <div className="flex-1 invoice-field invoice-field-display rounded-md border border-input bg-background px-3 font-medium text-foreground">
              {ice || "\u00A0"}
            </div>
          ) : (
            <Input
              value={ice}
              onChange={(e) => onIceChange(e.target.value)}
              className="flex-1 invoice-field border-foreground text-foreground font-medium h-10 px-3 placeholder:text-muted-foreground/50"
              placeholder="Identifiant Commun de l'Entreprise"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
