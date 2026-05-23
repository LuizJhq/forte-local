/* ================================================================
   FORTE LOCAL - JAVASCRIPT PRINCIPAL
   ================================================================
   
   ÍNDICE:
   1. Variáveis e Configuração
   2. Dados Mockados (Produtos Fake)
   3. Sistema de LocalStorage
   4. Sistema de Pontos e Níveis
   5. Renderização de Categorias
   6. Renderização de Produtos
   7. Sistema de Busca e Filtros
   8. Modal de Anúncio (Criar Produto)
   9. Modal de Produto (Ver Detalhes)
   10. Sistema de Dark Mode
   11. Navbar e Menu Mobile
   12. Funções Utilitárias
   13. Inicialização
   
   ================================================================ */

// ================================================================
// 1. VARIÁVEIS E CONFIGURAÇÃO
// ================================================================

// Chaves do LocalStorage
const STORAGE_KEYS = {
    produtos: 'fortelocal_produtos',
    usuario: 'fortelocal_usuario',
    tema: 'fortelocal_tema',
    primeiroAcesso: 'fortelocal_primeiro_acesso'
};

// Configuração do sistema de níveis
const NIVEIS_CONFIG = {
    pontosPorAnuncio: 25,
    niveis: [
        { nivel: 1, nome: 'Iniciante', pontosNecessarios: 0 },
        { nivel: 2, nome: 'Ativo', pontosNecessarios: 100 },
        { nivel: 3, nome: 'Experiente', pontosNecessarios: 250 },
        { nivel: 4, nome: 'Vendedor Experiente', pontosNecessarios: 500 },
        { nivel: 5, nome: 'Mestre Local', pontosNecessarios: 1000 }
    ]
};

// Categorias disponíveis
const CATEGORIAS = [
    { 
        nome: 'Agro', 
        icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
        descricao: 'Produtos agrícolas e insumos'
    },
    { 
        nome: 'Veículos', 
        icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0M15 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/><path d="M5 17H3V11l2-5h9l4 5v6h-2M5 11h14"/></svg>`,
        descricao: 'Carros, motos e tratores'
    },
    { 
        nome: 'Ferramentas', 
        icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
        descricao: 'Equipamentos e utensílios'
    },
    { 
        nome: 'Pecuária', 
        icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c-1 .6-1.7 1.8-1.7 3a4 4 0 0 0 1.7 3.3c-.3.5-.5 1-.5 1.7a3.6 3.6 0 0 0 4.6 3.4c.6 1.2 1.8 1.7 3.3 1.7s2.6-.5 3.3-1.7A3.6 3.6 0 0 0 20 17c0-.7-.2-1.2-.5-1.7A4 4 0 0 0 21 12c0-1.2-.7-2.4-1.7-3A3.6 3.6 0 0 0 15 4.6C14.4 3.5 13.2 3 12 3z"/></svg>`,
        descricao: 'Animais e produtos rurais'
    },
    { 
        nome: 'Eletrônicos', 
        icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01"/></svg>`,
        descricao: 'Celulares, TVs e mais'
    },
    { 
        nome: 'Roupas', 
        icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`,
        descricao: 'Moda e acessórios'
    },
    { 
        nome: 'Serviços', 
        icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
        descricao: 'Profissionais locais'
    },
    { 
        nome: 'Games', 
        icone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4"/><circle cx="17" cy="10" r="1"/><circle cx="15" cy="14" r="1"/></svg>`,
        descricao: 'Jogos e consoles'
    }
];

// ================================================================
// 2. DADOS MOCKADOS (PRODUTOS FAKE)
// ================================================================

const PRODUTOS_MOCKADOS = [
    {
        id: 'mock_1',
        nome: 'Trator John Deere 5075E',
        preco: 185000,
        categoria: 'Agro',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'Trator em excelente estado, revisado recentemente. Motor potente, ideal para trabalhos pesados na lavoura. Acompanha implementos básicos.',
        imagem: 'https://images.unsplash.com/photo-1585911171167-1f66ea3de00c?w=600&h=400&fit=crop',
        vendedor: 'João Silva',
        dataCriacao: Date.now() - 86400000
    },
    {
        id: 'mock_2',
        nome: 'Hilux SW4 2022 Diesel',
        preco: 295000,
        categoria: 'Veículos',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'Toyota Hilux SW4 SRX, completa, 7 lugares, único dono. Baixa quilometragem, sempre revisada na concessionária.',
        imagem: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=600&h=400&fit=crop',
        vendedor: 'Maria Santos',
        dataCriacao: Date.now() - 172800000
    },
    {
        id: 'mock_3',
        nome: 'Kit Ferramentas Profissional',
        preco: 1200,
        categoria: 'Ferramentas',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'Kit completo com mais de 150 peças. Inclui chaves, alicates, martelos e maleta organizadora de alumínio.',
        imagem: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop',
        vendedor: 'Pedro Oliveira',
        dataCriacao: Date.now() - 259200000
    },
    {
        id: 'mock_4',
        nome: 'Lote de 10 Novilhas Angus',
        preco: 45000,
        categoria: 'Pecuária',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'Novilhas Angus puras, vacinadas e vermifugadas. Excelente genética, prontas para cria. Documentação em dia.',
        imagem: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop',
        vendedor: 'Carlos Pereira',
        dataCriacao: Date.now() - 345600000
    },
    {
        id: 'mock_5',
        nome: 'iPhone 15 Pro Max 256GB',
        preco: 7500,
        categoria: 'Eletrônicos',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'iPhone 15 Pro Max na cor Titânio Natural. Lacrado, com nota fiscal. Garantia Apple de 1 ano.',
        imagem: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=400&fit=crop',
        vendedor: 'Ana Costa',
        dataCriacao: Date.now() - 432000000
    },
    {
        id: 'mock_6',
        nome: 'Jaqueta de Couro Legítimo',
        preco: 450,
        categoria: 'Roupas',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'Jaqueta de couro bovino legítimo, tamanho G. Pouco usada, em perfeito estado. Ideal para o inverno gaúcho.',
        imagem: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=400&fit=crop',
        vendedor: 'Fernanda Lima',
        dataCriacao: Date.now() - 518400000
    },
    {
        id: 'mock_7',
        nome: 'Serviço de Eletricista',
        preco: 150,
        categoria: 'Serviços',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'Eletricista profissional com 15 anos de experiência. Instalações, reparos e manutenção elétrica residencial e comercial.',
        imagem: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop',
        vendedor: 'Roberto Eletricista',
        dataCriacao: Date.now() - 604800000
    },
    {
        id: 'mock_8',
        nome: 'PlayStation 5 + 3 Jogos',
        preco: 3200,
        categoria: 'Games',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'PS5 versão com disco, acompanha 2 controles e os jogos: God of War Ragnarok, Spider-Man 2 e FIFA 24.',
        imagem: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop',
        vendedor: 'Lucas Gamer',
        dataCriacao: Date.now() - 691200000
    },
    {
        id: 'mock_9',
        nome: 'Sementes de Soja Premium',
        preco: 280,
        categoria: 'Agro',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'Saco de 40kg de sementes de soja certificadas. Alta germinação e resistência. Safra 2024.',
        imagem: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=600&h=400&fit=crop',
        vendedor: 'Agro Sementes Ltda',
        dataCriacao: Date.now() - 777600000
    },
    {
        id: 'mock_10',
        nome: 'Motocicleta Honda CG 160',
        preco: 14500,
        categoria: 'Veículos',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'Honda CG 160 Start 2023, apenas 8.000 km rodados. Documentação 2024 paga. Pneus novos.',
        imagem: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&h=400&fit=crop',
        vendedor: 'Ricardo Motos',
        dataCriacao: Date.now() - 864000000
    },
    {
        id: 'mock_11',
        nome: 'Furadeira de Impacto Bosch',
        preco: 380,
        categoria: 'Ferramentas',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'Furadeira de impacto Bosch GSB 550 RE, 550W. Na caixa com manual e kit de brocas incluso.',
        imagem: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop',
        vendedor: 'Marcelo Construções',
        dataCriacao: Date.now() - 950400000
    },
    {
        id: 'mock_12',
        nome: 'Smart TV Samsung 55"',
        preco: 2800,
        categoria: 'Eletrônicos',
        localizacao: 'Avenida alfredo duarte',
        descricao: 'TV Samsung Crystal UHD 55 polegadas, 4K. Modelo 2023, com Alexa integrada e Tizen.',
        imagem: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop',
        vendedor: 'Eletro Casa',
        dataCriacao: Date.now() - 1036800000
    }
];

// ================================================================
// 3. SISTEMA DE LOCALSTORAGE
// ================================================================

/**
 * Salva dados no LocalStorage
 * @param {string} chave - Chave do storage
 * @param {any} dados - Dados a serem salvos
 */
function salvarNoStorage(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
        return true;
    } catch (erro) {
        console.error('Erro ao salvar no LocalStorage:', erro);
        return false;
    }
}

/**
 * Carrega dados do LocalStorage
 * @param {string} chave - Chave do storage
 * @param {any} valorPadrao - Valor padrão se não existir
 * @returns {any} Dados carregados ou valor padrão
 */
function carregarDoStorage(chave, valorPadrao = null) {
    try {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : valorPadrao;
    } catch (erro) {
        console.error('Erro ao carregar do LocalStorage:', erro);
        return valorPadrao;
    }
}

/**
 * Carrega todos os produtos (mockados + do usuário)
 * @returns {Array} Lista de produtos
 */
function carregarProdutos() {
    const produtosUsuario = carregarDoStorage(STORAGE_KEYS.produtos, []);
    const primeiroAcesso = carregarDoStorage(STORAGE_KEYS.primeiroAcesso, true);
    
    // Se for o primeiro acesso, adiciona os produtos mockados
    if (primeiroAcesso) {
        salvarNoStorage(STORAGE_KEYS.primeiroAcesso, false);
    }
    
    // Combina produtos mockados com produtos do usuário
    return [...PRODUTOS_MOCKADOS, ...produtosUsuario];
}

/**
 * Salva um novo produto
 * @param {Object} produto - Dados do produto
 * @returns {boolean} Sucesso da operação
 */
function salvarProduto(produto) {
    const produtosUsuario = carregarDoStorage(STORAGE_KEYS.produtos, []);
    
    // Adiciona ID e data de criação
    produto.id = 'user_' + Date.now();
    produto.dataCriacao = Date.now();
    produto.vendedor = 'Usuário Caçapavano';
    
    produtosUsuario.push(produto);
    
    // Salva no storage
    const sucesso = salvarNoStorage(STORAGE_KEYS.produtos, produtosUsuario);
    
    if (sucesso) {
        // Atualiza pontos do usuário
        adicionarPontos(NIVEIS_CONFIG.pontosPorAnuncio);
    }
    
    return sucesso;
}

/**
 * Carrega dados do usuário
 * @returns {Object} Dados do usuário
 */
function carregarUsuario() {
    return carregarDoStorage(STORAGE_KEYS.usuario, {
        nome: 'Usuário Caçapavano',
        pontos: 0,
        nivel: 1,
        anuncios: 0
    });
}

/**
 * Salva dados do usuário
 * @param {Object} usuario - Dados do usuário
 */
function salvarUsuario(usuario) {
    salvarNoStorage(STORAGE_KEYS.usuario, usuario);
}

// ================================================================
// 4. SISTEMA DE PONTOS E NÍVEIS
// ================================================================

/**
 * Adiciona pontos ao usuário e atualiza o nível
 * @param {number} pontos - Quantidade de pontos a adicionar
 */
function adicionarPontos(pontos) {
    const usuario = carregarUsuario();
    usuario.pontos += pontos;
    usuario.anuncios += 1;
    
    // Calcula o novo nível
    for (let i = NIVEIS_CONFIG.niveis.length - 1; i >= 0; i--) {
        if (usuario.pontos >= NIVEIS_CONFIG.niveis[i].pontosNecessarios) {
            usuario.nivel = NIVEIS_CONFIG.niveis[i].nivel;
            break;
        }
    }
    
    salvarUsuario(usuario);
    atualizarInterfaceUsuario();
}

/**
 * Obtém informações do nível atual
 * @param {number} nivel - Número do nível
 * @returns {Object} Informações do nível
 */
function obterInfoNivel(nivel) {
    return NIVEIS_CONFIG.niveis.find(n => n.nivel === nivel) || NIVEIS_CONFIG.niveis[0];
}

/**
 * Calcula o progresso para o próximo nível
 * @param {number} pontos - Pontos atuais
 * @param {number} nivel - Nível atual
 * @returns {Object} Informações de progresso
 */
function calcularProgresso(pontos, nivel) {
    const nivelAtual = obterInfoNivel(nivel);
    const proximoNivel = obterInfoNivel(nivel + 1);
    
    if (!proximoNivel) {
        return { porcentagem: 100, faltam: 0 };
    }
    
    const pontosBase = nivelAtual.pontosNecessarios;
    const pontosProximo = proximoNivel.pontosNecessarios;
    const progressoAtual = pontos - pontosBase;
    const totalNecessario = pontosProximo - pontosBase;
    const porcentagem = Math.min((progressoAtual / totalNecessario) * 100, 100);
    
    return {
        porcentagem: porcentagem,
        faltam: pontosProximo - pontos
    };
}

/**
 * Atualiza a interface com dados do usuário
 */
function atualizarInterfaceUsuario() {
    const usuario = carregarUsuario();
    const produtos = carregarProdutos();
    const produtosUsuario = produtos.filter(p => p.id.startsWith('user_'));
    const progresso = calcularProgresso(usuario.pontos, usuario.nivel);
    
    // Atualiza elementos na página (se existirem)
    const elementos = {
        'perfil-nome': usuario.nome,
        'stat-pontos': usuario.pontos.toString(),
        'stat-anuncios': produtosUsuario.length.toString(),
        'stat-nivel': `Nível ${usuario.nivel}`,
        'nivel-numero': usuario.nivel.toString(),
        'nivel-badge-grande': `Nível ${usuario.nivel}`,
        'pontos-atuais': `${usuario.pontos} pontos`,
        'pontos-proximo': progresso.faltam > 0 ? 
            `${progresso.faltam} pontos para o próximo nível` : 
            'Nível máximo alcançado!'
    };
    
    for (const [id, valor] of Object.entries(elementos)) {
        const elemento = document.getElementById(id);
        if (elemento) elemento.textContent = valor;
    }
    
    // Atualiza barra de progresso
    const progressBar = document.getElementById('progress-fill');
    if (progressBar) {
        progressBar.style.width = `${progresso.porcentagem}%`;
    }
    
    // Atualiza contador total de produtos
    const totalProdutos = document.getElementById('total-produtos');
    if (totalProdutos) {
        totalProdutos.textContent = produtos.length.toString();
    }
}

// ================================================================
// 5. RENDERIZAÇÃO DE CATEGORIAS
// ================================================================

/**
 * Renderiza o grid de categorias
 */
function renderizarCategorias() {
    const container = document.getElementById('categories-grid');
    if (!container) return;
    
    const produtos = carregarProdutos();
    
    container.innerHTML = CATEGORIAS.map(categoria => {
        const quantidade = produtos.filter(p => p.categoria === categoria.nome).length;
        
        return `
            <div class="category-card" onclick="filtrarCategoria('${categoria.nome}')" data-categoria="${categoria.nome}">
                <div class="category-icon">
                    ${categoria.icone}
                </div>
                <span class="category-name">${categoria.nome}</span>
                <span class="category-count">${quantidade} anúncios</span>
            </div>
        `;
    }).join('');
}

// ================================================================
// 6. RENDERIZAÇÃO DE PRODUTOS
// ================================================================

/**
 * Renderiza o grid de produtos
 * @param {Array} produtos - Lista de produtos (opcional)
 */
function renderizarProdutos(produtos = null) {
    const container = document.getElementById('products-grid');
    const emptyState = document.getElementById('empty-state');
    
    if (!container) return;
    
    // Se não foram passados produtos, carrega todos
    if (!produtos) {
        produtos = carregarProdutos();
    }
    
    // Aplica filtros atuais
    const categoriaFiltro = document.getElementById('filter-categoria')?.value;
    const ordenarFiltro = document.getElementById('filter-ordenar')?.value;
    
    // Filtra por categoria
    if (categoriaFiltro) {
        produtos = produtos.filter(p => p.categoria === categoriaFiltro);
    }
    
    // Ordena
    switch (ordenarFiltro) {
        case 'menor-preco':
            produtos.sort((a, b) => a.preco - b.preco);
            break;
        case 'maior-preco':
            produtos.sort((a, b) => b.preco - a.preco);
            break;
        case 'recentes':
        default:
            produtos.sort((a, b) => b.dataCriacao - a.dataCriacao);
    }
    
    // Mostra/esconde estado vazio
    if (emptyState) {
        emptyState.style.display = produtos.length === 0 ? 'block' : 'none';
    }
    
    // Renderiza produtos
    container.innerHTML = produtos.map(produto => `
        <div class="product-card" onclick="abrirModalProduto('${produto.id}')">
            <div class="product-image">
                <img src="${produto.imagem || 'https://via.placeholder.com/400x300?text=Sem+Imagem'}" alt="${produto.nome}" loading="lazy">
                ${produto.id.startsWith('user_') ? '<span class="product-badge">Novo</span>' : ''}
            </div>
            <div class="product-content">
                <span class="product-category">${produto.categoria}</span>
                <h3 class="product-name">${produto.nome}</h3>
<p class="product-price">${produto.preco === 0 ? 'Grátis' : 'R$ ' + formatarPreco(produto.preco)}</p>
                <div class="product-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${produto.localizacao}
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Renderiza produtos do usuário na página de perfil
 */
function renderizarMeusProdutos() {
    const container = document.getElementById('meus-produtos-grid');
    const emptyState = document.getElementById('empty-meus-anuncios');
    
    if (!container) return;
    
    const produtos = carregarProdutos().filter(p => p.id.startsWith('user_'));
    
    // Mostra/esconde estado vazio
    if (emptyState) {
        emptyState.style.display = produtos.length === 0 ? 'block' : 'none';
    }
    
    if (produtos.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = produtos.map(produto => `
        <div class="product-card" onclick="abrirModalProduto('${produto.id}')">
            <div class="product-image">
                <img src="${produto.imagem || 'https://via.placeholder.com/400x300?text=Sem+Imagem'}" alt="${produto.nome}" loading="lazy">
                <span class="product-badge">Meu Anúncio</span>
            </div>
            <div class="product-content">
                <span class="product-category">${produto.categoria}</span>
                <h3 class="product-name">${produto.nome}</h3>
<p class="product-price">${produto.preco === 0 ? 'Grátis' : 'R$ ' + formatarPreco(produto.preco)}</p>
                <div class="product-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                    </svg>
                    ${produto.localizacao}
                </div>
            </div>
        </div>
    `).join('');
}

// ================================================================
// 7. SISTEMA DE BUSCA E FILTROS
// ================================================================

/**
 * Realiza busca de produtos
 */
function realizarBusca() {
    const termo = document.getElementById('search-input')?.value.toLowerCase().trim();
    
    if (!termo) {
        renderizarProdutos();
        return;
    }
    
    const produtos = carregarProdutos().filter(produto => 
        produto.nome.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo) ||
        produto.localizacao.toLowerCase().includes(termo)
    );
    
    renderizarProdutos(produtos);
    
    // Rola até a seção de produtos
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Filtra produtos por categoria
 * @param {string} categoria - Nome da categoria
 */
function filtrarCategoria(categoria) {
    // Atualiza o select de filtro
    const selectCategoria = document.getElementById('filter-categoria');
    if (selectCategoria) {
        selectCategoria.value = categoria;
    }
    
    // Atualiza visual das categorias
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.toggle('active', card.dataset.categoria === categoria);
    });
    
    // Renderiza produtos filtrados
    renderizarProdutos();
    
    // Rola até a seção de produtos
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Configura os event listeners dos filtros
 */
function configurarFiltros() {
    const selectCategoria = document.getElementById('filter-categoria');
    const selectOrdenar = document.getElementById('filter-ordenar');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (selectCategoria) {
        selectCategoria.addEventListener('change', () => {
            // Atualiza visual das categorias
            document.querySelectorAll('.category-card').forEach(card => {
                card.classList.toggle('active', card.dataset.categoria === selectCategoria.value);
            });
            renderizarProdutos();
        });
    }
    
    if (selectOrdenar) {
        selectOrdenar.addEventListener('change', renderizarProdutos);
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') realizarBusca();
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', realizarBusca);
    }
}

// ================================================================
// 8. MODAL DE ANÚNCIO (CRIAR PRODUTO)
// ================================================================

let imagemSelecionada = null;

/**
 * Abre o modal de criar anúncio
 */
function abrirModalAnuncio() {
    const modal = document.getElementById('modal-anuncio');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Fecha o modal de criar anúncio
 */
function fecharModalAnuncio() {
    const modal = document.getElementById('modal-anuncio');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        limparFormularioAnuncio();
    }
}

/**
 * Limpa o formulário de anúncio
 */
function limparFormularioAnuncio() {
    const form = document.getElementById('form-anuncio');
    if (form) form.reset();
    
    const preview = document.getElementById('preview-imagem');
    const placeholder = document.getElementById('upload-placeholder');
    
    if (preview) {
        preview.classList.remove('active');
        preview.src = '';
    }
    if (placeholder) {
        placeholder.style.display = 'flex';
    }
    
    imagemSelecionada = null;
}

/**
 * Configura o upload de imagem
 */
function configurarUploadImagem() {
    const uploadArea = document.getElementById('image-upload');
    const inputImagem = document.getElementById('input-imagem');
    const preview = document.getElementById('preview-imagem');
    const placeholder = document.getElementById('upload-placeholder');
    
    if (!uploadArea || !inputImagem) return;
    
    uploadArea.addEventListener('click', () => inputImagem.click());
    
    inputImagem.addEventListener('change', (e) => {
        const arquivo = e.target.files[0];
        if (!arquivo) return;
        
        // Verifica se é uma imagem
        if (!arquivo.type.startsWith('image/')) {
            mostrarToast('Por favor, selecione uma imagem válida.', 'erro');
            return;
        }
        
        // Converte para Base64 para salvar no LocalStorage
        const reader = new FileReader();
        reader.onload = (event) => {
            imagemSelecionada = event.target.result;
            
            if (preview) {
                preview.src = imagemSelecionada;
                preview.classList.add('active');
            }
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        };
        reader.readAsDataURL(arquivo);
    });
}

/**
 * Configura o formulário de anúncio
 */
function configurarFormularioAnuncio() {
    const form = document.getElementById('form-anuncio');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const produto = {
            nome: document.getElementById('input-nome').value.trim(),
            preco: parseFloat(document.getElementById('input-preco').value),
            categoria: document.getElementById('input-categoria').value,
            localizacao: document.getElementById('input-localizacao').value.trim(),
            descricao: document.getElementById('input-descricao').value.trim(),
           imagem: imagemSelecionada
        };
        
        // Validação básica
        function abrirModalFoto() {
    document.getElementById('modal-foto-obrigatorio').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharModalFoto() {
    document.getElementById('modal-foto-obrigatorio').classList.remove('active');
}
if (!imagemSelecionada) {
    abrirModalFoto();
    return;
}
        
        // Salva o produto
        if (salvarProduto(produto)) {
            mostrarToast('Anúncio publicado com sucesso! +25 pontos');
            fecharModalAnuncio();
            renderizarProdutos();
            renderizarCategorias();
            renderizarMeusProdutos();
        } else {
mostrarToast('Erro ao publicar anúncio. Tente novamente.', 'erro');
        }
    });
}

// ================================================================
// 9. MODAL DE PRODUTO (VER DETALHES)
// ================================================================

/**
 * Abre o modal com detalhes do produto
 * @param {string} produtoId - ID do produto
 */
function abrirModalProduto(produtoId) {
    const modal = document.getElementById('modal-produto');
    const container = document.getElementById('produto-detalhes');
    
    if (!modal || !container) return;
    
    // Encontra o produto
    const produtos = carregarProdutos();
    const produto = produtos.find(p => p.id === produtoId);
    
    if (!produto) {
        mostrarToast('Produto não encontrado.', 'erro');
        return;
    }
    
    // Renderiza os detalhes
    container.innerHTML = `
        <div class="produto-galeria">
            <img src="${produto.imagem || 'https://via.placeholder.com/600x600?text=Sem+Imagem'}" alt="${produto.nome}">
        </div>
        <div class="produto-info">
            <span class="produto-info-categoria">${produto.categoria}</span>
            <h2 class="produto-info-nome">${produto.nome}</h2>
            <p class="produto-info-preco">R$ ${formatarPreco(produto.preco)}</p>
            
            <div class="produto-info-local">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                ${produto.localizacao}, Caçapava do Sul - RS
            </div>
            
            <div class="produto-info-descricao">
                <h4>Descrição</h4>
                <p>${produto.descricao || 'Sem descrição disponível.'}</p>
            </div>
            
            <div class="produto-vendedor">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces" alt="Vendedor" class="vendedor-avatar">
                <div class="vendedor-info">
                    <span class="vendedor-nome">${produto.vendedor}</span>
                    <span class="vendedor-status">● Online agora</span>
                </div>
            </div>
            
            <button class="btn btn-whatsapp btn-full" onclick="contatarWhatsApp('${produto.nome}')">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chamar no WhatsApp
            </button>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Fecha o modal de produto
 */
function fecharModalProduto() {
    const modal = document.getElementById('modal-produto');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Simula contato via WhatsApp
 * @param {string} nomeProduto - Nome do produto
 */
function contatarWhatsApp(nomeProduto) {
    mostrarToast(`Simulação: Abrindo WhatsApp para "${nomeProduto}"`);
    // Em produção real, usaria:
    // window.open(`https://wa.me/5551999999999?text=Olá! Tenho interesse no produto: ${nomeProduto}`, '_blank');
}

// ================================================================
// 10. SISTEMA DE DARK MODE
// ================================================================

/**
 * Alterna entre modo claro e escuro
 */
function alternarTema() {
    const temaAtual = document.documentElement.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', novoTema);
    salvarNoStorage(STORAGE_KEYS.tema, novoTema);
}

/**
 * Carrega o tema salvo
 */
function carregarTema() {
    const temaSalvo = carregarDoStorage(STORAGE_KEYS.tema, 'light');
    document.documentElement.setAttribute('data-theme', temaSalvo);
}

/**
 * Configura o botão de dark mode
 */
function configurarDarkMode() {
    const btnDarkMode = document.getElementById('btn-dark-mode');
    if (btnDarkMode) {
        btnDarkMode.addEventListener('click', alternarTema);
    }
}

// ================================================================
// 11. NAVBAR E MENU MOBILE
// ================================================================

/**
 * Configura a navbar e menu mobile
 */
function configurarNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const btnAnunciar = document.getElementById('btn-anunciar');
    
    // Efeito de scroll na navbar
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }
    
    // Toggle menu mobile
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        // Fecha menu ao clicar em um link
        mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
    
    // Botão de anunciar
    if (btnAnunciar) {
        btnAnunciar.addEventListener('click', abrirModalAnuncio);
    }
}

// ================================================================
// 12. FUNÇÕES UTILITÁRIAS
// ================================================================

/**
 * Formata o preço para exibição
 * @param {number} valor - Valor a formatar
 * @returns {string} Valor formatado
 */
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Mostra uma notificação toast
 * @param {string} mensagem - Mensagem a exibir
 */
function mostrarToast(mensagem, tipo = 'sucesso') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    
    if (!toast || !toastMessage) return;


    const cores = {
        sucesso: 'var(--cor-sucesso)',
        erro: 'var(--cor-erro)'
    };

    if (toastIcon) {
        toastIcon.innerHTML = icones[tipo] || icones.sucesso;
        toastIcon.style.color = cores[tipo] || cores.sucesso;
    }

    toastMessage.textContent = mensagem;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

/**
 * Fecha modais ao clicar fora
 */
function configurarFechamentoModais() {
    const modais = document.querySelectorAll('.modal-overlay');
    
    modais.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = '';
        }
    });
}

// ================================================================
// 13. INICIALIZAÇÃO
// ================================================================

/**
 * Inicializa a aplicação
 */
function inicializar() {

    document.getElementById('btn-entendi-foto')?.addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('modal-foto-obrigatorio').classList.remove('active');
});
    // Carrega o tema
    carregarTema();
    
    // Configura componentes
    configurarNavbar();
    configurarDarkMode();
    configurarFiltros();
    configurarUploadImagem();
    configurarFormularioAnuncio();
    configurarFechamentoModais();
    
    // Renderiza conteúdo
    renderizarCategorias();
    renderizarProdutos();
    renderizarMeusProdutos();
    
    // Atualiza interface do usuário
    atualizarInterfaceUsuario();
    
    console.log('🏠 Forte Local inicializado com sucesso!');
}

// Aguarda o DOM carregar
document.addEventListener('DOMContentLoaded', inicializar);
