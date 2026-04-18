import React from 'react';
import { ShieldCheck, Star, Smartphone, CheckCircle2, Zap, AlertOctagon, ChevronDown } from 'lucide-react';

const testimonials = [
  {
    name: "@Alex-gv3ei",
    avatar: "https://i.postimg.cc/Kv3qnXzh/vic.webp",
    text: "Tô jogando no poco x5 pro, deu certo aqui valeu msm mano, mais 1 inscrito e ganhou meu like ❤️👊"
  },
  {
    name: "@CPX_FAVELA",
    avatar: "https://i.postimg.cc/SsKVR357/icon-masculino.webp",
    text: "O melhor de todos slk mn sem explicação, eu tava numa vontade de joga gta san ass"
  },
  {
    name: "@neymarzinho-q6m",
    avatar: "https://i.postimg.cc/Gt8QJYbj/gui.webp",
    text: "Passando aqui pra dizer que deu certo no meu Android 14, muito obrigado irmão"
  },
  {
    name: "@verton_react",
    avatar: "https://i.postimg.cc/Xvsmsf6g/𝕹𝖔𝖛𝖎𝖓𝖍𝖔.webp",
    text: "Valeu cara o seu foi o único que pegou no Android 15"
  },
  {
    name: "@Alan_haland",
    avatar: "https://i.postimg.cc/SsKVR357/icon-masculino.webp",
    text: "Top de mais e a minha primeira vez jogando gta modo policia cara muito obrigado Deus abençoe"
  }
];

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
      
      <div className="max-w-[800px] mx-auto p-6 md:p-10 flex flex-col gap-10">
        
        {/* Main Column */}
        <div className="flex flex-col">
          
          <div className="mb-10 flex flex-col items-center">
            <span className="bg-accent text-white px-3 py-1 text-[12px] font-extrabold rounded mb-5 tracking-[1px] uppercase inline-block">
              VERSÃO ATUALIZADA 2026
            </span>

            <h1 className="font-display text-5xl sm:text-6xl md:text-[76px] leading-[0.9] uppercase mb-6 text-text text-center">
              APK GTA <span className="text-success">MOD POLÍCIA</span> PMSP
            </h1>

            <p className="text-[18px] leading-[1.5] text-muted mb-8 max-w-[600px] text-center">
              O melhor mod de simulação policial para Android. Finalmente um mod que NÃO CRACHA! Instalação rápida, compatível com a nova geração de celulares (todos os Androids) e acesso imediato.
            </p>

            {/* Video VSL Custom VORTEX */}
            <VSLPlayer />

            <a 
              href="#oferta"
              onClick={handleSlowScroll}
              className="bg-success text-black py-5 px-6 sm:px-10 font-black text-lg sm:text-xl uppercase rounded-lg text-center inline-block cursor-pointer border-none transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Baixar Agora - Download Seguro
            </a>

            <div className="flex flex-wrap justify-center gap-4 mt-8 w-full max-w-[600px]">
               <div className="text-[12px] font-semibold text-success flex items-center gap-1 uppercase">
                 <CheckCircle2 size={16} /> Anti-Virus Check
               </div>
               <div className="text-[12px] font-semibold text-success flex items-center gap-1 uppercase">
                 <CheckCircle2 size={16} /> Instalação Fácil
               </div>
            </div>
          </div>

          <h3 className="mb-[10px] text-[14px] uppercase text-muted font-bold tracking-wider text-center w-full">O que o pacote inclui:</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-[rgba(255,255,255,0.05)] border border-white/10 p-5 rounded-2xl flex flex-col items-center text-center">
              <Smartphone size={24} className="text-accent mb-3" />
              <h3 className="text-md font-bold text-text mb-2">Para Todos Androids</h3>
              <p className="text-muted text-sm leading-relaxed">Testado e funcionando perfeitamente do Android 12 ao 16.</p>
            </div>
            <div className="bg-[rgba(255,255,255,0.05)] border border-white/10 p-5 rounded-2xl flex flex-col items-center text-center">
              <Zap size={24} className="text-accent mb-3" />
              <h3 className="text-md font-bold text-text mb-2">Acesso Imediato</h3>
              <p className="text-muted text-sm leading-relaxed">Links diretos. Arquivos limpos OBB, DATA e APK oficiais.</p>
            </div>
          </div>

          {/* Offer / Purchase Section */}
          <section id="oferta" className="mt-8 mb-16">
            <div className="bg-[#0a0a0a] border-[3px] border-accent rounded-3xl p-8 flex flex-col items-center relative overflow-hidden">
              
              <div className="border-[2px] border-accent/40 rounded-xl p-2 mb-6 text-accent inline-block">
                <AlertOctagon size={28} />
              </div>
              
              <h2 className="font-display text-5xl sm:text-[64px] leading-none uppercase tracking-tight mb-6 text-text text-center">
                ACESSO<br/>EXCLUSIVO
              </h2>
              
              <h3 className="font-display text-2xl mb-6 text-success text-center uppercase">
                PACOTE COMPLETO: APK +<br/>OBB + DATA
              </h3>
              
              <p className="text-muted mb-8 text-base leading-relaxed text-center max-w-sm">
                Acesso garantido a futuras atualizações sem cobranças adicionais.<br/><br/>
                <span className="font-bold text-text">Pagamento Único • Acesso Vitalício</span>
              </p>

              <div className="text-[72px] sm:text-[96px] font-display text-text leading-none mb-6">
                R$ 5,00
              </div>

              <button 
                className="w-full sm:w-auto bg-[#22c55e] text-black font-display text-2xl uppercase py-4 px-12 rounded-[16px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => window.location.href = 'https://pagamento.checkoutseguro.shop/checkout/v5/cfxh6NX1ZDvew29hIBTj'}
              >
                OBTER ACESSO
              </button>
              
              <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 text-muted text-sm font-medium">
                <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-success" /> Checkout Seguro via Pix</span>
                <span className="hidden sm:inline text-white/20">•</span>
                <span className="flex items-center gap-2"><Star size={18} className="text-yellow-400" /> Garantia de 7 Dias</span>
              </div>
            </div>
          </section>

          {/* Testimonials SECTION */}
          <div className="mb-20 w-full flex flex-col items-center">
            <h2 className="font-display text-4xl uppercase mb-4 text-center text-text">O Que a Galera Tá Falando</h2>
            
            <div className="flex items-center justify-center gap-1 text-yellow-400 mb-8">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <span className="text-text ml-2 font-bold text-base">4.9/5 Estrelas</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 w-full">
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
          </div>

          {/* FAQ SECTION */}
          <div className="pt-10 border-t border-white/10 w-full">
            <h2 className="font-display text-4xl uppercase mb-8 text-center text-success">PERGUNTAS FREQUENTES</h2>
            <div className="flex flex-col gap-4">
              <details className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-xl p-5 cursor-pointer group">
                <summary className="font-bold text-base list-none flex justify-between items-center text-text">
                  Quais celulares o jogo roda? (Android 14+)
                  <ChevronDown size={20} className="text-accent group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-muted text-sm leading-relaxed">
                   Sim! Nós testamos o mod nas versões 12, 13, 14, 15 e no novo Android 16. O jogo roda lisinho em aparelhos da Xiaomi (Linha Poco, Redmi), Samsung Galaxy (A, M e S), Motorola e diversas outras marcas, cobrindo praticamente todos os celulares modernos, com a obb ajustada para não dar o erro de tela preta ou "apk incompatível".
                </div>
              </details>
              
              <details className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-xl p-5 cursor-pointer group">
                <summary className="font-bold text-base list-none flex justify-between items-center text-text">
                  É seguro baixar? Tem vírus?
                  <ChevronDown size={20} className="text-accent group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-muted text-sm leading-relaxed">
                  É 100% livre de vírus. Os arquivos passam por uma checagem rigorosa de segurança. Além disso, nós não usamos encurtadores cheios de anúncios na página de entrega, o download é rápido e direto.
                </div>
              </details>

              <details className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-xl p-5 cursor-pointer group">
                <summary className="font-bold text-base list-none flex justify-between items-center text-text">
                  Por onde recebo o acesso ao mod?
                  <ChevronDown size={20} className="text-accent group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-muted text-sm leading-relaxed">
                  Logo após a confirmação do pagamento, você receberá o link de download direto e o tutorial passo a passo diretamente no seu <strong>e-mail</strong> cadastrado na hora da compra. Se pagar via Pix, o acesso é enviado imediatamente!
                </div>
              </details>

              <details className="bg-[rgba(255,255,255,0.05)] border border-white/10 rounded-xl p-5 cursor-pointer group">
                <summary className="font-bold text-base list-none flex justify-between items-center text-text">
                  O produto tem garantia se não funcionar?
                  <ChevronDown size={20} className="text-accent group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-4 text-muted text-sm leading-relaxed">
                  Com certeza! Seu risco é zero. Nós oferecemos <strong>7 dias de garantia incondicional</strong>. Se o mod não rodar no seu celular, basta mandar um e-mail pra gente que devolvemos 100% do valor do seu Pix de forma rápida e sem qualquer burocracia.
                </div>
              </details>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
