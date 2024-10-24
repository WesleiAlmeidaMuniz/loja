import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CaracteristicaProdutoDTO } from './CaracteristicaProduto.dto';
import { ImagensDTO } from './Imagens.dto';
import { Type } from 'class-transformer';

export class CriaProdutoDTO {
  @IsUUID(undefined, { message: `ID de usuário inválido` })
  usuarioId: string;
  @IsString({ message: 'O nome precisa ser uma string' })
  @IsNotEmpty({ message: 'Nome não pode estar vázio' })
  nome: string;
  @IsNumber(undefined, { message: 'Valor precisa ser um numero!' })
  @IsNotEmpty({ message: 'Valor não pode estar vázio' })
  valor: number;
  @IsNumber(undefined, { message: 'Quantidade precisa ser um numero' })
  quantidadeDisponivel: number;
  @IsString({ message: 'Descrição precisa ser uma string' })
  descricao: string;
  @ValidateNested()
  @IsArray()
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];
  @ValidateNested()
  @IsArray()
  @Type(() => ImagensDTO)
  imagens: ImagensDTO[];
  @IsString({ message: 'A Categoria precisa ser uma string' })
  @IsNotEmpty({ message: 'Categoria não pode estar vázio' })
  categoria: string;
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'Data não pode estar vázio' })
  dataCriacao: Date;
  @IsDate()
  @Type(() => Date)
  dataAtualizacao: Date;
}
