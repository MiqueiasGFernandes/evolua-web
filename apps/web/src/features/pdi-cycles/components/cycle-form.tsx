import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useRef, useState, type FormEvent } from "react";
import type { CreateCycleInput } from "../domain";

export const emptyCycleInput: CreateCycleInput = { title: "", description: null, durationType: "CUSTOM", startDate: "", endDate: "" };

export function CycleForm({ value, pending, onChange, onSubmit }: {
  value: CreateCycleInput;
  pending: boolean;
  onChange: (value: CreateCycleInput) => void;
  onSubmit: () => void;
}) {
  const [dateError, setDateError] = useState("");
  const endRef = useRef<HTMLInputElement>(null);
  const endMinimum = useMemo(() => {
    if (!value.startDate) return undefined;
    const date = new Date(`${value.startDate}T12:00:00`);
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }, [value.startDate]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (value.startDate && value.endDate && value.endDate <= value.startDate) {
      setDateError("A data final deve ser posterior à data inicial.");
      endRef.current?.focus();
      return;
    }
    setDateError("");
    onSubmit();
  }

  return (
    <form className="cycle-form" onSubmit={submit} aria-busy={pending || undefined}>
      <FormField id="cycle-title" label="Título" hint="Entre 3 e 120 caracteres.">
        <Input id="cycle-title" required minLength={3} maxLength={120} autoComplete="off" value={value.title} aria-describedby="cycle-title-hint" onChange={(event) => onChange({ ...value, title: event.target.value })} />
      </FormField>
      <FormField id="cycle-description" label="Descrição" optional hint="Até 2.000 caracteres.">
        <Textarea id="cycle-description" maxLength={2000} value={value.description ?? ""} aria-describedby="cycle-description-hint" onChange={(event) => onChange({ ...value, description: event.target.value || null })} />
      </FormField>
      <FormField id="cycle-duration" label="Tipo de duração">
        <NativeSelect id="cycle-duration" value={value.durationType} onChange={(event) => onChange({ ...value, durationType: event.target.value as CreateCycleInput["durationType"] })}>
          <option value="TRIMESTER">Trimestral</option><option value="SEMESTER">Semestral</option><option value="YEAR">Anual</option><option value="CUSTOM">Personalizado</option>
        </NativeSelect>
      </FormField>
      <div className="form-dates">
        <FormField id="cycle-start" label="Data inicial">
          <Input id="cycle-start" required type="date" value={value.startDate} onChange={(event) => { setDateError(""); onChange({ ...value, startDate: event.target.value }); }} />
        </FormField>
        <FormField id="cycle-end" label="Data final" error={dateError}>
          <Input ref={endRef} id="cycle-end" required type="date" min={endMinimum} value={value.endDate} aria-invalid={Boolean(dateError) || undefined} aria-describedby={dateError ? "cycle-end-error" : undefined} onChange={(event) => { setDateError(""); onChange({ ...value, endDate: event.target.value }); }} />
        </FormField>
      </div>
      <div className="form-actions">
        <Button type="submit" pending={pending} pendingLabel="Criando ciclo…">Criar ciclo</Button>
        <span className="field-hint">O ciclo será criado como rascunho.</span>
      </div>
    </form>
  );
}
