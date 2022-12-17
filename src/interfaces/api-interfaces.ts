export interface Boleto {
  id: number
  codigo: string
  cliente_id: number
  vencimento: string
  nosso_numero: string
  valor: string
  status: string
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
