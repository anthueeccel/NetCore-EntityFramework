using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroProduto.Models
{
    /// <summary>
        /// Usuário
        /// Esta classe serã utilizada para realizar o code first com o entidy core
        /// </summary>
    public class Produto
    {
        [Key] //Primary Key na tabela
        public int Id { get; set; }
        public string Descricao { get; set; }
        public float Valor { get; set; }
           
    }
}
