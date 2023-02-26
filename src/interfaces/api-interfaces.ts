export interface Boleto {
  id: number
  codigo: string
  cliente_id: number
  vencimento: string
  nosso_numero: string
  valor: string
  status: string
  url_pix: string
  created_at: string
  updated_at: string
  cliente: Cliente
}

export interface Cliente {
  id: number
  nome: string
  documento: string
  endereco: string
  bairro: string
  cep: string
  cidade: string
  uf: string
  created_at: string
  updated_at: string
}


export interface Remessa {
  id: number
  sequencial: number
  data_criacao: string
  data_envio: any
  data_validacao: any
  status: string
  created_at: string
  updated_at: string
}

export interface Retorno {
  id: number
  sequencial: number
  nome: string
  status: string
  data_envio: any
  progress: number
  created_at: string
  updated_at: string
}

export interface RetornoX {
  T: T[]
  U: U[]
  Y: Y[]
}

export interface T {
  codigoDoBancoNaCompensacao: string
  numeroDoLoteRetorno: string
  tipoDeRegistro: string
  numeroSequencialDoRegistroNoLote: string
  codSegmentoDoRegistroDetalhe: string
  codigoDeMovimento: string
  agenciaDoBeneficiario: string
  digitoDaAgenciaDoBeneficiario: string
  numeroDaContaCorrente: string
  digitoVerificadorDaConta: string
  identificacaoDoBoletoNoBanco: string
  codigoDaCarteira: string
  numeroDoDocumentoDeCobranca: string
  dataDoVencimentoDoBoleto: string
  valorNominalDoBoleto: string
  numeroDoBancoCobradorRecebedor: string
  agenciaCobradoraRecebedora: string
  identifDoBoletoNaEmpresa: string
  codigoDaMoeda: string
  tipoDeInscricaoPagador: string
  numeroDeInscricaoPagador: string
  nomeDoPagador: string
  contaCobranca: string
  valorDaTarifaCustas: string
  identificacao: string
}

export interface U {
  codigoDoBancoNaCompensacao: string
  loteDeServico: string
  tipoDeRegistro: string
  numeroSequencialDoRegistroNoLote: string
  codidgoSegmentoDoRegistroDetalhe: string
  codigoDeMovimento: string
  jurosMultaEncargos: string
  valorDoDescontoConcedido: string
  valorDoAbatimentoConcedidoCancelado: string
  valorDoIofRecolhido: string
  valorPagoPeloPagador: string
  valorLiquidoASerCreditado: string
  valorDeOutrasDespesas: string
  valorDeOutrosCreditos: string
  dataDaOcorrencia: string
  dataDaEfetivacaoDoCredito: string
  codigoDaOcorrenciaDoPagador: string
  dataDaOcorrenciaDoPagador: string
  valorDaOcorrenciaDoPagador: string
  complementoDaOcorrenciaDoPagador: string
  codigoDoBancoCorrespondenteCompensacao: string
}

export interface Y {
  codigoDoBancoNaCompensacao: string
  loteDeServico: string
  tipoDeRegistro: string
  numeroSequencialDoRegistroNoLote: string
  codidgoSegmentoDoRegistroDetalhe: string
  codigoDeMovimento: string
  tipoChavePix: string
  chavePixUrlQrCode: string
  txId: string
}

