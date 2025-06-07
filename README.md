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

### 3. Injeção de Dependência

A configuração da Injeção de Dependência foi realizada no Program.cs.

- builder.Services.AddSingleton<IEquipamentoRepository, InMemoryEquipamentoRepository>();: O repositório foi registrado como um serviço Singleton. Isso garante que a mesma instância do InMemoryEquipamentoRepository (e, consequentemente, do dicionário de dados estático) seja utilizada em toda a aplicação, mantendo a consistência dos dados em memória entre as requisições.

### 4. Camada de Controle (Controller)

- EquipamentosController.cs: Controller responsável por expor os endpoints da API.

- Configuração: Utiliza os atributos [ApiController] para habilitar comportamentos específicos de API e [Route("api/[controller]")] para definir o padrão de roteamento.

- Injeção de Dependência: Recebe uma instância de IEquipamentoRepository via construtor, sem conhecer a implementação concreta, em conformidade com o Princípio da Inversão de Dependência.

- Endpoints: Cada método público corresponde a uma operação CRUD e é mapeado a um verbo HTTP ([HttpGet], [HttpPost], [HttpPut], [HttpDelete]).

- Respostas HTTP: Utiliza IActionResult para retornar códigos de status HTTP apropriados e padronizados (200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found), comunicando o resultado da operação.

---

*Desenvolvido por Pablo Ribeiro.*




