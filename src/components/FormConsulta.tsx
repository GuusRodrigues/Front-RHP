import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface DadosPaciente {
  name: string;
  dob: string;
  sexo: string;
  // Adicione outros campos conforme o retorno da sua API
}

// Interface para a estrutura de erro que a API pode retornar
interface ErroResposta {
  message: string;
}

const FormConsulta: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente | null>(null);

  const handleConsultar = async () => {
    setMensagem(null); // Resetando mensagens de erro/sucesso
    setDadosPaciente(null); // Resetando os dados do paciente

    try {
      // Fazendo a requisição para a API com o CPF fornecido
      const response = await axios.get(`http://localhost:3000/patients/${cpf}`);

      // Verificando se a resposta foi bem-sucedida
      if (response.status === 200) {
        setDadosPaciente(response.data); // Armazenando os dados do paciente
        setMensagem('Consulta realizada com sucesso!');
      } else {
        setMensagem('Não foi possível realizar a consulta.');
      }
    } catch (error) {
      // Garantindo que o erro seja tratado como um AxiosError
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErroResposta>; // Tipando o erro com a interface 'ErroResposta'
        setMensagem(axiosError.response?.data?.message || 'Erro ao consultar o CPF. Verifique a conexão ou o CPF informado.');
      } else {
        setMensagem('Erro desconhecido. Tente novamente mais tarde.');
      }
      console.error('Erro ao consultar CPF:', error);
    }
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Consulta de Paciente</h3>
        
        {/* Campo de CPF */}
        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite o CPF aqui"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        
        {/* Botão para realizar a consulta */}
        <button onClick={handleConsultar}>Consultar</button>

        {/* Mensagem de erro ou sucesso */}
        {mensagem && <p className="mensagem">{mensagem}</p>}

        {/* Exibindo dados do paciente se encontrados */}
        {dadosPaciente && (
          <div className="dados-paciente">
            <h4>Dados do Paciente:</h4>
            <p><strong>Nome:</strong> {dadosPaciente.name}</p>
            <p><strong>Data de Nascimento:</strong> {dadosPaciente.dob}</p>
            <p><strong>Sexo:</strong> {dadosPaciente.sexo}</p>
            {/* Adicione mais campos conforme a estrutura dos dados */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormConsulta;
