import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ClientInfoProps {
  clientName: string;
  ice: string;
  address: string;
  onClientNameChange: (value: string) => void;
  onIceChange: (value: string) => void;
  onAddressChange: (value: string) => void;
}

const ClientInfo = ({
  clientName,
  ice,
  address,
  onClientNameChange,
  onIceChange,
  onAddressChange,
}: ClientInfoProps) => {
  return (
    <div className="border border-foreground p-4 mt-4">
      <h3 className="font-semibold mb-3 border-b border-foreground pb-2">INFORMATIONS CLIENT</h3>
      <div className="grid gap-3">
        <div className="flex items-center gap-3">
          <Label className="w-32 font-medium">Nom Client:</Label>
          <Input
            value={clientName}
            onChange={(e) => onClientNameChange(e.target.value)}
            className="flex-1 border-foreground"
            placeholder="Nom du client"
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-32 font-medium">ICE:</Label>
          <Input
            value={ice}
            onChange={(e) => onIceChange(e.target.value)}
            className="flex-1 border-foreground"
            placeholder="Identifiant Commun de l'Entreprise"
          />
        </div>
        <div className="flex items-center gap-3">
          <Label className="w-32 font-medium">Adresse:</Label>
          <Input
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            className="flex-1 border-foreground"
            placeholder="Adresse du client"
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
