using FluentValidation;
using Invent.Api.Models;
using Invent.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Raven.Client.Documents;

namespace Invent.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipamentosController : ControllerBase
    {
        private readonly ServicoEquipamentoEletronico _servicoEquipamento;
        private readonly IDocumentStore _store;

        public EquipamentosController(ServicoEquipamentoEletronico servicoEquipamento, IDocumentStore store)
        {
            _servicoEquipamento = servicoEquipamento;
            _store = store;
        }

        [HttpGet]
        public async Task<IActionResult> ObterTodos([FromQuery] string? filtro = null)
        {
            var todosOsEquipamentos = await _servicoEquipamento.ObterTodos(filtro);
            return Ok(todosOsEquipamentos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(string id)
        {
            var equipamentoEncontrado = await _servicoEquipamento.ObterPorId(id);
            return Ok(equipamentoEncontrado);

        }

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

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar([FromRoute] string id, [FromBody] EquipamentoEletronico equipamentoParaAtualizar)
        {
            if (id != equipamentoParaAtualizar.Id)
            {
                return BadRequest(new { Mensagem = "O Id da rota não corresponde ao ID no corpo da requisição." });
            }

            try
            {
                await _servicoEquipamento.Atualizar(id, equipamentoParaAtualizar);
                return NoContent();
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remover(string id)
        {
            try
            {
                await _servicoEquipamento.RemoverPorId(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { Mensagem = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Um erro interno ocorreu: {ex.Message}");
            }
        }
    }
}