import os
import json
from jinja2 import Environment, FileSystemLoader
from dotenv import load_dotenv

# Carregar variáveis de ambiente (API Keys)
load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Estrutura de Pastas e Arquivos
OUTPUT_DIR = "output"
TEMPLATES_DIR = "templates"

SERVICES_DATA = [
    {
        "name": "Prisão e Urgência",
        "slug": "prisao-bh",
        "icon": "⚖️",
        "subservices": [
            {"name": "Liberdade Provisória", "slug": "liberdade-provisoria-bh"},
            {"name": "Revogação Prisão Preventiva", "slug": "revogacao-prisao-preventiva-bh"},
            {"name": "Relaxamento de Prisão", "slug": "relaxamento-de-prisao-bh"},
            {"name": "Prisão Domiciliar", "slug": "prisao-domiciliar-bh"},
        ]
    },
    {
        "name": "Inquérito e Investigação",
        "slug": "inquerito-bh",
        "icon": "⚖️",
        "subservices": [
            {"name": "Arquivamento de Inquérito", "slug": "arquivamento-de-inquerito-bh"},
            {"name": "Defesa Pré-Processual", "slug": "defesa-pre-processual-bh"}
        ]
    }
    # Pode expandir com as demais áreas...
]

BAIRROS_DATA = [
    {"name": "Savassi", "slug": "savassi"},
    {"name": "Pampulha", "slug": "pampulha"},
    {"name": "Centro", "slug": "centro"},
    {"name": "Barreiro", "slug": "barreiro"}
]

def generate_ai_content(service_name, target_audience="Belo Horizonte"):
    """
    Integração com IA para gerar conteúdo SEO amigável para serviços.
    Usa OpenAI como principal ou Gemini como fallback.
    """
    if OPENAI_API_KEY:
        import openai
        client = openai.OpenAI(api_key=OPENAI_API_KEY)
        prompt = f"Crie um parágrafo SEO detalhado com código HTML para uma página de advogado criminalista focada no serviço '{service_name}' na região de {target_audience}. Use tags de formatação adequadas."
        
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}]
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"Erro na OpenAI: {e}. Tentando Gemini...")
    
    if GEMINI_API_KEY:
        from google import genai
        client = genai.Client(api_key=GEMINI_API_KEY)
        prompt = f"Crie um parágrafo SEO detalhado com código HTML para uma página de advogado criminalista focada no serviço '{service_name}' na região de {target_audience}. Use tags de formatação adequadas."
        
        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt
            )
            return response.text
        except Exception as e:
            print(f"Erro no Gemini: {e}.")
            
    # Fallback padrão
    return f"<p>Defesa criminal especializada e atuação técnica em <strong>{service_name}</strong> na região de {target_audience}. Advocacia combativa, atuando 24 horas em BH.</p>"

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))
    
    # Read CSS and JS to inline them
    try:
        with open("../assets/css/tailwind.css", "r", encoding="utf-8") as f:
            tailwind_css = f.read()
        with open("../assets/css/style.css", "r", encoding="utf-8") as f:
            style_css = f.read()
        with open("../assets/js/main.js", "r", encoding="utf-8") as f:
            main_js = f.read()
    except FileNotFoundError:
        print("Aviso: Arquivos CSS ou JS não encontrados. O HTML será gerado sem eles ou você deve garantir que eles existam.")
        tailwind_css = ""
        style_css = ""
        main_js = ""
    
    # Gerando Index
    print("Gerando Index...")
    index_template = env.get_template("index.html")
    index_html = index_template.render(
        title="Escritório Criminalista",
        description="Advogado criminalista plantão 24h em Belo Horizonte. Especialista em prisões e audiências de custódia.",
        hero_title="Advogado Criminal em Belo Horizonte – Defesa Técnica 24h",
        section_1_title="Excelência em Advocacia Criminal",
        section_1_text="A atuação de um advogado criminal em Belo Horizonte exige conhecimento tático perante o TJMG.",
        folders=SERVICES_DATA,
        bairros=BAIRROS_DATA,
        canonical_url="https://bh.advogados.emp.br/",
        tailwind_css=tailwind_css,
        style_css=style_css,
        main_js=main_js
    )
    with open(os.path.join(OUTPUT_DIR, "index.html"), "w", encoding="utf-8") as f:
        f.write(index_html)
        
    print("Gerando páginas de serviços...")
    servico_template = env.get_template("servico.html")
    for category in SERVICES_DATA:
        # Página da categoria principal
        cat_dir = os.path.join(OUTPUT_DIR, category["slug"])
        if not os.path.exists(cat_dir):
            os.makedirs(cat_dir)
            
        # Conteúdo dinâmico com IA (se disponível)
        content = generate_ai_content(category["name"])
        
        cat_html = servico_template.render(
            title=f"{category['name']} | Advogado Criminal BH",
            description=f"Especialistas em {category['name']} em BH. Atendimento imediato.",
            service=category,
            generated_content=content,
            canonical_url=f"https://bh.advogados.emp.br/{category['slug']}/",
            tailwind_css=tailwind_css,
            style_css=style_css,
            main_js=main_js
        )
        with open(os.path.join(cat_dir, "index.html"), "w", encoding="utf-8") as f:
            f.write(cat_html)
            
        # Sub-serviços
        for sub in category["subservices"]:
            sub_content = generate_ai_content(sub["name"])
            sub_html = servico_template.render(
                title=f"{sub['name']} | Advogado Criminal BH",
                description=f"Atendimento para {sub['name']} em BH. Plantão 24h.",
                service=sub,
                generated_content=sub_content,
                canonical_url=f"https://bh.advogados.emp.br/{category['slug']}/{sub['slug']}.html",
                tailwind_css=tailwind_css,
                style_css=style_css,
                main_js=main_js
            )
            with open(os.path.join(cat_dir, f"{sub['slug']}.html"), "w", encoding="utf-8") as f:
                f.write(sub_html)

    print("Gerador finalizado. O site estruturado está na pasta 'output/'.")

if __name__ == "__main__":
    main()
