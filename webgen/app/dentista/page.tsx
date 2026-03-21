"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Star,
  Check,
  ChevronRight,
  Menu,
  X,
  Smile,
  Shield,
  Sparkles,
  Heart,
  ArrowRight,
  MessageCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Design Tokens (Claymorphism · Sky/Cyan palette) ─────────────────────────
// bg: #F0F9FF (sky-50), card: white, shadow: #7DD3FC (sky-300)
// primary: #0EA5E9 (sky-500), accent: #06B6D4 (cyan-500), text: #0C4A6E (sky-900)

const clay =
  "rounded-3xl border-2 border-sky-100 bg-white shadow-[0_8px_0_0_#7DD3FC]";
const clayBtn =
  "rounded-2xl border-0 bg-sky-500 text-white shadow-[0_5px_0_0_#0284C7] hover:bg-sky-600 hover:shadow-[0_3px_0_0_#0284C7] active:shadow-none active:translate-y-1 transition-all duration-150 font-bold";
const clayBtnOut =
  "rounded-2xl border-2 border-sky-200 bg-white text-sky-600 shadow-[0_5px_0_0_#BAE6FD] hover:bg-sky-50 hover:shadow-[0_3px_0_0_#BAE6FD] active:shadow-none active:translate-y-1 transition-all duration-150 font-bold";
const inputCls =
  "bg-sky-50 border-2 border-sky-100 focus:border-sky-400 focus-visible:ring-sky-200 placeholder:text-sky-300 text-sky-900 rounded-xl shadow-[0_3px_0_0_#BAE6FD] transition-all";

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICIOS = [
  {
    icon: Smile,
    title: "Blanqueamiento",
    desc: "Recuperá el brillo natural de tus dientes con nuestro tratamiento profesional de blanqueamiento dental.",
    price: "Desde $15.000",
    color: "sky",
  },
  {
    icon: Shield,
    title: "Implantes",
    desc: "Soluciones permanentes y naturales para reemplazar dientes perdidos con la tecnología más avanzada.",
    price: "Desde $80.000",
    color: "cyan",
  },
  {
    icon: Sparkles,
    title: "Ortodoncia",
    desc: "Alineá tu sonrisa con brackets o alineadores invisibles diseñados especialmente para vos.",
    price: "Desde $25.000",
    color: "teal",
  },
  {
    icon: Heart,
    title: "Limpieza Dental",
    desc: "Limpieza profesional y detartraje para mantener tu salud bucal en óptimas condiciones.",
    price: "Desde $8.000",
    color: "sky",
  },
];

const COLORES_SERVICIOS = {
  sky: {
    bg: "bg-sky-50",
    icon: "bg-sky-500 shadow-[0_4px_0_0_#0284C7]",
    badge: "border-sky-200 bg-sky-50 text-sky-600",
    shadow: "shadow-[0_8px_0_0_#7DD3FC]",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "bg-cyan-500 shadow-[0_4px_0_0_#0891B2]",
    badge: "border-cyan-200 bg-cyan-50 text-cyan-600",
    shadow: "shadow-[0_8px_0_0_#67E8F9]",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "bg-teal-500 shadow-[0_4px_0_0_#0F766E]",
    badge: "border-teal-200 bg-teal-50 text-teal-600",
    shadow: "shadow-[0_8px_0_0_#5EEAD4]",
  },
};

const TESTIMONIOS = [
  {
    nombre: "María García",
    texto:
      "Increíble atención desde el primer momento. Me hicieron el blanqueamiento y los resultados superaron todas mis expectativas. ¡100% recomendado!",
    estrellas: 5,
    servicio: "Blanqueamiento",
  },
  {
    nombre: "Carlos López",
    texto:
      "Llegué con mucho miedo al dentista y el Dr. Rodríguez me hizo sentir completamente tranquilo. Excelente profesional y muy humano.",
    estrellas: 5,
    servicio: "Implante dental",
  },
  {
    nombre: "Lucía Martínez",
    texto:
      "Llevo 8 meses con los alineadores invisibles y el cambio es impresionante. El seguimiento mensual es muy detallado y profesional.",
    estrellas: 5,
    servicio: "Ortodoncia",
  },
];

const STATS = [
  { valor: "15+", label: "Años de experiencia" },
  { valor: "3.000+", label: "Pacientes satisfechos" },
  { valor: "98%", label: "Tasa de satisfacción" },
  { valor: "5★", label: "Calificación promedio" },
];

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Servicios", "Nosotros", "Testimonios", "Contacto"];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <nav className="flex items-center justify-between rounded-3xl border-2 border-sky-100 bg-white/90 px-5 py-3 shadow-[0_6px_0_0_#BAE6FD] backdrop-blur-sm">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500 shadow-[0_4px_0_0_#0284C7]">
              <Smile size={18} className="text-white" />
            </div>
            <span className="text-lg font-black text-sky-900">
              Dental<span className="text-sky-500">Pro</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-50 hover:text-sky-500"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+5411123456789"
              className="hidden items-center gap-1.5 text-sm font-semibold text-sky-600 md:flex"
            >
              <Phone size={14} />
              11 1234-5678
            </a>
            <Button
              className={cn(clayBtn, "h-9 px-4 text-sm")}
              onClick={() =>
                document
                  .getElementById("contacto")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Pedir turno
            </Button>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 items-center justify-center rounded-2xl border-2 border-sky-100 bg-sky-50 md:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? (
                <X size={16} className="text-sky-600" />
              ) : (
                <Menu size={16} className="text-sky-600" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="mt-2 rounded-3xl border-2 border-sky-100 bg-white p-4 shadow-[0_6px_0_0_#BAE6FD]">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold text-sky-700 hover:bg-sky-50"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="inicio" className="mx-auto max-w-6xl px-4 pt-12 pb-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <div className="mb-5 inline-flex items-center gap-2 rounded-2xl border-2 border-sky-200 bg-sky-50 px-4 py-2 shadow-[0_4px_0_0_#BAE6FD]">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-sky-700">
              +3.000 pacientes satisfechos
            </span>
          </div>

          <h1 className="mb-5 text-4xl font-black leading-tight text-sky-900 sm:text-5xl lg:text-6xl">
            Tu sonrisa,{" "}
            <span className="text-sky-500">nuestra</span>{" "}
            <span className="text-cyan-500">pasión</span>
          </h1>

          <p className="mb-8 max-w-md text-base leading-relaxed text-sky-600">
            Odontología integral con la tecnología más avanzada. Tratamos cada
            paciente con calidez, profesionalismo y una sonrisa que dura toda la
            vida.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              className={cn(clayBtn, "h-12 gap-2 px-6 text-base")}
              onClick={() =>
                document
                  .getElementById("contacto")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Pedir turno gratis
              <ArrowRight size={16} />
            </Button>
            <Button
              className={cn(clayBtnOut, "h-12 gap-2 px-6 text-base")}
              onClick={() =>
                document
                  .getElementById("servicios")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver servicios
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap gap-3">
            {["Sin dolor", "Turnos rápidos", "Financiación disponible"].map(
              (b) => (
                <div
                  key={b}
                  className="flex items-center gap-1.5 rounded-2xl border-2 border-sky-100 bg-white px-3 py-1.5 shadow-[0_3px_0_0_#BAE6FD]"
                >
                  <Check size={12} className="text-sky-500" />
                  <span className="text-xs font-semibold text-sky-700">{b}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Image placeholder */}
        <div className="order-1 flex justify-center lg:order-2">
          <div
            className={cn(
              clay,
              "relative h-[380px] w-[340px] overflow-hidden sm:h-[440px] sm:w-[400px]"
            )}
          >
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-sky-100 to-cyan-100" />

            {/* Doctor silhouette placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-sky-500 shadow-[0_8px_0_0_#0284C7]">
                <Smile size={48} className="text-white" />
              </div>
              <p className="text-sm font-bold text-sky-400">Dr. Alejandro Rodríguez</p>
              <p className="text-xs text-sky-300">Odontólogo MN 45.231</p>
            </div>

            {/* Floating cards */}
            <div className="absolute right-4 top-6 rounded-2xl border-2 border-sky-100 bg-white px-3 py-2 shadow-[0_4px_0_0_#BAE6FD]">
              <div className="flex items-center gap-1.5">
                <Star size={11} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-black text-sky-900">5.0</span>
                <span className="text-[10px] text-sky-400">Google</span>
              </div>
            </div>

            <div className="absolute bottom-6 left-4 rounded-2xl border-2 border-sky-100 bg-white px-3 py-2 shadow-[0_4px_0_0_#BAE6FD]">
              <p className="text-[10px] font-bold text-sky-400">Próximo turno</p>
              <p className="text-xs font-black text-sky-900">Hoy disponible</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map(({ valor, label }) => (
          <div
            key={label}
            className={cn(clay, "p-5 text-center")}
          >
            <p className="text-2xl font-black text-sky-500">{valor}</p>
            <p className="mt-1 text-xs font-semibold text-sky-400">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Servicios ────────────────────────────────────────────────────────────────

function Servicios() {
  return (
    <section id="servicios" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-2 border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-600 shadow-[0_3px_0_0_#BAE6FD]"
          >
            Nuestros tratamientos
          </Badge>
          <h2 className="mb-3 text-3xl font-black text-sky-900 sm:text-4xl">
            Todo lo que tu sonrisa necesita
          </h2>
          <p className="mx-auto max-w-md text-base text-sky-500">
            Ofrecemos una amplia gama de tratamientos dentales con tecnología de
            última generación.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICIOS.map(({ icon: Icon, title, desc, price, color }) => {
            const c = COLORES_SERVICIOS[color as keyof typeof COLORES_SERVICIOS];
            return (
              <div
                key={title}
                className={cn(
                  "group rounded-3xl border-2 border-sky-100 bg-white p-6 transition-transform duration-200 hover:-translate-y-1",
                  c.shadow
                )}
              >
                <div
                  className={cn(
                    "mb-4 flex h-12 w-12 items-center justify-center rounded-2xl",
                    c.icon
                  )}
                >
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="mb-2 text-base font-black text-sky-900">{title}</h3>
                <p className="mb-4 text-xs leading-relaxed text-sky-500">{desc}</p>
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className={cn("border-2 text-[10px] font-bold", c.badge)}
                  >
                    {price}
                  </Badge>
                  <ChevronRight
                    size={14}
                    className="text-sky-300 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button
            className={cn(clayBtn, "h-12 gap-2 px-8")}
            onClick={() =>
              document
                .getElementById("contacto")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Consultar por un servicio
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─── Nosotros ─────────────────────────────────────────────────────────────────

function Nosotros() {
  const puntos = [
    "Tecnología digital de última generación",
    "Diagnóstico por rayos X digital de baja radiación",
    "Ambiente cálido y libre de estrés",
    "Atención personalizada para cada paciente",
    "Materiales de primera calidad",
    "Financiación sin interés disponible",
  ];

  return (
    <section id="nosotros" className="bg-[#F0F9FF] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image side */}
          <div className="relative flex justify-center">
            <div
              className={cn(
                clay,
                "h-[380px] w-[340px] overflow-hidden sm:h-[440px] sm:w-[400px]"
              )}
            >
              <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-sky-100">
                <div className="mb-4 grid grid-cols-2 gap-3">
                  {[Shield, Heart, Sparkles, Smile].map((Icon, i) => (
                    <div
                      key={i}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500 shadow-[0_5px_0_0_#0284C7]"
                    >
                      <Icon size={28} className="text-white" />
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-sm font-bold text-sky-400">
                  Nuestro equipo
                </p>
              </div>
            </div>
            {/* Badge flotante */}
            <div className="absolute -bottom-4 -right-2 rounded-2xl border-2 border-sky-100 bg-white p-4 shadow-[0_6px_0_0_#7DD3FC] sm:right-4">
              <p className="text-xs font-bold text-sky-400">En la profesión</p>
              <p className="text-2xl font-black text-sky-900">15+ años</p>
            </div>
          </div>

          {/* Text side */}
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-2 border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-600 shadow-[0_3px_0_0_#BAE6FD]"
            >
              Sobre nosotros
            </Badge>
            <h2 className="mb-4 text-3xl font-black text-sky-900 sm:text-4xl">
              Más de 15 años cuidando sonrisas
            </h2>
            <p className="mb-6 text-base leading-relaxed text-sky-600">
              Somos un equipo de profesionales comprometidos con tu salud
              bucal. Nuestro consultorio combina la experiencia clínica con las
              últimas tecnologías para ofrecerte el mejor tratamiento posible.
            </p>

            <ul className="space-y-3">
              {puntos.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-sky-500 shadow-[0_2px_0_0_#0284C7]">
                    <Check size={11} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-sky-700">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
              <Button
                className={cn(clayBtn, "h-11 gap-2 px-5")}
                onClick={() =>
                  document
                    .getElementById("contacto")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Pedir turno
              </Button>
              <a
                href="tel:+5411123456789"
                className={cn(
                  clayBtnOut,
                  "inline-flex h-11 items-center gap-2 px-5 text-sm"
                )}
              >
                <Phone size={14} />
                Llamar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonios ──────────────────────────────────────────────────────────────

function Testimonios() {
  return (
    <section id="testimonios" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-2 border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-600 shadow-[0_3px_0_0_#BAE6FD]"
          >
            Testimonios
          </Badge>
          <h2 className="mb-3 text-3xl font-black text-sky-900 sm:text-4xl">
            Lo que dicen nuestros pacientes
          </h2>
          <p className="text-base text-sky-500">
            Más de 3.000 pacientes confían en nosotros
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {TESTIMONIOS.map(({ nombre, texto, estrellas, servicio }) => (
            <div
              key={nombre}
              className={cn(clay, "flex flex-col gap-4 p-6")}
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: estrellas }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="flex-1 text-sm leading-relaxed text-sky-600">
                &ldquo;{texto}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t-2 border-sky-50 pt-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-sky-500 shadow-[0_3px_0_0_#0284C7]">
                  <span className="text-sm font-black text-white">
                    {nombre.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-sky-900">{nombre}</p>
                  <p className="text-[11px] text-sky-400">{servicio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contacto ─────────────────────────────────────────────────────────────────

function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", tel: "", mensaje: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ nombre: "", email: "", tel: "", mensaje: "" });
  };

  return (
    <section id="contacto" className="bg-[#F0F9FF] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-2 border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-600 shadow-[0_3px_0_0_#BAE6FD]"
          >
            Contacto
          </Badge>
          <h2 className="mb-3 text-3xl font-black text-sky-900 sm:text-4xl">
            Pedí tu turno hoy
          </h2>
          <p className="text-base text-sky-500">
            Te respondemos en menos de 2 horas en horario de atención
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className={cn(clay, "p-6 sm:p-8")}>
            {sent ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-500 shadow-[0_6px_0_0_#0284C7]">
                  <Check size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-sky-900">
                  ¡Consulta enviada!
                </h3>
                <p className="text-sm text-sky-500">
                  Te contactaremos pronto para confirmar tu turno.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-sky-400">
                      Nombre *
                    </label>
                    <Input
                      required
                      placeholder="Tu nombre"
                      value={form.nombre}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, nombre: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-sky-400">
                      Teléfono
                    </label>
                    <Input
                      type="tel"
                      placeholder="11 1234-5678"
                      value={form.tel}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, tel: e.target.value }))
                      }
                      className={inputCls}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-sky-400">
                    Email *
                  </label>
                  <Input
                    type="email"
                    required
                    placeholder="tu@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className={inputCls}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-sky-400">
                    ¿En qué podemos ayudarte?
                  </label>
                  <Textarea
                    placeholder="Contanos sobre tu consulta o qué tratamiento te interesa..."
                    className={cn(inputCls, "resize-none")}
                    rows={4}
                    value={form.mensaje}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, mensaje: e.target.value }))
                    }
                  />
                </div>
                <Button type="submit" className={cn(clayBtn, "h-12 w-full gap-2 text-base")}>
                  Enviar consulta
                  <ArrowRight size={16} />
                </Button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: MapPin,
                label: "Dirección",
                value: "Av. Corrientes 1234, Piso 3",
                sub: "CABA, Buenos Aires",
              },
              {
                icon: Phone,
                label: "Teléfono",
                value: "11 1234-5678",
                sub: "WhatsApp disponible",
              },
              {
                icon: Mail,
                label: "Email",
                value: "info@dentalpro.com.ar",
                sub: "Respondemos en 2h",
              },
              {
                icon: Clock,
                label: "Horarios",
                value: "Lun–Vie 9:00–19:00",
                sub: "Sáb 9:00–14:00",
              },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div
                key={label}
                className={cn(clay, "flex items-center gap-4 p-5")}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500 shadow-[0_4px_0_0_#0284C7]">
                  <Icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-sky-400">
                    {label}
                  </p>
                  <p className="text-sm font-bold text-sky-900">{value}</p>
                  <p className="text-xs text-sky-400">{sub}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className={cn(clay, "flex flex-1 items-center justify-center min-h-[120px]")}>
              <div className="text-center">
                <MapPin size={32} className="mx-auto mb-2 text-sky-300" />
                <p className="text-xs font-semibold text-sky-400">
                  Av. Corrientes 1234, CABA
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs font-bold text-sky-500 underline-offset-2 hover:underline"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t-2 border-sky-100 bg-white py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500 shadow-[0_4px_0_0_#0284C7]">
              <Smile size={18} className="text-white" />
            </div>
            <span className="text-lg font-black text-sky-900">
              Dental<span className="text-sky-500">Pro</span>
            </span>
          </div>

          <p className="text-xs text-sky-400">
            © {new Date().getFullYear()} DentalPro. Todos los derechos reservados.
          </p>

          <div className="flex gap-2">
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-2xl border-2 border-sky-100 bg-sky-50 text-sky-400 shadow-[0_3px_0_0_#BAE6FD] transition-colors hover:bg-sky-500 hover:text-white"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── WhatsApp FAB ─────────────────────────────────────────────────────────────

function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/5491112345678?text=Hola!%20Quiero%20pedir%20un%20turno."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-3xl bg-[#25D366] shadow-[0_6px_0_0_#128C50] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_0_0_#128C50] active:translate-y-1 active:shadow-none"
    >
      <MessageCircle size={26} className="text-white" />
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DentistaPage() {
  return (
    <div className="min-h-dvh bg-[#F0F9FF]">
      <Navbar />
      <Hero />
      <Servicios />
      <Nosotros />
      <Testimonios />
      <Contacto />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
