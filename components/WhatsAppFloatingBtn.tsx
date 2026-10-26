export default function WhatsAppFloatingBtn({ defaultMessage }: { defaultMessage?: string }) {
  const text = defaultMessage 
    ? encodeURIComponent(defaultMessage)
    : encodeURIComponent("Bonjour, j'ai une question suite à ma lecture sur le Portail.");

  return (
    <aside aria-label="Assistance directe WhatsApp" className="fixed bottom-6 right-6 z-50 animate-bounce hover:animate-none">
      <a
        href={`https://wa.me/237693845941?text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter directement sur WhatsApp avec notre conseiller"
        className="flex items-center space-x-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-5 py-3.5 rounded-full shadow-2xl transition-transform transform hover:scale-105 active:scale-95 border-2 border-white/20 min-h-[62px]"
      >
        <span className="text-3xl leading-none">💬</span>
        <div className="flex flex-col text-left">
          <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-100">Conseiller en direct</span>
          <span className="text-base font-black tracking-tight leading-tight">Poser une question</span>
        </div>
      </a>
    </aside>
  );
}
