const fs = require('fs');
const path = require('path');
const generatePages = require('./generate-pages.js');

const outDir = path.join(__dirname, '..');

const pages = [
    {
        slug: 'sobre',
        title: 'Sobre a Dra. Flávia Cury',
        desc: 'Conheça a trajetória da Dra. Flávia Cury, advogada criminalista especialista em defesa estratégica em Belo Horizonte.',
        content: `
            <div class="prose prose-invert max-w-none">
                <h2 class="text-3xl font-black text-white mb-8 tracking-tighter">Trajetória e Expertise Criminal</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" alt="Dra. Flávia Cury" class="rounded-3xl shadow-2xl border border-white/10">
                    </div>
                    <div class="space-y-6 text-slate-300">
                        <p>A advocacia criminal é o último bastião de defesa do cidadão contra o peso desmedido do Estado. Com anos de dedicação exclusiva às ciências penais, o escritório constrói sua reputação no compromisso absoluto com a liberdade de seus clientes.</p>
                        <p>Nossa expertise não se resume apenas à técnica jurídica refinada. Entendemos que o processo penal exige agilidade, discrição e combate intelectual implacável.</p>
                        <p>Militante assíduo do Fórum Lafayette e dos principais complexos policiais de MG, nosso escritório prioriza as salvaguardas constitucionais desde os instantes preliminares.</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                    <div class="glass-dark p-8 rounded-2xl border border-white/5">
                        <h4 class="font-black text-brand-gold text-lg mb-2 uppercase">Articulação Tática</h4>
                        <p class="text-slate-400 text-sm">Criação de estratégias defensivas exclusivas. Nunca um caso é visto como igual ao outro.</p>
                    </div>
                    <div class="glass-dark p-8 rounded-2xl border border-white/5">
                        <h4 class="font-black text-brand-gold text-lg mb-2 uppercase">Absoluto Sigilo</h4>
                        <p class="text-slate-400 text-sm">Resguardo imediato da privacidade do cliente. Tratamento confidencial em todos os procedimentos.</p>
                    </div>
                    <div class="glass-dark p-8 rounded-2xl border border-white/5">
                        <h4 class="font-black text-brand-gold text-lg mb-2 uppercase">Comunicação Clara</h4>
                        <p class="text-slate-400 text-sm">Informamos a família e o constituinte das chances reais e dos ritos processuais com clareza.</p>
                    </div>
                    <div class="glass-dark p-8 rounded-2xl border border-white/5">
                        <h4 class="font-black text-brand-gold text-lg mb-2 uppercase">Plantão 24h</h4>
                        <p class="text-slate-400 text-sm">Atendimento especializado em urgências criminais 24h na capital e região metropolitana.</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        slug: 'contato',
        title: 'Fale Conosco - Plantão 24h',
        desc: 'Fale agora com nossa central de atendimento criminal 24h em Belo Horizonte. Defesa imediata para prisões e urgências.',
        content: `
            <div class="max-w-4xl mx-auto text-center py-10">
                <h2 class="text-4xl font-black text-white mb-8 tracking-tighter">Canais de Atendimento Urgente</h2>
                <p class="text-slate-400 text-lg mb-12">Escolha o canal mais rápido para falar diretamente com a Dra. Flávia Cury.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <a href="https://wa.me/5531998955912" class="glass-dark p-10 rounded-[32px] border border-white/5 hover:border-brand-gold/30 transition-all group">
                        <div class="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.115.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.418-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.738 10.564 10.564 0 5.826-4.74 10.562-10.564 10.562z"/></svg>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">WhatsApp 24h</h3>
                        <p class="text-slate-400 text-sm mb-4">Clique para iniciar uma conversa sigilosa e imediata.</p>
                        <span class="text-brand-gold font-black text-sm uppercase tracking-widest">Enviar Mensagem →</span>
                    </a>
                    
                    <div class="glass-dark p-10 rounded-[32px] border border-white/5">
                        <div class="w-12 h-12 bg-brand-gold/20 text-brand-gold rounded-full flex items-center justify-center mb-6">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        </div>
                        <h3 class="text-xl font-bold text-white mb-2">E-mail</h3>
                        <p class="text-slate-400 text-sm mb-4">Para envio de documentos e propostas formais.</p>
                        <a href="mailto:bh@advogados.emp.br" class="text-white hover:text-brand-gold font-bold">bh@advogados.emp.br</a>
                    </div>
                </div>
            </div>
        `
    },
    {
        slug: 'privacidade',
        title: 'Política de Privacidade',
        desc: 'Conheça nossa política de tratamento de dados e sigilo profissional em conformidade com a LGPD.',
        content: `
            <div class="max-w-3xl mx-auto py-10">
                <h2 class="text-3xl font-black text-white mb-8 tracking-tighter">Privacidade e Sigilo Profissional</h2>
                <div class="prose prose-invert text-slate-400 space-y-6">
                    <p>Nossa política de privacidade é regida pela Lei Geral de Proteção de Dados (LGPD) e pelo Código de Ética e Disciplina da OAB, assegurando absoluto sigilo e proteção às informações dos clientes e usuários deste site.</p>
                    <h3 class="text-white font-bold">1. Coleta de Informações</h3>
                    <p>Ao entrar em contato conosco (via formulários, WhatsApp ou telefone), os dados coletados são utilizados estritamente para avaliação jurídica e retorno de atendimento.</p>
                    <h3 class="text-white font-bold">2. Sigilo Profissional</h3>
                    <p>Todas as comunicações realizadas com o escritório são acobertadas pelo sigilo profissional inerente ao exercício da advocacia penal, impedindo o seu compartilhamento com terceiros não autorizados.</p>
                    <h3 class="text-white font-bold">3. Armazenamento</h3>
                    <p>A proteção dos bancos de dados do escritório possui as corretas diretrizes de segurança da informação, protegendo os dados contra acesso indevido ou destruição.</p>
                </div>
            </div>
        `
    },
    {
        slug: 'termos',
        title: 'Termos de Uso',
        desc: 'Termos e condições de uso das informações e serviços disponibilizados neste site jurídico.',
        content: `
            <div class="max-w-3xl mx-auto py-10">
                <h2 class="text-3xl font-black text-white mb-8 tracking-tighter">Termos e Condições de Uso</h2>
                <div class="prose prose-invert text-slate-400 space-y-6">
                    <p>As informações disponibilizadas neste site possuem caráter meramente informativo e elucidativo, não constituindo parecer, consultoria ou orientação jurídica sobre nenhum caso específico.</p>
                    <h3 class="text-white font-bold">1. Obrigação de Meio</h3>
                    <p>É vedada pelo Código de Ética e Disciplina da OAB a promessa de resultado na área criminal. O exercício da defesa técnica configura-se como obrigação de meio e garantia do devido processo legal e contraditório, envidando os melhores esforços táticos, sem afiançar a absolvição.</p>
                    <h3 class="text-white font-bold">2. Consulta Presencial/Virtual</h3>
                    <p>A relação advogado-cliente apenas se estabelece mediante a contratação dos serviços e respectiva procuração ad judicia. Dúvidas postadas via formulário ou chats não servem como patronato automático.</p>
                    <h3 class="text-white font-bold">3. Direitos Autorais</h3>
                    <p>O conteúdo de artigos e blog postados refletem posicionamento acadêmico e jurisprudencial vigentes à época de publicação, detendo os direitos intelectuais perante a marca.</p>
                </div>
            </div>
        `
    }
];

pages.forEach(p => {
    const pageDir = path.join(outDir, p.slug);
    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });

    const html = generatePages.getTemplate(
        p.title,
        'institutional',
        p.desc,
        p.title.split(' ')[0], // Simple breadcrumb name
        p.content,
        null,
        null,
        `/${p.slug}/`
    );

    fs.writeFileSync(path.join(pageDir, 'index.html'), html);
});

console.log('✅ Páginas institucionais geradas com estrutura de diretório!');
