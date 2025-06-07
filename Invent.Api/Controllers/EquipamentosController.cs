using Invent.Api.Data;
using Invent.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Invent.Api.Controllers
{
    [ApiController]

    [Route("api/[controller]")]
    public class EquipamentosController : ControllerBase
    {
        private readonly IEquipamentoRepository _repository;

        public EquipamentosController(IEquipamentoRepository repository)
        {
            _repository = repository;
        }

        // GET: /api/equipamentos
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var equipamentos = await _repository.GetAllAsync();
            
            // Retorna um status 200 OK com a listagem de equipamentos
            return Ok(equipamentos);
        }

        // GET: /api/equipamentos/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var equipamento = await _repository.GetByIdAsync(id);

            return equipamento is not null ? Ok(equipamento) : NotFound();
        }

        // POST: /api/equipamentos
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EquipamentoEletronico equipamento)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Retorna 400 Bad Request
            }

            var createdEquipamento = await _repository.CreateAsync(equipamento);

            // Retorna um status 201 Created
            return CreatedAtAction(nameof(GetById), new { id = createdEquipamento.Id }, createdEquipamento);
        }

        // PUT: /api/equipamentos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] EquipamentoEletronico equipamento)
        {
            // Verificação para garantir consistência
            if (id != equipamento.Id)
            {
                return BadRequest("O ID da rota não corresponde ao ID do corpo da requisição.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedEquipamento = await _repository.UpdateAsync(equipamento);

            // Se o equipamento foi atualizado com sucesso, retorna 200 OK
            // Se o equipamento não foi encontrado para atualizar, retorna 404 Not Found

            return updatedEquipamento is not null ? Ok(updatedEquipamento) : NotFound();

        }

        // DELETE: /api/equipamentos/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _repository.DeleteAsync(id);

            // Se a deleção foi bem-sucedida, retorna 204 No Content (sem corpo de resposta).
            // Se o equipamento não foi encontrado para deletar, retorna 404 Not Found.
            return success ? NoContent() : NotFound();
        }
    }
}