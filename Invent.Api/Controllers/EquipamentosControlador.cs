using FluentValidation;
using Invent.Api.Models;
using Invent.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Invent.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipamentosControlador : ControllerBase
    {
        // referência para o serviço, responsável pelas regras de negócio, validação e banco de dados
        private readonly ServicoEquipamentoEletronico _servicoEquipamento;

        // Construtor com a injeção de dependência do serviço
        public EquipamentosControlador(ServicoEquipamentoEletronico servicoEquipamento)
        {
            _servicoEquipamento = servicoEquipamento;
        }

        // Rota para buscar todos os equipamentos.
        [HttpGet]
        public async Task<IActionResult> ObterTodos()
        {
            var todosOsEquipamentos = await _servicoEquipamento.ObterTodos();

            return Ok(todosOsEquipamentos);
        }

        // Rota para buscar um único equipamento pelo seu ID
        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(string id)
        {
            var equipamentoEncontrado = await _servicoEquipamento.ObterPorId(id);

            // Verificamos se não é nulo
            if (equipamentoEncontrado != null)
            {
                // Se encontrou, retornamos OK
                return Ok(equipamentoEncontrado);
            }
            else
            {
                // Se não encontrou, retornamos um erro 404
                return NotFound();
            }
        }

        // Rota para criar um novo equipamento
        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] EquipamentoEletronico dadosDoNovoEquipamento)
        {
            try
            {
                var equipamentoCriado = await _servicoEquipamento.Criar(dadosDoNovoEquipamento);

                // retornamos um status (201) com os dados do novo equipamento
                return CreatedAtAction(nameof(ObterPorId), new { id = equipamentoCriado.Id }, equipamentoCriado);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors);
            }

            catch (Exception ex)
            {
                // qualquer outro erro inesperado e retorna um erro de servidor 500
                return StatusCode(500, $"Um erro interno ocorreu: {ex.Message}");
            }
        }

        // Rota para atualizar um equipamento existente
        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(string id, [FromBody] EquipamentoEletronico equipamentoParaAtualizar)
        {
            try
            {
                var equipamentoAtualizado = await _servicoEquipamento.Atualizar(id, equipamentoParaAtualizar);

                if (equipamentoAtualizado != null)
                {
                    return Ok(equipamentoAtualizado);
                }
                else
                {
                    // NotFound acontece se não encontrar o ID para atualizar
                    return NotFound();
                }
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Um erro interno ocorreu: {ex.Message}");
            }
        }

        // Rota para remover um equipamento
        [HttpDelete("{id}")]
        public async Task<IActionResult> Remover(string id)
        {
            var removidoComSucesso = await _servicoEquipamento.RemoverPorId(id);

            if (removidoComSucesso)
            {
                // Se a remoção deu certo, retornamos (204).
                return NoContent();
            }
            else
            {
                // Se o serviço retornar 'false' o Id não foi encontrado
                return NotFound();
            }
        }
    }
}
