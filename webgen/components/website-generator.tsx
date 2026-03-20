"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  Palette,
  FileText,
  Code,
  Copy,
  Check,
  Plus,
  Trash2,
  ChevronLeft,
  Globe,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Service {
  name: string;
  price: string;
}

interface FormData {
  nombre: string;
  tipo: string;
  slogan: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  email: string;
  horario: string;
  redes: string;
  servicios: Service[];
  descripcion: string;
  anios: string;
  diferencial: string;
  estilo: string;
  colores: string;
  logo: string;
  referencias: string;
  paginas: string[];
  formularioContacto: boolean;
  whatsapp: boolean;
  mapa: boolean;
  galeria: boolean;
  turnos: boolean;
  textos: string;
  fotos: string;
  idioma: string;
  stack: string;
  seo: string;
}

const STEPS = [
  { id: 0, label: "Negocio", icon: Building2, description: "Info básica" },
  { id: 1, label: "Servicios", icon: FileText, description: "Qué ofrecés" },
  { id: 2, label: "Diseño", icon: Palette, description: "Look & feel" },
  { id: 3, label: "Páginas", icon: Globe, description: "Estructura" },
  { id: 4, label: "Tecnología", icon: Code, description: "Stack y extras" },
  { id: 5, label: "Prompt", icon: Sparkles, description: "Listo para usar" },
];

const PAGINAS_OPCIONES = [
  "Inicio",
  "Servicios",
  "Sobre nosotros",
  "Galería",
  "Testimonios",
  "Contacto / Mapa",
  "Turnos online",
  "Blog",
  "Preguntas frecuentes",
];

const ESTILOS = [
  "Moderno",
  "Clásico",
  "Minimalista",
  "Colorido",
  "Profesional",
  "Elegante",
  "Juvenil",
];

const TIPOS_NEGOCIO = [
  "Dentista",
  "Médico / Clínica",
  "Restaurante / Café",
  "Peluquería / Barbería",
  "Taller mecánico",
  "Veterinaria",
  "Gimnasio / Pilates",
  "Abogado / Estudio jurídico",
  "Contador",
  "Inmobiliaria",
  "Tienda / Comercio",
  "Hotel / Hospedaje",
  "Otro",
];

const defaultForm: FormData = {
  nombre: "",
  tipo: "",
  slogan: "",
  ciudad: "",
  direccion: "",
  telefono: "",
  email: "",
  horario: "",
  redes: "",
  servicios: [{ name: "", price: "" }],
  descripcion: "",
  anios: "",
  diferencial: "",
  estilo: "",
  colores: "",
  logo: "no",
  referencias: "",
  paginas: ["Inicio", "Servicios", "Contacto / Mapa"],
  formularioContacto: true,
  whatsapp: true,
  mapa: true,
  galeria: false,
  turnos: false,
  textos: "generarlos",
  fotos: "placeholders",
  idioma: "español",
  stack: "lo que mejor funcione",
  seo: "sí",
};

function generatePrompt(data: FormData): string {
  const serviciosText = data.servicios
    .filter((s) => s.name)
    .map((s, i) => `  ${i + 1}. ${s.name}${s.price ? ` / $${s.price}` : ""}`)
    .join("\n");

  const paginasText = data.paginas.map((p) => `  - [x] ${p}`).join("\n");

  return `Crea un sitio web para mi negocio local.

## Negocio
- Nombre: ${data.nombre || "(completar)"}
- Tipo: ${data.tipo || "(completar)"}
- Slogan: ${data.slogan || "(sin slogan)"}
- Ciudad: ${data.ciudad || "(completar)"}
- Dirección: ${data.direccion || "(completar)"}
- Teléfono: ${data.telefono || "(completar)"}
- Email: ${data.email || "(completar)"}
- Horario: ${data.horario || "(completar)"}
- Redes sociales: ${data.redes || "(ninguna)"}

## Servicios
${serviciosText || "  (completar servicios)"}

## Sobre el negocio
- Descripción: ${data.descripcion || "(completar)"}
- Años en el negocio: ${data.anios || "(completar)"}
- Diferencial: ${data.diferencial || "(completar)"}

## Diseño
- Estilo: ${data.estilo || "(a elección)"}
- Colores: ${data.colores || "(a elección según el rubro)"}
- Logo: ${data.logo}
- Referencias visuales: ${data.referencias || "(ninguna)"}

## Páginas
${paginasText}

## Extras
- Formulario de contacto: ${data.formularioContacto ? "sí" : "no"}
- Botón WhatsApp flotante: ${data.whatsapp ? "sí" : "no"}
- Mapa Google Maps: ${data.mapa ? "sí" : "no"}
- Galería de fotos: ${data.galeria ? "sí" : "no"}
- Turnos/reservas online: ${data.turnos ? "sí" : "no"}

## Contenido
- Textos: ${data.textos}
- Fotos: ${data.fotos}
- Idioma: ${data.idioma}

## Tecnología
- Stack: ${data.stack}
- SEO básico: ${data.seo}

---
Usar: skill ui-ux-pro-max para diseño, componentes shadcn/ui y 21st.dev magic MCP.`;
}

// ─── Step Indicator ───────────────────────────────────────────────────────────

function StepIndicator({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (id: number) => void;
}) {
  return (
    <div className="w-full max-w-2xl mb-8">
      <div className="relative flex items-start justify-between">
        {/* Background line */}
        <div className="absolute top-4 left-4 right-4 h-px bg-white/8" />
        {/* Progress line */}
        <div
          className="absolute top-4 left-4 h-px bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500 ease-out"
          style={{
            width: `calc(${(currentStep / (STEPS.length - 1)) * 100}% - 8px)`,
          }}
        />

        {STEPS.map(({ id, label, icon: Icon }) => {
          const done = id < currentStep;
          const active = id === currentStep;

          return (
            <button
              key={id}
              onClick={() => onStepClick(id)}
              className="relative z-10 flex flex-col items-center gap-1.5 group"
              aria-label={`Paso ${id + 1}: ${label}`}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
                  active &&
                    "border-violet-400 bg-violet-500/25 shadow-[0_0_18px_rgba(139,92,246,0.55)]",
                  done && "border-violet-600/60 bg-violet-500/15",
                  !active && !done && "border-white/10 bg-white/4 group-hover:border-white/20"
                )}
              >
                {done ? (
                  <Check size={12} className="text-violet-400" />
                ) : (
                  <Icon
                    size={13}
                    className={cn(
                      "transition-colors duration-200",
                      active ? "text-violet-300" : "text-slate-600 group-hover:text-slate-500"
                    )}
                  />
                )}
                {active && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-violet-500/25" />
                )}
              </div>
              <span
                className={cn(
                  "hidden sm:block text-[10px] font-medium tracking-wide transition-colors duration-200",
                  active ? "text-violet-300" : done ? "text-slate-600" : "text-slate-700 group-hover:text-slate-600"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Field helper ─────────────────────────────────────────────────────────────

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
        {label}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-slate-700 leading-snug">{hint}</p>}
    </div>
  );
}

// ─── Styled Input shorthand ───────────────────────────────────────────────────

const inputCls =
  "bg-white/[0.04] border-white/10 focus:border-violet-500/50 focus-visible:ring-violet-500/20 placeholder:text-slate-700 text-slate-200 transition-colors";

// ─── Step: Negocio ────────────────────────────────────────────────────────────

function StepNegocio({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre del negocio *">
          <Input
            placeholder="Ej: Dental Sonrisa"
            value={data.nombre}
            onChange={(e) => onChange("nombre", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Tipo de negocio *">
          <Select value={data.tipo} onValueChange={(v) => onChange("tipo", v ?? "")}>
            <SelectTrigger className={inputCls}>
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent className="bg-[#0d1021] border-white/10">
              {TIPOS_NEGOCIO.map((t) => (
                <SelectItem
                  key={t}
                  value={t}
                  className="text-slate-300 focus:bg-violet-500/20 focus:text-violet-200"
                >
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Slogan">
          <Input
            placeholder="Ej: Tu sonrisa, nuestra pasión"
            value={data.slogan}
            onChange={(e) => onChange("slogan", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Ciudad">
          <Input
            placeholder="Ej: Buenos Aires"
            value={data.ciudad}
            onChange={(e) => onChange("ciudad", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Dirección">
          <Input
            placeholder="Av. Corrientes 1234, Piso 3"
            value={data.direccion}
            onChange={(e) => onChange("direccion", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Teléfono / WhatsApp">
          <Input
            type="tel"
            placeholder="+54 11 1234-5678"
            value={data.telefono}
            onChange={(e) => onChange("telefono", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            placeholder="info@negocio.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Horario de atención">
          <Input
            placeholder="Lun–Vie 9–18hs, Sáb 9–13hs"
            value={data.horario}
            onChange={(e) => onChange("horario", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Redes sociales">
        <Input
          placeholder="@instagram, facebook.com/negocio"
          value={data.redes}
          onChange={(e) => onChange("redes", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Separator className="bg-white/8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Descripción breve">
          <Textarea
            placeholder="¿Qué hace tu negocio?"
            className={cn(inputCls, "resize-none")}
            rows={3}
            value={data.descripcion}
            onChange={(e) => onChange("descripcion", e.target.value)}
          />
        </Field>
        <div className="space-y-4">
          <Field label="Años en el negocio">
            <Input
              placeholder="Ej: 10"
              value={data.anios}
              onChange={(e) => onChange("anios", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="¿Qué te diferencia?">
            <Input
              placeholder="Atención personalizada, sin esperas"
              value={data.diferencial}
              onChange={(e) => onChange("diferencial", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

// ─── Step: Servicios ──────────────────────────────────────────────────────────

function StepServicios({
  data,
  onServiciosChange,
}: {
  data: FormData;
  onServiciosChange: (servicios: Service[]) => void;
}) {
  const add = () =>
    onServiciosChange([...data.servicios, { name: "", price: "" }]);
  const remove = (i: number) =>
    onServiciosChange(data.servicios.filter((_, idx) => idx !== i));
  const update = (i: number, field: keyof Service, value: string) => {
    const updated = data.servicios.map((s, idx) =>
      idx === i ? { ...s, [field]: value } : s
    );
    onServiciosChange(updated);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 leading-relaxed">
        Lista los servicios o productos que ofrecés. El precio es opcional.
      </p>
      <div className="space-y-2">
        {data.servicios.map((s, i) => (
          <div
            key={i}
            className="group flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-white/12"
          >
            <span className="w-5 shrink-0 text-center font-mono text-[11px] text-slate-700">
              {i + 1}
            </span>
            <Input
              placeholder="Nombre del servicio"
              value={s.name}
              onChange={(e) => update(i, "name", e.target.value)}
              className="h-7 flex-1 border-0 bg-transparent p-0 text-sm text-slate-200 placeholder:text-slate-700 focus-visible:ring-0"
            />
            <div className="h-3.5 w-px shrink-0 bg-white/10" />
            <Input
              placeholder="$ precio"
              value={s.price}
              onChange={(e) => update(i, "price", e.target.value)}
              className="h-7 w-24 border-0 bg-transparent p-0 text-right text-sm text-slate-500 placeholder:text-slate-700 focus-visible:ring-0"
            />
            {data.servicios.length > 1 && (
              <button
                onClick={() => remove(i)}
                className="ml-0.5 rounded-md p-1 text-slate-700 opacity-0 transition-all hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
                aria-label="Eliminar servicio"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={add}
        className="flex items-center gap-1.5 py-1 text-xs text-slate-600 transition-colors hover:text-violet-400"
      >
        <Plus size={12} />
        Agregar servicio
      </button>
    </div>
  );
}

// ─── Step: Diseño ─────────────────────────────────────────────────────────────

function StepDiseno({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <Field label="Estilo visual">
        <div className="mt-1.5 flex flex-wrap gap-2">
          {ESTILOS.map((e) => (
            <button
              key={e}
              onClick={() => onChange("estilo", e)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200",
                data.estilo === e
                  ? "border-violet-400/60 bg-violet-500/20 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.25)]"
                  : "border-white/10 text-slate-600 hover:border-white/18 hover:text-slate-400"
              )}
            >
              {e}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Colores preferidos">
        <Input
          placeholder="Ej: azul y blanco, verde oscuro, colores cálidos"
          value={data.colores}
          onChange={(e) => onChange("colores", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field label="¿Tenés logo?">
        <RadioGroup
          value={data.logo}
          onValueChange={(v) => onChange("logo", v)}
          className="mt-1.5 flex gap-6"
        >
          {["sí", "no", "necesito uno"].map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt}
                id={`logo-${opt}`}
                className="border-white/20 text-violet-400"
              />
              <Label
                htmlFor={`logo-${opt}`}
                className="cursor-pointer capitalize text-sm text-slate-400"
              >
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Field>

      <Field
        label="Referencias visuales"
        hint="URLs de sitios que te gusten como referencia de diseño"
      >
        <Textarea
          placeholder="https://ejemplo.com, https://otro.com"
          className={cn(inputCls, "resize-none")}
          rows={2}
          value={data.referencias}
          onChange={(e) => onChange("referencias", e.target.value)}
        />
      </Field>
    </div>
  );
}

// ─── Step: Páginas ────────────────────────────────────────────────────────────

function StepPaginas({
  data,
  onPaginasChange,
  onExtrasChange,
}: {
  data: FormData;
  onPaginasChange: (paginas: string[]) => void;
  onExtrasChange: (key: keyof FormData, value: boolean) => void;
}) {
  const toggle = (p: string) => {
    onPaginasChange(
      data.paginas.includes(p)
        ? data.paginas.filter((x) => x !== p)
        : [...data.paginas, p]
    );
  };

  const extras: { key: keyof FormData; label: string }[] = [
    { key: "formularioContacto", label: "Formulario de contacto" },
    { key: "whatsapp", label: "Botón WhatsApp flotante" },
    { key: "mapa", label: "Mapa Google Maps" },
    { key: "galeria", label: "Galería de fotos" },
    { key: "turnos", label: "Turnos / reservas online" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-3 block text-[10px] font-semibold uppercase tracking-widest text-slate-600">
          Páginas del sitio
        </Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PAGINAS_OPCIONES.map((p) => {
            const checked = data.paginas.includes(p);
            return (
              <label
                key={p}
                className={cn(
                  "flex cursor-pointer select-none items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-all",
                  checked
                    ? "border-violet-400/45 bg-violet-500/10 text-violet-300"
                    : "border-white/8 bg-white/[0.02] text-slate-600 hover:border-white/12 hover:text-slate-500"
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggle(p)}
                  className="h-3.5 w-3.5 shrink-0 data-[state=checked]:border-violet-500 data-[state=checked]:bg-violet-500"
                />
                <span className="leading-tight">{p}</span>
              </label>
            );
          })}
        </div>
      </div>

      <Separator className="bg-white/8" />

      <div>
        <Label className="mb-3 block text-[10px] font-semibold uppercase tracking-widest text-slate-600">
          Funciones extra
        </Label>
        <div className="space-y-0.5">
          {extras.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-white/[0.02]"
            >
              <span className="text-sm text-slate-400">{label}</span>
              <Switch
                checked={data[key] as boolean}
                onCheckedChange={(v) => onExtrasChange(key, v)}
                className="data-[state=checked]:bg-violet-600"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step: Tecnología ─────────────────────────────────────────────────────────

function StepTecnologia({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}) {
  const stacks = ["lo que mejor funcione", "Next.js", "React", "Vue", "HTML puro"];
  const idiomas = ["español", "inglés", "ambos"];
  const textos = ["generarlos", "propios"];
  const fotos = ["placeholders", "propias"];

  return (
    <div className="space-y-6">
      <Field label="Stack tecnológico">
        <div className="mt-1.5 flex flex-wrap gap-2">
          {stacks.map((s) => (
            <button
              key={s}
              onClick={() => onChange("stack", s)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-all duration-200",
                data.stack === s
                  ? "border-violet-400/60 bg-violet-500/20 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.25)]"
                  : "border-white/10 text-slate-600 hover:border-white/18 hover:text-slate-400"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          { field: "idioma" as const, label: "Idioma", opts: idiomas },
          { field: "textos" as const, label: "Textos", opts: textos },
          { field: "fotos" as const, label: "Fotos", opts: fotos },
        ].map(({ field, label, opts }) => (
          <Field key={field} label={label}>
            <RadioGroup
              value={data[field]}
              onValueChange={(v) => onChange(field, v)}
              className="mt-1.5 flex flex-col gap-2"
            >
              {opts.map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={opt}
                    id={`${field}-${opt}`}
                    className="border-white/20 text-violet-400"
                  />
                  <Label
                    htmlFor={`${field}-${opt}`}
                    className="cursor-pointer capitalize text-sm text-slate-400"
                  >
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Field>
        ))}
      </div>

      <Field label="SEO básico">
        <RadioGroup
          value={data.seo}
          onValueChange={(v) => onChange("seo", v)}
          className="mt-1.5 flex gap-6"
        >
          {["sí", "no"].map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <RadioGroupItem
                value={opt}
                id={`seo-${opt}`}
                className="border-white/20 text-violet-400"
              />
              <Label
                htmlFor={`seo-${opt}`}
                className="cursor-pointer capitalize text-sm text-slate-400"
              >
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Field>
    </div>
  );
}

// ─── Step: Resumen ────────────────────────────────────────────────────────────

function StepResumen({ data }: { data: FormData }) {
  const prompt = generatePrompt(data);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    toast.success("Prompt copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Success banner */}
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/8 p-3.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
          <Check size={12} className="text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-emerald-300">¡Prompt listo!</p>
          <p className="text-xs text-emerald-700 mt-0.5">
            Copialo y pegalo en Claude para generar tu sitio.
          </p>
        </div>
        <Button
          onClick={copy}
          size="sm"
          className="shrink-0 h-8 gap-1.5 border-0 bg-emerald-600/70 px-3 text-xs text-white hover:bg-emerald-600"
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>

      {/* Code window */}
      <div className="overflow-hidden rounded-xl border border-white/8 bg-black/25">
        <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.02] px-4 py-2.5">
          <div className="h-2 w-2 rounded-full bg-red-500/60" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
          <div className="h-2 w-2 rounded-full bg-green-500/60" />
          <span className="ml-2 font-mono text-[10px] text-slate-700">prompt.md</span>
        </div>
        <div className="max-h-[360px] overflow-y-auto p-4">
          <pre className="font-mono text-xs leading-relaxed text-slate-500 whitespace-pre-wrap">
            {prompt}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function WebsiteGenerator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(defaultForm);

  const update = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateBool = (key: keyof FormData, value: boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const currentStep = STEPS[step];

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepNegocio data={form} onChange={update} />;
      case 1:
        return (
          <StepServicios
            data={form}
            onServiciosChange={(s) => setForm((f) => ({ ...f, servicios: s }))}
          />
        );
      case 2:
        return <StepDiseno data={form} onChange={update} />;
      case 3:
        return (
          <StepPaginas
            data={form}
            onPaginasChange={(p) => setForm((f) => ({ ...f, paginas: p }))}
            onExtrasChange={updateBool}
          />
        );
      case 4:
        return <StepTecnologia data={form} onChange={update} />;
      case 5:
        return <StepResumen data={form} />;
    }
  };

  return (
    <div className="relative z-10 flex min-h-dvh flex-col items-center justify-start px-4 py-12">
      {/* ── Header ── */}
      <header className="mb-10 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 backdrop-blur-sm">
          <Zap size={11} className="text-violet-400" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-violet-400">
            WebGen
          </span>
          <Badge
            variant="outline"
            className="h-4 border-violet-500/30 bg-transparent px-1.5 text-[9px] text-violet-500"
          >
            Beta
          </Badge>
        </div>

        <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Generador de
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
            sitios web
          </span>
        </h1>
        <p className="mx-auto max-w-sm text-base leading-relaxed text-slate-600">
          Completá el formulario y obtené el prompt perfecto para crear tu sitio con Claude.
        </p>
      </header>

      {/* ── Step Indicator ── */}
      <StepIndicator currentStep={step} onStepClick={setStep} />

      {/* ── Card ── */}
      <div className="w-full max-w-2xl">
        {/* Gradient border wrapper */}
        <div className="rounded-2xl bg-gradient-to-b from-white/14 via-white/5 to-transparent p-px">
          <div className="rounded-2xl bg-[#0c0f1e]/85 shadow-2xl backdrop-blur-2xl">
            {/* Card header */}
            <div className="flex items-center gap-3 border-b border-white/8 bg-white/[0.015] px-6 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/12">
                <currentStep.icon size={14} className="text-violet-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold leading-none text-white">
                  {currentStep.label}
                </h2>
                <p className="mt-0.5 text-[11px] text-slate-600">
                  {currentStep.description}
                </p>
              </div>
              <span className="ml-auto font-mono text-xs text-slate-700">
                {step + 1}/{STEPS.length}
              </span>
            </div>

            {/* Card body */}
            <div className="px-6 py-6">{renderStep()}</div>

            {/* Card footer */}
            <div className="flex items-center justify-between border-t border-white/8 bg-white/[0.01] px-6 py-4">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="h-9 gap-1.5 px-3 text-slate-600 hover:bg-white/5 hover:text-slate-300 disabled:opacity-25"
              >
                <ChevronLeft size={14} />
                <span className="text-sm">Anterior</span>
              </Button>

              {/* Dot indicator */}
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === step
                        ? "h-1.5 w-4 bg-violet-400"
                        : i < step
                        ? "h-1.5 w-1.5 bg-violet-700"
                        : "h-1.5 w-1.5 bg-white/10"
                    )}
                  />
                ))}
              </div>

              {step < STEPS.length - 1 ? (
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  className="h-9 gap-1.5 border-0 bg-gradient-to-r from-violet-600 to-violet-500 px-4 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all duration-200 hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-[0_0_24px_rgba(139,92,246,0.45)]"
                >
                  <span className="text-sm">Siguiente</span>
                  <ArrowRight size={13} />
                </Button>
              ) : (
                <Button
                  onClick={() => { setForm(defaultForm); setStep(0); }}
                  variant="outline"
                  className="h-9 gap-1.5 border-white/10 px-4 text-slate-500 hover:bg-white/5 hover:text-white"
                >
                  <span className="text-sm">Nuevo sitio</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 text-[11px] text-slate-700">
        Los campos marcados con * son requeridos
      </p>
    </div>
  );
}
