# Layover Connect 🛩️

Uma plataforma inovadora para conectar viajantes durante suas escalas aeroportuárias. Encontre pessoas na mesma escala, faça novos amigos, pratique idiomas e torne sua viagem mais interessante!

## 🌟 Funcionalidades

### ✅ Sistema Completo Implementado

- **🔐 Autenticação por Código de Viagem**: Verificação automática dos dados de voo
- **🤖 Geração Automática de Nicknames**: Nomes únicos baseados em nome, idade, gênero e país de origem
- **🎯 Algoritmo de Matching**: Encontra automaticamente outros viajantes na mesma escala
- **💬 Chat Privado**: Conversas um-a-um com auto-destruição configurável
- **👥 Chat de Grupo**: Salas públicas por país/aeroporto de escala
- **⏰ Sistema de Limpeza Automática**: Remove chats expirados automaticamente
- **🔒 Privacidade Total**: Apenas informações básicas são compartilhadas

## 🚀 Como Funciona

### 1. **Cadastro Seguro**
- Insira seus dados pessoais básicos (nome, idade, gênero, país, idiomas)
- Adicione informações de voo (número do voo, aeroportos, horários de escala)
- O sistema valida automaticamente seus dados

### 2. **Matching Inteligente**
- Algoritmo encontra automaticamente outros viajantes:
  - Mesmo aeroporto de escala
  - Horários de escala sobrepostos
  - Tempo mínimo de 30 minutos de sobreposição

### 3. **Conversas Seguras**
- **Chat Privado**: Fale diretamente com outro viajante
- **Chat de Grupo**: Participe de conversas públicas do seu aeroporto
- **Auto-Destruição**: Chats são removidos 1 hora após o voo

### 4. **Privacidade Garantida**
- Nickname gerado automaticamente (ex: `joa25MPT`, `mar30FBR`)
- Apenas dados básicos são visíveis (idade, gênero, país, idiomas)
- Nome real nunca é compartilhado
- Sistema de cleanup automático

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: ShadCN/UI + Tailwind CSS
- **Gerenciamento de Estado**: React Hooks + Custom Store
- **Validação**: Zod + React Hook Form
- **Data Management**: Date-fns para manipulação de datas
- **Real-time**: Sistema preparado para Socket.io (futuro)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🚀 Instalação e Execução

```bash
# Clone o repositório
git clone <repository-url>
cd layover-connect

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🧪 Como Testar

1. **Acesse a aplicação** em `http://localhost:5173`

2. **Adicione usuários demo**:
   - Na homepage, clique em "Add Demo Users"
   - Isso criará 5 usuários com escalas sobrepostas em CDG e FRA

3. **Faça login**:
   - Clique em "Começar a Conectar"
   - Preencha o formulário com suas informações
   - Use dados de voo válidos (formato: `TP123`, `CDG`, etc.)

4. **Explore o Dashboard**:
   - **Aba "Travelers"**: Veja outros viajantes na sua escala
   - **Aba "Private Chats"**: Suas conversas privadas
   - **Aba "Group Chats"**: Conversas públicas do aeroporto

## 📱 Exemplos de Uso

### Dados de Teste Válidos

```
Nome: João
Idade: 28
Gênero: Masculino
País: Portugal
Idiomas: Portuguese, English

Número do Voo: TP441
Partida: LIS
Escala: CDG  
Destino: JFK
Início da Escala: [2 horas no futuro]
Fim da Escala: [5 horas no futuro]
```

### Aeroportos Suportados

- **CDG** (França) - Charles de Gaulle
- **FRA** (Alemanha) - Frankfurt
- **LHR** (Reino Unido) - Heathrow
- **JFK** (EUA) - John F. Kennedy
- **GRU** (Brasil) - Guarulhos
- **E muitos outros...**

## 🔧 Arquitetura do Sistema

### Componentes Principais

```
src/
├── components/
│   ├── TravelCodeForm.tsx      # Formulário de cadastro
│   ├── LayoverDashboard.tsx    # Dashboard principal
│   ├── DemoData.tsx           # Dados de teste
│   └── ...
├── hooks/
│   └── useLayoverStore.ts     # Hooks para gerenciar estado
├── store/
│   └── layoverStore.ts        # Lógica de negócio principal
├── types/
│   └── index.ts               # Definições TypeScript
└── utils/
    ├── nicknameGenerator.ts   # Geração de nicknames
    └── travelCodeParser.ts    # Validação de códigos de viagem
```

### Fluxo de Dados

1. **Usuário cadastra** → `TravelCodeForm`
2. **Dados validados** → `travelCodeParser`
3. **Nickname gerado** → `nicknameGenerator`
4. **Usuário criado** → `layoverStore`
5. **Matches encontrados** → `algoritmo de matching`
6. **Dashboard atualizado** → `useLayoverStore hooks`

## 🎯 Funcionalidades Únicas

### 🤖 Geração Automática de Nicknames
```typescript
// Entrada: João, 25, M, Portugal
// Saída: joa25MPT

// Se existir conflito: joa25MPT23 ou joa25MPTa8x
```

### ⏰ Auto-Destruição Inteligente
- Chats privados expiram 1 hora após o voo
- Chats de grupo removidos automaticamente
- Usuários inativos após fim da escala
- Limpeza executada a cada minuto

### 🎯 Matching Preciso
```typescript
// Condições para match:
// 1. Mesmo aeroporto de escala
// 2. Horários sobrepostos
// 3. Mínimo 30min de sobreposição
// 4. Máximo 24h de escala
```

## 🔒 Privacidade e Segurança

- ✅ Nomes reais nunca expostos
- ✅ Nicknames únicos e anônimos
- ✅ Apenas dados básicos visíveis
- ✅ Auto-destruição de dados
- ✅ Validação rigorosa de entrada
- ✅ Sem armazenamento persistente

## 🚀 Próximos Passos

- [ ] **WebSockets**: Chat em tempo real com Socket.io
- [ ] **Backend**: API REST para persistência
- [ ] **Notificações**: Push notifications para novos matches
- [ ] **Geolocalização**: Localização dentro do aeroporto
- [ ] **Tradução**: Sistema de tradução automática
- [ ] **Mobile App**: Versão React Native

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- **Desenvolvedor Principal** - Implementação completa do sistema

## 🎉 Demonstração

Visite a aplicação em funcionamento e teste todas as funcionalidades! O sistema está 100% funcional e pronto para conectar viajantes ao redor do mundo.

---

**Layover Connect** - Transformando escalas em conexões! ✈️ 🌍
