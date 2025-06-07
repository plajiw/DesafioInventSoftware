# Desafio Invent Software

## Objetivo

Criar o processo de CRUD (Create, Read, Update, Delete) em uma API em C#. Sem conexão com banco de dados, as infomações serão mantidas em memória. Utilizando padrões de projeto para organizar e manter o código escalável e fácil de manter.

## Processo

Inicializado com o template `dotnet new webapi`, que fornece a estrutura básica da aplicação. Depois, criamos a pasta **Models**, onde mora a principal classe de domínio, `EquipamentoEletronico` e definimos suas propriedades.

Após, realizada a criada do diretório `Data` e arquivo de Interface `IEquipamentoRepository`, onde vamos definir os "contratos" que nosso repositório deve seguir através da criação de operações assíncronas de criação, leitura, atualização e remoção.

### 1. Models - EquipamentoEletronico

* **Id (Guid)**: ao instanciar um novo equipamento, o `Guid.NewGuid()` gera automaticamente um identificador global único.

* **Nome e Tipo**: marcados com `[Required]`, esses campos definem que o equipamento é e para que serve.

* **QuantidadeEmEstoque (int)**: usamos `[Range(0, int.MaxValue)]` para garantir que nunca armazenemos valores negativos.

* **DataDeInclusao (DateTime)**: registramos o momento exato em UTC da criação do registro.

* **TemEstoque (bool)**: uma propriedade de leitura que devolve `true` se `QuantidadeEmEstoque > 0`. Dessa forma, optamos por uma prática de encapsulamento e centralização da lógica.

### 2. Data - IProductRepository

* **a**
