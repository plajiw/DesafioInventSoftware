# Desafio Técnico Invent Software

API RESTful desenvolvida em C# e .NET 8 para o processo seletivo da Invent Software. O projeto consiste na implementação de um CRUD (Create, Read, Update, Delete) para o gerenciamento de equipamentos eletrônicos, com persistência de dados em memória.

## Tecnologias e Ferramentas
- .NET 9
- ASP.NET Core Web API
- C# 12
- Swagger (OpenAPI) para documentação e teste de endpoints.
- Git para controle de versão.

## Estrutura e Implementação

A aplicação foi estruturada em camadas para garantir a separação de responsabilidades, manutenibilidade e escalabilidade, aplicando os seguintes padrões e conceitos:

### 1. Camada de Modelo (Model)

- EquipamentoEletronico.cs: Classe de domínio principal que representa a entidade do sistema.

- Propriedades: Id (Guid), Nome (string), Tipo (string), QuantidadeEmEstoque (int), DataDeInclusao (DateTime).

- Validações: Atributos de Data Annotations ([Required], [Range]) foram utilizados para garantir a integridade dos dados na entrada da API.

- Lógica Encapsulada: A propriedade TemEstoque (bool) é computada (=> QuantidadeEmEstoque > 0), garantindo que a lógica de negócio para a disponibilidade de estoque seja centralizada e consistente.


### 2. Camada de Dados (Data)

- IEquipamentoRepository.cs: Interface que define o "contrato" para as operações de persistência de dados. Estabelece os métodos CRUD de forma assíncrona (Task), desacoplando a implementação do resto da aplicação.

- Métodos Definidos: CreateAsync, GetAllAsync, GetByIdAsync, UpdateAsync, DeleteAsync.

- InMemoryEquipamentoRepository.cs: Implementação concreta da interface IEquipamentoRepository.

- Armazenamento: Foi utilizado um Dictionary<Guid, EquipamentoEletronico> para manter os equipamentos em memória, em vez de uma List. Isso permite buscar, atualizar e remover registros pelo ID em tempo constante (O(1)), sem a necessidade de percorrer toda a coleção

- Gerenciamento de Instância: O dicionário foi declarado como private static readonly para garantir uma única instância de armazenamento que persiste durante todo o ciclo de vida da aplicação, simulando uma base de dados.

- Responsabilidades: É responsável por gerar o Id e a DataDeInclusao no momento da criação de um novo registro, garantindo a consistência dos dados.

## Processo

Inicializado com o template `dotnet new webapi`, que fornece a estrutura básica da aplicação. Depois, criamos a pasta **Models**, onde mora a principal classe de domínio, `EquipamentoEletronico` e definimos suas propriedades.

Após, realizada a criada do diretório `Data` e arquivo de Interface `IEquipamentoRepository`, onde vamos definir os "contratos" que nosso repositório deve seguir através da criação de operações assíncronas de criação, leitura, atualização e remoção.

A partir disso, vamos implementar os "contratos" criados em `InMemoryEquipamentoRepository` a partir do processo de herança e garantir que essa classe se comprometa com os contratos estabelecidos.

No `EquipamentosController` fazemos a herança ao `ControllerBase` e declaramos uma dependência da interface `IEquipamentoRepository`.


No program.cs usamos dotnet add package Swashbuckle.AspNetCore
para uso do swagger e testar os endpoints

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


### launchSettings

{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "httpss": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7178;http://localhost:5124",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "launchUrl": "swagger"
    }
  },
  "httpss": {
    "commandName": "Project",
    "dotnetRunMessages": true,
    "launchBrowser": true,
    "applicationUrl": "https://localhost:7178;http://localhost:5124",
    "environmentVariables": {
      "ASPNETCORE_ENVIRONMENT": "Development"
    },
    "launchUrl": "swagger"
  }
}

