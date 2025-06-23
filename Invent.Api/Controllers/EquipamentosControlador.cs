using Invent.Api.Data;
using Invent.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Invent.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquipamentosControlador : ControllerBase
    {
        private readonly IEquipamentoRepositorio _repository;

        public EquipamentosControlador(IEquipamentoRepositorio repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var equipamentos = await _repository.GetAllAsync();
            return Ok(equipamentos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var equipamento = await _repository.GetByIdAsync(id);
            return equipamento is not null ? Ok(equipamento) : NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EquipamentoEletronico equipamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdEquipamento = await _repository.CreateAsync(equipamento);
            return CreatedAtAction(nameof(GetById), new { id = createdEquipamento.Id }, createdEquipamento);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] EquipamentoEletronico equipamento)
        {
            if (id != equipamento.Id)
            {
                return BadRequest("O ID da rota não corresponde ao ID do corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedEquipamento = await _repository.UpdateAsync(equipamento);
            return updatedEquipamento is not null ? Ok(updatedEquipamento) : NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var success = await _repository.DeleteAsync(id);
            return success ? NoContent() : NotFound();
        }
    }
}
