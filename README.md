# Projeto Next E-commerce

## Estrutura de pastas padrão

`src/` - pasta raiz do código-fonte do projeto
`src/app/` - contém rotas, layouts e páginas (mesma função da `app/`)
`public/` - arquivos estáticos

## Estrutura de pasta custom

`src/app/componentes` - arquivos de componentes

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
