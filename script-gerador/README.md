# Gerador de Site - Advogado Criminalista BH

Este gerador em Python cria as páginas estáticas para o site do escritório utilizando templates **Jinja2** e processando requisições AI (OpenAI/Gemini) para elaborar textos ricos em **SEO para rankeamento local**.

## Como Usar

### 1. Pré-Requisitos
Tenha o Python instalado na sua máquina. Crie um ambiente virtual:
```bash
python3 -m venv venv
source venv/bin/activate
# no windows: venv\Scripts\activate
```

Instale as dependências:
```bash
pip install -r requirements.txt
```

### 2. Configurando Chaves de IA (Opcional)
Se desejar gerar textos dinâmicos para SEO através de IA, crie um arquivo `.env` nesta pasta com as suas chaves:
```
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIzaSy...
```
*(O script usa a OpenAI preferencialmente, com fallback para o Gemini e depois texto default).*

### 3. Rodando o Gerador
```bash
python gerador.py
```

O site será compilado para a pasta `output/`. Note que o Tailwind CSS e a estrutura base são herdadas do seu site atual por CDN/arquivos locais na raiz. O código HTML final já engloba o Schema Local Business e open graphs otimizados.
