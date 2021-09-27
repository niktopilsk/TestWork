using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Test.Models;
using Test.Repositories;

namespace Test.Controllers
{
    [Route("api/[controller]/[action]")]
    public class IvoicesController : Controller
    {
        private readonly IRepository _repository;

        public IvoicesController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetAll()
        {
            try
            {
                var invoinces = _repository.GetAll();

                return Json(invoinces);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Get([FromQuery] string id)
        {
            try
            {
                var invoince = _repository.GetById(id);

                return Json(invoince);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Add([FromBody] Invoice invoice)
        {
            if (invoice == null)
            {
                return BadRequest("Не удалось добавить пустой счет");
            }

            try
            {
                _repository.Add(invoice);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [AllowAnonymous]
        public IActionResult Delete([FromQuery] string id)
        {
            try
            {
                _repository.Remove(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch]
        [AllowAnonymous]
        public IActionResult Update([FromBody] Invoice newInvoice)
        {
            if (newInvoice == null)
            {
                return BadRequest("Счет не найден");
            }

            try
            {
                _repository.Update(newInvoice);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}