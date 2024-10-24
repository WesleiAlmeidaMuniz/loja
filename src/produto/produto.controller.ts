import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutosRepository } from './produto.repository';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { v4 as uuid } from 'uuid';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';

@Controller('/produtos')
export class ProdutosController {
  constructor(private produtosRepository: ProdutosRepository) {}

  @Post()
  async cadastrarProduto(@Body() dadosProdutos: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();
    produtoEntity.usuarioId = dadosProdutos.usuarioId;
    produtoEntity.caracteristicas = dadosProdutos.caracteristicas;
    produtoEntity.categoria = dadosProdutos.categoria;
    produtoEntity.nome = dadosProdutos.nome;
    produtoEntity.dataAtualizacao = dadosProdutos.dataAtualizacao;
    produtoEntity.dataCriacao = dadosProdutos.dataCriacao;
    produtoEntity.descricao = dadosProdutos.descricao;
    produtoEntity.imagens = dadosProdutos.imagens;
    produtoEntity.quantidadeDisponivel = dadosProdutos.quantidadeDisponivel;
    produtoEntity.valor = dadosProdutos.valor;
    produtoEntity.id = uuid();
    const produtoCadastrado = this.produtosRepository.salvar(produtoEntity);
    return produtoCadastrado;
  }

  @Get()
  async listarProdutos() {
    return this.produtosRepository.listar();
  }

  @Put('/:id')
  async atualizaProduto(
    @Param('id') id: string,
    @Body() novosDados: AtualizaProdutoDTO,
  ) {
    const produtoAtualizado = await this.produtosRepository.atualiza(
      id,
      novosDados,
    );
    return {
      produto: produtoAtualizado,
      messagem: 'produto atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async deletaProduto(@Param('id') id: string) {
    const produtoRemovido = await this.produtosRepository.remove(id);

    return {
      produto: produtoRemovido,
      messagem: 'Produto removido com sucesso',
    };
  }
}
