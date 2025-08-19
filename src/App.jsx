import React, { useState, useEffect } from 'react';
import  { Clock, Star, CheckCircle, Play, Gift, ChevronDown, Users, Shield, Zap, ChevronLeft, ChevronRight, MessageCircle, X, Send } from 'lucide-react';  
function  App() { 
  const [countdown, setCountdown] = useState(3600);
  const [faqOpen, setFaqOpen] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
   const [messages, setMessages] = useState([
    { id: 1, text: "Olá! 👋 Eu sou o assistente virtual do Price Pro. Como posso te ajudar hoje?", sender: "bot", time: new Date().toLocaleTimeString(), showOptions: true }
  ]);
  
  const quickQuestions = [
    "💰 Qual é o preço?",
    "🎯 Como funciona?",
    "🛡️ Tem garantia?",
    "📱 Como é o suporte?",
    "📊 Quais são os resultados?",
    "🛒 Como comprar?",
    "📸 Ver no Instagram"
  ]; 
  const [inputMessage, setInputMessage] = useState("");
  const [showQualificationForm, setShowQualificationForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    investment: '',
    goal: ''
  }); 
  const testimonials = [{
    id: 1,
    image: "https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/b26d5934-d403-44db-ad93-d1151e92d900/public",
    name: "André",
    title: "Cliente verificado",
    content: "170 dólares de lucro em 2 dias de operações é fantástico... parabéns e bora pra cima, estou muito satisfeito com os resultados"
  }, {
    id: 2,
    image: "https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/863f8578-7876-4cbc-fdb3-182a2a7db000/public",
    name: "Tiago",
    title: "Trader Premium",
    content: "Surreal fiz 299 dólares em apenas uma semana e estou muito feliz com o resultado... O mais incrível é a tranquilidade que o indicador me dá"
  }, {
    id: 3,
    image: "https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/68e20bd9-e66d-4492-96d9-262f63a76b00/public",
    name: "Márcio Ferreira",
    title: "Trader Profissional",
    content: "2 mil dólares de lucro 😍😍😍😍 Ele é surreal e tem uma assertividade altíssima"
  }];
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 3600);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(testimonialTimer);
  }, []);
  const formatTime = seconds => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
   const toggleFaq = index => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

   const handleSendMessage = (message = inputMessage) => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev.map(msg => ({ ...msg, showOptions: false })), newMessage]);
    setInputMessage("");
    
    // Bot response
    setTimeout(() => {
      const botResponse = getBotResponse(message);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        sender: "bot",
        time: new Date().toLocaleTimeString(),
        showOptions: message === "📸 Ver no Instagram" ? false : true
      }]);
    }, 1000);
  };

  const handleQuickQuestion = (question) => {
    if (question === "📸 Ver no Instagram") {
      window.open('https://www.instagram.com/traderpriceforex/', '_blank');
      handleSendMessage(question);
    } else {
      handleSendMessage(question);
    }
  }; 

   const getBotResponse = (message) => {
    if (message === "💰 Qual é o preço?") {
      return "💰 O Price Pro está com 60% de desconto! De R$ 1.497,00 por apenas R$ 597,00. Ou 12x de R$ 49,75 no cartão. Oferta limitada! 🔥";
    } else if (message === "🎯 Como funciona?") {
      return "🎯 O Price Pro é super simples! Instalação em menos de 15 minutos, sinais 100% objetivos e entrada/saída claras. Sem complicação! ✨";
    } else if (message === "🛡️ Tem garantia?") {
      return "🛡️ Temos 30 dias de garantia total! Se não ficar satisfeito, devolvemos 100% do seu dinheiro. Sem perguntas! 💯";
    } else if (message === "📱 Como é o suporte?") {
      return "📱 Você terá acesso ao nosso grupo exclusivo no WhatsApp com suporte direto do Marcos e da equipe. Estamos sempre prontos para ajudar! 🤝";
    } else if (message === "📊 Quais são os resultados?") {
      return "📊 Nossos alunos têm média de 87% de acerto e lucro médio de R$ 12.847/mês! Mais de 847 traders já transformaram seus resultados! 🚀";
    } else if (message === "🛒 Como comprar?") {
      return "🎁 Perfeito! Clique no botão 'QUERO MINHA LIBERDADE FINANCEIRA' para garantir seu Price Pro com desconto de 60%. Só hoje! ⚡";
    } else if (message === "📸 Ver no Instagram") {
      return "📸 Perfeito! Te redirecionei para nosso Instagram @traderpriceforex onde você pode ver mais conteúdos e resultados reais! Siga a gente lá! 🚀";
    } else {
      return "😊 Entendi! Para mais informações detalhadas, recomendo assistir ao vídeo demonstrativo ou falar diretamente com nossa equipe. Posso ajudar com dúvidas sobre preço, funcionamento, garantia ou resultados. O que gostaria de saber? 💬";
    }
  }; 

  const handleQualificationSubmit = async () => {
    if (formStep < 3) {
      setFormStep(prev => prev + 1);
    } else {
      // Redirect to WhatsApp with user data
      const message = `Olá! Sou ${formData.name}. Gostaria de saber mais sobre o Price Pro. Dados: Email: ${formData.email}, Telefone: ${formData.phone}, Experiência: ${formData.experience}, Investimento: ${formData.investment}, Objetivo: ${formData.goal}`;
      const whatsappUrl = `https://chat.whatsapp.com/FFin3fq3bUvLdvVUXdS4tW?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setShowQualificationForm(false);
      setFormStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        investment: '',
        goal: ''
      });
    }
  }; 
  return <div className="min-h-screen gradient-bg">
      {/* Top Bar */}
      <div className="bg-warning text-black py-2 px-4 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <Zap size={16} />
          <span>Bônus só para os 20 primeiros — termina em {formatTime(countdown)}</span>
        </div>
      </div>

           {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
                   <img 
            src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/941a2a9a-b0df-4cd2-3132-06abae86da00/public" 
            alt="Background" 
            className="w-full h-full object-cover blur-sm opacity-40"
          /> 
                   <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/70"></div> 
        </div> 
                             <div className="container mx-auto px-4 py-16 max-w-6xl relative z-10"> 
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slideInLeft">
              <h1 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-6xl leading-tight animate-fadeInUp">
                Tenha lucros consistentes no mercado de forex com o{' '}
                <span className="text-accent">indicador price pro</span>
              </h1> 
              
                           <div className="space-y-4 animate-fadeInUp delay-200">
                               <p className="text-base sm:text-lg lg:text-xl text-text">
                  Até 80% de acertos e mais de 400% de rentabilidade comprovada.
                </p> 
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-accent" size={20} />
                    <span>Mentoria que te guia passo a passo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-accent" size={20} />
                    <span>Estratégia simples e objetiva</span>
                  </div>
                </div>
              </div> 

                                        <button onClick={() => setShowQualificationForm(true)} className="relative bg-gradient-to-r from-accent via-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-black font-poppins font-bold px-12 py-6 rounded-3xl text-xl transition-all duration-300 hover:shadow-2xl hover:shadow-accent/50 animate-pulse-custom transform hover:scale-105 overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce">NOVO!</span>
                <span className="relative z-10 flex items-center gap-2">
                  <Gift size={24} />
                  💎 QUERO MINHA LIBERDADE FINANCEIRA 💎
                </span>
              </button>  
            </div>

                       <div className="relative animate-slideInRight">
              <img src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/b36a6a47-f59d-4b19-9855-0f8e6ba3cc00/public" alt="Price Pro Dashboard" className="w-full h-auto animate-float" />
            </div> 
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
                   <h2 className="font-poppins font-bold text-3xl lg:text-4xl mb-8 animate-fadeInUp">
            Veja como é simples usar o Price Pro
          </h2>
          
          <div className="relative bg-card rounded-2xl p-8 shadow-xl animate-fadeInUp delay-200"> 
                       <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden mb-6">
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/_yP-FbnN4vY" title="Price Pro Demonstration" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="rounded-xl">
              </iframe>
            </div> 
            
                       <div className="flex items-center justify-center gap-3">
              

              
            </div> 
          </div>
        </div>
      </section>

      {/* Special Offer */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
                   <div className="bg-card rounded-3xl p-8 shadow-2xl border border-accent/20 animate-fadeInUp">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-2 mb-4 animate-pulse-custom">
                <span className="text-2xl">🔥</span>
                <h3 className="font-poppins font-poppins font-bold text-2xl">Oferta Especial Price Pro — Só hoje</h3>
              </div> 
              
                           <div className="bg-red-600 text-white px-4 py-2 rounded-full inline-block animate-pulse">
                <Clock size={16} className="inline mr-2" />
                ⏰ EXPIRA EM: {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
              </div>
              
              <div className="bg-warning text-black px-3 py-1 rounded-full text-sm font-bold inline-block ml-2">
                🔥 APENAS 7 VAGAS RESTANTES
              </div> 

              <div className="space-y-3 text-left">
                {['Acesso vitalício ao indicador', 'Guia de instalação completa', 'Configuração em menos de 15 min', 'Acesso à comunidade de WhatsApp', 'Garantia de satisfação'].map((item, i) => <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-accent" size={20} />
                    <span>{item}</span>
                  </div>)}
              </div>

                           <div className="py-6 relative">
                <div className="absolute -top-2 -right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce">
                  -60%
                </div>
                <div className="text-gray-400 line-through text-lg">de R$ 1.497,00</div>
                <div className="font-poppins font-bold text-5xl text-accent animate-pulse">R$ 597,00</div>
                <div className="text-sm text-gray-300">ou 12x de R$ 49,75 no cartão</div>
                <div className="text-xs text-warning mt-1 font-bold">💰 ECONOMIA DE R$ 900,00!</div>
              </div> 

                                        <a href="https://payment.ticto.app/ODB67755E" target="_blank" className="block w-full text-center text-accent hover:text-accent/80 font-semibold py-4 transition-colors underline decoration-2 underline-offset-4">
                🚀 Garantir agora por R$ 597,00 🚀
              </a> 
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-green-400 mb-2">
                  <CheckCircle size={16} />
                  <span>✅ 847 pessoas compraram nas últimas 24h</span>
                </div>
                <div className="text-xs text-gray-400">🔒 Pagamento 100% seguro | ⚡ Acesso imediato</div>
              </div> 

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Shield size={16} />
                <span>Compra 100% segura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

           {/* Indicator in Action */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl mb-8 animate-fadeInUp">
            🎯 Veja o Indicador em Ação - <span className="text-accent">Resultados Reais</span>
          </h2>
          
          <div className="bg-gradient-to-r from-accent/10 to-warning/10 border border-accent/30 rounded-3xl p-2 mb-8 shadow-2xl animate-fadeInUp delay-200">
            <div className="bg-card rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-accent text-black px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                LIVE
              </div>
              <img src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/355d5e71-c523-4dc2-aabc-49f2c80df900/public" alt="Gráfico com sinais do Price Pro" className="w-full h-auto rounded-xl shadow-lg" />

              
              <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-3">
                  <div className="text-green-400 font-bold">+87% Acertos</div>
                  <div className="text-gray-300">Última semana</div>
                </div>
                <div className="bg-accent/20 border border-accent/50 rounded-xl p-3">
                  <div className="text-accent font-bold">R$ 12.847</div>
                  <div className="text-gray-300">Lucro médio/mês</div>
                </div>
                <div className="bg-warning/20 border border-warning/50 rounded-xl p-3">
                  <div className="text-warning font-bold">142 Sinais</div>
                  <div className="text-gray-300">Este mês</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-card rounded-2xl p-6 shadow-xl mb-8 animate-fadeInUp delay-400">
                       <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="text-accent" size={20} />
              <span className="font-montserrat font-semibold">Mais de 2.847 traders já transformaram seus resultados</span>
            </div> 
            <div className="flex justify-center items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-current" size={20} />)}
              <span className="ml-2 font-semibold">4.9/5 (284 avaliações)</span>
            </div>
            <p className="text-gray-300 text-sm">"O melhor indicador que já usei. Mudou completamente meus resultados!" - João S.</p>
          </div>

          {/* Urgency Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl p-4 shadow-xl animate-pulse mb-8">
            <div className="flex items-center justify-center gap-2 text-lg font-bold">
              <Zap size={24} />
              <span>⚠️ ÚLTIMAS 7 VAGAS com desconto de 60% ⚠️</span>
            </div>
            <p className="text-center mt-2">Não perca essa oportunidade única!</p>
          </div>
        </div>
      </section> 

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                       {[{
            title: 'Geração de Sinal',
            desc: 'Sinal objetivo e visual'
          }, {
            title: 'Sinais 100% objetivos',
            desc: 'Sem subjetividade'
          }, {
            title: 'Economiza Tempo',
            desc: 'Entrada/saída claras'
          }, {
            title: 'Resultado com um Clique',
            desc: 'Execução simples'
          }].map((benefit, i) => <div key={i} className="bg-card rounded-2xl p-6 shadow-xl text-center animate-fadeInUp hover:scale-105 transition-transform duration-300" style={{
            animationDelay: `${i * 0.1}s`
          }}> 
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-accent" size={24} />
                </div>
                <h3 className="font-poppins font-semibold text-xl mb-2">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.desc}</p>
              </div>)}
          </div>
        </div>
      </section>

           {/* 6 Reasons */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
                   <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-center mb-12">
            6 Razões para você adquirir o indicador Price Pro
          </h2> 
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Alta assertividade', 'Fácil de usar (instalação em menos de 15 min)', 'Suporte no WhatsApp', 'Sem pagar mensalidade', 'Clareza no tempo', 'Testado por usuários'].map((reason, i) => <div key={i} className="bg-card rounded-2xl p-6 shadow-xl animate-fadeInUp hover:scale-105 transition-transform duration-300" style={{
            animationDelay: `${i * 0.1}s`
          }}> 
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent text-black rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <span className="font-medium">{reason}</span>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Real Testimonials Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-warning/5"></div>
        <div className="container mx-auto px-4 max-w-6xl relative">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-center mb-4 animate-fadeInUp">
            🎯 Depoimentos Reais dos Nossos Alunos
          </h2>
          <p className="text-center text-gray-300 mb-12 animate-fadeInUp delay-200">
            Veja os resultados que nossos alunos estão alcançando com o Price Pro
          </p>
          
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Animated WhatsApp Testimonial Carousel */}
            <div className="bg-card rounded-3xl p-6 shadow-2xl border border-accent/20 animate-fadeInUp hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                WhatsApp
              </div>
              
              {/* Carousel Navigation */}
              <div className="absolute top-4 left-4 flex gap-2">
                <button onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)} className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all">

                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)} className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all">

                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Testimonial Content */}
              <div className="relative">
                {testimonials.map((testimonial, index) => <div key={testimonial.id} className={`transition-all duration-500 ease-in-out ${index === currentTestimonial ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'}`}>

                    <div className="mb-4">
                      <img src={testimonial.image} alt={`Depoimento WhatsApp ${testimonial.name}`} className="w-full h-auto rounded-2xl shadow-lg border border-gray-700 transition-transform duration-300 hover:scale-105" />

                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-accent">{testimonial.name}</h4>
                          <p className="text-xs text-gray-400">{testimonial.title}</p>
                        </div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                        <p className="text-sm text-gray-300 italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-current" size={16} />)}
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => <button key={index} onClick={() => setCurrentTestimonial(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'bg-accent w-6' : 'bg-gray-600 hover:bg-gray-500'}`} />)}
              </div>
            </div> 

                       {/* Second Testimonial Carousel */}
            <div className="bg-card rounded-3xl p-6 shadow-2xl border border-accent/20 animate-fadeInUp delay-200 hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                WhatsApp
              </div>
              
              {/* Carousel Navigation */}
              <div className="absolute top-4 left-4 flex gap-2">
                <button onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)} className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all">

                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)} className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all">

                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Testimonial Content for second card */}
              <div className="relative">
                {testimonials.map((testimonial, index) => <div key={`second-${testimonial.id}`} className={`transition-all duration-500 ease-in-out ${index === (currentTestimonial + 1) % testimonials.length ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'}`}>

                    <div className="mb-4">
                      <img src={testimonial.image} alt={`Depoimento WhatsApp ${testimonial.name}`} className="w-full h-auto rounded-2xl shadow-lg border border-gray-700 transition-transform duration-300 hover:scale-105" />

                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-accent">{testimonial.name}</h4>
                          <p className="text-xs text-gray-400">{testimonial.title}</p>
                        </div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                        <p className="text-sm text-gray-300 italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-current" size={16} />)}
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => <button key={`second-indicator-${index}`} onClick={() => setCurrentTestimonial((index - 1 + testimonials.length) % testimonials.length)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === (currentTestimonial + 1) % testimonials.length ? 'bg-accent w-6' : 'bg-gray-600 hover:bg-gray-500'}`} />)}
              </div>
            </div> 

                       {/* Third Testimonial Carousel */}
            <div className="bg-card rounded-3xl p-6 shadow-2xl border border-accent/20 animate-fadeInUp delay-400 hover:scale-105 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                WhatsApp
              </div>
              
              {/* Carousel Navigation */}
              <div className="absolute top-4 left-4 flex gap-2">
                <button onClick={() => setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)} className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all">

                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)} className="w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-all">

                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Testimonial Content for third card */}
              <div className="relative">
                {testimonials.map((testimonial, index) => <div key={`third-${testimonial.id}`} className={`transition-all duration-500 ease-in-out ${index === (currentTestimonial + 2) % testimonials.length ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute top-0 left-0 w-full'}`}>

                    <div className="mb-4">
                      <img src={testimonial.image} alt={`Depoimento WhatsApp ${testimonial.name}`} className="w-full h-auto rounded-2xl shadow-lg border border-gray-700 transition-transform duration-300 hover:scale-105" />

                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-accent">{testimonial.name}</h4>
                          <p className="text-xs text-gray-400">{testimonial.title}</p>
                        </div>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                        <p className="text-sm text-gray-300 italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-current" size={16} />)}
                      </div>
                    </div>
                  </div>)}
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {testimonials.map((_, index) => <button key={`third-indicator-${index}`} onClick={() => setCurrentTestimonial((index - 2 + testimonials.length) % testimonials.length)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === (currentTestimonial + 2) % testimonials.length ? 'bg-accent w-6' : 'bg-gray-600 hover:bg-gray-500'}`} />)}
              </div>
            </div> 
          </div>

          {/* Success Stats */}
          <div className="mt-12 bg-gradient-to-r from-accent/10 to-green-500/10 border border-accent/30 rounded-3xl p-8 text-center animate-fadeInUp delay-600">
            <h3 className="font-poppins font-bold text-2xl mb-6 text-accent">
              📊 Estatísticas de Sucesso dos Nossos Alunos
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-400 animate-pulse">847</div>
                <div className="text-sm text-gray-300">Alunos satisfeitos</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent animate-pulse">87%</div>
                <div className="text-sm text-gray-300">Taxa média de acerto</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-warning animate-pulse">R$ 12k</div>
                <div className="text-sm text-gray-300">Lucro médio mensal</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-400 animate-pulse">98%</div>
                <div className="text-sm text-gray-300">Recomendariam</div>
              </div>
            </div>
          </div>

          {/* CTA within testimonials */}
          <div className="mt-8 text-center animate-fadeInUp delay-800">
            <div className="bg-gradient-to-r from-accent to-accent/80 text-black rounded-2xl p-6 shadow-xl inline-block">
              <p className="font-bold mb-3">💬 Quer fazer parte dessa comunidade de sucesso?</p>
                           <a href="https://payment.ticto.app/ODB67755E" target="_blank" className="text-accent hover:text-accent/80 font-semibold transition-colors underline decoration-2 underline-offset-4">
                Entrar na Comunidade Agora
              </a> 
            </div>
          </div>
        </div>
      </section> 

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
                   <div className="bg-card rounded-3xl p-8 shadow-2xl animate-fadeInUp"> 
            <div className="grid md:grid-cols-3 gap-8 items-center">
                           <div className="text-center">
                <img src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/622b8077-8a33-4123-4040-95f165427a00/public" alt="Marcos" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-accent shadow-xl" />

                <h3 className="font-poppins font-bold text-xl">Marcos</h3>
              </div> 
              
              <div className="md:col-span-2 space-y-4">
                <h3 className="font-poppins font-bold text-2xl">
                  Especialista em Estratégias Automatizadas no Mercado Forex
                </h3>
                <p className="text-gray-300">
                  Foco em simplicidade, educação do trader, indicadores proprietários e mentoria prática.
                </p>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {['+400% de rentabilidade em cenários reais', 'Estratégia Price Action + Zonas', 'Foco em gestão de risco', 'Comunidade ativa'].map((item, i) => <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-accent" size={16} />
                      <span className="text-sm">{item}</span>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-poppins font-bold text-3xl lg:text-4xl text-center mb-12">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-4">
            {[{
            q: 'O que está incluso na compra?',
            a: 'Acesso vitalício ao indicador, guia completo de instalação, suporte via WhatsApp e acesso à comunidade exclusiva.'
          }, {
            q: 'Por que usar o Price Pro?',
            a: 'O Price Pro oferece sinais objetivos com alta assertividade, eliminando a subjetividade das análises e proporcionando clareza nas operações.'
          }, {
            q: 'O indicador funciona mesmo em cenários instáveis?',
            a: 'Sim, o Price Pro foi testado em diversos cenários de mercado e mantém sua eficácia mesmo em condições de alta volatilidade.'
          }, {
            q: 'Como instalar?',
            a: 'A instalação é simples e leva menos de 15 minutos. Você receberá um guia passo a passo completo após a compra.'
          }].map((faq, i) => <div key={i} className="bg-card rounded-2xl shadow-xl overflow-hidden animate-fadeInUp" style={{
            animationDelay: `${i * 0.1}s`
          }}> 
                <button onClick={() => toggleFaq(i)} className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors">

                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown className={`transform transition-transform ${faqOpen[i] ? 'rotate-180' : ''}`} size={20} />

                </button>
                {faqOpen[i] && <div className="px-6 pb-6 text-gray-300">
                    {faq.a}
                  </div>}
              </div>)}
          </div>
        </div>
      </section>

           {/* Final CTA */}
      <section className="py-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-warning/5 to-accent/10"></div>
        
        
        
        
        
        <div className="container mx-auto px-8 py-12 max-w-4xl text-center relative z-10">
          <div className="bg-gradient-to-br from-card/80 to-background/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-accent/20 animate-fadeInUp">
            {/* Urgency Header */}
            <div className="mb-6 animate-pulse">
              <div className="bg-red-600 text-white px-4 py-2 rounded-full inline-block mb-4">
                <Zap size={16} className="inline mr-2" />
                ⚠️ ÚLTIMAS HORAS com 60% de desconto!
              </div>
              
              <div>
                <div className="text-accent flex items-center justify-center gap-2 text-lg font-bold text-accent">
                  <Gift size={24} />
                  🎁 Bônus surpresa para os 20 primeiros
                </div>
              </div>
            </div>

            {/* Main CTA Button */}
                       <div className="delay-600 mb-8">
              <button onClick={() => window.open('https://payment.ticto.app/ODB67755E', '_blank')} className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-black font-poppins font-bold px-12 py-6 rounded-3xl text-2xl transition-all duration-500 animate-pulse-custom shadow-2xl transform hover:scale-110 hover:shadow-accent/50 relative overflow-hidden group">

                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">💎 QUERO MINHA LIBERDADE FINANCEIRA AGORA 💎</span>
              </button>
            </div> 

            {/* Security and Payment Info */}
            <div className="space-y-6 animate-fadeInUp delay-800">
              {/* Payment Methods and Security */}
              <div className="bg-card/50 rounded-2xl p-6 border border-accent/10">
                <img src="https://imagedelivery.net/FIZL8110j4px64kO6qJxWA/2108b59d-59a1-4680-d61f-473f3646c200/public" alt="Formas de Pagamento e Segurança" className="w-full max-w-md mx-auto h-auto" />

              </div>

              {/* Trust Indicators */}
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 animate-fadeInUp delay-1000">
                  <Shield className="text-green-400 mx-auto mb-2" size={20} />
                  <div className="text-green-400 font-bold">100% Seguro</div>
                  <div className="text-gray-300">Pagamento protegido</div>
                </div>
                <div className="bg-accent/10 border border-accent/30 rounded-xl p-3 animate-fadeInUp delay-1200">
                  <Clock className="text-accent mx-auto mb-2" size={20} />
                  <div className="text-accent font-bold">Acesso Imediato</div>
                  <div className="text-gray-300">Disponível em minutos</div>
                </div>
                <div className="bg-warning/10 border border-warning/30 rounded-xl p-3 animate-fadeInUp delay-1400">
                  <Star className="text-warning mx-auto mb-2" size={20} />
                  <div className="text-warning font-bold">Garantia Total</div>
                  <div className="text-gray-300">30 dias para testar</div>
                </div>
              </div>

              {/* Final Urgency Message */}
              <div className="bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 rounded-2xl p-4 animate-fadeInUp delay-1600">
                <p className="font-bold text-red-400 mb-2">⏰ Não deixe essa oportunidade única passar!</p>
                
              </div>

              {/* Social Proof Counter */}
              <div className="text-center animate-fadeInUp delay-1800">
                
                
                
              </div>
            </div>
          </div>
        </div>
      </section> 

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-poppins font-bold text-xl text-accent">Price Pro</h3>
            </div>
            
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-accent">Termos e Condições</a>
              <a href="#" className="text-gray-400 hover:text-accent">Política de Privacidade</a>
            </div>
          </div>
          
                   <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>
              Ações e operações no mercado envolvem riscos. Resultados passados não garantem resultados futuros.
            </p>
            <p className="mt-2">© 2024 Price Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

                {/* Floating Chatbot */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50"> 
        {/* Chat Window */}
        {chatOpen && (
          <div className="bg-card border border-accent/20 rounded-2xl shadow-2xl mb-4 w-screen h-screen md:w-80 md:h-96 fixed md:relative inset-0 md:inset-auto flex flex-col animate-fadeInUp"> 
                       {/* Chat Header */}
            <div className="bg-gradient-to-r from-accent to-accent/80 text-black p-4 md:rounded-t-2xl flex items-center justify-between"> 
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Price Pro Assistant</h4>
                  <p className="text-xs opacity-80">Online agora</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-black/10 rounded-full p-1">
                <X size={16} />
              </button>
            </div>

                                  {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-background md:bg-transparent"> 
              {messages.map((message) => (
                <div key={message.id}>
                  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-accent text-black' 
                        : 'bg-gray-700 text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-60 mt-1">{message.time}</p>
                    </div>
                  </div>
                  
                  {/* Quick Questions */}
                  {message.sender === 'bot' && message.showOptions && (
                    <div className="flex flex-wrap gap-2 mt-3 px-2">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(question)}
                          className="bg-accent/20 hover:bg-accent/30 text-accent px-3 py-1 rounded-full text-xs transition-colors border border-accent/30"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div> 

                       {/* Input */}
            <div className="p-4 border-t border-gray-700 bg-card">
              <div className="flex gap-2"> 
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-accent text-black px-4 py-2 rounded-xl hover:bg-accent/90 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

               {/* Chat Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-gradient-to-r from-accent to-accent/80 text-black p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse-custom relative"
        > 
                   <MessageCircle size={20} className="md:w-6 md:h-6" />
          <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-red-500 text-white w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-bold animate-bounce"> 
            !
          </div>
        </button>
      </div>

      

                {/* Qualification Form Modal */}
      {showQualificationForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-accent/20 animate-fadeInUp max-h-screen overflow-y-auto"> 
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Etapa {formStep} de 3</span>
                <button onClick={() => setShowQualificationForm(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-accent h-2 rounded-full transition-all duration-500" style={{ width: `${(formStep / 3) * 100}%` }}></div>
              </div>
            </div>

            {/* Step 1: Basic Info */}
            {formStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="font-poppins font-bold text-2xl text-accent mb-2">
                    🎯 Vamos te conhecer melhor!
                  </h3>
                  <p className="text-gray-300 text-sm">Para oferecer a melhor experiência, precisamos de alguns dados</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome completo *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <button
                  onClick={handleQualificationSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar →
                </button>
              </div>
            )}

            {/* Step 2: Experience */}
            {formStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="font-poppins font-bold text-2xl text-accent mb-2">
                    📊 Sua experiência
                  </h3>
                  <p className="text-gray-300 text-sm">Isso nos ajuda a personalizar sua jornada</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nível de experiência no Forex</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Selecione...</option>
                      <option value="iniciante">Iniciante (nunca operei)</option>
                      <option value="basico">Básico (até 6 meses)</option>
                      <option value="intermediario">Intermediário (6m - 2 anos)</option>
                      <option value="avancado">Avançado (mais de 2 anos)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Quanto pretende investir?</label>
                    <select
                      value={formData.investment}
                      onChange={(e) => setFormData(prev => ({ ...prev, investment: e.target.value }))}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Selecione...</option>
                      <option value="500-1000">R$ 500 - R$ 1.000</option>
                      <option value="1000-5000">R$ 1.000 - R$ 5.000</option>
                      <option value="5000-10000">R$ 5.000 - R$ 10.000</option>
                      <option value="10000+">Mais de R$ 10.000</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleQualificationSubmit}
                  disabled={!formData.experience || !formData.investment}
                  className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar →
                </button>
              </div>
            )}

            {/* Step 3: Goals */}
            {formStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="font-poppins font-bold text-2xl text-accent mb-2">
                    🎯 Seu objetivo
                  </h3>
                  <p className="text-gray-300 text-sm">Último passo! Vamos entender seus objetivos</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Qual seu principal objetivo?</label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData(prev => ({ ...prev, goal: e.target.value }))}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      <option value="">Selecione...</option>
                      <option value="renda-extra">Renda extra (até R$ 2.000/mês)</option>
                      <option value="substituir-salario">Substituir meu salário</option>
                      <option value="liberdade-financeira">Liberdade financeira total</option>
                      <option value="aposentadoria">Construir aposentadoria</option>
                    </select>
                  </div>

                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="text-accent" size={20} />
                      <span className="font-bold text-accent">Bônus Especial!</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Por completar a qualificação, você ganha acesso prioritário ao nosso grupo VIP com mentoria exclusiva! 🎁
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleQualificationSubmit}
                  disabled={!formData.goal}
                  className="w-full bg-gradient-to-r from-accent to-accent/80 text-black font-bold py-4 rounded-xl hover:from-accent/90 hover:to-accent/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
                >
                  🚀 Entrar no Grupo VIP Agora! 🚀
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Ao continuar, você será redirecionado para nosso grupo exclusivo no WhatsApp
                </p>
              </div>
            )}
          </div>
        </div>
      )}

           {/* Sticky CTA Button - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gradient-to-t from-background via-background/95 to-transparent p-4 pt-8">
        <button 
          onClick={() => window.open('https://chat.whatsapp.com/FFin3fq3bUvLdvVUXdS4tW', '_blank')}
          className="w-full bg-gradient-to-r from-accent to-accent/80 text-black font-bold py-4 rounded-2xl text-lg transition-all duration-300 shadow-2xl animate-pulse-custom transform active:scale-95"
        >
          💬 QUERO ACESSAR NO WHATSAPP
        </button>
      </div>

      {/* Scroll Progress Indicator */} 
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-40">
        <div 
          className="h-full bg-blue-800 transition-all duration-300"
          style={{
            width: `${Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%`
          }}
        ></div>
      </div> 
    </div>; 
}
export default App;
