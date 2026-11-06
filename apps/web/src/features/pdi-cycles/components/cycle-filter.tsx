import { NativeSelect } from "@/components/ui/native-select";
import type { CycleStatus } from "../domain";
import { cycleStatusLabel } from "./cycle-status";

const statuses: CycleStatus[] = ["DRAFT", "ACTIVE", "COMPLETED", "CANCELLED"];

export function CycleFilter({ value, onChange }: { value: CycleStatus | ""; onChange: (value: CycleStatus | "") => void }) {
  return (
    <div className="cycle-filter form-field">
      <label className="field-label" htmlFor="cycle-filter">Filtrar por status</label>
      <NativeSelect id="cycle-filter" value={value} onChange={(event) => onChange(event.target.value as CycleStatus | "")}>
        <option value="">Todos</option>
        {statuses.map((status) => <option key={status} value={status}>{cycleStatusLabel(status)}</option>)}
      </NativeSelect>
    </div>
  );
}
