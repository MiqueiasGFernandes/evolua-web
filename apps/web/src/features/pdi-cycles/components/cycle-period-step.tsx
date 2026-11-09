import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import type { CreateCycleInput, InputErrors } from "../domain";
import { formatCycleDate } from "./cycle-presentation";
export const durationLabels = { TRIMESTER: "Trimestral", SEMESTER: "Semestral", YEAR: "Anual", CUSTOM: "Personalizado" };
export function CyclePeriodStep({ value, errors, onChange }: { value: CreateCycleInput; errors: InputErrors; onChange: (value: CreateCycleInput) => void }) {
 return <div className="cycle-form">
  <FormField id="cycle-start" label="Data inicial" error={errors.startDate}>
   <Input id="cycle-start" type="date" required min="0001-01-01" max="9999-12-31" value={value.startDate} aria-invalid={!!errors.startDate || undefined} aria-describedby={errors.startDate ? "cycle-start-error" : undefined} onChange={(e) => onChange({ ...value, startDate: e.target.value })} />
  </FormField>
  <FormField id="cycle-duration" label="Tipo de duração" error={errors.durationType}>
   <NativeSelect id="cycle-duration" value={value.durationType} aria-invalid={!!errors.durationType || undefined} aria-describedby={errors.durationType ? "cycle-duration-error" : undefined} onChange={(e) => onChange({ ...value, durationType: e.target.value as CreateCycleInput["durationType"] })}>
    {Object.entries(durationLabels).map(([key, text]) => <option key={key} value={key}>{text}</option>)}
   </NativeSelect>
  </FormField>
  {value.durationType === "CUSTOM" ? <FormField id="cycle-end" label="Data final" error={errors.endDate}>
   <Input id="cycle-end" type="date" required min={value.startDate || "0001-01-01"} max="9999-12-31" value={value.endDate} aria-invalid={!!errors.endDate || undefined} aria-describedby={errors.endDate ? "cycle-end-error" : undefined} onChange={(e) => onChange({ ...value, endDate: e.target.value })} />
  </FormField> : <div className="wizard-calculated"><span className="field-label">Data final</span><output aria-label="Data final calculada" aria-live="polite">{value.endDate ? formatCycleDate(value.endDate) : "Informe o início para calcular"}</output><p className="field-hint">Calculado automaticamente a partir do início e da duração.</p>{errors.endDate && <p className="field-error">{errors.endDate}</p>}</div>}
 </div>;
}
