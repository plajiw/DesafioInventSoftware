using FluentValidation;
using Invent.Api.Models;
using Invent.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Invent.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipamentosControlador : ControllerBase
    {
        // Instância de serviço
        private readonly ServicoEquipamentoEletronico _servicoEquipamento;

        // Injeção do serviço
        public EquipamentosControlador(ServicoEquipamentoEletronico servicoEquipamento)
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
            var equipamentoEncontrado = await _servicoEquipamento.ObterPorId(id);

            if (equipamentoEncontrado != null)
            {
                return Ok(equipamentoEncontrado);
            }

            else
            {
                return NotFound();
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
        public async Task<IActionResult> Atualizar(string idDaUrl, [FromBody] EquipamentoEletronico equipamentoParaAtualizar)
        {
            try
            {
                var equipamentoAtualizado = await _servicoEquipamento.Atualizar(idDaUrl, equipamentoParaAtualizar);

                if (equipamentoAtualizado != null)
                {
                    return Ok(equipamentoAtualizado);
                }

                else
                {
                    // Retorno se o Id não for encontrado
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remover(string idParaRemover)
        {
            var removidoComSucesso = await _servicoEquipamento.RemoverPorId(idParaRemover);

            if (removidoComSucesso)
            {
                return NoContent(); // Resposta 204
            }

            else
            {
                return NotFound(); // Resposta 404
            }
        }
    }
}
