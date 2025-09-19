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

A diferença entre os componentes é **muito sutil** e está **apenas na sintaxe de declaração do componente**. Vamos detalhar:

### 1️⃣ Função tradicional

```javascript
import Link from "next/link";

function Navbar() {
  return (
    <nav> ... </nav>
  );
}

export default Navbar;
```

* Usa a **declaração clássica de função**: `function Navbar() { ... }`.
* Funciona exatamente igual que uma arrow function no contexto de um componente React.
* Pode ser **hoisted**, ou seja, você pode usar a função antes de declará-la no código.
* Sintaxe mais “tradicional” do JavaScript.

### 2️⃣ Arrow function

```javascript
import Link from "next/link";

const Navbar = () => {
  return (
    <nav> ... </nav>
  )
}

export default Navbar;
```

* Usa **arrow function** atribuída a uma constante: `const Navbar = () => { ... }`.
* Não é hoisted: precisa ser declarada antes de ser usada.
* É a sintaxe moderna mais comum para componentes funcionais hoje em dia.
* Permite usar recursos de ES6, como funções inline menores, callbacks, etc.

### ⚡ Resumo das diferenças

| Característica    | `function Navbar()`  | `const Navbar = () => {}` |
| ----------------- | -------------------- | ------------------------- |
| Sintaxe           | Tradicional          | Arrow function (moderna)  |
| Hoisting          | Sim                  | Não                       |
| Uso em React      | Igual funcionalmente | Igual funcionalmente      |
| Estilo de escrita | Mais “clássico”      | Mais moderno e conciso    |

✅ **Importante:** Para React/Next.js moderno, **não há diferença prática** entre esses dois componentes. A escolha depende do estilo de código que você quer seguir.

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