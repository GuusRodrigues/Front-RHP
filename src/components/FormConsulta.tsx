import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const formatCPF = (value: string): string => {
  const numericValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
  return numericValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{2})$/, '$1-$2');
};

interface DadosPaciente {
  name: string;
  dob: string;
  sexo: string;
}

interface ErroResposta {
  message: string;
}

const FormConsulta: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente | null>(null);

  const formatarDataBR = (data: string) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const handleConsultar = async () => {
    setMensagem(null);
    setDadosPaciente(null);

    try {
      const response = await axios.get(`http://localhost:3000/patients/${cpf}`);

      // Verifica se a resposta é nula ou não possui dados esperados
      if (response.status === 200 && response.data) {
        setDadosPaciente(response.data);
        setMensagem('Consulta realizada com sucesso!');
      } else {
        setMensagem('Não foi possível realizar a consulta. Resposta inválida.');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErroResposta>;

      // Verificação específica para erro 404 (CPF não encontrado)
      if (axiosError.response?.status === 404) {
        setMensagem('CPF não encontrado. Verifique o número informado.');
      } else if (axiosError.response?.data?.message) {
        setMensagem(axiosError.response.data.message);
      } else {
        setMensagem('Erro ao consultar o CPF. Verifique a conexão ou o CPF informado.');
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
            onChange={(e) => setCpf(formatCPF(e.target.value))} 
            maxLength={14}
          />
        </div>
        
        <button onClick={handleConsultar} disabled={!cpf}>Consultar</button>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        {dadosPaciente && (
          <div className="dados-paciente">
            <h4>Dados do Paciente:</h4>
            <p><strong>Nome:</strong> {dadosPaciente.name}</p>
            <p><strong>Data de Nascimento:</strong> {formatarDataBR(dadosPaciente.dob)}</p>
            <p><strong>Sexo:</strong> {dadosPaciente.sexo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormConsulta;
