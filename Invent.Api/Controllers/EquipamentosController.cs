using FluentValidation;
using Invent.Api.Models;
using Invent.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Invent.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipamentosController : ControllerBase
    {
        // referência para o serviço, responsável pelas regras de negócio, validação e banco de dados
        private readonly ServicoEquipamentoEletronico _servicoEquipamento;

        // Construtor com a injeção de dependência do serviço
        public EquipamentosController(ServicoEquipamentoEletronico servicoEquipamento)
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
            try
            {
                var equipamentoEncontrado = await _servicoEquipamento.ObterPorId(id);
                return Ok(equipamentoEncontrado);
            }

            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Mensagem = ex.Message });
            }
        }

        // Rota para criar um novo equipamento
        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] EquipamentoEletronico dadosDoNovoEquipamento)
        {
            try
            {
                var equipamentoCriado = await _servicoEquipamento.Criar(dadosDoNovoEquipamento);
                return CreatedAtAction(nameof(ObterPorId), new { id = equipamentoCriado.Id }, equipamentoCriado);
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

        // Rota para atualizar um equipamento existente
        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(string id, [FromBody] EquipamentoEletronico equipamentoParaAtualizar)
        {
            if (id != equipamentoParaAtualizar.Id)
            {
                return BadRequest(new { Mensagem = "O Id da rota não corresponde ao ID no corpo da requisição." });
            }

            try
            {
                var equipamentoAtualizado = await _servicoEquipamento.Atualizar(id, equipamentoParaAtualizar);
                return Ok(equipamentoAtualizado);
            }

            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Mensagem = ex.Message });
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
                return NoContent(); // 204 No Content
            }

            return NotFound();
        }
    }
}