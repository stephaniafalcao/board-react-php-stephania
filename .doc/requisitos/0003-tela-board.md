### 📋 Requisitos: Tela de Kanban (Gerenciamento de Tarefas)

Esta visualização deve ser carregada ao selecionar um board específico no Dashboard. Ela foca na gestão do ciclo de vida das tarefas.

#### **1. Estrutura de Colunas (Layout)**
* **Colunas de Status:** O sistema deve renderizar obrigatoriamente as três colunas: `To Do`, `In Progress` e `Done`.
* **Contadores Dinâmicos:** Ao lado do título de cada coluna, deve aparecer o número total de tarefas contidas nela (ex: `To Do 3`).
* **Ações de Coluna:** Cada coluna deve ter um botão de menu (três pontos) no topo e um botão "+ Add Task" na base.

#### **2. Componente de Task Card**
Cada tarefa deve ser representada por um card contendo:
* **Indicador de Prioridade:** Uma barra lateral colorida à esquerda (ex: Azul para tarefas normais, Verde para concluídas).
* **Conteúdo:** Título da tarefa e descrição curta.
* **Estado "Done":** Tarefas na coluna "Done" devem apresentar um estilo visual diferente, como o título riscado (*strikethrough*) e opacidade reduzida, conforme a imagem.

#### **3. Reatividade e Lógica de Estado (Frontend)**
* **Movimentação de Tarefas:** O candidato deve implementar a lógica para mover uma tarefa entre colunas. 
    * *Diferencial Sênior:* Implementar via **Drag and Drop** (usando bibliotecas como `dnd-kit` ou `react-beautiful-dnd`) ou através de um menu de contexto rápido.
* **Atualização Otimista (Optimistic UI):** Ao mover uma tarefa ou adicionar uma nova, a interface deve atualizar instantaneamente enquanto a requisição é processada no background.
* **Custom Hook (`useKanban`):** Toda a lógica de filtragem de tarefas por status e chamadas de API de atualização deve estar isolada em um hook.

#### **4. Persistência e Arquitetura (Backend)**
* **Repository Pattern:** O `TaskRepository` deve possuir um método como `updateStatus(taskId, newStatus)`.
* **Relacionamento:** As tarefas devem estar vinculadas ao `board_id` selecionado.
* **Integridade:** Garantir que o status enviado pelo frontend seja validado contra um `Enum` ou lista permitida no PHP antes de persistir no **PostgreSQL** ou **MongoDB**.

---

<img width="2664" height="2048" alt="image" src="https://github.com/user-attachments/assets/739c4d07-2032-4b71-b7ce-2c1c10c2fb9a" />
