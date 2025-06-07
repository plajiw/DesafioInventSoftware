# Desafio Invent Software

## Objetivo

Criar o processo de CRUD (Create, Read, Update, Delete) em uma API em C#. Sem conexão com banco de dados, as infomações serão mantidas em memória. Utilizando padrões de projeto para organizar e manter o código escalável e fácil de manter.

---

## Processo

Inicializado com o template `dotnet new webapi`, que fornece a estrutura básica da aplicação. Depois, criamos a pasta **Models**, onde mora a principal classe de domínio, `EquipamentoEletronico` e definimos suas propriedades.

Após, realizada a criada do diretório `Data` e arquivo de Interface `IEquipamentoRepository`, onde vamos definir os "contratos" que nosso repositório deve seguir através da criação de operações assíncronas de criação, leitura, atualização e remoção.

A partir disso, vamos implementar os "contratos" criados em `InMemoryEquipamentoRepository` a partir do processo de herança e garantir que essa classe se comprometa com os contratos estabelecidos.

---

### 1 Models - EquipamentoEletronico

* **Id (Guid)**: ao instanciar um novo equipamento, o `Guid.NewGuid()` gera automaticamente um identificador global único.

* **Nome e Tipo**: marcados com `[Required]`, esses campos definem que o equipamento é e para que serve.

* **QuantidadeEmEstoque (int)**: usamos `[Range(0, int.MaxValue)]` para garantir que nunca armazenemos valores negativos.

* **DataDeInclusao (DateTime)**: registramos o momento exato em UTC da criação do registro.

* **TemEstoque (bool)**: uma propriedade de leitura que devolve `true` se `QuantidadeEmEstoque > 0`. Dessa forma, optamos por uma prática de encapsulamento e centralização da lógica.

---

### 2.1 Data - IProductRepository

* **CreateAsync**: Operação assíncrona que adiciona um novo `EquipamentoEletronico` ao repositório e devolve a instância criada.

* **GetByIdAsync**: Busca um equipamento pelo seu Guid id. Retorna o objeto correspondente ou null se não existir

* **GetAllAsync**: Retorna todos os equipamentos cadastrados num único lote. Se não houver nenhum, devolve uma coleção vazia.

* **UpdateAsync**: Atualiza um equipamento existente com base no Id presente no objeto passado; devolve o objeto atualizado ou null se o Id não for encontrado.

* **DeleteAsync**: Remove de forma assíncrona o equipamento identificado pelo Guid id. Retorna true se a remoção for concluída ou false caso não exista esse Id.


### 2.2 Data - InMemoryEquipamentoRepository

Determinação do "banco de dados" memória. Usando um Dictionary "_equipamentos" com acesso privado, estático para ser manter único em toda aplicação e inicializado somente uma vez com o `readonly`. Assim temos segunraça e uma coleção de pares associados, chave é o Guid (o ID do equipamento) e o valor é o objeto EquipamentoEletronico
`private static readonly Dictionary<Guid, EquipamentoEletronico> _equipamentos = new();`.

Métodos para implementação do "contrato"
E depois fazemos a injeção dessa dependência para os controllers



