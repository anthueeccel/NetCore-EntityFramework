using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroProduto.Models.Data
{
    public class ProdutoDbContext : DbContext
    {
        public virtual DbSet<Produto> Produtos { get; set; }

        public ProdutoDbContext(DbContextOptions<ProdutoDbContext> options)
            : base(options)
        { }

    }
}
