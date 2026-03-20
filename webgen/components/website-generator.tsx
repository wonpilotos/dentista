"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Building2,
  Palette,
  FileText,
  Settings,
  Code,
  Copy,
  Check,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Globe,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
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
  // Negocio
  nombre: string;
  tipo: string;
  slogan: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  email: string;
  horario: string;
  redes: string;
  // Servicios
  servicios: Service[];
  // Sobre el negocio
  descripcion: string;
  anios: string;
  diferencial: string;
  // Diseño
  estilo: string;
  colores: string;
  logo: string;
  referencias: string;
  // Páginas
  paginas: string[];
  // Extras
  formularioContacto: boolean;
  whatsapp: boolean;
  mapa: boolean;
  galeria: boolean;
  turnos: boolean;
  // Contenido
  textos: string;
  fotos: string;
  idioma: string;
  // Tecnología
  stack: string;
  seo: string;
}

const STEPS = [
  { id: 0, label: "Negocio", icon: Building2 },
  { id: 1, label: "Servicios", icon: FileText },
  { id: 2, label: "Diseño", icon: Palette },
  { id: 3, label: "Páginas", icon: Globe },
  { id: 4, label: "Tecnología", icon: Code },
  { id: 5, label: "Resumen", icon: Sparkles },
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

// ─── Step components ────────────────────────────────────────────────────────

function StepNegocio({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombre del negocio *">
          <Input
            placeholder="Ej: Dental Sonrisa"
            value={data.nombre}
            onChange={(e) => onChange("nombre", e.target.value)}
          />
        </Field>
        <Field label="Tipo de negocio *">
          <Select value={data.tipo} onValueChange={(v) => onChange("tipo", v ?? "")}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>
            <SelectContent>
              {TIPOS_NEGOCIO.map((t) => (
                <SelectItem key={t} value={t}>
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
          />
        </Field>
        <Field label="Ciudad">
          <Input
            placeholder="Ej: Buenos Aires"
            value={data.ciudad}
            onChange={(e) => onChange("ciudad", e.target.value)}
          />
        </Field>
        <Field label="Dirección">
          <Input
            placeholder="Ej: Av. Corrientes 1234, Piso 3"
            value={data.direccion}
            onChange={(e) => onChange("direccion", e.target.value)}
          />
        </Field>
        <Field label="Teléfono / WhatsApp">
          <Input
            type="tel"
            placeholder="+54 11 1234-5678"
            value={data.telefono}
            onChange={(e) => onChange("telefono", e.target.value)}
          />
        </Field>
        <Field label="Email">
          <Input
            type="email"
            placeholder="info@negocio.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </Field>
        <Field label="Horario de atención">
          <Input
            placeholder="Lun–Vie 9–18hs, Sáb 9–13hs"
            value={data.horario}
            onChange={(e) => onChange("horario", e.target.value)}
          />
        </Field>
      </div>
      <Field label="Redes sociales">
        <Input
          placeholder="@instagram, facebook.com/negocio, etc."
          value={data.redes}
          onChange={(e) => onChange("redes", e.target.value)}
        />
      </Field>
      <Separator className="bg-white/10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Descripción breve">
          <Textarea
            placeholder="¿Qué hace tu negocio?"
            className="resize-none"
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
            />
          </Field>
          <Field label="¿Qué te diferencia?">
            <Input
              placeholder="Ej: Atención personalizada, sin esperas"
              value={data.diferencial}
              onChange={(e) => onChange("diferencial", e.target.value)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

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
      <p className="text-sm text-slate-400">
        Lista tus servicios o productos principales.
      </p>
      {data.servicios.map((s, i) => (
        <div key={i} className="flex gap-2 items-center">
          <span className="text-slate-500 text-sm w-5 shrink-0">{i + 1}.</span>
          <Input
            placeholder="Nombre del servicio"
            value={s.name}
            onChange={(e) => update(i, "name", e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="Precio (opcional)"
            value={s.price}
            onChange={(e) => update(i, "price", e.target.value)}
            className="w-36"
          />
          {data.servicios.length > 1 && (
            <button
              onClick={() => remove(i)}
              className="text-slate-500 hover:text-red-400 transition-colors p-1"
              aria-label="Eliminar servicio"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={add}
        className="mt-2 border-white/10 hover:bg-white/5"
      >
        <Plus size={14} className="mr-1" />
        Agregar servicio
      </Button>
    </div>
  );
}

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
        <div className="flex flex-wrap gap-2 mt-1">
          {ESTILOS.map((e) => (
            <button
              key={e}
              onClick={() => onChange("estilo", e)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm border transition-all",
                data.estilo === e
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-white/10 text-slate-400 hover:border-white/30"
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
        />
      </Field>

      <Field label="¿Tenés logo?">
        <RadioGroup
          value={data.logo}
          onValueChange={(v) => onChange("logo", v)}
          className="flex gap-6 mt-1"
        >
          {["sí", "no", "necesito uno"].map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <RadioGroupItem value={opt} id={`logo-${opt}`} />
              <Label htmlFor={`logo-${opt}`} className="capitalize cursor-pointer">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Field>

      <Field label="Referencias visuales (URLs de sitios que te gusten)">
        <Textarea
          placeholder="https://ejemplo.com, https://otro.com"
          className="resize-none"
          rows={2}
          value={data.referencias}
          onChange={(e) => onChange("referencias", e.target.value)}
        />
      </Field>
    </div>
  );
}

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
        <Label className="text-sm font-medium text-slate-300 mb-3 block">
          Páginas del sitio
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {PAGINAS_OPCIONES.map((p) => (
            <label
              key={p}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 rounded-lg border cursor-pointer transition-all text-sm",
                data.paginas.includes(p)
                  ? "border-violet-500 bg-violet-500/10 text-violet-300"
                  : "border-white/10 text-slate-400 hover:border-white/20"
              )}
            >
              <Checkbox
                checked={data.paginas.includes(p)}
                onCheckedChange={() => toggle(p)}
                className="data-[state=checked]:bg-violet-500 data-[state=checked]:border-violet-500"
              />
              {p}
            </label>
          ))}
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div>
        <Label className="text-sm font-medium text-slate-300 mb-3 block">
          Funciones extra
        </Label>
        <div className="space-y-3">
          {extras.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-slate-300">{label}</span>
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

function StepTecnologia({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (key: keyof FormData, value: string) => void;
}) {
  const stacks = [
    "lo que mejor funcione",
    "Next.js",
    "React",
    "Vue",
    "HTML puro",
  ];
  const idiomas = ["español", "inglés", "ambos"];
  const textos = ["generarlos", "propios"];
  const fotos = ["placeholders", "propias"];

  return (
    <div className="space-y-6">
      <Field label="Stack tecnológico">
        <div className="flex flex-wrap gap-2 mt-1">
          {stacks.map((s) => (
            <button
              key={s}
              onClick={() => onChange("stack", s)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm border transition-all",
                data.stack === s
                  ? "border-violet-500 bg-violet-500/20 text-violet-300"
                  : "border-white/10 text-slate-400 hover:border-white/30"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Idioma del sitio">
        <RadioGroup
          value={data.idioma}
          onValueChange={(v) => onChange("idioma", v)}
          className="flex gap-6 mt-1"
        >
          {idiomas.map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <RadioGroupItem value={opt} id={`idioma-${opt}`} />
              <Label htmlFor={`idioma-${opt}`} className="capitalize cursor-pointer">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Field>

      <Field label="Textos del contenido">
        <RadioGroup
          value={data.textos}
          onValueChange={(v) => onChange("textos", v)}
          className="flex gap-6 mt-1"
        >
          {textos.map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <RadioGroupItem value={opt} id={`textos-${opt}`} />
              <Label htmlFor={`textos-${opt}`} className="capitalize cursor-pointer">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Field>

      <Field label="Fotos">
        <RadioGroup
          value={data.fotos}
          onValueChange={(v) => onChange("fotos", v)}
          className="flex gap-6 mt-1"
        >
          {fotos.map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <RadioGroupItem value={opt} id={`fotos-${opt}`} />
              <Label htmlFor={`fotos-${opt}`} className="capitalize cursor-pointer">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Field>

      <Field label="SEO básico">
        <RadioGroup
          value={data.seo}
          onValueChange={(v) => onChange("seo", v)}
          className="flex gap-6 mt-1"
        >
          {["sí", "no"].map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <RadioGroupItem value={opt} id={`seo-${opt}`} />
              <Label htmlFor={`seo-${opt}`} className="capitalize cursor-pointer">
                {opt}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </Field>
    </div>
  );
}

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
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Tu prompt está listo. Copialo y pegalo en Claude.
        </p>
        <Button
          onClick={copy}
          size="sm"
          className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copiado" : "Copiar prompt"}
        </Button>
      </div>
      <div className="relative bg-slate-950 border border-white/10 rounded-xl p-4 max-h-[420px] overflow-y-auto">
        <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
          {prompt}
        </pre>
      </div>
    </div>
  );
}

// ─── Field helper ───────────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm text-slate-300">{label}</Label>
      {children}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function WebsiteGenerator() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(defaultForm);

  const update = (key: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateBool = (key: keyof FormData, value: boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  const progress = (step / (STEPS.length - 1)) * 100;

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
    <div className="min-h-dvh flex flex-col items-center justify-start px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-4">
          <Globe size={14} className="text-violet-400" />
          <span className="text-xs text-violet-300 font-medium">WebGen</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Generador de sitios web
        </h1>
        <p className="text-slate-400 text-base">
          Completá el formulario y obtené el prompt listo para Claude.
        </p>
      </div>

      {/* Progress */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex justify-between mb-2">
          {STEPS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setStep(id)}
              className={cn(
                "flex flex-col items-center gap-1 text-xs transition-all",
                step === id
                  ? "text-violet-400"
                  : id < step
                  ? "text-slate-400"
                  : "text-slate-600"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border transition-all",
                  step === id
                    ? "border-violet-500 bg-violet-500/20"
                    : id < step
                    ? "border-slate-500 bg-slate-500/20"
                    : "border-white/10"
                )}
              >
                <Icon size={14} />
              </div>
              <span className="hidden sm:block">{label}</span>
            </button>
          ))}
        </div>
        <Progress value={progress} className="h-1 bg-white/10" />
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-slate-900/60 backdrop-blur border border-white/10 rounded-2xl shadow-2xl">
        {/* Card header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
          {(() => {
            const Icon = STEPS[step].icon;
            return <Icon size={18} className="text-violet-400" />;
          })()}
          <h2 className="text-base font-semibold text-white">
            {STEPS[step].label}
          </h2>
          <Badge
            variant="outline"
            className="ml-auto text-xs border-white/10 text-slate-500"
          >
            {step + 1} / {STEPS.length}
          </Badge>
        </div>

        {/* Card body */}
        <div className="px-6 py-6">{renderStep()}</div>

        {/* Card footer */}
        <div className="flex justify-between px-6 py-4 border-t border-white/10">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="text-slate-400 hover:text-white gap-1"
          >
            <ChevronLeft size={16} />
            Anterior
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              className="bg-violet-600 hover:bg-violet-700 text-white gap-1"
            >
              Siguiente
              <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              onClick={() => setStep(0)}
              variant="outline"
              className="border-white/10 text-slate-300 hover:bg-white/5"
            >
              Nuevo sitio
            </Button>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-slate-600">
        Los campos marcados con * son obligatorios
      </p>
    </div>
  );
}
