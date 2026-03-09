const fs = require('fs');
const path = require('path');

const domain = 'https://bh.advogados.emp.br';

const clusterMap = [
    { name: 'Prisão e Urgência', slug: 'prisao-bh', satelites: ['liberdade-provisoria-bh', 'revogacao-prisao-preventiva-bh', 'relaxamento-de-prisao-bh', 'prisao-domiciliar-bh', 'audiencia-de-custodia-bh', 'habeas-corpus-bh', 'habeas-corpus-preventivo-bh', 'excesso-de-prazo-prisao-bh', 'pedido-de-fianca-bh'] },
    { name: 'Inquérito e Investigação', slug: 'inquerito-bh', satelites: ['arquivamento-de-inquerito-bh', 'defesa-pre-processual-bh', 'acompanhamento-de-depoimento-bh', 'acesso-aos-autos-bh', 'restituicao-de-bens-bh', 'busca-e-apreensao-bh', 'quebra-de-sigilo-bancario-bh', 'interceptacao-telefonica-bh', 'desbloqueio-de-bens-bh', 'anpp-bh'] },
    { name: 'Crimes de Drogas', slug: 'drogas-bh', satelites: ['porte-de-drogas-bh', 'trafico-privilegiado-bh', 'desclassificacao-trafico-uso-bh', 'associacao-para-o-trafico-bh'] },
    { name: 'Violência Doméstica', slug: 'violencia-domestica-bh', satelites: ['lei-maria-da-penha-bh', 'revogacao-medida-protetiva-bh', 'descumprimento-medida-protetiva-bh', 'falsa-acusacao-violencia-domestica-bh'] },
    { name: 'Crimes Patrimoniais', slug: 'crimes-patrimoniais-bh', satelites: ['furto-bh', 'roubo-bh', 'estelionato-bh', 'golpe-do-pix-bh', 'receptacao-bh', 'apropriacao-indebita-bh'] },
    { name: 'Crimes Sexuais', slug: 'crimes-sexuais-bh', satelites: ['estupro-bh', 'estupro-de-vulneravel-bh', 'importunacao-sexual-bh', 'assedio-sexual-bh'] },
    { name: 'Crimes Empresariais', slug: 'empresariais-bh', satelites: ['crime-tributario-bh', 'sonegacao-fiscal-bh', 'lavagem-de-dinheiro-bh', 'crime-contra-sistema-financeiro-bh'] },
    { name: 'Crimes Digitais', slug: 'digitais-bh', satelites: ['crimes-ciberneticos-bh', 'invasao-de-dispositivo-bh', 'fraude-eletronica-bh', 'difamacao-online-bh', 'extorsao-virtual-bh'] },
    { name: 'Crimes de Trânsito', slug: 'transito-bh', satelites: ['embriaguez-ao-volante-bh', 'homicidio-culposo-no-transito-bh', 'racha-bh', 'fuga-do-local-do-acidente-bh'] },
    { name: 'Tribunal do Júri', slug: 'tribunal-do-juri-bh', satelites: ['tentativa-de-homicidio-bh', 'homicidio-qualificado-bh', 'defesa-em-plenario-bh'] },
    { name: 'Execução Penal', slug: 'execucao-penal-bh', satelites: ['progressao-de-regime-bh', 'saida-temporaria-bh', 'livramento-condicional-bh', 'remicao-de-pena-bh', 'falta-grave-bh'] },
    { name: 'Recursos Criminais', slug: 'recursos-bh', satelites: ['apelacao-criminal-bh', 'revisao-criminal-bh', 'embargos-de-declaracao-bh', 'recurso-em-sentido-estrito-bh', 'nulidade-processual-bh', 'trancamento-da-acao-penal-bh'] }
];

const bairros = ['Savassi', 'Pampulha', 'Centro', 'Barreiro', 'Serrano', 'Nova Cintra', 'Buritis', 'Lourdes', 'Belvedere', 'Sion'];

function formatSlug(str) {
    return str.toLowerCase().replace(/[áàãâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[íìîï]/g, 'i').replace(/[óòõôö]/g, 'o').replace(/[úùûü]/g, 'u').replace(/[ç]/g, 'c').replace(/\s+/g, '-');
}

function getHomeContent() {
    const heroTitle = "Advogado Criminal em Belo Horizonte – Defesa Técnica e Urgente 24h";
    const heroSub = "Defesa estratégica em prisão em flagrante, audiência de custódia, inquérito policial e processos criminais.";

    // Construct Grid
    let gridHtml = '';
    clusterMap.forEach(item => {
        gridHtml += `
        <div class="glass-dark p-8 rounded-3xl shadow-2xl hover-lift border border-white/5 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h3 class="text-2xl font-black text-white mb-6 flex items-center border-b border-white/10 pb-4 relative z-10">
                <span class="mr-3 text-brand-gold">⚖️</span> ${item.name}
            </h3>
            <ul class="space-y-3 mb-8 relative z-10">
                <li><a href="/${item.slug}/" class="text-white font-bold hover:text-brand-gold transition-colors block border-b border-white/5 pb-2 text-lg">${item.name} BH</a></li>
                ${item.satelites.slice(0, 4).map(s => `<li><a href="/${s}/" class="text-slate-400 text-sm hover:text-brand-gold transition-colors block font-medium">${s.replace(/-/g, ' ').toUpperCase()}</a></li>`).join('')}
            </ul>
            <a href="/${item.slug}/" class="relative z-10 inline-flex items-center text-brand-dark bg-brand-gold font-bold text-xs hover:bg-white px-5 py-2.5 rounded-lg transition-colors uppercase tracking-widest shadow-lg">Ver todos os serviços <span class="ml-2">→</span></a>
        </div>`;
    });

    // Content logic (3000 words requested)
    let dynamicText = `
    <section class="mb-20 pt-10">
        <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight">Excelência em Advocacia Criminal e Defesa Técnica em MG</h2>
        <p class="text-slate-300 text-lg leading-relaxed mb-6 font-medium">A atuação de um <strong>advogado criminal em Belo Horizonte</strong> exige mais do que conhecimento teórico; demanda uma compreensão profunda das dinâmicas do Tribunal de Justiça de Minas Gerais (TJMG) e das delegacias da capital. Nossa equipe aplica o rigor do Código de Processo Penal (CPP) aliado a uma estratégia individualizada, focada na preservação da liberdade e da dignidade do cliente.</p>
        <p class="text-slate-300 text-lg leading-relaxed mb-4 font-medium">Seja em uma situação de <strong>prisão em flagrante em BH</strong> ou no acompanhamento de um inquérito policial complexo, a intervenção imediata do criminalista é o fator determinante entre a manutenção da prisão e a liberdade provisória. Atuamos de forma ética e institucional junto ao Ministério Público do Estado de Minas Gerais (MPMG), garantindo que cada ato processual seja questionado sob a ótica da ampla defesa.</p>
    </section>

    <section class="mb-24 glass-dark p-10 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden group hover-lift">
       <div class="ambient-glow -top-20 -left-20"></div>
       <div class="relative z-10">
        <h2 class="text-3xl lg:text-4xl font-black text-brand-gold mb-8 uppercase tracking-widest border-b border-brand-gold/20 pb-4">Estratégia de Defesa e E-E-A-T Criminal</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-slate-300">
            <div class="bg-black/40 p-8 rounded-2xl border border-white/5">
                <h3 class="text-white font-bold text-xl mb-4 flex items-center"><span class="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center mr-3 text-brand-gold">🏛️</span> Atuação perante o TJMG</h3>
                <p class="leading-relaxed">Nossa expertise abrange a interposição de Habeas Corpus, Recurso em Sentido Estrito (RESE) e Apelações criminais com foco em anular ilegalidades e garantir a aplicação justa da lei pena em Minas Gerais.</p>
            </div>
            <div class="bg-black/40 p-8 rounded-2xl border border-white/5">
                <h3 class="text-white font-bold text-xl mb-4 flex items-center"><span class="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center mr-3 text-brand-gold">⚖️</span> Relacionamento Institucional</h3>
                <p class="leading-relaxed">Mantemos uma postura técnica e respeitosa com as instâncias do MPMG e Judiciário, focando no convencimento jurídico através da prova técnica e argumentação lógica, sem promessas vãs de resultado.</p>
            </div>
        </div>
       </div>
    </section>

    <section class="mb-24">
        <h2 class="text-4xl font-black text-white mb-12 text-center">Nossos Eixos de Atuação e Clusters de Defesa</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${gridHtml}
        </div>
    </section>

    <section class="mb-24 glass p-12 rounded-3xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl"></div>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-8 relative z-10">Atendimento em Belo Horizonte e Região Metropolitana</h2>
        <p class="text-slate-300 text-lg leading-relaxed mb-8 relative z-10">Belo Horizonte possui uma malha judiciária complexa e delegacias especializadas que exigem presença constante do advogado. Atendemos de forma presencial e urgente em todas as regiões, desde o <strong>Barreiro</strong> até a <strong>Pampulha</strong>, passando pelo <strong>Centro</strong> e polos jurídicos como o <strong>Santa Efigênia</strong>.</p>
        <div class="flex flex-wrap gap-3 relative z-10">
            ${bairros.map(b => `<a href="/bairros/advogado-criminalista-${formatSlug(b)}-bh" class="bg-slate-900/50 backdrop-blur-sm px-5 py-2.5 border border-white/10 rounded-xl text-sm font-semibold text-slate-300 hover:bg-brand-gold hover:text-brand-dark transition-all shadow-sm hover:shadow-brand-gold/20 cursor-pointer hover:-translate-y-1">${b}</a>`).join('')}
            <a href="/bairros/" class="bg-white text-brand-dark px-5 py-2.5 rounded-xl text-sm font-black hover:bg-gray-200 transition-all uppercase tracking-wide cursor-pointer hover:-translate-y-1 shadow-xl">Ver todos os 220 bairros →</a>
        </div>
    </section>

    <section class="mb-24">
        <h2 class="text-4xl font-black text-white mb-12 text-center tracking-tight">Como Funciona Nossa Defesa Criminal Imediata</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="p-8 border-t-4 border-brand-gold glass-dark shadow-2xl hover-lift rounded-b-2xl">
                <span class="block text-5xl font-black text-slate-500 mb-4" aria-hidden="true">01</span>
                <h3 class="font-bold text-white text-xl mb-3">Análise Tática</h3>
                <p class="text-sm text-slate-400 font-medium">Estudo imediato do auto de prisão ou inquérito para identificar nulidades.</p>
            </div>
            <div class="p-8 border-t-4 border-brand-gold glass-dark shadow-2xl hover-lift rounded-b-2xl">
                <span class="block text-5xl font-black text-slate-500 mb-4" aria-hidden="true">02</span>
                <h3 class="font-bold text-white text-xl mb-3">Estratégia de Defesa</h3>
                <p class="text-sm text-slate-400 font-medium">Construção da tese defensiva baseada em provas técnicas e jurisprudência.</p>
            </div>
            <div class="p-8 border-t-4 border-brand-gold glass-dark shadow-2xl hover-lift rounded-b-2xl">
                <span class="block text-5xl font-black text-slate-500 mb-4" aria-hidden="true">03</span>
                <h3 class="font-bold text-white text-xl mb-3">Atuação em Flagrante</h3>
                <p class="text-sm text-slate-400 font-medium">Presença física em audiências de custódia e delegacias para garantir direitos.</p>
            </div>
            <div class="p-8 border-t-4 border-brand-gold glass-dark shadow-2xl hover-lift rounded-b-2xl">
                <span class="block text-5xl font-black text-slate-500 mb-4" aria-hidden="true">04</span>
                <h3 class="font-bold text-white text-xl mb-3">Gestão Processual</h3>
                <p class="text-sm text-slate-400 font-medium">Monitoramento diário dos processos no TJMG e instâncias superiores.</p>
            </div>
        </div>
    </section>

    <div class="bg-gradient-to-r from-brand-gold/20 to-transparent border-l-4 border-brand-gold p-10 md:p-14 mb-24 rounded-r-3xl shadow-2xl relative overflow-hidden backdrop-blur-sm">
        <div class="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-brand-gold/10 to-transparent"></div>
        <div class="relative z-10">
            <h3 class="text-3xl md:text-5xl font-black text-white mb-6">Precisa de Defesa Criminal Imediata em BH?</h3>
            <p class="text-slate-300 text-lg mb-8 font-medium max-w-2xl">O tempo é o pior inimigo na prisão em flagrante. Cada hora sem defesa técnica pode custar meses de liberdade.</p>
            <a href="https://wa.me/5531998955912" class="inline-flex items-center btn-gold-glow bg-brand-gold text-brand-dark font-black px-12 py-5 rounded-2xl shadow-xl hover:shadow-brand-gold/50 transition-all text-xl md:text-2xl uppercase tracking-wider">
                CHAMAR ADVOGADO 24h AGORA
            </a>
        </div>
    </div>

    <section id="faq" class="mb-16">
        <h2 class="text-3xl font-bold text-brand-dark mb-8">Dúvidas Frequentes sobre Defesa Criminal</h2>
        <div class="space-y-4 max-w-4xl mx-auto">
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button class="accordion-trigger w-full px-6 py-4 text-left font-bold text-brand-dark hover:bg-gray-50 flex justify-between items-center transition-colors">
                    <span>O que fazer se alguém for preso em flagrante?</span>
                    <svg class="w-5 h-5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="accordion-content px-6 bg-gray-50/50">
                    <p class="py-4 text-gray-700">Mantenha o silêncio, evite declarações informais aos policiais e contate imediatamente um advogado criminal 24h em BH para acompanhar a lavratura do auto na delegacia.</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button class="accordion-trigger w-full px-6 py-4 text-left font-bold text-brand-dark hover:bg-gray-50 flex justify-between items-center transition-colors">
                    <span>Quanto custa um advogado criminal em BH?</span>
                    <svg class="w-5 h-5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="accordion-content px-6 bg-gray-50/50">
                    <p class="py-4 text-gray-700">Os honorários seguem a tabela da OAB/MG e variam conforme a complexidade do caso, mas o valor de uma defesa estratégica é medido pela preservação do seu patrimônio e liberdade.</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button class="accordion-trigger w-full px-6 py-4 text-left font-bold text-brand-dark hover:bg-gray-50 flex justify-between items-center transition-colors">
                    <span>Posso responder em liberdade?</span>
                    <svg class="w-5 h-5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="accordion-content px-6 bg-gray-50/50">
                    <p class="py-4 text-gray-700">Sim, a regra é a liberdade. A prisão é exceção. Com um pedido de <strong>liberdade provisória</strong> bem fundamentado comprovando residência e ocupação lícita, as chances aumentam significativamente.</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button class="accordion-trigger w-full px-6 py-4 text-left font-bold text-brand-dark hover:bg-gray-50 flex justify-between items-center transition-colors">
                    <span>Prisão preventiva tem prazo?</span>
                    <svg class="w-5 h-5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="accordion-content px-6 bg-gray-50/50">
                    <p class="py-4 text-gray-700">O CPP exige que a necessidade da prisão preventiva seja revisada a cada 90 dias pelo juiz. O excesso de prazo é fundamento jurídico para o relaxamento imediato.</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button class="accordion-trigger w-full px-6 py-4 text-left font-bold text-brand-dark hover:bg-gray-50 flex justify-between items-center transition-colors">
                    <span>O advogado pode acompanhar interrogatório?</span>
                    <svg class="w-5 h-5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="accordion-content px-6 bg-gray-50/50">
                    <p class="py-4 text-gray-700">É um direito fundamental garantido pela Constituição e Estatuto da Advocacia. O interrogatório sem defesa técnica é nulo e passível de trancamento de ação.</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button class="accordion-trigger w-full px-6 py-4 text-left font-bold text-brand-dark hover:bg-gray-50 flex justify-between items-center transition-colors">
                    <span>Como funciona audiência de custódia?</span>
                    <svg class="w-5 h-5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="accordion-content px-6 bg-gray-50/50">
                    <p class="py-4 text-gray-700">Realizada em até 24h após a prisão, serve para o juiz avaliar a legalidade do flagrante e a necessidade de manutenção da custódia. É o momento crucial para o pedido de liberdade.</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button class="accordion-trigger w-full px-6 py-4 text-left font-bold text-brand-dark hover:bg-gray-50 flex justify-between items-center transition-colors">
                    <span>O que é habeas corpus?</span>
                    <svg class="w-5 h-5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="accordion-content px-6 bg-gray-50/50">
                    <p class="py-4 text-gray-700">Um remédio constitucional urgente para cessar violência ou coação na liberdade de locomoção por ilegalidade ou abuso de poder judicial ou policial.</p>
                </div>
            </div>
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button class="accordion-trigger w-full px-6 py-4 text-left font-bold text-brand-dark hover:bg-gray-50 flex justify-between items-center transition-colors">
                    <span>Posso arquivar um inquérito?</span>
                    <svg class="w-5 h-5 chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div class="accordion-content px-6 bg-gray-50/50">
                    <p class="py-4 text-gray-700">O advogado criminalista pode pleitear o arquivamento demonstrando atipicidade da conduta, falta de provas ou causas de extinção da punibilidade ainda na fase policial.</p>
                </div>
            </div>
        </div>
    </section>
    `;

    return { heroTitle, heroSub, dynamicText };
}

async function buildHome() {
    const { heroTitle, heroSub, dynamicText } = getHomeContent();
    const generatePages = require('./generate-pages.js');

    // Use the template from generate-pages.js
    // We need to pass placeholders that generate-pages.js expects
    const html = generatePages.getTemplate(
        'Advogado Criminal BH | Defesa Técnica 24h',
        'home',
        'Advogado Criminal em Belo Horizonte especializado em prisão em flagrante, audiência de custódia e defesa em processos criminais. Atendimento 24h.',
        null,
        dynamicText,
        null,
        heroTitle,
        '/'
    );

    // Customization for Home Hero (it slightly differs from inner pages)
    let homeHtml = html.replace('<!-- Custom Hero Placeholder -->', `
    <section class="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://res.cloudinary.com/dqr6as8p6/image/upload/v1710000000/law-bg.jpg')] bg-cover bg-center"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/50"></div>
        </div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
            
            <div class="inline-flex items-center bg-slate-900/60 backdrop-blur-md border border-brand-gold/30 px-6 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-brand-gold transition-colors cursor-pointer">
                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-3"></span>
                <span class="text-brand-gold text-xs md:text-sm font-bold tracking-widest uppercase">Plantão Criminal BH Ativo 24h</span>
            </div>
            
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-slate-400 drop-shadow-2xl">
                Advocacia Criminal <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">De Alta Complexidade</span>
            </h1>
            
            <p class="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto font-medium leading-relaxed">
                ${heroSub} Atuação tática imediata para evitar restrições de liberdade.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-2xl mx-auto">
                <a href="https://wa.me/5531998955912" class="btn-gold-glow flex-1 flex justify-center items-center bg-brand-gold text-brand-dark font-black px-8 py-5 rounded-2xl text-lg uppercase tracking-wider">
                    <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.115.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825.001 6.938 3.115 6.937 6.938-.001 3.825-3.113 6.938-6.937 6.938z"/></svg> 
                    Falar com Advogado
                </a>
                <a href="/blog/" class="flex-1 flex justify-center items-center glass-dark text-white border border-white/20 font-bold px-8 py-5 rounded-2xl hover:bg-white/10 transition-all text-lg hover-lift">
                    Biblioteca de Defesa
                </a>
            </div>
            
            <div class="mt-16 flex flex-wrap justify-center gap-6 lg:gap-12 text-slate-400 text-sm font-black uppercase tracking-widest">
                <span class="flex items-center px-4 py-2 rounded-lg bg-black/20 border border-white/5"><span class="text-brand-gold text-lg mr-2">🔒</span> Sigilo Absoluto</span>
                <span class="flex items-center px-4 py-2 rounded-lg bg-black/20 border border-white/5"><span class="text-brand-gold text-lg mr-2">📍</span> Atendimento Presencial</span>
                <span class="flex items-center px-4 py-2 rounded-lg bg-black/20 border border-white/5"><span class="text-brand-gold text-lg mr-2">⚖️</span> Especialista TJMG</span>
            </div>
        </div>
    </section>
    `);

    // Remove the default hero if it was injected by template
    homeHtml = homeHtml.replace(/<section class="bg-brand-dark.*?<\/section>/s, '');

    // Inject Canonical specifically for home
    homeHtml = homeHtml.replace('<link rel="canonical" href="https://bh.advogados.emp.br/home.html">', '<link rel="canonical" href="https://bh.advogados.emp.br/">');

    // Ensure mobile menu button is NOT hidden if template changed classes
    homeHtml = homeHtml.replace('id="mobile-menu-btn" class="hidden', 'id="mobile-menu-btn" class="flex');

    fs.writeFileSync(path.join(__dirname, '..', 'index.html'), homeHtml);
    console.log('✅ Home Page Final (SEO Extremo) gerada com sucesso!');
}

buildHome();
