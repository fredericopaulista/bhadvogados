const fs = require('fs');
const path = require('path');

const domain = 'https://bh.advogados.emp.br';

const pilares = [
    { title: 'Prisão e Urgência', file: 'prisao/', desc: 'Prisão em Flagrante, Preventiva e Audiência de Custódia' },
    { title: 'Inquérito e Investigação', file: 'inquerito/', desc: 'Acompanhamento Extremo de Inquéritos Policiais' },
    { title: 'Crimes de Drogas', file: 'drogas/', desc: 'Tráfico de Drogas e Legislação' },
    { title: 'Violência Doméstica', file: 'violencia-domestica/', desc: 'Lei Maria da Penha e Medidas Protetivas' },
    { title: 'Crimes Patrimoniais', file: 'crimes-patrimoniais/', desc: 'Roubo, Furto, Estelionato' },
    { title: 'Crimes Sexuais', file: 'crimes-sexuais/', desc: 'Defesa Técnica em Crimes Sexuais' },
    { title: 'Tribunal do Júri', file: 'tribunal-do-juri/', desc: 'Defesa Fática no Plenário' },
    { title: 'Execução Penal', file: 'execucao-penal/', desc: 'Progressão e Benefícios Carcerários' }
];


const blog = [
    { title: 'O que acontece depois da prisão em flagrante', file: 'o-que-acontece-depois-da-prisao-em-flagrante.html' },
    { title: 'Quanto tempo demora audiência de custódia', file: 'quanto-tempo-demora-audiencia-de-custodia.html' },
    { title: 'Fui indiciado, o que significa?', file: 'fui-indiciado-o-que-significa.html' },
    { title: 'Direitos do acusado na delegacia', file: 'direitos-do-acusado-na-delegacia.html' },
    { title: 'Quanto tempo dura processo criminal em MG', file: 'quanto-tempo-dura-processo-criminal-em-mg.html' },
    { title: 'O que é tráfico privilegiado', file: 'o-que-e-trafico-privilegiado.html' },
    { title: 'Como funciona o júri popular', file: 'como-funciona-o-juri-popular.html' },
    { title: 'Quando cabe habeas corpus preventivo', file: 'quando-cabe-habeas-corpus-preventivo.html' },
    // Novos
    { title: 'Posso ser preso antes da audiência?', file: 'posso-ser-preso-antes-da-audiencia.html' },
    { title: 'Excesso de prazo na prisão preventiva', file: 'excesso-de-prazo-na-prisao-preventiva.html' },
    { title: 'Diferença entre indiciado e réu', file: 'diferenca-entre-indiciado-e-reu.html' },
    { title: 'Tráfico privilegiado para réu primário', file: 'trafico-privilegiado-para-reu-primario.html' },
    { title: 'Como funciona progressão de regime', file: 'como-funciona-progressao-de-regime.html' },
    { title: 'Advogado criminal pode evitar denúncia?', file: 'advogado-criminal-pode-evitar-denuncia.html' },
    { title: 'Arquivamento de inquérito como funciona', file: 'arquivamento-de-inquerito-como-funciona.html' },
    { title: 'Acordo de não persecução penal (ANPP)', file: 'acordo-de-nao-persecucao-penal-anpp.html' }
];

const bairros = [
    'Aarão Reis', 'Acaba Mundo', 'Acaiaca', 'Adelaide', 'Aeroporto', 'Águas Claras', 'Alípio de Melo', 'Alpes', 'Alta Tensão I', 'Alto Barroca', 'Alto Caiçaras', 'Alto dos Pinheiros', 'Alto Vera Cruz', 'Álvaro Camargos', 'Anchieta', 'Andiroba', 'Aparecida', 'Aparecida Sétima Seção', 'Ápia', 'Apolônia', 'Araguaia', 'Área Rural de Belo Horizonte', 'Átila de Paiva', 'Baleia', 'Bandeirantes', 'Barreiro', 'Barreiro de Baixo', 'Barreiro de Cima', 'Barro Preto', 'Barroca', 'Beija Flor', 'Beira-Linha', 'Belmonte', 'Belvedere', 'Bernadete', 'Betânia', 'Biquinhas', 'Bispo de Maura', 'Boa Esperança', 'Boa Viagem', 'Boa Vista', 'Bom Jesus', 'Bonfim', 'Bonsucesso', 'Brasil Industrial', 'Braúnas', 'Buritis', 'Cabana do Pai Tomás', 'Cachoeirinha', 'Caetano Furquim', 'Caicara', 'Caiçara-Adelaide', 'Caiçaras', 'Calafate', 'Califórnia', 'Camargos', 'Campo Alegre', 'Campus UFMG', 'Canaã', 'Canadá', 'Candelária', 'Capitão Eduardo', 'Cardoso', 'Carlos Prates', 'Carmo', 'Casa Branca', 'Castanheira', 'Castelo', 'CDI Jatobá', 'Celestino', 'Cenáculo', 'Centro', 'Céu Azul', 'Cidade Jardim', 'Cidade Nova', 'Cinquentenário', 'Colégio Batista', 'Comiteco', 'Concórdia', 'Cônego Pinheiro', 'Confisco', 'Conjunto Ademar Maldonado', 'Conjunto Bonsucesso', 'Conjunto Califórnia', 'Conjunto Celso Machado', 'Conjunto Felicidade', 'Conjunto Habitacional Vale do Jatobá', 'Conjunto Jardim Filadélfia', 'Conjunto Jatobá', 'Conjunto Lagoa', 'Conjunto Minascaixa', 'Conjunto Novo Dom Bosco', 'Conjunto Paulo VI', 'Conjunto Santa Maria', 'Conjunto Taquaril', 'Conjunto Túnel Ibirité', 'Conjunto Zilah Spósito', 'Copacabana', 'Coqueiros', 'Coração de Jesus', 'Coração Eucarístico', 'Corumbiara', 'Cruzeiro', 'Delta', 'Diamante', 'Distrito Industrial', 'Dom Bosco', 'Dom Cabral', 'Dom Joaquim', 'Dom Silvério', 'Dona Clara', 'Engenho Nogueira', 'Ermelinda', 'Ernesto do Nascimento', 'Esperança', 'Esplanada', 'Estoril', 'Estrela', 'Estrela do Oriente', 'Etelvina Carneiro', 'Europa', 'Eymard', 'Fazendinha', 'Fernão Dias', 'Flávio de Oliveira', 'Flávio Marques Lisboa', 'Floramar', 'Floresta', 'Frei Leopoldo', 'Funcionários', 'Gameleira', 'Garças', 'Glória', 'Goiânia', 'Graça', 'Grajaú', 'Granja de Freitas', 'Granja Werneck', 'Grotinha', 'Guarani', 'Gutierrez', 'Havaí', 'Heliópolis', 'Horto', 'Horto Florestal', 'Imbaúbas', 'Inconfidência', 'Indaiá', 'Independência', 'Indústrias I', 'Indústrias II', 'Ipê', 'Ipiranga', 'Itaipu', 'Itapoã', 'Itatiaia', 'Jacqueline', 'Jaqueline', 'Jaraguá', 'Jardim Alvorada', 'Jardim América', 'Jardim Atlântico', 'Jardim dos Comerciários', 'Jardim Felicidade', 'Jardim Filadélfia', 'Jardim Guanabara', 'Jardim Leblon', 'Jardim Montanhês', 'Jardim Pirineus', 'Jardim São José', 'Jardim Vitória', 'Jardinópolis', 'Jatobá', 'João Paulo II', 'João Pinheiro', 'Jonas Veiga', 'Juliana', 'Lagoinha', 'Leblon', 'Lajedo', 'Laranjeiras', 'Leonina', 'Letícia', 'Liberdade', 'Lindéia', 'Lourdes', 'Luxemburgo', 'Madre Gertrudes', 'Madre Gertrudes III', 'Madre Gertrudes V', 'Madri', 'Mala e Cuia', 'Manacás', 'Mangabeiras', 'Mangueiras', 'Mantiqueira', 'Marajó', 'Marçola', 'Maria Goretti', 'Maria Helena', 'Maria Tereza', 'Maria Virgínia', 'Mariano de Abreu', 'Marieta I', 'Marilândia', 'Mariquinhas', 'Marize', 'Marmiteiros', 'Milionários', 'Minas Brasil', 'Minascaixa', 'Miramar', 'Mirante', 'Monsenhor Messias', 'Monte Azul', 'Morro das Pedras', 'Nazaré', 'Nossa Senhora Aparecida', 'Nossa Senhora da Conceição', 'Nossa Senhora da Saúde', 'Nossa Senhora de Fátima', 'Nossa Senhora do Rosário', 'Nova Cachoeirinha', 'Nova Cintra', 'Nova Esperança', 'Nova Floresta', 'Nova Gameleira', 'Nova Granada', 'Nova Pampulha', 'Nova Suíssa', 'Nova Vista', 'Novo Aarão Reis', 'Novo das Indústrias', 'Novo Glória', 'Novo Itamarati', 'Novo Santa Cecília', 'Novo Tupi Oeste', 'Olaria', 'Olhos d’Água', 'Ouro Minas', 'Ouro Preto', 'Padre Eustáquio', 'Padre Júlio Maria', 'Palmares', 'Palmeiras', 'Pampulha', 'Pantanal', 'Paquetá', 'Paraíso', 'Parque São José', 'Parque São Pedro', 'Paulo VI', 'Pedreira', 'Prado Lopes', 'Pedro II', 'Penha', 'Petrópolis', 'Pilar', 'Pindorama', 'Pio XII', 'Pirajá', 'Piratininga', 'Planalto', 'Pompéia', 'Pongelupe', 'Pousada Santo Antônio', 'Prado', 'Primeiro de Maio', 'Providência', 'Renascença', 'Ribeiro de Abreu', 'Rio Branco', 'Sagrada Família', 'Salgado Filho', 'Santa Amélia', 'Santa Branca', 'Santa Cecília', 'Santa Cruz', 'Santa Efigênia', 'Santa Helena', 'Santa Inês', 'Santa Isabel', 'Santa Lúcia', 'Santa Margarida', 'Santa Maria', 'Santa Mônica', 'Santa Rosa', 'Santa Sofia', 'Santa Tereza', 'Santa Terezinha', 'Santana do Cafezal', 'Santo Agostinho', 'Santo André', 'Santo Antônio', 'São Benedito', 'São Bento', 'São Bernardo', 'São Cristóvão', 'São Damião', 'São Francisco', 'São Gabriel', 'São Geraldo', 'São Gonçalo', 'São João', 'São João Batista', 'São Jorge', 'São José', 'São Lucas', 'São Luiz', 'São Marcos', 'São Paulo', 'São Pedro', 'São Salvador', 'São Sebastião', 'São Tomáz', 'Satélite', 'Saudade', 'Savassi', 'Senhor dos Passos', 'Serra', 'Serra do Curral', 'Serra Verde', 'Serrano', 'Silveira', 'Sion', 'Solar do Barreiro', 'Solimões', 'Sport Club', 'Sumaré', 'Suzana', 'Taquaril', 'Teixeira Dias', 'Tiradentes', 'Tirol', 'Três Marias', 'Trevo', 'Tupi A', 'Tupi B', 'União', 'Universitário', 'Universo', 'Urca', 'Vale do Jatobá', 'Venda Nova', 'Ventosa', 'Vera Cruz', 'Vila Aeroporto', 'Vila Antena', 'Vila Barragem', 'Vila Bernadete', 'Vila Calafate', 'Vila Cemig', 'Vila Cloris'
];

function shuffleArray(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getTemplate(title, type, description, breadcrumbs, customContent = null, customSchema = null, customH1 = null, path = '/') {
    const canonical = `${domain}${path.endsWith('/') ? path : path + '/'}`;
    const slug = (str) => str.toLowerCase().replace(/[áàãâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[íìîï]/g, 'i').replace(/[óòõôö]/g, 'o').replace(/[úùûü]/g, 'u').replace(/[ç]/g, 'c').replace(/\s+/g, '-');

    // Malha: 5 random bairros
    const randomBairros = shuffleArray(bairros).slice(0, 5);
    const bairrosLinks = randomBairros.map(b => `<li><a href="/bairros/advogado-criminalista-${slug(b)}-bh" class="text-brand-gold hover:underline">Advogado Criminal no ${b}</a></li>`).join('');

    // Malha: 3 random blog articles for services
    const randomBlog = shuffleArray(blog).slice(0, 3);
    const blogLinks = randomBlog.map(b => `<li><a href="/blog/${b.file.replace('.html', '')}" class="text-brand-gold hover:underline">${b.title}</a></li>`).join('');

    // Malha: 2 random services (pilares)
    const randomPilares = shuffleArray(pilares).filter(s => s.title !== title).slice(0, 2);
    const pilarLinks = randomPilares.map(s => `<li><a href="/${s.file.replace('/', '-bh/')}" class="text-white hover:text-brand-gold hover-lift block p-4 bg-white/5 border border-white/5 rounded-xl shadow-lg font-bold">${s.title}</a></li>`).join('');

    // FAQ Text Content based on type (AI Overview Optimization)
    let faqHTML = '';
    if (customContent) {
        faqHTML = '';
    } else if (type === 'servico' || type === 'blog') {
        faqHTML = `
        <div class="mt-12">
            <h2 class="text-2xl font-bold mb-6">Dúvidas Rápidas (FAQ)</h2>
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 border border-gray-200 rounded">
                    <h3 class="font-bold text-gray-900">O que fazer em caso de urgência criminal 24h?</h3>
                    <p class="text-sm mt-2 text-gray-700">Contate imediatamente um advogado criminal plantão noturno BH. Não tome decisões, não assine documentos nem preste depoimento na delegacia sem o profissional.</p>
                </div>
                <div class="bg-gray-50 p-4 border border-gray-200 rounded">
                    <h3 class="font-bold text-gray-900">Estou sendo investigado, o que fazer?</h3>
                    <p class="text-sm mt-2 text-gray-700">Contrate um advogado para inquérito policial BH. A defesa deve agir antes da denúncia para buscar o arquivamento de inquérito ou um acordo de não persecução penal (ANPP).</p>
                </div>
                <div class="bg-gray-50 p-4 border border-gray-200 rounded">
                    <h3 class="font-bold text-gray-900">Preso primário loga consegue soltura imediata?</h3>
                    <p class="text-sm mt-2 text-gray-700">Depende do juiz na audiência de custódia amanhã. É necessário demonstrar a desnecessidade de prisão preventiva. Se houver excesso de prazo, cabe habeas corpus.</p>
                </div>
                <div class="bg-gray-50 p-4 border border-gray-200 rounded">
                    <h3 class="font-bold text-gray-900">Atendimento criminal é sigiloso?</h3>
                    <p class="text-sm mt-2 text-gray-700">Sim. Nosso advogado criminal atende casos sensíveis em BH com total discrição, ideal para empresários ou servidores públicos garantindo sigilo absoluto.</p>
                </div>
            </div>
        </div>`;
    }

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} em BH | Advogado Criminalista Especialista</title>
    
    <meta name="description" content="Necessita de ${title.toLowerCase()} em BH? Advogado criminal urgente para soltura imediata e defesa tática. Plantão 24h para prisões e investigações.">
    <meta property="og:title" content="${title} em BH | Advogado Criminalista">
    <meta property="og:type" content="${type === 'blog' ? 'article' : 'website'}">
    
    <link rel="canonical" href="${canonical}">
    
    <link rel="stylesheet" href="/assets/css/tailwind.css">
    <link rel="stylesheet" href="/assets/css/style.css">
    
    <!-- Schema Markup Completo -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LegalService",
          "name": "Defesa Técnica Especializada - Belo Horizonte",
          "image": "${domain}/assets/img/logo.jpg",
          "@id": "${domain}/#organization",
          "url": "${domain}/",
          "telephone": "+5531998955912",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Afonso Pena",
            "addressLocality": "Belo Horizonte",
            "addressRegion": "MG",
            "postalCode": "30130-000",
            "addressCountry": "BR"
          }
        },
        {
          "@type": "Attorney",
          "name": "Advogado Criminalista Titular",
          "url": "${domain}/sobre"
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "${domain}/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "${breadcrumbs}",
              "item": "${domain}/${type === 'bairro' ? 'bairros/index.html' : type === 'servico' ? '' : 'blog/o-que-acontece-depois-da-prisao-em-flagrante.html'}"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "${title}"
            }
          ]
        }${customSchema ? ',' + customSchema : (type === 'servico' ? `,
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "O que fazer em caso de urgência criminal 24h?",
              "acceptedAnswer": { "@type": "Answer", "text": "Contate imediatamente um advogado criminal plantão noturno BH." }
            },
            {
              "@type": "Question",
              "name": "Estou sendo investigado, o que fazer?",
              "acceptedAnswer": { "@type": "Answer", "text": "Contrate um advogado para inquérito policial BH." }
            }
          ]
        }` : '')}${type === 'blog' ? `,
        {
          "@type": "Article",
          "headline": "${title}",
          "description": "Artigo jurídico tático criminal sobre ${title}",
          "author": { "@type": "Organization", "@id": "${domain}/#organization" },
          "publisher": { "@type": "Organization", "@id": "${domain}/#organization" }
        }` : ''}
      ]
    }
    </script>
</head>
<body class="bg-brand-darker text-slate-300 pt-20">

    <header id="main-header" class="fixed top-0 w-full glass-dark text-white z-50 transition-all duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-24 items-center">
                <!-- Logo -->
                <div class="flex-shrink-0 flex items-center">
                    <a href="/" class="text-2xl md:text-3xl font-black tracking-tighter hover:scale-105 transition-transform duration-300">
                        <span class="text-white">Criminalista</span><span class="text-brand-gold">BH</span>
                    </a>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex space-x-8 items-center">
                    <a href="/#urgencia" class="hover:text-brand-gold transition-colors font-bold text-sm uppercase tracking-widest">Urgências 24h</a>
                    <a href="/sobre" class="hover:text-brand-gold transition-colors font-bold text-sm uppercase tracking-widest">Sobre</a>
                    <div class="relative group flex items-center">
                        <button class="hover:text-brand-gold transition-colors font-bold text-sm uppercase tracking-widest flex items-center">Áreas de Atuação
                            <svg class="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div class="absolute hidden group-hover:block transition-all w-[550px] -left-20 top-full pt-4 z-50">
                            <div class="bg-slate-950/95 backdrop-blur-2xl text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl border border-white/10 p-6 grid grid-cols-2 gap-4">
                            <div class="space-y-1">
                                <a href="/prisao-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Prisão e Urgência</a>
                                <a href="/inquerito-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Inquérito e Investigação</a>
                                <a href="/drogas-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Crimes de Drogas</a>
                                <a href="/violencia-domestica-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Violência Doméstica</a>
                                <a href="/crimes-patrimoniais-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Crimes Patrimoniais</a>
                            </div>
                            <div class="space-y-1 border-l border-white/5 pl-4">
                                <a href="/crimes-sexuais-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Crimes Sexuais</a>
                                <a href="/transito-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Crimes de Trânsito</a>
                                <a href="/tribunal-do-juri-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Tribunal do Júri</a>
                                <a href="/execucao-penal-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Execução Penal</a>
                                <a href="/recursos-bh/" class="block px-4 py-3 text-sm hover:bg-white/5 hover:text-brand-gold rounded-xl transition-all font-bold">Recursos Criminais</a>
                            </div>
                        </div>
                    </div>
                    <a href="/bairros/" class="hover:text-brand-gold transition-colors font-bold text-sm uppercase tracking-widest">Bairros</a>
                    <a href="/blog/" class="hover:text-brand-gold transition-colors font-bold text-sm uppercase tracking-widest">Blog</a>
                </nav>

                <!-- CTA Desk -->
                <div class="hidden md:flex">
                    <a href="https://wa.me/5531998955912" class="btn-gold-glow bg-brand-gold text-brand-dark font-black px-7 py-3 rounded-xl transition-all shadow-xl flex items-center uppercase tracking-tighter text-sm">
                        <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.115.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.738 10.564 10.564 0 5.826-4.74 10.562-10.564 10.562z"/></svg>
                        Urgência 24h
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <div class="md:hidden flex items-center">
                    <button class="mobile-menu-button outline-none" id="mobile-menu-btn" aria-label="Abrir menu mobile">
                        <svg class="w-10 h-10 text-brand-gold" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div class="hidden mobile-menu md:hidden bg-slate-900 border-t border-white/5 pb-8 overflow-y-auto max-h-screen" id="mobile-menu">
            <ul class="pt-4">
                <li><a href="/#urgencia" class="block text-lg px-6 py-4 text-white font-bold border-b border-white/5">🚨 Urgências 24h</a></li>
                <li><a href="/sobre" class="block text-lg px-6 py-4 text-white font-bold border-b border-white/5">⚖️ Sobre a Advogada</a></li>
                <li class="border-b border-white/5">
                    <button id="mobile-services-btn" class="w-full flex justify-between items-center text-lg px-6 py-4 text-white font-bold" aria-label="Alternar áreas de atuação">
                        Áreas de Atuação
                        <svg class="w-5 h-5 toggle-icon transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div id="mobile-services-content" class="hidden bg-black/40 px-6 py-2 space-y-1">
                        <a href="/prisao-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Prisão e Urgência</a>
                        <a href="/inquerito-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Inquérito e Investigação</a>
                        <a href="/drogas-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Crimes de Drogas</a>
                        <a href="/violencia-domestica-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Violência Doméstica</a>
                        <a href="/crimes-patrimoniais-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Crimes Patrimoniais</a>
                        <a href="/crimes-sexuais-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Crimes Sexuais</a>
                        <a href="/transito-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Crimes de Trânsito</a>
                        <a href="/tribunal-do-juri-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Tribunal do Júri</a>
                        <a href="/execucao-penal-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Execução Penal</a>
                        <a href="/recursos-bh/" class="block py-3 text-sm text-slate-300 hover:text-brand-gold">Recursos Criminais</a>
                    </div>
                </li>
                <li><a href="/bairros/" class="block text-lg px-6 py-4 text-white font-bold border-b border-white/5">📍 Bairros</a></li>
                <li><a href="/blog/" class="block text-lg px-6 py-4 text-white font-bold">📚 Blog e Dúvidas</a></li>
            </ul>
        </div>
    </header>

    <main class="${type === 'home' ? 'max-w-screen-2xl px-2 sm:px-4' : 'max-w-6xl px-4 sm:px-6 lg:px-8'} mx-auto py-16">
        ${(breadcrumbs && type !== 'home') ? `
        <div class="text-xs uppercase tracking-widest text-slate-400 mb-10 flex items-center space-x-2">
            <a href="/" class="hover:text-brand-gold transition-colors font-bold">Home</a> 
            <span class="text-slate-700">/</span> 
            <span class="font-bold">${breadcrumbs}</span> 
            <span class="text-slate-700">/</span> 
            <span class="text-brand-gold font-black">${title}</span>
        </div>
        ` : ''}
        
        <article class="glass-dark ${type === 'home' ? 'p-6 md:p-10 lg:p-14' : 'p-8 md:p-16'} rounded-[40px] shadow-2xl border border-white/5 relative overflow-hidden">
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold/10 blur-[100px] rounded-full"></div>
            
            ${type !== 'bairro' ? `
            <div class="inline-flex items-center bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full mb-10">
                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
                <span class="text-red-400 text-xs font-black uppercase tracking-widest">Plantão Ativo 24h</span>
            </div>
            ` : ''}
            
            <h1 class="text-4xl md:text-6xl font-black text-white mb-10 leading-tight tracking-tighter">${customH1 || title}</h1>
            <div class="h-1.5 w-24 bg-gradient-to-r from-brand-gold to-yellow-600 rounded-full mb-12"></div>
            
            <div class="prose max-w-none text-gray-700 leading-relaxed text-lg mb-8">
                ${customContent ? customContent : `<!-- Expanded Semantic Content -->
                <p>Em demandas que exigem intervenção direta com a delegacia ou juizado, a presença de um <strong>advogado criminal urgente no local</strong> é imprescindível.</p>
                
                ${type === 'blog' ? `
                    <h2 class="text-2xl font-bold mt-8 mb-4">Investigação e Processo Penal</h2>
                    <p>Muitas famílias procuram saber: <em>"meu filho foi preso o que fazer?"</em> ou <em>"posso ir na delegacia sem advogado?"</em>. Nunca compareça sozinho ou sem advogado para inquérito policial BH. O interrogatório policial define os direitos do indiciado e as frentes da denúncia.</p>
                    <p>Quanto custa um processo criminal com advogado criminal discreto em BH? Valores não podem ser expostos segundo a OAB, mas dispomos de um atendimento criminal sigiloso na região metropolitana.</p>
                ` : ''}`}

                ${type === 'bairro' ? `
                    <h2 class="text-2xl font-bold mt-8 mb-4">Atendimento Rápido na Região do ${title.replace('Advogado Criminalista', '').trim()}</h2>
                    <p>Nossa equipe tem alta proximidade com delegacias do bairro (Ceflans próximos) e fácil deslocamento ao Fórum Lafayette para garantir a integridade em seu caso de <em>advogado criminal urgente no ${title.replace('Advogado Criminalista', '').trim()}</em>.</p>
                    <p>Prestamos auxílio rápido como advogado para flagrante no bairro e advogado audiência de custódia próximo a você.</p>
                ` : ''}
                
                ${type === 'servico' ? `
                    <h2 class="text-2xl font-bold mt-8 mb-4">Análise Tática do Caso</h2>
                    <p>Buscando saber <em>quanto custa advogado para tirar preso da cadeia</em> ou se há possibilidade de reverter a prisão em flagrante provando ilegalidade? Identificamos <strong>quando cabe habeas corpus preventivo</strong> e a diferença entre relaxamento de prisão e liberdade provisória durante as audiências com o juiz plantonista.</p>
                    <p>Para dúvidas como: <em>"recebi intimação criminal, o que fazer?"</em> ou prazos de defesa preliminar, atuamos como um advogado para caso sensível BH com garantia de confidencialidade.</p>
                ` : ''}
            </div>

            <!-- Interlinking Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-16 pt-16 border-t border-white/5 relative z-10">
                ${type === 'servico' ? `
                <div class="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner">
                    <h3 class="font-black text-white mb-4 flex items-center uppercase tracking-widest text-xs"><svg class="w-4 h-4 mr-2 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg> Inteligência Jurídica</h3>
                    <ul class="space-y-3 text-sm">${blogLinks}</ul>
                </div>
                ` : ''}

                ${type === 'blog' || type === 'bairro' ? `
                <div class="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner">
                    <h3 class="font-black text-white mb-4 flex items-center uppercase tracking-widest text-xs"><svg class="w-4 h-4 mr-2 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> Defesa Estratégica</h3>
                    <ul class="space-y-3 text-sm">${pilarLinks}</ul>
                </div>
                ` : ''}

                <div class="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner">
                    <h3 class="font-black text-white mb-4 flex items-center uppercase tracking-widest text-xs"><svg class="w-4 h-4 mr-2 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Plantão por Região</h3>
                    <ul class="space-y-3 text-sm">${bairrosLinks}</ul>
                </div>
            </div>

            <!-- AI Overview FAQ Block -->
            ${faqHTML}

            <!-- CTA Central / Final -->
            <div class="mt-16 bg-gradient-to-br from-brand-gold/20 to-brand-dark rounded-[32px] p-10 md:p-14 text-center text-white relative overflow-hidden border border-brand-gold/20 shadow-2xl">
                <div class="relative z-10">
                    <h3 class="text-3xl md:text-5xl font-black mb-6 tracking-tighter">Precisa de Defesa Criminal Urgente?</h3>
                    <p class="text-slate-300 mb-10 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">Nossa central de plantão em Belo Horizonte está ativa 24 horas, incluindo madrugadas e feriados.</p>
                    <a href="https://wa.me/5531998955912" class="btn-gold-glow inline-flex items-center justify-center bg-brand-gold text-brand-dark font-black px-12 py-5 rounded-2xl shadow-xl text-xl uppercase tracking-wider transition-all">
                        <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.115.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.738 10.564 10.564 0 5.826-4.74 10.562-10.564 10.562z"/></svg> 
                        FALAR COM CRIMINALISTA (31) 99895-5912
                    </a>
                </div>
            </div>
        </article>
    </main>
        </article>
    </main>

    <!-- Mega Footer Global -->
    <footer class="bg-black pt-24 pb-12 text-slate-400 border-t border-white/5 relative overflow-hidden">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                <!-- Col 1 -->
                <div class="col-span-1 md:col-span-2">
                    <span class="text-3xl font-black tracking-tighter block mb-8 text-white">Criminalista<span class="text-brand-gold">BH</span></span>
                    <p class="text-slate-400 text-lg mb-8 max-w-md leading-relaxed">
                        O Escritório da Dra. Flávia Cury é focado em resoluções rápidas e garantias constitucionais na área metropolitana de Belo Horizonte, Minas Gerais. Despachos emergenciais 24h.
                    </p>
                    <div class="text-slate-400 text-sm space-y-4 font-bold uppercase tracking-widest">
                        <p class="flex items-center"><span class="text-brand-gold mr-3">📍</span> Belo Horizonte - MG (Todas as Regionais)</p>
                        <p class="flex items-center"><span class="text-brand-gold mr-3">📞</span> Plantão 24h: (31) 99895-5912</p>
                        <p class="flex items-center"><span class="text-brand-gold mr-3">✉️</span> <a href="mailto:bh@advogados.emp.br" class="hover:text-white transition-colors">bh@advogados.emp.br</a></p>
                    </div>
                </div>

                <!-- Col 2 -->
                <div>
                    <h3 class="text-white font-black uppercase tracking-widest text-xs mb-8 border-b border-white/10 pb-4">Atuação</h3>
                    <ul class="space-y-4 text-sm font-bold">
                        <li><a href="/prisao-bh/" class="hover:text-brand-gold transition-colors">Prisão e Urgência BH</a></li>
                        <li><a href="/inquerito-bh/" class="hover:text-brand-gold transition-colors">Inquérito e Investigação BH</a></li>
                        <li><a href="/drogas-bh/" class="hover:text-brand-gold transition-colors">Crimes de Drogas BH</a></li>
                        <li><a href="/violencia-domestica-bh/" class="hover:text-brand-gold transition-colors">Violência Doméstica BH</a></li>
                        <li><a href="/crimes-patrimoniais-bh/" class="hover:text-brand-gold transition-colors">Crimes Patrimoniais BH</a></li>
                        <li><a href="/blog/" class="text-brand-gold transition-colors mt-6 block bg-white/5 p-3 rounded-lg text-center">Ver Todos os Artigos</a></li>
                    </ul>
                </div>

                <!-- Col 3: SEO Geo Links (Preview) -->
                <div>
                    <h3 class="text-white font-black uppercase tracking-widest text-xs mb-8 border-b border-white/10 pb-4">Plantão Local</h3>
                    <ul class="space-y-4 text-sm font-bold">
                        <li><a href="/bairros/advogado-criminalista-savassi-bh" class="hover:text-white transition-colors">Savassi</a></li>
                        <li><a href="/bairros/advogado-criminalista-pampulha-bh" class="hover:text-white transition-colors">Pampulha</a></li>
                        <li><a href="/bairros/advogado-criminalista-centro-bh" class="hover:text-white transition-colors">Centro BH</a></li>
                        <li><a href="/bairros/advogado-criminalista-barreiro-bh" class="hover:text-white transition-colors">Barreiro</a></li>
                        <li class="mt-6"><a href="/bairros/" class="text-brand-dark bg-brand-gold px-4 py-2 rounded font-black text-xs inline-block uppercase transition-transform hover:scale-105">Todos os 220 bairros</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                <p>&copy; 2026 Flávia Cury - Advocacia Criminal. Todos os direitos protegidos.</p>
                <div class="mt-8 md:mt-0 flex flex-wrap justify-center gap-6">
                    <a href="/sobre/" class="hover:text-brand-gold transition-colors">A Advogada</a>
                    <a href="/contato/" class="hover:text-brand-gold transition-colors">Contato</a>
                    <a href="/privacidade/" class="hover:text-brand-gold transition-colors">Privacidade</a>
                    <a href="/termos/" class="hover:text-brand-gold transition-colors">Termos</a>
                    <a href="/sitemap.xml" class="hover:text-brand-gold transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>
    
    <!-- Floating WhatsApp Global -->
    <a href="https://wa.me/5531998955912?text=Preciso%20falar%20com%20um%20advogado%20criminalista%20agora." target="_blank" rel="noopener noreferrer" class="btn-whatsapp-float fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-2xl hover:bg-green-600 transition-colors z-50 flex items-center justify-center" aria-label="Contato via WhatsApp">
        <svg fill="currentColor" viewBox="0 0 24 24" class="w-8 h-8"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.738 10.564 10.564 0 5.826-4.74 10.562-10.564 10.562z"/></svg>
    </a>
    <script src="/assets/js/main.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const servicesBtn = document.getElementById('mobile-services-btn');
            const servicesContent = document.getElementById('mobile-services-content');
            const toggleIcon = servicesBtn?.querySelector('.toggle-icon');

            servicesBtn?.addEventListener('click', function() {
                servicesContent.classList.toggle('hidden');
                toggleIcon?.classList.toggle('rotate-180');
            });
        });
    </script>
</body>
</html>`;
}

const sitemapUrls = [];
sitemapUrls.push('/');

// 1. Generate Services (Skipped here, delegated to generate-cluster.js)
pilares.forEach(s => {
    sitemapUrls.push(`/${s.file}`);
});

// 2. Generate Blog
let blogGridHtml = '';
blog.forEach(b => {
    let customContent = null;
    let customSchema = null;
    let customH1 = null;

    const blogSlug = b.file.replace('.html', '');

    // Premium Card for Index
    blogGridHtml += `
    <div class="glass-dark p-8 rounded-3xl shadow-2xl hover-lift border border-white/5 relative overflow-hidden group">
        <div class="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="relative z-10">
            <div class="text-[10px] uppercase tracking-widest text-brand-gold font-black mb-4">Artigo Especializado</div>
            <h3 class="text-2xl font-black text-white mb-6 leading-tight group-hover:text-brand-gold transition-colors">
                <a href="/blog/${blogSlug}">${b.title}</a>
            </h3>
            <p class="text-slate-400 text-sm mb-8 leading-relaxed line-clamp-3">Análise técnica e orientações sobre ${b.title.toLowerCase()} no cenário jurídico de Belo Horizonte.</p>
            <a href="/blog/${blogSlug}" class="inline-flex items-center text-brand-gold font-bold text-xs uppercase tracking-widest hover:translate-x-2 transition-transform underline underline-offset-8 decoration-brand-gold/30">
                Ler Artigo Completo <span class="ml-2 text-lg">→</span>
            </a>
        </div>
    </div>`;

    if (b.title === 'Arquivamento de inquérito como funciona') {

        const contentScript = b.file.replace('.html', '.js');
        const scriptPath = path.join(__dirname, 'blog-' + contentScript);

        if (fs.existsSync(scriptPath)) {
            const articleData = require(scriptPath);
            customContent = articleData.content;
            customSchema = articleData.schema;
            customH1 = articleData.h1 || b.title;
        }
    }

    const html = getTemplate(b.title, 'blog', '', 'Blog', customContent, customSchema, customH1, `/blog/${blogSlug}/`);
    const blogFileDir = path.join(__dirname, '..', 'blog', blogSlug);
    if (!fs.existsSync(blogFileDir)) fs.mkdirSync(blogFileDir, { recursive: true });
    fs.writeFileSync(path.join(blogFileDir, 'index.html'), html);
    sitemapUrls.push(`/blog/${blogSlug}/`);
});

// Generate Blog Index
const blogIndexContent = `
<section class="mb-20">
    <div class="text-center mb-16">
        <div class="inline-flex items-center bg-brand-gold/10 border border-brand-gold/20 px-4 py-2 rounded-full mb-6">
            <span class="text-brand-gold text-[10px] font-black uppercase tracking-[0.3em]">Central de Conhecimento</span>
        </div>
        <h2 class="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Biblioteca de Defesa Criminal</h2>
        <p class="text-slate-400 text-lg max-w-2xl mx-auto font-medium">Artigos técnicos, guias e orientações estratégicas sobre o sistema penal brasileiro e atuação prática em MG.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        ${blogGridHtml}
    </div>
</section>
`;

const blogIndexHtml = getTemplate('Blog - Artigos de Defesa Criminal', 'blog', 'Confira nossa biblioteca de artigos sobre direito penal, audiência de custódia e estratégias de defesa em Belo Horizonte.', 'Blog', blogIndexContent, null, 'Artigos e Guias Jurídicos', '/blog/');
const blogRootDir = path.join(__dirname, '..', 'blog');
if (!fs.existsSync(blogRootDir)) fs.mkdirSync(blogRootDir, { recursive: true });
fs.writeFileSync(path.join(blogRootDir, 'index.html'), blogIndexHtml);
sitemapUrls.push('/blog/');

// Define getting the extreme Bairro template
function getBairroTemplate(bairro) {
    const slug = (str) => str.toLowerCase().replace(/[áàãâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[íìîï]/g, 'i').replace(/[óòõôö]/g, 'o').replace(/[úùûü]/g, 'u').replace(/[ç]/g, 'c').replace(/\s+/g, '-');
    const url = `${domain}/bairros/advogado-criminalista-${slug(bairro)}-bh.html`;
    const title = `Advogado Criminalista no ${bairro} em BH`;

    const randomPilares = shuffleArray(pilares).slice(0, 6);
    const pilarLinks = randomPilares.map(s => `<li><a href="/${s.file}" class="hover:text-brand-gold underline">${s.title}</a></li>`).join('');

    const randomBairros = shuffleArray(bairros).filter(b => b !== bairro).slice(0, 6);
    const bairrosLinks = randomBairros.map(b => `<li><a href="/bairros/advogado-criminalista-${slug(b)}-bh" class="hover:text-brand-gold underline">Advogado Criminalista ${b}</a></li>`).join('');

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advogado Criminalista no ${bairro} BH | Plantão 24h Especializado</title>
    
    <meta name="description" content="Precisando de advogado criminal urgente no ${bairro} em Belo Horizonte? Especialista em prisão em flagrante, custódia e defesa tática. Plantão 24h.">
    <meta property="og:title" content="Advogado Criminalista no ${bairro} BH - Defesa 24 horas">
    <meta property="og:type" content="website">
    
    <link rel="canonical" href="${domain}/bairros/advogado-criminalista-${slug(bairro)}-bh/">
    <meta property="og:url" content="${url.replace('.html', '')}">
    
    <link rel="stylesheet" href="/assets/css/tailwind.css">
    <link rel="stylesheet" href="/assets/css/style.css">
    
    <!-- Schema Markup Avançado -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LegalService",
          "@id": "${domain}/#organization",
          "name": "Defesa Técnica Especializada - Belo Horizonte",
          "image": "${domain}/assets/img/logo.jpg",
          "url": "${domain}/",
          "telephone": "+5531998955912",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Av. Afonso Pena",
            "addressLocality": "Belo Horizonte",
            "addressRegion": "MG",
            "postalCode": "30130-000",
            "addressCountry": "BR"
          },
          "areaServed": [
            { "@type": "City", "name": "Belo Horizonte" },
            { "@type": "Place", "name": "${bairro}" }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Página Inicial", "item": "${domain}/" },
            { "@type": "ListItem", "position": 2, "name": "Bairros Atendidos BH", "item": "${domain}/bairros/" },
            { "@type": "ListItem", "position": 3, "name": "Advogado Criminalista ${bairro}" }
          ]
        }
      ]
    }
    </script>
</head>
<body class="bg-brand-darker text-slate-300 pt-20">

    <header class="fixed top-0 w-full glass-dark text-white z-50 transition-all duration-500">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-24 items-center">
                <div class="flex-shrink-0 flex items-center">
                    <a href="/" class="text-2xl md:text-3xl font-black tracking-tighter">
                        <span class="text-white">Criminalista</span><span class="text-brand-gold">BH</span>
                    </a>
                </div>
                <nav class="hidden md:flex space-x-10">
                    <a href="/#urgencia" class="hover:text-brand-gold transition-colors font-bold text-sm uppercase tracking-widest">Urgências 24h</a>
                    <a href="/sobre" class="hover:text-brand-gold transition-colors font-bold text-sm uppercase tracking-widest">Sobre</a>
                    <a href="/bairros/" class="text-brand-gold font-bold text-sm uppercase tracking-widest">Bairros</a>
                    <a href="/blog/" class="hover:text-brand-gold transition-colors font-bold text-sm uppercase tracking-widest">Blog</a>
                </nav>
                <div class="hidden md:flex">
                    <a href="https://wa.me/5531998955912" class="btn-gold-glow bg-brand-gold text-brand-dark font-black px-7 py-3 rounded-xl transition-all shadow-xl flex items-center uppercase tracking-tighter text-sm">
                        <svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.115.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.738 10.564 10.564 0 5.826-4.74 10.562-10.564 10.562z"/></svg> 
                        ATENDIMENTO 24H
                    </a>
                </div>
            </div>
        </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-10 flex items-center space-x-2 font-bold">
            <a href="/" class="hover:text-brand-gold transition-colors">Home</a> 
            <span>/</span> 
            <a href="/bairros/" class="hover:text-brand-gold transition-colors font-bold">Bairros BH</a> 
            <span>/</span> 
            <span class="text-brand-gold font-black">${bairro}</span>
        </div>
        
        <article class="glass-dark p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/5 relative overflow-hidden">
            
            <div class="mb-12 text-center relative z-10">
                <span class="bg-red-500/10 border border-red-500/20 text-red-500 font-black px-4 py-1 rounded-full text-[10px] uppercase tracking-widest inline-block mb-6 shadow-sm">Plantão Criminal Especializado</span>
                <h1 class="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-4">Advogado Criminalista no ${bairro} BH</h1>
                <div class="h-1.5 w-24 bg-brand-gold mx-auto rounded-full"></div>
            </div>

            <div class="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg mb-12 relative z-10 font-medium">
                
                <h2 class="text-2xl font-black text-white mt-12 mb-6 uppercase tracking-widest border-l-4 border-brand-gold pl-4">Defesa Imediata no Bairro ${bairro}</h2>
                <p>O surgimento de uma <strong>prisão em flagrante</strong> ou o chamamento repentino para uma audiência de custódia costumam gerar apreensão e pânico. Quando a situação ocorre na área do bairro <strong>${bairro}</strong>, em <strong>Belo Horizonte</strong>, a intervenção de um <em>advogado criminalista com atuação imediata</em> é a via técnica mais segura para proteger direitos fundamentais. Nossa advocacia é calcada na urgência e no sigilo, prestando uma defesa processual artesanal perante as varas e fóruns da capital.</p>

                <!-- CTA 1 -->
                <div class="my-12 bg-white/5 border border-white/5 p-8 rounded-3xl shadow-inner relative overflow-hidden group">
                    <div class="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"></div>
                    <h3 class="text-xl font-bold text-white mb-4 relative z-10 flex items-center"><span class="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-3"></span> Familiar detido na região do ${bairro}?</h3>
                    <p class="text-sm mb-6 relative z-10 leading-relaxed">Garantir a assistência de um profissional particular nas primeiras horas é determinante para o curso da investigação criminal e a manutenção da liberdade.</p>
                    <a href="https://wa.me/5531998955912" class="relative z-10 inline-flex btn-gold-glow bg-brand-gold text-brand-dark font-black px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-xl uppercase tracking-tighter text-sm">Acionar Advogado Plantão Now</a>
                </div>

                <h2 class="text-2xl font-black text-white mt-12 mb-6 uppercase tracking-widest border-l-4 border-brand-gold pl-4">Atuação Fórum e Delegacia</h2>
                <p>Nossa equipe compreende que a mecânica probatória deve ser dominada desde a base até os tribunais superiores. Em observância restrita ao <strong>Código de Processo Penal</strong> e ancorados pelas garantias expressas na <strong>Constituição Federal</strong>, enfrentamos toda a carga acusatória imposta pelo Estado, notadamente o <strong>Ministério Público de Minas Gerais</strong> ou autoridade subordinada (delegados e escrivães da <strong>Polícia Civil de Minas Gerais</strong>).</p>
                <p>Para residentes do ${bairro}, nossa logística permite acesso rápido não apenas às Delegacias de Plantão, mas ao centro nervoso judiciário da cidade, como o <strong>Fórum Lafayette</strong> (Barro Preto), viabilizando despachos in loco com magistrados.</p>
                
                <h2 class="text-2xl font-black text-white mt-12 mb-6 uppercase tracking-widest border-l-4 border-brand-gold pl-4">Momentos Críticos: Quando Acionar?</h2>
                <p>Existem situações nas quais o silêncio sem orientação configura profundo risco jurídico. A advocacia preventiva e reativa ataca frentes essenciais:</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div class="p-6 bg-black/40 rounded-2xl border border-white/5">
                        <strong class="text-brand-gold block mb-2 font-black uppercase text-xs">⚖️ Prisão em Flagrante</strong>
                        <p class="text-sm">Chegada imediata à delegacia territorial responsável pelo bairro ${bairro}, impedindo coações e lavratura irregular do auto.</p>
                    </div>
                    <div class="p-6 bg-black/40 rounded-2xl border border-white/5">
                        <strong class="text-brand-gold block mb-2 font-black uppercase text-xs">🏛️ Audiência de Custódia</strong>
                        <p class="text-sm">Momentos em que a legalidade da prisão é julgada. Defesas firmes por medidas cautelares diversas ou soltura.</p>
                    </div>
                </div>

                <!-- CTA 2 -->
                <div class="my-16 bg-gradient-to-br from-brand-dark to-black p-10 rounded-[32px] border border-white/5 shadow-2xl text-center">
                    <h3 class="text-2xl font-black text-white mb-6 tracking-tighter">Urgência Real em Belo Horizonte</h3>
                    <p class="text-slate-400 text-base mb-8 max-w-xl mx-auto font-medium">Em prisões não se pode perder tempo analisando opções indefinidamente. O Direito não socorre aos que dormem.</p>
                    <a href="https://wa.me/5531998955912" class="btn-gold-glow inline-block bg-brand-gold text-brand-dark font-black px-10 py-5 rounded-2xl shadow-xl hover:scale-105 transition-all text-lg uppercase tracking-tight">Falar Agora: (31) 99895-5912</a>
                </div>

                <h2 class="text-2xl font-black text-white mt-12 mb-6 uppercase tracking-widest border-l-4 border-brand-gold pl-4">Posicionamento Territorial: ${bairro}</h2>
                <p>Nossa equipe compreende a dinâmica urbana metropolitana de <em>Belo Horizonte</em>. Seja em ocorrências geradas pelo policiamento tático nas vias marginais, seja em averiguações no <strong>coração residencial e logístico do ${bairro}</strong>, mantemos facilidade de deslocamento e acesso rápido às informações dos respectivos Batalhões de Polícia e Centros de Plantão Integrado (Ceflan) na capital.</p>

                <!-- FAQ ESTRATÉGICO -->
                <h2 class="text-3xl font-black text-white mt-20 mb-10 text-center tracking-tighter border-b border-white/5 pb-6">Dúvidas Frequentes</h2>
                
                <div class="space-y-4">
                    <div class="glass-dark border border-white/5 rounded-2xl p-6 shadow-xl">
                        <h3 class="font-black text-white text-lg mb-3">1. Quando procurar um advogado criminal no bairro ${bairro}?</h3>
                        <p class="text-slate-400 text-sm leading-relaxed">A qualquer tempo em caso de condução policial, notificação para interrogatório ou bloqueio de bens sob viés investigatório nos arredores.</p>
                    </div>
                    <div class="glass-dark border border-white/5 rounded-2xl p-6 shadow-xl">
                        <h3 class="font-black text-white text-lg mb-3">2. O advogado pode atuar em prisão preventiva?</h3>
                        <p class="text-slate-400 text-sm leading-relaxed">Sim. É a especialidade máxima. A audiência de custódia ocorre nas primeiras horas, sendo a maior janela possível de conseguir o relaxamento prisional.</p>
                    </div>
                    <div class="glass-dark border border-white/5 rounded-2xl p-6 shadow-xl">
                        <h3 class="font-black text-white text-lg mb-3">3. A defesa inclui investigação defensiva?</h3>
                        <p class="text-slate-400 text-sm leading-relaxed">Sim. Utilizamos ferramentas de investigação própria para desidratar inquéritos frágeis originados nas delegacias centrais de BH.</p>
                    </div>
                </div>

                <!-- CTA 3 Final -->
                <div class="mt-20 border-t-2 border-brand-gold p-10 text-center glass-dark rounded-b-[40px]">
                    <h3 class="text-3xl font-black text-white mb-6 uppercase tracking-widest">Garantias Constitucionais</h3>
                    <p class="text-slate-400 mb-8 font-medium">Em caso de buscas policiais ou indiciamentos críticos. Fale, em sigilo absoluto, com a nossa central especialista.</p>
                    <a href="https://wa.me/5531998955912" class="inline-flex items-center justify-center bg-white text-brand-dark font-black px-10 py-5 rounded-2xl hover:bg-brand-gold transition-colors uppercase tracking-widest text-sm shadow-xl">
                        CENTRAL CRIMINAL 24H
                    </a>
                </div>

            </div>

            <!-- Interlinking Silo Base -->
            <div class="mt-20 pt-10 border-t border-white/5">
                <h4 class="text-xs font-black text-white mb-8 uppercase tracking-[0.3em]">Estrutura de Defesa e Tese Relacionada</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-slate-400 font-bold uppercase tracking-widest">
                    <div class="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <strong class="block mb-4 text-brand-gold">Especialidades Vitais:</strong>
                        <ul class="space-y-3 list-none p-0">${pilarLinks}</ul>
                    </div>
                    <div class="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <strong class="block mb-4 text-brand-gold">Outras Regiões e Bairros:</strong>
                        <ul class="space-y-3 list-none p-0">${bairrosLinks}</ul>
                    </div>
                </div>
            </div>

        </article>
    </main>

    <!-- Global Footer -->
    <footer class="bg-black pt-24 pb-12 text-slate-600 border-t border-white/5 relative overflow-hidden">
        <div class="max-w-4xl mx-auto px-4 text-center">
            <p class="mb-6 font-bold uppercase tracking-widest text-xs text-slate-400"><strong>Destaques:</strong> <a href="/prisao-bh/" class="hover:text-brand-gold mx-2">Prisão em Flagrante</a> | <a href="/liberdade-provisoria-bh/" class="hover:text-brand-gold mx-2">Habeas Corpus</a> | <a href="/blog/" class="hover:text-brand-gold mx-2">Direitos do Preso</a></p>
            <div class="flex flex-wrap justify-center gap-6 text-[10px] mb-8 font-black uppercase tracking-[0.2em] text-slate-400">
                <a href="/contato" class="hover:text-brand-gold">Contato</a>
                <a href="/privacidade" class="hover:text-brand-gold">Privacidade</a>
                <a href="/termos" class="hover:text-brand-gold">Termos</a>
                <a href="/sitemap.xml" class="hover:text-brand-gold">Sitemap</a>
            </div>
            <p class="text-[10px] text-slate-400">&copy; 2026 Advocacia Criminal BH. Todos os direitos reservados. OAB/MG.</p>
        </div>
    </footer>

    <!-- Botão Fixo -->
    <a href="https://wa.me/5531998955912" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-float fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-5 shadow-2xl hover:bg-green-600 transition-colors z-50" aria-label="Contato via WhatsApp">
        <svg fill="currentColor" viewBox="0 0 24 24" class="w-10 h-10"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.115.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.738 10.564 10.564 0 5.826-4.74 10.562-10.564 10.562z"/></svg>
    </a>
</body>
</html>`;
}

// 3. Generate Bairros
let bairrosIndexItems = '';
bairros.forEach(b => {
    const slugValue = b.toLowerCase().replace(/[áàãâä]/g, 'a').replace(/[éèêë]/g, 'e').replace(/[íìîï]/g, 'i').replace(/[óòõôö]/g, 'o').replace(/[úùûü]/g, 'u').replace(/[ç]/g, 'c').replace(/\s+/g, '-');
    const title = `Advogado Criminalista ${b}`;
    const neighborhoodSlug = `advogado-criminalista-${slugValue}-bh`;

    const html = getBairroTemplate(b);
    const bairroDir = path.join(__dirname, '..', 'bairros', neighborhoodSlug);

    if (!fs.existsSync(bairroDir)) fs.mkdirSync(bairroDir, { recursive: true });
    fs.writeFileSync(path.join(bairroDir, 'index.html'), html);

    const cleanUrl = `/bairros/${neighborhoodSlug}/`;
    sitemapUrls.push(cleanUrl);
    bairrosIndexItems += `<li><a href="${cleanUrl}" class="text-slate-400 hover:text-brand-gold transition-colors text-sm font-bold p-3 block bg-white/5 rounded-xl border border-white/5 hover:border-brand-gold/30">${title}</a></li>`;
});

sitemapUrls.push(`/bairros/index.html`);

const bairrosHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advogado Criminalista nos Bairros de BH | Plantão Local 24h</title>
    <link rel="canonical" href="${domain}/bairros/">
    <link rel="stylesheet" href="/assets/css/tailwind.css">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body class="bg-brand-darker text-slate-300 pt-20">
    <header class="fixed top-0 w-full glass-dark text-white z-50 h-24 flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
            <a href="/" class="text-2xl font-black tracking-tighter hover:scale-105 transition-transform"><span class="text-white">Criminalista</span><span class="text-brand-gold">BH</span></a>
            <a href="https://wa.me/5531998955912" class="bg-brand-gold text-brand-dark font-black px-6 py-2 rounded-xl text-xs uppercase tracking-widest">Plantão 24h</a>
        </div>
    </header>
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-10 font-bold"><a href="/" class="hover:text-brand-gold transition-colors">Home</a> <span class="mx-2">/</span> <span class="text-brand-gold font-black">Bairros Atendidos</span></div>
        <div class="glass-dark p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/5 relative overflow-hidden mb-12">
            <h1 class="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Atendimento Local Belo Horizonte</h1>
            <p class="text-slate-400 text-lg mb-12 max-w-3xl leading-relaxed">Localize nossa atuação rápida em sua região metropolitana. Cobrimos todos os 220 bairros com logística tática para delegacias e fóruns.</p>
            <ul class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                ${bairrosIndexItems}
            </ul>
        </div>
    </main>
</body>
</html>`;
fs.writeFileSync(path.join(__dirname, '..', 'bairros', 'index.html'), bairrosHtml);

console.log('Todas as páginas geradas com nova estrutura de SILO e expansão!');

if (typeof module !== "undefined") { module.exports = { getTemplate, pilares, blog, bairros }; }
