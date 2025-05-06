import axios from 'axios';

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export async function searchByCep(cep: string): Promise<{
  street: string;
  neighborhood: string;
  city: string;
  state: string;
} | null> {
  try {
    // Remove todos os caracteres não numéricos
    const formattedCep = cep.replace(/\D/g, '');
    
    // Verifica se o CEP tem 8 dígitos
    if (formattedCep.length !== 8) {
      throw new Error('CEP inválido');
    }

    const response = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${formattedCep}/json/`);
    
    if (response.data.erro) {
      return null;
    }

    return {
      street: response.data.logradouro || '',
      neighborhood: response.data.bairro || '',
      city: response.data.localidade || '',
      state: response.data.uf || '',
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
} 