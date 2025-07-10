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
        private readonly ServicoEquipamentoEletronico _servicoEquipamento;
        public EquipamentosController(ServicoEquipamentoEletronico servicoEquipamento)
        {
            _servicoEquipamento = servicoEquipamento;
        }

        [HttpGet]
        public async Task<IActionResult> ObterTodos()
        {
            var todosOsEquipamentos = await _servicoEquipamento.ObterTodos();
            return Ok(todosOsEquipamentos);
        }

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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remover(string id)
        {
            var removidoComSucesso = await _servicoEquipamento.RemoverPorId(id);

            if (removidoComSucesso)
            {
                return NoContent();
            }

            return NotFound();
        }
    }
}