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
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-indigo-100" />
        {/* Progress line */}
        <div
          className="absolute top-5 left-5 h-0.5 bg-indigo-400 transition-all duration-500 ease-out"
          style={{
            width: `calc(${(currentStep / (STEPS.length - 1)) * 100}% - 10px)`,
          }}
        />

        {STEPS.map(({ id, label, icon: Icon }) => {
          const done = id < currentStep;
          const active = id === currentStep;

          return (
            <button
              key={id}
              onClick={() => onStepClick(id)}
              className="relative z-10 flex flex-col items-center gap-2 group"
              aria-label={`Paso ${id + 1}: ${label}`}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-2xl border-2 transition-all duration-300",
                  active &&
                    "border-indigo-400 bg-indigo-500 shadow-[0_6px_0_0_#4338CA] scale-110",
                  done &&
                    "border-indigo-300 bg-indigo-100 shadow-[0_4px_0_0_#C7D2FE]",
                  !active &&
                    !done &&
                    "border-indigo-100 bg-white shadow-[0_4px_0_0_#E0E7FF] group-hover:border-indigo-200 group-hover:shadow-[0_4px_0_0_#C7D2FE]"
                )}
              >
                {done ? (
                  <Check size={14} className="text-indigo-500" />
                ) : (
                  <Icon
                    size={15}
                    className={cn(
                      "transition-colors duration-200",
                      active ? "text-white" : "text-indigo-300 group-hover:text-indigo-400"
                    )}
                  />
                )}
              </div>
              <span
                className={cn(
                  "hidden sm:block text-[11px] font-semibold transition-colors duration-200",
                  active ? "text-indigo-600" : done ? "text-indigo-400" : "text-indigo-200 group-hover:text-indigo-300"
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
      <Label className="text-xs font-bold uppercase tracking-widest text-indigo-400">
        {label}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-indigo-300 leading-snug">{hint}</p>}
    </div>
  );
}

// ─── Styled Input ─────────────────────────────────────────────────────────────

const inputCls =
  "bg-indigo-50 border-2 border-indigo-100 focus:border-indigo-400 focus-visible:ring-indigo-200 placeholder:text-indigo-200 text-indigo-900 rounded-xl shadow-[0_3px_0_0_#C7D2FE] transition-all";

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
            <SelectContent className="bg-white border-2 border-indigo-100 rounded-2xl shadow-[0_8px_0_0_#C7D2FE]">
              {TIPOS_NEGOCIO.map((t) => (
                <SelectItem
                  key={t}
                  value={t}
                  className="text-indigo-900 focus:bg-indigo-50 focus:text-indigo-700 rounded-xl"
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
            placeholder="Lun-Vie 9-18hs, Sáb 9-13hs"
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

      <Separator className="bg-indigo-100" />

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
      <p className="text-sm text-indigo-400 leading-relaxed">
        Lista los servicios o productos que ofrecés. El precio es opcional.
      </p>
      <div className="space-y-2">
        {data.servicios.map((s, i) => (
          <div
            key={i}
            className="group flex items-center gap-2.5 rounded-2xl border-2 border-indigo-100 bg-indigo-50 px-4 py-3 shadow-[0_4px_0_0_#C7D2FE] transition-all hover:border-indigo-200"
          >
            <span className="w-5 shrink-0 text-center font-bold text-xs text-indigo-300">
              {i + 1}
            </span>
            <Input
              placeholder="Nombre del servicio"
              value={s.name}
              onChange={(e) => update(i, "name", e.target.value)}
              className="h-7 flex-1 border-0 bg-transparent p-0 text-sm text-indigo-900 placeholder:text-indigo-200 focus-visible:ring-0"
            />
            <div className="h-4 w-0.5 shrink-0 bg-indigo-100" />
            <Input
              placeholder="$ precio"
              value={s.price}
              onChange={(e) => update(i, "price", e.target.value)}
              className="h-7 w-24 border-0 bg-transparent p-0 text-right text-sm text-indigo-400 placeholder:text-indigo-200 focus-visible:ring-0"
            />
            {data.servicios.length > 1 && (
              <button
                onClick={() => remove(i)}
                className="ml-0.5 rounded-xl p-1.5 text-indigo-200 opacity-0 transition-all hover:bg-red-50 hover:text-red-400 group-hover:opacity-100"
                aria-label="Eliminar servicio"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={add}
        className="flex items-center gap-1.5 py-1 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-600"
      >
        <Plus size={13} />
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
                "rounded-2xl border-2 px-4 py-2 text-sm font-semibold transition-all duration-200",
                data.estilo === e
                  ? "border-indigo-400 bg-indigo-500 text-white shadow-[0_4px_0_0_#4338CA]"
                  : "border-indigo-100 bg-indigo-50 text-indigo-400 shadow-[0_4px_0_0_#C7D2FE] hover:border-indigo-200 hover:text-indigo-600"
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
                className="border-indigo-300 text-indigo-500"
              />
              <Label
                htmlFor={`logo-${opt}`}
                className="cursor-pointer capitalize text-sm text-indigo-700 font-medium"
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
        <Label className="mb-3 block text-xs font-bold uppercase tracking-widest text-indigo-400">
          Páginas del sitio
        </Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PAGINAS_OPCIONES.map((p) => {
            const checked = data.paginas.includes(p);
            return (
              <label
                key={p}
                className={cn(
                  "flex cursor-pointer select-none items-center gap-2.5 rounded-2xl border-2 px-3 py-2.5 text-sm font-medium transition-all",
                  checked
                    ? "border-indigo-400 bg-indigo-500 text-white shadow-[0_4px_0_0_#4338CA]"
                    : "border-indigo-100 bg-indigo-50 text-indigo-400 shadow-[0_4px_0_0_#C7D2FE] hover:border-indigo-200"
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggle(p)}
                  className={cn(
                    "h-4 w-4 shrink-0 rounded-md border-2",
                    checked
                      ? "border-white bg-transparent data-[state=checked]:bg-white data-[state=checked]:text-indigo-500"
                      : "border-indigo-200 data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500"
                  )}
                />
                <span className="leading-tight">{p}</span>
              </label>
            );
          })}
        </div>
      </div>

      <Separator className="bg-indigo-100" />

      <div>
        <Label className="mb-3 block text-xs font-bold uppercase tracking-widest text-indigo-400">
          Funciones extra
        </Label>
        <div className="space-y-1">
          {extras.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between rounded-2xl border-2 border-indigo-50 px-4 py-3 transition-colors hover:border-indigo-100 hover:bg-indigo-50"
            >
              <span className="text-sm font-medium text-indigo-700">{label}</span>
              <Switch
                checked={data[key] as boolean}
                onCheckedChange={(v) => onExtrasChange(key, v)}
                className="data-[state=checked]:bg-indigo-500"
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
                "rounded-2xl border-2 px-4 py-2 text-sm font-semibold transition-all duration-200",
                data.stack === s
                  ? "border-indigo-400 bg-indigo-500 text-white shadow-[0_4px_0_0_#4338CA]"
                  : "border-indigo-100 bg-indigo-50 text-indigo-400 shadow-[0_4px_0_0_#C7D2FE] hover:border-indigo-200 hover:text-indigo-600"
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
                    className="border-indigo-300 text-indigo-500"
                  />
                  <Label
                    htmlFor={`${field}-${opt}`}
                    className="cursor-pointer capitalize text-sm font-medium text-indigo-700"
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
                className="border-indigo-300 text-indigo-500"
              />
              <Label
                htmlFor={`seo-${opt}`}
                className="cursor-pointer capitalize text-sm font-medium text-indigo-700"
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
      <div className="flex items-center gap-3 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-4 shadow-[0_4px_0_0_#A7F3D0]">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 shadow-[0_3px_0_0_#059669]">
          <Check size={14} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-emerald-700">¡Prompt listo!</p>
          <p className="text-xs text-emerald-500 mt-0.5">
            Copialo y pegalo en Claude para generar tu sitio.
          </p>
        </div>
        <Button
          onClick={copy}
          size="sm"
          className="shrink-0 h-9 gap-1.5 rounded-2xl border-0 bg-emerald-500 px-4 text-xs font-bold text-white shadow-[0_4px_0_0_#059669] hover:bg-emerald-600 hover:shadow-[0_2px_0_0_#059669] active:shadow-none active:translate-y-1 transition-all"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>

      {/* Code window */}
      <div className="overflow-hidden rounded-2xl border-2 border-indigo-100 bg-white shadow-[0_6px_0_0_#C7D2FE]">
        <div className="flex items-center gap-1.5 border-b-2 border-indigo-50 bg-indigo-50 px-4 py-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-2 font-mono text-[10px] font-bold text-indigo-300">prompt.md</span>
        </div>
        <div className="max-h-[360px] overflow-y-auto p-4">
          <pre className="font-mono text-xs leading-relaxed text-indigo-400 whitespace-pre-wrap">
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
        <div className="mb-5 inline-flex items-center gap-2 rounded-2xl border-2 border-indigo-200 bg-white px-4 py-2 shadow-[0_4px_0_0_#C7D2FE]">
          <Zap size={12} className="text-indigo-500" />
          <span className="text-[11px] font-black uppercase tracking-widest text-indigo-600">
            WebGen
          </span>
          <Badge
            variant="outline"
            className="h-5 rounded-xl border-2 border-indigo-200 bg-indigo-50 px-2 text-[9px] font-bold text-indigo-400"
          >
            Beta
          </Badge>
        </div>

        <h1 className="mb-3 text-4xl font-black tracking-tight text-indigo-900 sm:text-5xl">
          Generador de{" "}
          <span className="text-indigo-500">sitios web</span>
        </h1>
        <p className="mx-auto max-w-sm text-base leading-relaxed text-indigo-400">
          Completá el formulario y obtené el prompt perfecto para crear tu sitio con Claude.
        </p>
      </header>

      {/* ── Step Indicator ── */}
      <StepIndicator currentStep={step} onStepClick={setStep} />

      {/* ── Card ── */}
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl border-2 border-indigo-100 bg-white shadow-[0_8px_0_0_#C7D2FE]">
          {/* Card header */}
          <div className="flex items-center gap-3 border-b-2 border-indigo-50 bg-indigo-50/50 px-6 py-4 rounded-t-3xl">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 shadow-[0_4px_0_0_#4338CA]">
              <currentStep.icon size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-black leading-none text-indigo-900">
                {currentStep.label}
              </h2>
              <p className="mt-0.5 text-[11px] font-medium text-indigo-400">
                {currentStep.description}
              </p>
            </div>
            <span className="ml-auto font-mono text-xs font-bold text-indigo-300">
              {step + 1}/{STEPS.length}
            </span>
          </div>

          {/* Card body */}
          <div className="px-6 py-6">{renderStep()}</div>

          {/* Card footer */}
          <div className="flex items-center justify-between border-t-2 border-indigo-50 bg-indigo-50/30 px-6 py-4 rounded-b-3xl">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="h-10 gap-1.5 rounded-2xl border-2 border-indigo-100 bg-white px-4 text-indigo-400 shadow-[0_4px_0_0_#C7D2FE] hover:bg-indigo-50 hover:text-indigo-600 hover:shadow-[0_2px_0_0_#C7D2FE] disabled:opacity-30 disabled:shadow-none transition-all active:shadow-none active:translate-y-1"
            >
              <ChevronLeft size={14} />
              <span className="text-sm font-semibold">Anterior</span>
            </Button>

            {/* Dot indicator */}
            <div className="flex items-center gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === step
                      ? "h-2.5 w-6 bg-indigo-500"
                      : i < step
                      ? "h-2.5 w-2.5 bg-indigo-300"
                      : "h-2.5 w-2.5 bg-indigo-100"
                  )}
                />
              ))}
            </div>

            {step < STEPS.length - 1 ? (
              <Button
                onClick={() => setStep((s) => s + 1)}
                className="h-10 gap-1.5 rounded-2xl border-0 bg-indigo-500 px-5 text-white shadow-[0_4px_0_0_#4338CA] hover:bg-indigo-600 hover:shadow-[0_2px_0_0_#4338CA] active:shadow-none active:translate-y-1 transition-all"
              >
                <span className="text-sm font-bold">Siguiente</span>
                <ArrowRight size={14} />
              </Button>
            ) : (
              <Button
                onClick={() => { setForm(defaultForm); setStep(0); }}
                className="h-10 gap-1.5 rounded-2xl border-2 border-indigo-200 bg-white px-4 text-indigo-500 shadow-[0_4px_0_0_#C7D2FE] hover:bg-indigo-50 hover:shadow-[0_2px_0_0_#C7D2FE] active:shadow-none active:translate-y-1 transition-all"
              >
                <span className="text-sm font-semibold">Nuevo sitio</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs font-medium text-indigo-300">
        Los campos marcados con * son requeridos
      </p>
    </div>
  );
}
