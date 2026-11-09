import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form-field";
import type { InputErrors } from "../domain";
export type ObjectiveRow = { id: number; text: string };
export function CycleObjectivesStep({ rows, errors, onChange }: { rows: ObjectiveRow[]; errors: InputErrors; onChange: (rows: ObjectiveRow[]) => void }) {
 const root = useRef<HTMLDivElement>(null);
 const sequence = useRef(Math.max(0, ...rows.map((row) => row.id)) + 1);
 function focus(index: number) { setTimeout(() => (root.current?.querySelectorAll("textarea")[index] ?? root.current?.querySelector<HTMLButtonElement>("[data-add-objective]"))?.focus(), 0); }
 return <div ref={root} className="cycle-form">
  <p className="field-hint">O que você quer desenvolver neste ciclo? Registre pelo menos um objetivo.</p>
  {rows.map((row, index) => <div key={row.id} className="wizard-objective">
   <FormField id={`cycle-objective-${index}`} label={`Objetivo ${index + 1}`} error={errors[`objectives.${index}`]}>
    <Textarea id={`cycle-objective-${index}`} required rows={3} value={row.text} aria-invalid={!!errors[`objectives.${index}`] || undefined} aria-describedby={errors[`objectives.${index}`] ? `cycle-objective-${index}-error` : undefined} onChange={(e) => onChange(rows.map((item) => item.id === row.id ? { ...item, text: e.target.value } : item))} />
   </FormField>
   <Button type="button" variant="secondary" size="compact" aria-label={`Remover objetivo ${index + 1}`} onClick={() => { onChange(rows.filter((item) => item.id !== row.id)); focus(Math.min(index, rows.length - 2)); }}>Remover</Button>
  </div>)}
  {errors.objectives && <p className="field-error" role="alert">{errors.objectives}</p>}
  <Button type="button" data-add-objective variant="secondary" onClick={() => { onChange([...rows, { id: sequence.current++, text: "" }]); focus(rows.length); }}>Adicionar objetivo</Button>
 </div>;
}
