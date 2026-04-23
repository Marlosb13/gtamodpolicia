import React, { useEffect, useState } from 'react';
import { ShieldCheck, Star, Smartphone, CheckCircle2, Zap, AlertOctagon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
  {
    name: "@alex.silva",
    avatar: "https://i.postimg.cc/Kv3qnXzh/vic.webp",
    text: "Tô jogando no Poco X5 Pro, deu certo aqui, valeu mesmo mano 👊"
  },
  {
    name: "@cpx.favela",
    avatar: "https://i.postimg.cc/SsKVR357/icon-masculino.webp",
    text: "O melhor que achei até agora, tava doido pra jogar esse modo polícia"
  },
  {
    name: "@neymarzin_7",
    avatar: "https://i.postimg.cc/Gt8QJYbj/gui.webp",
    text: "Passando pra dizer que funcionou no meu Android 14, instalação foi tranquila"
  },
  {
    name: "@verton.react",
    avatar: "https://i.postimg.cc/Xvsmsf6g/𝕹𝖔𝖛𝖎𝖓𝖍𝖔.webp",
    text: "Foi o único que pegou no Android 15 aqui, valeu demais"
  },
  {
    name: "@alan.haland",
    avatar: "https://i.postimg.cc/SsKVR357/icon-masculino.webp",
    text: "Primeira vez jogando modo polícia, curti muito mesmo 🔥"
  }
];

const BRAZILIAN_NAMES = [
  "Lucas", "Gabriel", "Matheus", "Felipe", "Guilherme", "Pedro", "João", "Gustavo", 
  "Vinicius", "Rodrigo", "Thiago", "Bruno", "Rafael", "Daniel", "Leonardo", 
  "Marcelo", "André", "Paulo", "Ricardo", "Fernando", "Samuel", "Vitor", 
  "Igor", "Caio", "Murilo", "Arthur", "Davi", "Enzo", "Bernardo", "Heitor", 
  "Nicolas", "Otávio", "Henrique", "Renan", "Diego"
];

const SalesNotification = () => {
  const [currentName, setCurrentName] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let lastGeneratedIndex = -1;

    const showNext = () => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * BRAZILIAN_NAMES.length);
      } while (randomIndex === lastGeneratedIndex);

      lastGeneratedIndex = randomIndex;
      setCurrentName(BRAZILIAN_NAMES[randomIndex]);
      setVisible(true);

      // Hide after 5 seconds
      timeout = setTimeout(() => {
        setVisible(false);
        
        // Schedule next one after 15-20 seconds
        const interval = Math.floor(Math.random() * 5000) + 15000;
        timeout = setTimeout(showNext, interval);
      }, 5000);
    };

    // First one after 8 seconds
    timeout = setTimeout(showNext, 8000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: -20, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed bottom-[100px] left-5 z-[1000] bg-[#1a1b23] border border-white/10 p-4 rounded-xl shadow-2xl flex flex-col max-w-[260px] w-full"
        >
          <div className="flex flex-col min-w-0">
            <span className="text-[14px] font-bold text-text truncate">
              {currentName} acabou de comprar
            </span>
            <span className="text-[12px] text-success font-semibold">
              GTA Versão Completa
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VSLPlayer = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handlePrimeiroClique = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = false;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(e => console.log('Autoplay prevented'));
    setShowOverlay(false);
    setIsPaused(false);
  };

  const togglePlay = () => {
    if (!videoRef.current || showOverlay) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const curvatura = 0.5;
      let progressoLogico = Math.pow((videoRef.current.currentTime / videoRef.current.duration), curvatura) * 100;
      if (progressoLogico > 100) progressoLogico = 100;
      setProgress(progressoLogico);
    }
  };

  const handleEnded = () => {
    setIsPaused(false);
    setProgress(100);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '20px auto 48px auto', background: '#000', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.5)', fontFamily: 'sans-serif' }}>
      <style>
        {`
          @keyframes vortex-pulse-blue {
              0% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.1); opacity: 0.4; }
              100% { transform: scale(1); opacity: 0.8; }
          }
          .vortex-pulse-button { animation: vortex-pulse-blue 2s infinite ease-in-out; }
        `}
      </style>

      <video 
        ref={videoRef}
        autoPlay 
        muted 
        playsInline 
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        style={{ width: '100%', height: 'auto', display: 'block', cursor: 'pointer' }}
      >
        <source src="https://ukctgxsxommqbpureavm.supabase.co/storage/v1/object/public/GTA%2001/Ssstik.Io%201776520456530%20(Online-Video-Cutter.Com).mp4" type="video/mp4" />
      </video>

      {showOverlay && (
        <div onClick={handlePrimeiroClique} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 30 }}>
          <div style={{ background: '#1e40af', color: 'white', padding: '15px 25px', borderRadius: '50px', fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 15px rgba(30,64,175,0.5)' }}>
            🔊 CLIQUE PARA OUVIR
          </div>
        </div>
      )}

      {isPaused && !showOverlay && (
        <div onClick={togglePlay} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 20 }}>
          <div className="vortex-pulse-button" style={{ width: '80px', height: '80px', background: 'rgba(30,64,175,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 0, height: 0, borderTop: '15px solid transparent', borderBottom: '15px solid transparent', borderLeft: '25px solid white', marginLeft: '5px' }}></div>
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '12px', background: 'rgba(255,255,255,0.2)', zIndex: 25 }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#1e40af', transition: 'width 0.1s linear' }}></div>
      </div>
    </div>
  );
};

export default function App() {
  const [basicCheckoutUrl, setBasicCheckoutUrl] = React.useState('https://pagamento.checkoutseguro.shop/checkout/v5/cfxh6NX1ZDvew29hIBTj');
  const [upsellCheckoutUrl, setUpsellCheckoutUrl] = React.useState('https://pagamento.checkoutseguro.shop/checkout/v5/0Eii7a4F0EBYa5Ve9MtF');
  const [downsellCheckoutUrl, setDownsellCheckoutUrl] = React.useState('https://pagamento.checkoutseguro.shop/checkout/v5/0SY9xaashgMSGX10QkZd');
  const [showUpsell, setShowUpsell] = React.useState(false);
  const [showDownsell, setShowDownsell] = React.useState(false);

  React.useEffect(() => {
    // Preserve URL parameters for UTM tracking
    const searchParams = window.location.search;
    if (searchParams) {
      setBasicCheckoutUrl(`https://pagamento.checkoutseguro.shop/checkout/v5/cfxh6NX1ZDvew29hIBTj${searchParams}`);
      setUpsellCheckoutUrl(`https://pagamento.checkoutseguro.shop/checkout/v5/0Eii7a4F0EBYa5Ve9MtF${searchParams}`);
      setDownsellCheckoutUrl(`https://pagamento.checkoutseguro.shop/checkout/v5/0SY9xaashgMSGX10QkZd${searchParams}`);
    }
  }, []);

  const handleSlowScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('oferta');
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 2500; // 2.5 seconds for a very slow, dramatic scroll
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function: easeInOutCubic
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
      window.scrollTo(0, startPosition + (distance * ease));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };

  return (
    <div className="min-h-screen bg-bg text-text font-body selection:bg-accent selection:text-white pb-20">
      <SalesNotification />
      
      <div className="max-w-[800px] mx-auto p-6 md:p-10 flex flex-col gap-10">
        
        {/* Main Column */}
        <div className="flex flex-col">
          
          <div className="mb-10 flex flex-col items-center">
            <span className="bg-accent text-white px-3 py-1 text-[12px] font-extrabold rounded mb-5 tracking-[1px] uppercase inline-block">
              VERSÃO ATUALIZADA 2026
            </span>

            <h1 className="font-display text-5xl sm:text-6xl md:text-[76px] leading-[0.9] uppercase mb-6 text-text text-center">
              GTA 2026 <span className="text-success">MOD POLÍCIA</span>
            </h1>

            <p className="text-[18px] leading-[1.5] text-muted mb-8 max-w-[600px] text-center">
              Compatível no Android 12 ao 16, instalação facil com turorial e passo passo para instalar, e acesso na hora sem encurtador, sem enrolação
            </p>

            {/* Video VSL Custom VORTEX */}
            <VSLPlayer />

            <a 
              href="#oferta"
              onClick={handleSlowScroll}
              className="bg-success text-black py-5 px-6 sm:px-10 font-black text-lg sm:text-xl uppercase rounded-lg text-center inline-block cursor-pointer border-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              GARANTA O SEU AGORA
            </a>

            {/* What you get list */}
            <div className="mt-8 bg-[rgba(255,255,255,0.05)] border border-white/10 p-5 rounded-2xl w-full max-w-[400px] mx-auto flex flex-col">
              <h3 className="text-md font-bold text-text mb-4 text-center uppercase tracking-wider">O QUE VOCÊ VAI RECEBER:</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-muted text-sm leading-relaxed font-medium">
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                  <span>APK do jogo</span>
                </div>
                <div className="flex items-center gap-3 text-muted text-sm leading-relaxed font-medium">
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                  <span>OBB + DATA completos</span>
                </div>
                <div className="flex items-center gap-3 text-muted text-sm leading-relaxed font-medium">
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                  <span>Tutorial passo a passo</span>
                </div>
                <div className="flex items-center gap-3 text-muted text-sm leading-relaxed font-medium">
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                  <span>Acesso imediato</span>
                </div>
                <div className="flex items-center gap-3 text-muted text-sm leading-relaxed font-medium">
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                  <span>Atualizações inclusas</span>
                </div>
              </div>
            </div>

            {/* New Section: No Link Shorteners */}
            <div className="mt-10 p-6 bg-[rgba(255,255,255,0.03)] border-2 border-accent/20 rounded-2xl text-center max-w-[600px] w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent/30"></div>
              <h3 className="font-display text-xl sm:text-2xl text-text uppercase mb-3 leading-tight">
                CHEGA DE CAIR EM LINK COM ENCURTADOR!
              </h3>
              <p className="text-[15px] sm:text-[16px] text-muted leading-relaxed">
                <span className="font-bold text-text uppercase text-xs mr-2 opacity-70 italic">Papo reto:</span>
                Cansado de ficar sendo redirecionado mil vezes e nunca chegar no download? A gente resolveu isso pra você. <span className="font-bold">Link direto, sem encurtador, sem enrolação. Baixou, instalou, jogou.</span>
              </p>
            </div>
          </div>

          {/* Testimonials moved here */}
          <div className="w-full flex flex-col items-center mb-6">
            <h2 className="font-display text-4xl uppercase text-center text-text">O Que a Galera Tá Falando</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 w-full mb-12">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] p-5 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-10 h-10 rounded-full object-cover" 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <div className="font-bold text-[14px] text-accent">{testimonial.name}</div>
                  </div>
                </div>
                <p className="text-[14px] text-text leading-[1.5] italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Offer / Purchase Section */}
          <section id="oferta" className="mt-8 mb-16">
            <div className="bg-[#0a0a0a] border-[3px] border-accent rounded-3xl p-5 sm:p-8 flex flex-col items-center relative overflow-hidden">
              
              <div className="border-[2px] border-accent/40 rounded-xl p-1.5 sm:p-2 mb-3 sm:mb-6 text-accent inline-block">
                <AlertOctagon size={28} />
              </div>
              
              <h2 className="font-display text-5xl sm:text-[64px] leading-none uppercase tracking-tight mb-3 sm:mb-6 text-text text-center">
                ACESSO<br/>EXCLUSIVO
              </h2>
              
              <h3 className="font-display text-2xl mb-3 sm:mb-6 text-success text-center uppercase">
                PACOTE COMPLETO: APK +<br/>OBB + DATA
              </h3>
              
              <p className="text-muted mb-4 sm:mb-8 text-base leading-relaxed text-center max-w-sm">
                Acesso garantido a futuras atualizações sem cobranças adicionais.
                <span className="block mt-2 sm:mt-4 font-bold text-text uppercase text-xs sm:text-sm tracking-wide">Pagamento Único • Acesso Vitalício</span>
                <span className="block mt-1 text-success font-bold text-sm uppercase italic">Receba tudo no seu e-mail</span>
              </p>

              <div className="text-[72px] sm:text-[96px] font-display text-text leading-none mb-4 sm:mb-6">
                R$ 5,00
              </div>

              <a 
                href="#checkout"
                onClick={(e) => {
                  e.preventDefault();
                  setShowUpsell(true);
                }}
                className="w-full sm:w-auto bg-[#22c55e] text-black font-display text-xl sm:text-2xl uppercase py-3 sm:py-4 px-4 sm:px-12 rounded-[16px] transition-transform hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap text-center inline-block cursor-pointer"
              >
                COMPRAR AGORA
              </a>
              
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-4 sm:mt-6 text-muted text-sm font-medium">
                <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-success" /> Pagamento seguro</span>
                <span className="hidden sm:inline text-white/20">•</span>
                <span className="flex items-center gap-2"><Star size={18} className="text-yellow-400" /> Garantia de 7 Dias</span>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <div className="pt-10 border-t border-white/10 w-full">
            <h2 className="font-display text-4xl uppercase mb-8 text-center text-success">PERGUNTAS FREQUENTES</h2>
            <div className="flex flex-col gap-4">
              <details className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-xl p-5 cursor-pointer group">
                <summary className="font-bold text-base list-none flex justify-between items-center text-text">
                  Funciona no meu celular?
                  <ChevronDown size={20} className="text-accent group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-muted text-sm leading-relaxed">
                  Funciona na maioria dos Androids do 12 ao 16 (Xiaomi, Samsung, Motorola e outros).
                </div>
              </details>
              
              <details className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-xl p-5 cursor-pointer group">
                <summary className="font-bold text-base list-none flex justify-between items-center text-text">
                  É seguro? Tem vírus?
                  <ChevronDown size={20} className="text-accent group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-muted text-sm leading-relaxed">
                  Não. Arquivos verificados e sem vírus. Download direto, sem encurtador.
                </div>
              </details>

              <details className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-xl p-5 cursor-pointer group">
                <summary className="font-bold text-base list-none flex justify-between items-center text-text">
                  Como recebo o acesso?
                  <ChevronDown size={20} className="text-accent group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-muted text-sm leading-relaxed">
                  Após o pagamento, você recebe tudo no seu e-mail imediatamente, com o tutorial incluso.
                </div>
              </details>

              <details className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-xl p-5 cursor-pointer group">
                <summary className="font-bold text-base list-none flex justify-between items-center text-text">
                  E se não funcionar? Tem garantia?
                  <ChevronDown size={20} className="text-accent group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-muted text-sm leading-relaxed">
                  Sim. Você tem 7 dias de garantia para testar com tranquilidade. Você tem 7 dias de garantia. Se não rodar, pode pedir reembolso.
                </div>
              </details>
            </div>
          </div>

        </div>

      </div>

      {/* UPSELL MODAL */}
      {showUpsell && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0f1014] border border-white/10 rounded-2xl w-full max-w-[90vw] sm:max-w-[420px] overflow-hidden relative shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-success to-accent"></div>
            
            <div className="p-6 sm:p-8 text-center flex-1 overflow-y-auto max-h-[90vh]">
              
              <div className="inline-block bg-accent text-white font-bold px-4 py-1.5 text-xs sm:text-sm uppercase tracking-widest rounded-full mb-5 shadow-[0_0_15px_rgba(30,64,175,0.5)]">
                OFERTA ESPECIAL
              </div>
              
              <h3 className="font-display text-[26px] sm:text-3xl text-text uppercase mb-2 leading-tight">
                ESPERE! LEVE A <span className="text-success block mt-1">VERSÃO COMPLETA</span>
              </h3>
              
              <div className="text-[48px] sm:text-[56px] font-display text-text my-5 leading-none">
                R$ 10
              </div>
              
              <p className="text-sm font-bold text-muted uppercase tracking-wide mb-1 opacity-80">
                Pagamento único • Acesso vitalício
              </p>

              <p className="text-sm font-bold text-success uppercase italic mb-6">
                Receba tudo no seu e-mail
              </p>
              
              <div className="flex flex-col gap-3 text-left mb-8 text-[14px] sm:text-[15px] text-text/90 font-medium bg-black/30 p-4 rounded-xl border border-white/5">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-[1px]" />
                  <span>Tudo da versão básica</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-[1px]" />
                  <span><strong>Atualizações VITALÍCIAS</strong> (não paga nunca mais)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-[1px]" />
                  <span>Versão sem bugs e sem travamentos</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-[1px]" />
                  <span>Modo Polícia Avançado liberado</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-success shrink-0 mt-[1px]" />
                  <span>Mapa totalmente desbloqueado (acesso a tudo)</span>
                </div>
              </div>

              <a 
                href={upsellCheckoutUrl}
                className="w-full block bg-success text-black font-display text-xl uppercase py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] mb-5 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                QUERO A VERSÃO COMPLETA
              </a>
              
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShowUpsell(false);
                  setShowDownsell(true);
                }}
                className="block text-muted text-sm border-b border-transparent hover:border-white/20 transition-colors w-fit mx-auto pb-0.5 opacity-70 hover:opacity-100 cursor-pointer bg-transparent"
              >
                Não, quero o básico por 5 reais
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOWNSELL MODAL */}
      {showDownsell && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0f1014] border border-white/10 rounded-2xl w-full max-w-[90vw] sm:max-w-[420px] overflow-hidden relative shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
            
            <div className="p-6 sm:p-8 text-center flex-1 overflow-y-auto max-h-[90vh]">
              
              <div className="inline-block bg-yellow-500 text-black font-bold px-4 py-1.5 text-xs sm:text-sm uppercase tracking-widest rounded-full mb-5 shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                ÚLTIMA CHANCE
              </div>
              
              <h3 className="font-display text-[22px] sm:text-[26px] text-text uppercase mb-4 leading-tight">
                Calma aí… é sério que não quer o completo?
              </h3>

              <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-5 mb-6">
                <p className="text-[15px] sm:text-base text-text/90 mb-3">
                  Tá, toma aí um <strong className="text-yellow-400">desconto</strong>. Você vai levar tudo da versão completa que era <span className="line-through text-yellow-400 font-bold opacity-80">R$ 10</span> por
                </p>
                <div className="text-[56px] sm:text-[64px] font-display text-yellow-500 leading-none drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                  R$ 7,50
                </div>
                <p className="text-sm font-bold text-success uppercase italic mt-4">
                  Receba tudo no seu e-mail
                </p>
              </div>

              <a 
                href={downsellCheckoutUrl}
                className="w-full block bg-yellow-500 text-black font-display text-xl uppercase py-4 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] mb-5 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
              >
                QUERO O DESCONTO
              </a>
              
              <a 
                href={basicCheckoutUrl}
                className="block text-muted text-sm border-b border-transparent hover:border-white/20 transition-colors w-fit mx-auto pb-0.5 opacity-70 hover:opacity-100"
              >
                Não, quero só o básico por R$ 5,00
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
