using CadastroProduto.Models;
using CadastroProduto.Models.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroProduto.Controllers
{
    public class ProdutoController : Controller
    {
        private readonly ProdutoDbContext _dbContext;

        public ProdutoController(ProdutoDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Método para inserir produto
        /// </summary>
        /// <param name="descricao">descrição do produto</param>
        /// <param name="valor">valor do produto</param>
        public void InserirProduto(string descricao, float valor)
        {
            var produto = new Produto() { Descricao = descricao, Valor = valor };
            _dbContext.Produtos.Add(produto);
            _dbContext.SaveChanges();
        }
        /// <summary>
        /// Método para listar os produtos
        /// </summary>
        /// <returns>Lista de produtos</returns>
        public IEnumerable<Produto> RetornaProduto()
        {
            return _dbContext.Produtos;
        }
        /// <summary>
        /// Deletar produto fisicamente do Bd
        /// </summary>
        /// <param name="id"></param>
        public void DeletaProduto(int id)
        {
            var produto = _dbContext.Produtos.Find(id);
            _dbContext.Produtos.Remove(produto);
            _dbContext.SaveChanges();
        }
        /// <summary>
        /// Editar/alterar um registro de Produto no Bd
        /// </summary>
        /// <param name="id"></param>
        /// <param name="descricao"></param>
        /// <param name="valor"></param>
        public void AlterarRegistro(int id, string descricao, float valor)
        {
            var produto = _dbContext.Produtos.Find(id);
            produto.Descricao = descricao;
            produto.Valor = valor;
            _dbContext.SaveChanges();
        }

    }
}
