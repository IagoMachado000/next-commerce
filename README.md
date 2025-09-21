# Projeto Next E-commerce

## Estrutura de pastas padrão

`src/` - pasta raiz do código-fonte do projeto
`src/app/` - contém rotas, layouts e páginas (mesma função da `app/`)
`public/` - arquivos estáticos

## Estrutura de pasta custom

`src/app/componentes` - arquivos de componentes
`src/types` - tipagem dos dados

## Arquivos 

`src/app/layouts.tsx` - e o layout comum em todo a aplicação

## Diferença na declaração de componentes

A diferença entre a declaração dos componentes é **muito sutil** e está **apenas na sintaxe de declaração**:

### 🔹 1. Função declarada + export separado

```tsx
function Navbar() {
  return <nav>...</nav>;
}

export default Navbar;
```

✅ Características:

* **Função nomeada** → ajuda no stack trace (erros mostram o nome `Navbar`).
* **Tem hoisting** → você pode chamar `Navbar()` mesmo antes da declaração.
* Separação clara entre **definição** e **exportação**.
* Com TypeScript, para tipar props você faz:

```tsx
type Props = { title: string };

function Navbar({ title }: Props) {
  return <nav>{title}</nav>;
}
```

### 🔹 2. Arrow function atribuída a constante

```tsx
const Navbar = () => {
  return <nav>...</nav>;
};

export default Navbar;
```

✅ Características:

* **Arrow function** → não tem hoisting. Você só pode usar `Navbar` depois dessa linha.
* Mais usada em **projetos modernos** porque combina bem com:

  * Hooks (`useState`, `useEffect`, etc.).
  * Tipagem explícita (`const Comp: React.FC<Props> = ...`).
* Também mantém o nome da função (`Navbar`) nos erros, porque está atribuída a uma variável.

```tsx
type Props = { title: string };

const Navbar = ({ title }: Props) => {
  return <nav>{title}</nav>;
};
```

### 🔹 3. Função declarada com `export default`

```tsx
export default function Navbar() {
  return <nav>...</nav>;
}
```

✅ Características:

* Mesma ideia da 1ª, mas já **exporta direto**.
* Código mais **enxuto**, usado muito em exemplos oficiais do Next.js.
* Continua sendo uma função nomeada → nos erros ainda aparece `Navbar`.
* Com TypeScript, tipar props é idêntico:

```tsx
type Props = { title: string };

export default function Navbar({ title }: Props) {
  return <nav>{title}</nav>;
}
```

### 📌 Comparação final

| Forma                                 | Hoisting | Legibilidade          | Estilo comum em…                                     |
| ------------------------------------- | -------- | --------------------- | ---------------------------------------------------- |
| `function Navbar() {}` + export       | ✅ Sim    | Separação clara       | Projetos mais clássicos, libs                        |
| `const Navbar = () => {}`             | ❌ Não    | Mais conciso, moderno | Projetos atuais, quando se usa hooks e props tipadas |
| `export default function Navbar() {}` | ✅ Sim    | Mais enxuto           | Next.js docs, exemplos oficiais                      |

👉 **Na prática:**

* As **3 funcionam exatamente igual** em React.
* A diferença é só de estilo e de como você organiza o projeto.
* Se estiver em Next.js, a **3ª** é a mais comum nos exemplos da documentação.
* Se quiser **tipagem explícita e controle total**, a **2ª** (arrow function) é a preferida em times grandes.

---

## Estrutura de um componente com tipagem

```ts
// ======= src/types/ProductType.ts =======

// Tipagem do objeto Produto
export type ProductType = {
  id: number;                // Identificador único
  title: string;             // Nome do produto
  price: number | null;      // Preço (pode ser null)
  description: string | null; // Descrição do produto
  image: string;             // URL da imagem
  category: string;          // Categoria do produto
};
```

```ts
// ======= src/app/components/Product.tsx =======

import { ProductType } from "@/types/ProductType";

// Define o tipo das props do componente Product
type ProductProps = {
  product: ProductType; // Recebe um produto do tipo ProductType
};

// Componente funcional Product que recebe um produto como prop
const Product = ({ product }: ProductProps) => {
  return (
    // Container principal do card do produto
    <div className="flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300">
      
      {/* Imagem do produto */}
      <div className="relative max-h-72 flex-1">
        {/* Aqui você poderia colocar <img src={product.image} alt={product.title}/> */}
      </div>

      {/* Preço do produto */}
      <div className="flex justify-between font-bold my-3">
        {product.price}
      </div>

      {/* Descrição do produto */}
      <div>
        {product.description}
      </div>

      {/* Botão de ação */}
      <button className="rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center">
        Comprar
      </button>
    </div>
  );
};

export default Product;
```

```ts
// ======= src/app/page.tsx =======

// Exemplo de uso do componente Product em um componente pai
// products é um array de objetos do tipo ProductType
{products.map((product: ProductType) => (
  // Para cada produto, renderiza um componente Product
  // key={product.id} é necessário para identificar cada item na lista
  <Product key={product.id} product={product} />
))}
```

### ✅ Ordem lógica explicada com arquivos

1. **`src/types/ProductType.ts`** → define o tipo `ProductType`.
2. **`src/app/components/Product.tsx`** → cria o card do produto (`Product`).
3. **`src/app/page.tsx`** → componente pai que mapeia o array e renderiza vários `Product`.

---

## Imagens

### Imagens locais

Se as imagens forem servidas localmente, dentro do próprio app, não é necessário nenhuma configuração adicional

```tsx
import Image from 'next/image';

<Image
  src="/images/produto1.png" // caminho relativo dentro de public
  width={300}
  height={300}
  alt="Produto 1"
/>
```

### Imagens externas

- Para imagens que vêm de outros domínios (API, CDN), o Next.js precisa saber quais domínios são confiáveis.

- Em versões antigas (<15), usava-se images.domains.

- Agora, em Next.js 15+, usa-se images.remotePatterns.

```tsx
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',           // protocolo da URL (http ou https)
        hostname: 'fakestoreapi.com', // domínio de onde virão as imagens
        port: '',                    // opcional, normalmente vazio
        pathname: '/**',             // permite todos os caminhos
      },
    ],
  },
};

export default nextConfig;

import Image from 'next/image';

<Image
  src="https://fakestoreapi.com/img/produto1.jpg" // imagem externa
  width={300}
  height={300}
  alt="Produto 1"
/>

// Sem essa configuração, o Next.js dará erro ou aviso.
```

## `use cliente`

No **Next.js (App Router)**, por padrão, todos os arquivos em `app/` são **Server Components**. Isso significa que:

* Eles **rodam no servidor** antes de enviar o HTML para o navegador.
* Não têm acesso a hooks do React que dependem do browser (`useState`, `useEffect`, etc.).
* Podem acessar dados sensíveis (ex.: `process.env.STRIPE_SECRET_KEY`).

### 🔑 O que faz o `"use client"`

Se você coloca no topo do arquivo:

```tsx
"use client";
```

Você está dizendo para o Next.js:

> “Esse componente deve ser renderizado no **cliente (browser)** e não apenas no servidor.”

Assim ele vira um **Client Component**.

### ✨ Diferenças práticas entre **Server Component** e **Client Component**

| Característica                                  | Server Component                         | Client Component                               |
| ----------------------------------------------- | ---------------------------------------- | ---------------------------------------------- |
| Onde roda                                       | No servidor                              | No navegador                                   |
| Pode usar `useState`, `useEffect`, `useContext` | ❌ Não                                    | ✅ Sim                                          |
| Pode acessar variáveis secretas (`process.env`) | ✅ Sim                                    | ❌ Não                                          |
| Tamanho do bundle enviado ao cliente            | Menor                                    | Maior                                          |
| Exemplo típico                                  | Pegar dados no banco, renderizar produto | Botão de adicionar ao carrinho, interatividade |

### 📌 Exemplos

#### Server Component (padrão)

```tsx
// app/page.tsx (não precisa "use client")
export default async function Page() {
  const products = await getProducts(); // pode acessar banco, API privada
  return <div>{products.map(p => <div>{p.name}</div>)}</div>;
}
```

#### Client Component

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0); // só funciona com "use client"
  return (
    <button onClick={() => setCount(count + 1)}>
      Cliquei {count} vezes
    </button>
  );
}
```

✅ **Resumindo**:

* Use **Server Components** sempre que possível (melhor performance, acesso a dados sensíveis).
* Use **Client Components** (`"use client"`) apenas quando precisar de **interatividade no browser**.

---

## App Route

### 📌 O que é o `page.tsx`?

Dentro do **App Router (`app/`)**, cada pasta corresponde a uma **rota**.
E o arquivo `page.tsx` é o **ponto de entrada principal dessa rota**.

Exemplo:

```
src/app/products/page.tsx
```

➡️ Isso cria a rota:

```
http://localhost:3000/products
```

O conteúdo de `page.tsx` será renderizado quando você acessar `/products`.

### 📂 O que pode ter dentro de `src/app/products/`

Além de `page.tsx`, a pasta de uma rota pode conter vários arquivos especiais:

| Arquivo                       | Função                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| **page.tsx**                  | Renderiza a página principal da rota (`/products`).                                                    |
| **layout.tsx**                | Define a estrutura visual compartilhada entre sub-rotas (navbar, sidebar, footer, etc.).               |
| **loading.tsx**               | Mostra um *loading state* enquanto o conteúdo da rota está sendo carregado (ideal para SSR/streaming). |
| **error.tsx**                 | Renderiza um fallback em caso de erro nessa rota.                                                      |
| **not-found.tsx**             | Mostra uma página de "404" específica para essa rota.                                                  |
| **head.tsx** (opcional)       | Personaliza `<head>` (título, meta tags).                                                              |
| **route.ts** ou **route.tsx** | Usado para criar **API Routes** dentro do App Router (ex.: `/products/api`).                           |

### ⚙️ Como funciona o roteamento no App Router

1. **Cada pasta dentro de `app/` vira uma rota.**

   * `src/app/page.tsx` → `/`
   * `src/app/products/page.tsx` → `/products`
   * `src/app/products/[id]/page.tsx` → `/products/:id` (rota dinâmica)
   * `src/app/dashboard/settings/page.tsx` → `/dashboard/settings`

2. **Layouts são hierárquicos.**

   * Se você tiver `src/app/layout.tsx`, ele é aplicado a **todas as rotas**.
   * Se tiver `src/app/products/layout.tsx`, ele é aplicado só a `/products` e suas subrotas.

3. **Carregamento e erros são isolados.**

   * Se você definir `loading.tsx` em `/products`, só essa rota mostra o loading.
   * O mesmo vale para `error.tsx`.

### 🧩 Exemplo prático

Estrutura:

```
src/app/
 ├─ layout.tsx        // Layout global (header/footer do site inteiro)
 ├─ page.tsx          // Página inicial "/"
 ├─ products/
 │   ├─ page.tsx      // Página "/products"
 │   ├─ layout.tsx    // Layout só para a seção de produtos
 │   ├─ loading.tsx   // Loader exclusivo de /products
 │   ├─ error.tsx     // Tratamento de erro em /products
 │   └─ [id]/
 │       └─ page.tsx  // Página dinâmica "/products/:id"
```

👉 Quando o usuário acessa `/products/123`, o Next vai:

1. Renderizar `src/app/layout.tsx` (layout global).
2. Renderizar `src/app/products/layout.tsx` (layout da seção de produtos).
3. Renderizar `src/app/products/[id]/page.tsx` (página específica do produto).

✅ **Resumindo**:

* `page.tsx` = página principal da rota.
* Cada pasta em `app/` representa uma rota.
* Você pode ter `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` etc. para controlar o comportamento da rota.
* O roteamento é **file-based** (baseado na estrutura de pastas).

---

## Arquivos `.ts` e `.tsx`

No **Next.js** (ou qualquer projeto React/TypeScript), a diferença entre **`.ts`** e **`.tsx`** é a seguinte:

### 📌 Arquivos `.ts`

* São arquivos **TypeScript puro** (sem JSX).
* Usados para **lógica, utilitários, configs, tipos, hooks sem JSX**.
* Exemplos típicos:

  * `src/lib/db.ts` → conexão com banco
  * `src/utils/formatPrice.ts` → funções helpers
  * `src/types/Product.ts` → definição de tipos/interfaces
  * `src/services/api.ts` → chamadas a API

```ts
// src/utils/formatPrice.ts
export function formatPrice(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value / 100);
}
```

### 📌 Arquivos `.tsx`

* São arquivos **TypeScript + JSX (TSX)**.
* Usados para **componentes React**, **layouts** e **páginas** do Next.js.
* Qualquer arquivo que renderize elementos JSX (`<div>`, `<button>`, etc.) precisa ser `.tsx`.
* Exemplos típicos:

  * `src/app/page.tsx` → página principal `/`
  * `src/app/products/page.tsx` → rota `/products`
  * `src/components/Navbar.tsx` → componente de navegação
  * `src/app/layout.tsx` → layout de página

```tsx
// src/components/Button.tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-500 px-4 py-2 text-white"
    >
      {children}
    </button>
  );
}
```

### 🚀 Regrinha prática no Next.js

* **Se o arquivo tiver JSX → `.tsx`**
  (componentes, páginas, layouts, providers, etc.)

* **Se o arquivo não tiver JSX → `.ts`**
  (funções helpers, serviços, hooks sem renderização, schemas, tipos, configs, etc.)

👉 Exemplo na prática do Next.js:

```
src/
 ├─ app/
 │   ├─ layout.tsx      ✅ tem JSX → TSX
 │   ├─ page.tsx        ✅ tem JSX → TSX
 │   └─ products/
 │       └─ page.tsx    ✅ tem JSX → TSX
 │
 ├─ components/
 │   └─ Navbar.tsx      ✅ componente React → TSX
 │
 ├─ lib/
 │   └─ stripe.ts       ✅ lógica do Stripe (sem JSX) → TS
 │
 ├─ types/
 │   └─ product.ts      ✅ apenas tipos/interfaces → TS
 │
 └─ utils/
     └─ formatPrice.ts  ✅ helper (sem JSX) → TS
```

⚡ **Resumindo**:

* Use `.tsx` **sempre que for escrever um componente React ou página/layout no Next.js**.
* Use `.ts` **para tudo que não renderiza JSX** (tipos, utilitários, lógica de backend, configs).

---

## Hydration (hidratação)

### 🌱 O que é “hidratação” no React (e Next.js)

* No **SSR (Server-Side Rendering)**, o React gera o **HTML pronto no servidor** e envia pro navegador.
* Quando esse HTML chega no cliente, o React precisa “ligar” os eventos, estados e hooks para esse HTML ficar interativo.
* Esse processo de “ligar” o HTML estático ao React do cliente se chama **hidratação (hydration)**.

👉 Pensa assim: o servidor manda uma estátua de gesso (HTML). O React do cliente pinta, dá movimento e ativa os botões (hidratação).

### ⚡ O problema que seu componente resolve

Às vezes, o React/Next renderiza uma coisa no **servidor** e outra no **cliente** → isso gera **hydration mismatch** (erro de inconsistência).
Exemplo:

* No servidor, `window` não existe.
* No cliente, `window.innerWidth` retorna um número.
  Se você renderiza isso direto, pode dar diferença entre o HTML do servidor e o render do cliente.

### 🔹 O que esse componente faz

O seu `Hydrate` basicamente **espera o componente montar no cliente** antes de renderizar os filhos (`children`):

```tsx
'use client';

import { ReactNode, useState, useEffect } from 'react';

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? <>{children}</> : <span>carregando...</span>;
}
```

* Antes de montar → mostra só `"carregando..."`.
* Depois que o React “hidrata” no cliente → libera o `children` normalmente.

Isso garante que o que for renderizado dentro do `Hydrate` **só apareça no cliente**, nunca no servidor → evitando erros de hidratação.

### ✅ Quando usar `Hydrate`

* Quando você depende de APIs do **navegador** (`window`, `localStorage`, `matchMedia` etc).
* Quando quer evitar **mismatch entre SSR e Client**.
* Exemplo: carrinho de compras salvo no `localStorage` → você só consegue ler isso no cliente.

👉 Resumindo:
O seu componente `Hydrate` serve para **proteger contra erros de hidratação**, renderizando o conteúdo só depois que o React garante que está rodando no cliente.

### Exemplo prático

Vamos ver um exemplo prático com **tema claro/escuro** (dark mode) usando `localStorage`.

#### 🚨 O problema sem `Hydrate`

Imagine esse componente que lê o tema do `localStorage`:

```tsx
"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  return (
    <button onClick={() => {
      const newTheme = theme === "light" ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    }}>
      {theme === "light" ? "🌞 Claro" : "🌙 Escuro"}
    </button>
  );
}
```

👉 Isso vai **quebrar no SSR**, porque no servidor não existe `localStorage`.
O Next.js tenta renderizar, mas dá erro.

#### ✅ Solução com `Hydrate`

Você envolve o componente no `Hydrate`. Assim, ele só renderiza **no cliente**, quando `localStorage` já existe.

```tsx
"use client";
import { useState, useEffect } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) setTheme(saved);
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? "🌞 Claro" : "🌙 Escuro"}
    </button>
  );
}

export default ThemeToggle;
```

E no seu app, você usa assim:

```tsx
import Hydrate from "./Hydrate";
import ThemeToggle from "./ThemeToggle";

export default function Page() {
  return (
    <Hydrate>
      <ThemeToggle />
    </Hydrate>
  );
}
```

#### 🔎 O que aconteceu aqui

* No SSR → o `Hydrate` mostra só `"carregando..."`.
* No cliente → o `Hydrate` troca para `<ThemeToggle />`.
* O `ThemeToggle` consegue ler/escrever no `localStorage` sem quebrar a hidratação.

---

👉 Esse mesmo padrão serve para **carrinho de compras**, **dados do usuário logado**, ou qualquer coisa que dependa de `localStorage`/`sessionStorage`/`window`.

---

## Server Action

### 1️⃣ Contexto

No **Next.js 13+** (com App Router e React Server Components), você tem duas formas de executar código:

* **Client Components** → rodando no navegador. Pode usar hooks, eventos, etc.
* **Server Components** → rodando no servidor. Pode acessar banco de dados, arquivos do servidor, APIs privadas etc. sem expor segredos ao cliente.

Antes, se você quisesse que o usuário clicasse em um botão e salvasse algo no banco, precisava:

1. Criar uma **API Route** (`/api/...`) → backend.
2. Fazer um **fetch** do Client Component → API → servidor → banco.

Ou seja, **uma ida e volta extra**.

### 2️⃣ O que são **Server Actions**

**Server Actions** permitem que você:

* Escreva funções que **rodam direto no servidor**.
* Chame essas funções **direto do Client Component**, sem criar endpoints API separados.
* O Next.js cuida de serializar os argumentos, enviar pro servidor e atualizar o componente quando necessário.

💡 Basicamente: é **função do servidor acionada pelo cliente**, mas sem precisar de fetch manual ou API route.

### 3️⃣ Exemplo simples

```tsx
"use server"; // indica que essa função é uma Server Action

import { db } from "@/lib/db";

export async function addProduct(name: string) {
  await db.product.create({ data: { name } });
}
```

No seu Client Component:

```tsx
"use client";
import { addProduct } from "./actions";

export default function AddProductButton() {
  return (
    <button onClick={() => addProduct("Camisa Teste")}>
      Adicionar Produto
    </button>
  );
}
```

✅ Sem criar `/api/add-product`.
✅ A função `addProduct` roda **no servidor**.
✅ O Next cuida de passar os dados e retornar erros, se houver.

### 4️⃣ Benefícios

* Menos boilerplate: não precisa de API routes só pra cada ação.
* Mais seguro: acesso a segredos (`db`, `env`) sem expor no cliente.
* Melhor integração com React Server Components: atualizações automáticas de UI.

### 5️⃣ Observações

* Server Actions **não podem ser chamadas diretamente no navegador**, só via evento React (`onClick`, `onSubmit`).
* Só funcionam com **App Router** (Next.js 13+).
* É uma forma de **unir o melhor do SSR, RSC e Client Components**.

---

